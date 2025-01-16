import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../FireBaseConfig";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css"


const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: white;
        font-family: "Space Mono", monospace;
    `;

const FormContainer = styled.div`
        background: #0ABD19;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(15px);
        max-width: 400px;
    `;

const Title = styled.h1`
        color: #fff;
        text-align: center;
        margin-bottom: 20px;
    `;

const Input = styled.input`
        padding: 10px;
        margin: 10px 0;
        font-size: 16px;
        border: none;
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        background: transparent;
        color: #fff;
        width: 100%;

        &:focus {
            outline: none;
            border-bottom: 2px solid #27ae60;
        }

        &::placeholder {
            color: rgb(255, 255, 255);
        }
    `;

const Button = styled.button`
        background-color: #000000;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        width: 100%;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;

        &:hover {
            background-color: #1e8449;
        }
    `;


const PaymentForm = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Инициализация navigate
    const [amount, setAmount] = useState(location.state?.amount || '');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [focused, setFocused] = useState('');
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);

    // Получаем данные посылки и услуг из location.state
    const parcelId = location.state?.parcelId || null;
    const servicesIds = location.state?.servicesIds || [];

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            fetchUserBalance(currentUser.uid);
        }
    }, []);

    const fetchUserBalance = async (userId) => {
        try {
            const balanceDoc = await getDoc(doc(db, 'balances', userId));
            if (balanceDoc.exists()) {
                setBalance(balanceDoc.data().balance);
            } else {
                console.log('No balance document found for user.');
                await setDoc(doc(db, 'balances', userId), { balance: 0 });
                setBalance(0);
            }
        } catch (error) {
            console.error('Error fetching user balance:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const amountInCents = parseInt(amount, 10) * 100;
            const orderId = `order${Date.now()}`;
            const [month, year] = expiry.split("/");

            // Данные для платежного API
            const paymentData = {
                Key: "MerchantEParcelinPay",
                SessionType: "Pay",
                OrderId: orderId,
                Amount: amountInCents,
                PayInfo: `PAN=${cardNumber};EMonth=${month};EYear=20${year};CardHolder=${cardHolder.trim()};SecureCode=${cvv}`,
                CustomFields: "IP=127.0.0.1;Product=TestProduct",
            };

            const queryString = Object.keys(paymentData)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(paymentData[key])}`)
                .join("&");

            const proxyUrl = "https://api.allorigins.win/get?url=";
            const apiUrl = `${proxyUrl}${encodeURIComponent(`https://sandbox3.payture.com/api/Pay?${queryString}`)}`;

            // Запрос к платежному API
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            const data = await response.json();
            const decodedData = decodeURIComponent(data.contents);

            if (response.ok) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(decodedData, "text/xml");
                const payElement = xmlDoc.getElementsByTagName("Pay")[0];
                const success = payElement.getAttribute("Success");

                if (success === "True") {
                    // Обновляем Firebase после успешного платежа
                    if (parcelId) {
                        const querySnapshot = await getDocs(
                            query(collection(db, "parcels"), where("id", "==", parcelId))
                        );
                        if (!querySnapshot.empty) {
                            const documentRef = querySnapshot.docs[0].ref;
                            await updateDoc(documentRef, { status: "Оплачено" });
                        }
                    }

                    if (servicesIds.length > 0) {
                        const updatePromises = servicesIds.map((serviceId) =>
                            updateDoc(doc(db, "applications", serviceId), { status: "Оплачено" })
                        );
                        await Promise.all(updatePromises);
                    }

                    // Сохраняем платеж
                    await addDoc(collection(db, "payments"), {
                        userId: user.uid,
                        amount: amount,
                        date: new Date(),
                    });

                    const newBalance = balance + parseInt(amount, 10);
                    await setDoc(doc(db, "balances", user.uid), { balance: newBalance });

                    // Успех - перенаправляем на страницу успеха
                    navigate("/PaymentSuccess", { state: { success: true } });
                } else {
                    const errCode = payElement.getAttribute("ErrCode");
                    console.error(`Ошибка при проведении оплаты: ${errCode}`);
                    navigate("/PaymentSuccess", { state: { success: false } });
                }
            } else {
                console.error("Ошибка при получении ответа от API.");
                navigate("/PaymentSuccess", { state: { success: false } });
            }
        } catch (error) {
            console.error("Ошибка при проведении оплаты:", error);
            navigate("/PaymentSuccess", { state: { success: false } });
        }
    };

    const formatExpiry = (value) => {
        let sanitizedValue = value.replace(/\D/g, "").slice(0, 4); // Убираем всё кроме цифр и ограничиваем до 4 символов
        if (sanitizedValue.length > 2) {
            sanitizedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2)}`;
        }
        return sanitizedValue;
    };

    return (
        <Container>
            <FormContainer>
                <Title>Оплата картой</Title>
                <Cards
                    number={cardNumber}
                    name={cardHolder}
                    expiry={expiry}
                    cvc={cvv}
                    focused={focused}
                />
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        maxLength="19"
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                        onFocus={() => setFocused("number")}
                    />
                    <Input
                        type="text"
                        placeholder="Card Holder"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        onFocus={() => setFocused("name")}
                    />
                    <Input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        maxLength="5"
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))} // Автоматическое добавление слэша
                        onFocus={() => setFocused("expiry")}
                    />

                    <Input
                        type="text"
                        placeholder="CVC"
                        value={cvv}
                        maxLength="3"
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        onFocus={() => setFocused("cvc")}
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button type="submit">Оплатить</Button>
                </form>
            </FormContainer>
        </Container>
    );
};

export default PaymentForm;
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
import AnimationRevealPage from "./AnimationRevealPage";
import { db } from "../../FireBaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_live_51QgSyxKfwgqVlmpdOqT3sTbecg1b2nclFWUeeAeOJ7ymrlJG7abA2Tt7zASaQNVCkDCRDHospMaSNKmygZ1C4Ifh00R92H0MSB");

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: white;
    font-family: "Space Mono", monospace;
`;

const FormContainer = styled.div`
    background: #0abd19;
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

const StripeForm = ({ parcelId, servicesIds, user, balance, setBalance }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            const response = await fetch("http://195.49.212.230:3001/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: parseInt(amount, 10) * 100 }), // Преобразуем сумму в центы
            });


            if (!response.ok) {
                // Если сервер вернул ошибку
                console.error("Ошибка при создании платежа:", response.statusText);
            } else {
                const { clientSecret } = await response.json();
                console.log("PaymentIntent создан, clientSecret:", clientSecret);
                // Здесь можно продолжить работу с полученным clientSecret для подтверждения платежа
            }

            const { clientSecret } = await response.json();

            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName || "Anonymous",
                    },
                },
            });

            if (error) {
                console.error("Payment failed:", error.message);
                navigate("/PaymentSuccess", { state: { success: false } });
            } else if (paymentIntent.status === "succeeded") {
                console.log("Payment succeeded:", paymentIntent);

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

                await addDoc(collection(db, "payments"), {
                    userId: user.uid,
                    amount,
                    date: new Date(),
                });

                const newBalance = balance + parseInt(amount, 10);
                await setDoc(doc(db, "balances", user.uid), { balance: newBalance });
                setBalance(newBalance);

                navigate("/PaymentSuccess", { state: { success: true } });
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            navigate("/PaymentSuccess", { state: { success: false } });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#fff",
                            "::placeholder": { color: "#ccc" },
                        },
                        invalid: { color: "#f44336" },
                    },
                }}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                    marginTop: "10px",
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    width: "100%",
                    border: "1px solid #ccc",
                }}
            />
            <Button type="submit" disabled={!stripe}>
                Оплатить
            </Button>
        </form>
    );
};

const PaymentForm = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
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
            const balanceDoc = await getDoc(doc(db, "balances", userId));
            if (balanceDoc.exists()) {
                setBalance(balanceDoc.data().balance);
            } else {
                console.log("No balance document found for user.");
                await setDoc(doc(db, "balances", userId), { balance: 0 });
                setBalance(0);
            }
        } catch (error) {
            console.error("Error fetching user balance:", error);
        }
    };

    return (
        <AnimationRevealPage>
            <Container>
                <FormContainer>
                    <Title>Оплата картой (Stripe)</Title>
                    <Elements stripe={stripePromise}>
                        <StripeForm
                            parcelId={parcelId}
                            servicesIds={servicesIds}
                            user={user}
                            balance={balance}
                            setBalance={setBalance}
                        />
                    </Elements>
                </FormContainer>
            </Container>
        </AnimationRevealPage>
    );
};

export default PaymentForm;

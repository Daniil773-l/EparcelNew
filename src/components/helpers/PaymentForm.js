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
    background: #f4f4f9;
    font-family: "Roboto", sans-serif;
`;

const FormContainer = styled.div`
    background: linear-gradient(to bottom right, #1abc9c, #16a085);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    text-align: center;
    color: white;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    margin-top: 20px;
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        box-shadow: 0 10px 20px rgba(39, 174, 96, 0.5);
    }

    &:disabled {
        background: #95a5a6;
        cursor: not-allowed;
    }
`;

const Input = styled.input`
    margin-top: 15px;
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
    width: 100%;
    border: 2px solid #ecf0f1;
    background-color: #ecf0f1;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        outline: none;
        border-color: #1abc9c;
        box-shadow: 0 0 5px rgba(26, 188, 156, 0.5);
    }
`;

const CardInputWrapper = styled.div`
    background: #ecf0f1;
    padding: 10px;
    border-radius: 8px;
    margin-top: 15px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
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
                body: JSON.stringify({ amount: parseInt(amount, 10) * 100 }),
            });

            if (!response.ok) {
                console.error("Ошибка при создании платежа:", response.statusText);
                return;
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
            <CardInputWrapper>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#333",
                                "::placeholder": { color: "#7f8c8d" },
                            },
                            invalid: { color: "#e74c3c" },
                        },
                    }}
                />
            </CardInputWrapper>
            <Input
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button type="submit" disabled={!stripe || !amount}>
                🛒 Оплатить
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

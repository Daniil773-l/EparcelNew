import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import styled from "styled-components";

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

const StripeForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    const createPaymentIntent = async (amount) => {
        try {
            // Отправляем запрос на сервер для создания PaymentIntent
            const response = await fetch("http://195.49.212.230:3001/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: amount }),
            });

            if (!response.ok) {
                console.error("Ошибка при создании платежа:", response.statusText);
                return;
            }

            const data = await response.json();
            setClientSecret(data.clientSecret); // Сохраняем clientSecret
        } catch (error) {
            console.error("Ошибка при запросе на сервер:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: "Test User",
                },
            },
        });

        if (error) {
            console.error("Ошибка при обработке платежа:", error.message);
        } else if (paymentIntent.status === "succeeded") {
            console.log("Платеж успешен:", paymentIntent);
        }
    };

    // При монтировании компонента создаем PaymentIntent
    React.useEffect(() => {
        createPaymentIntent(amount);
    }, [amount]);

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <Button type="submit" disabled={!stripe || !clientSecret}>
                Оплатить
            </Button>
        </form>
    );
};

export default StripeForm;

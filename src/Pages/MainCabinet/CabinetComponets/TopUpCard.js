import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import iconBalance from "../../../images/icon/BalanceCard.svg";

const Container = styled.div`
    ${tw`bg-white shadow-lg p-6 relative`}
    width: calc(100% - 40px);
    border-radius: 20px;
    min-height: 250px;
    margin-bottom: 16px;

    @media (max-width: 768px) {
        margin-left: 10px;
        width: calc(100% - 66px);
    }
`;

const GreenStrip = styled.div`
    ${tw`absolute top-0 left-0 w-full h-16 bg-green-1000 rounded-t-2xl`}
`;

const CircleIcon = styled.div`
    ${tw`w-20 h-20 bg-white rounded-full flex items-center justify-center absolute`}
    top: 14px;
    left: 46px;
`;

const CardHeader = styled.div`
    ${tw`flex flex-col items-center mb-4 relative`}
    margin-top: 32px;
`;

const BalanceText = styled.div`
    ${tw`text-lg mt-4 font-medium`}
    color: #2D2D2D;
    padding-right: 20%;
    span {
        color: #0ABD19;
    }
    @media (max-width: 768px) {
        ${tw`w-full`}
        padding-left: 80%;
    }
`;

const CardContent = styled.div`
    ${tw`flex flex-col items-center`}
`;

const InputContainer = styled.div`
    ${tw`w-full flex items-center mt-4 mb-4`}
    @media (max-width: 768px) {
    ${tw`flex-col items-start`}
}
`;

const InputField = styled.div`
    ${tw`relative w-1/2 flex items-center`}
    @media (max-width: 768px) {
    ${tw`w-full mb-4`}
}
`;

const Input = styled.input`
    ${tw`w-full py-3 px-4 border-none focus:outline-none rounded-lg`}
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12), inset 0 -1px 3px rgba(0, 0, 0, 0.12);
    background: #ffffff;
    padding-right: 2.5rem;
`;

const CurrencySymbol = styled.div`
    right: 20px;
    ${tw`absolute text-gray-500`}
`;

const Button = styled.button`
    ${tw`bg-green-500 text-white font-bold py-3 px-6 rounded-2xl ml-8 focus:outline-none transition duration-300`}
    border: none;
    background-color: #0ABD19;
    &:hover, &:focus {
        transform: scale(1.1);
    }
    @media (max-width: 768px) {
        ${tw`w-full ml-0`}
    }
`;

const Description = styled.div`
    ${tw`text-gray-600 font-medium text-lg mt-4`}
    text-align: left;
    width: 100%;
    line-height: 1.2;
    margin-left: 1rem;
    margin-right: 1rem;
    @media (max-width: 768px) {
        ${tw`text-xs`}
    }
`;

const BalanceCard = () => {
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(0.00);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserBalance = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const balanceDoc = await getDoc(doc(db, "balances", userId));
                if (balanceDoc.exists()) {
                    setBalance(balanceDoc.data().balance);
                } else {

                    setBalance(0.00);
                }
            }
        };

        fetchUserBalance();
    }, []);

    const handleInputChange = (e) => {
        setAmount(e.target.value);
    };

    const handleTopUpClick = () => {
        navigate('/PaymentForm', { state: { amount } });
    };

    return (
        <Container>
            <GreenStrip />
            <CircleIcon>
                <img src={iconBalance} alt="Balance Icon" />
            </CircleIcon>
            <CardHeader>
                <BalanceText>Ваш баланс - <span>{balance.toFixed(2)} ₸</span></BalanceText>
            </CardHeader>
            <CardContent>
                <div style={{ color: '#999999', alignSelf: 'flex-start', marginTop: '1rem' }}>Укажите сумму</div>
                <InputContainer>
                    <InputField>
                        <Input
                            type="number"
                            value={amount}
                            onChange={handleInputChange}
                        />
                        <CurrencySymbol>₸</CurrencySymbol>
                    </InputField>
                    <Button onClick={handleTopUpClick}>Пополнить баланс</Button>
                </InputContainer>
                <Description>
                    Для оперативной отправки посылок не забывайте своевременно пополнять баланс Вашего счета.
                    На баланс будет зачислена та сумма, которую Вы укажете в поле «Пополнить баланс на сумму».
                </Description>
            </CardContent>
        </Container>
    );
};

export default BalanceCard;

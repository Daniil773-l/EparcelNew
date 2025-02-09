import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import usFlag from '../../../images/icon/us-icon.png';
import trFlag from '../../../images/icon/tr-icon.png';
import euFlag from '../../../images/icon/es-icon.png';
import icon from '../../../images/icon/exchange-rate.png'; // Make sure this path is correct
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
    ${tw`bg-white shadow-lg rounded-lg p-6 relative`}
    width: calc(100% - 40px);
    border-radius: 20px;
    min-height: 320px;
    margin-bottom: 16px;
`;

const GreenStrip = styled.div`
    background-color: #DDF2E6;
    ${tw`absolute top-0 left-0 w-full h-16 rounded-t-2xl`}
`;

const IconContainer = styled.div`
    ${tw`absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg`}
    top: 12px;
    left: 16px;
`;
const CircleIcon = styled.div`
    ${tw`w-20 h-20 bg-white rounded-full flex items-center justify-center absolute`}
    top: 14px; /* Centering the icon vertically in the green strip */
    left: 46px;
`;
const Icon = styled.img`
    ${tw`w-12 h-12`}
`;

const CardHeader = styled.div`
    ${tw`flex flex-col items-center mb-4 relative`}
    margin-top: 32px;
`;

const HeaderText = styled.h2`
    ${tw`font-extrabold text-xl sm:text-xl mt-2  lg:text-xl text-center leading-tight`}

    padding-right: 20%;
    span {
        color: #0ABD19;
    }
`;

const CardContent = styled.div`
    ${tw`flex flex-col items-start mt-8`}
`;

const CurrencyRow = styled.div`
    ${tw`flex items-center mb-4`}
`;

const Flag = styled.img`
    ${tw`w-6 h-6 mr-3`}
`;

const Divider = styled.div`
    ${tw`w-full h-px bg-gray-300`}
    position: absolute;
    width: 93%;
    bottom: 60px;
`;

const CurrencyText = styled.span`
    ${tw`text-base xl:text-lg   text-gray-700`}
    color: #2D2D2D; /* Change text color to match the design */
     /* Make the font weight bolder */
`;

const CurrencyValue = styled.span`
    ${tw`text-green-500 ml-2 text-lg text-base`}
    color: #000; /* Change text color to match the design */
`;

const LogoutText = styled.div`
    ${tw`text-gray-600 cursor-pointer`}
    position: absolute;
    bottom: 20px;
    left: 26px;
`;

const CurrencyCard = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [rates, setRates] = useState({
        USD: null,
        TRY: null,
        EUR: null,
    });

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {

            localStorage.removeItem('userData');
            setUser(null);
            navigate("/");
        }).catch((error) => {

        });
    };

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://v6.exchangerate-api.com/v6/1371c0e0e3d1d277c1d135ef/latest/KZT');
                const rates = response.data.conversion_rates;
                setRates({
                    USD: 1 / rates.USD,
                    TRY: 1 / rates.TRY,
                    EUR: 1 / rates.EUR,
                });
            } catch (error) {

            }
        };

        fetchRates();
    }, []);

    return (
        <Container>
            <GreenStrip>

                <CircleIcon>    <Icon src={icon} alt="Icon" /></CircleIcon>


            </GreenStrip>
            <CardHeader>
                <HeaderText>    Курс валюты Eparcel</HeaderText>
            </CardHeader>
            <CardContent>
                <CurrencyRow>
                    <Flag src={usFlag} alt="US Flag" />
                    <CurrencyText>Доллар США:</CurrencyText>
                    <CurrencyValue>{rates.USD ? `${rates.USD.toFixed(2)} ₸` : 'Loading...'}</CurrencyValue>
                </CurrencyRow>
                <CurrencyRow>
                    <Flag src={trFlag} alt="Turkey Flag" />
                    <CurrencyText>Турецкая лира:</CurrencyText>
                    <CurrencyValue>{rates.TRY ? `${rates.TRY.toFixed(2)} ₸` : 'Loading...'}</CurrencyValue>
                </CurrencyRow>
                <CurrencyRow>
                    <Flag src={euFlag} alt="EU Flag" />
                    <CurrencyText>Евро:</CurrencyText>
                    <CurrencyValue>{rates.EUR ? `${rates.EUR.toFixed(2)} ₸` : 'Loading...'}</CurrencyValue>
                </CurrencyRow>
            </CardContent>
            <Divider />
            <LogoutText onClick={handleLogout}>Выйти из аккаунта</LogoutText>
        </Container>
    );
};

export default CurrencyCard;

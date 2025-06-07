import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

import Header from "../headers/light.js";
import DesignIllustration from "../../images/img/kz-2.png";
import DesignIllustration1 from "../../images/img/cards2.png";
import DesignIllustration2 from "../../images/img/cards1.png";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../FireBaseConfig";

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
  `;



const Actions = styled.div`
    ${tw`relative max-w-md text-center mx-auto lg:mx-0 flex items-center`}
    margin-top: 10px;

    input {
        ${tw`py-4 pl-8 pr-32 sm:py-5 rounded-full border-2 w-full lg:w-[450px] font-medium focus:outline-none transition duration-300`}
        &:hover, &:focus {
            border-color: #0ABD19;
        }
    }

    button {
        ${tw`absolute right-0 h-full bg-green-500 text-white font-bold rounded-full py-1 px-6 flex items-center justify-center leading-none focus:outline-none transition duration-300`}
        background-color: #0ABD19;
        border: none;
        transform: translateX(-10%);
        height: calc(100% - 12px);
        &:hover, &:focus {
            transform: scale(1.1) translateX(-10%);
        }
    }
`;








const HighlightedText = styled.span`
    ${tw`font-bold`}
    color: #0ABD19;
  `;
const Container = styled.div`
    ${tw`relative`}
    background-color: #e2ffe2;!important;  /* Set background color */
`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto `;


const LeftColumn = tw.div`relative lg:w-6/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;

const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-4xl lg:text-5xl  leading-tight`}
    /* Центрируем текст на маленьких экранах */
    margin-bottom: 20px;

    @media (max-width: 768px) {
        ${tw`text-2xl`} /* Уменьшаем размер текста для планшетов */
    }

    @media (max-width: 480px) {
        ${tw`text-xl`} /* Ещё меньше для мобильных устройств */
    }
`;

const Paragraph = styled.p`
    ${tw`text-base xl:text-xl my-2 lg:my-4 text-gray-700`}
   
    margin: 0 auto;

    @media (max-width: 768px) {
        ${tw`text-sm`} /* Уменьшаем текст на планшетах */
    }

    @media (max-width: 480px) {
        ${tw`text-xs`} /* Минимальный размер текста на мобильных устройствах */
    }
`;




const IllustrationContainer = styled.div`
    ${tw`flex justify-center lg:justify-end items-center`}

    margin-top: 40px; /* Отступ сверху */
    margin-bottom: 40px; /* Отступ снизу */

    img {
        object-fit: contain;

        @media (max-width: 768px) {
            max-width: 100%; /* Растягиваем на всю ширину экрана на планшетах */
            margin-top: 30px; /* Уменьшаем отступ сверху на планшетах */
            margin-bottom: 30px; /* Уменьшаем отступ снизу на планшетах */
        }

        @media (max-width: 480px) {
            max-width: 90%; /* Немного уменьшаем ширину на мобильных устройствах */
            margin-top: 20px; /* Ещё меньше отступ сверху на мобильных */
            margin-bottom: 20px; /* Ещё меньше отступ снизу */
        }
    }
`;

export default ({ roundedHeaderButton }) => {
    const [email, setEmail] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Стейт для отслеживания авторизации
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app); // Инициализация Firebase Authentication
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true); // Пользователь авторизован
            } else {
                setIsAuthenticated(false); // Пользователь не авторизован
            }
        });

        return () => unsubscribe(); // Чистка подписки на изменение состояния
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, []);

    const handleRegister = () => {
        localStorage.setItem('email', email);
        navigate('/RegistrationPage');
    };

    const headings = [
        <>Доставка товаров из США  в <HighlightedText>Казахстан</HighlightedText></>,
        <>Различные способы получения посылок  в <HighlightedText>Казахстане</HighlightedText></>,
        <>Выкуп товаров</>
    ];

    const paragraphs = [
        "Надежная и быстрая доставка посылок с товарами, купленных в интернет-магазинах.",
        "Выбирайте и получайте посылку в постамате, пункте выдаче заказов или курьер доставит прямо по Вашему адресу.",
        "Консультируем и помогаем купить товары в любом интернет-магазине в США."
    ];

    const images = [
        DesignIllustration2,
        DesignIllustration1,
        DesignIllustration
    ];

    return (
        <>
            <Header roundedHeaderButton={roundedHeaderButton} />
            <Container>
                <TwoColumn>
                    <LeftColumn>
                        {headings.map((heading, index) => (
                            <Heading key={index} animate={currentSlide === index} style={{ display: currentSlide === index ? 'block' : 'none' }}>
                                {heading}
                            </Heading>
                        ))}
                        {paragraphs.map((paragraph, index) => (
                            <Paragraph key={index} animate={currentSlide === index} style={{ display: currentSlide === index ? 'block' : 'none' }}>
                                {paragraph}
                            </Paragraph>
                        ))}

                        {/* Скрываем блок, если пользователь авторизован */}
                        {!isAuthenticated && (
                            <Actions>
                                <input
                                    type="text"
                                    placeholder="Ваш e-mail"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <button onClick={handleRegister}>Зарегистрироваться</button>
                            </Actions>
                        )}
                    </LeftColumn>
                    <RightColumn>
                        <IllustrationContainer>
                            {images.map((image, index) => (
                                <img tw="min-w-0 w-11/12 max-w-lg xl:max-w-3xl"  key={index} style={{ opacity: currentSlide === index ? 1 : 0, display: currentSlide === index ? 'block' : 'none' }} src={image} alt={`Design Illustration ${index + 1}`} />
                            ))}
                        </IllustrationContainer>
                    </RightColumn>
                </TwoColumn>
            </Container>
        </>
    );
};


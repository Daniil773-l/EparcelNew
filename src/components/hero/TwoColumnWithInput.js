import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

import Header from "../headers/light.js";
import DesignIllustration from "../../images/img/kz1.png";
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

const Container = styled.div`
    ${tw`relative pt-16 pb-16`} // Добавьте одинаковое расстояние сверху и снизу
    background-color: #e2ffe2; // Set background color
  `;

const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto`;

const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = styled.div`
    ${tw`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`}
    max-height: 600px; /* Ограничиваем максимальную высоту */
    overflow: hidden; /* Убираем любые переполнения */
`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-black  leading-tight`}
    margin-bottom: 20px; // Уменьшили отступ между заголовком и параграфом
    animation: ${({ animate }) => (animate ? fadeIn : fadeOut)} 1s ease-in-out;
`;

const Paragraph = styled.p`
    ${tw`my-2 lg:my-4 text-base  xl:text-xl`}
    animation: ${({ animate }) => (animate ? fadeIn : fadeOut)} 1s ease-in-out;
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


const IllustrationContainer = styled.div`
    ${tw`flex justify-center items-center`} // Центрирование элементов
    margin-left: 0%; // Убираем отступ
    max-width: 100%; /* Контейнер не выходит за пределы ширины */
    overflow: hidden; /* Обрезаем, если содержимое выходит за пределы */
    img {
        max-width: 100%; /* Ограничиваем ширину */
        height: auto; /* Сохраняем пропорции */
        object-fit: contain; /* Сохраняем изображение без обрезки */
        max-height: 600px; /* Ограничиваем максимальную высоту */
    }
`;






const HighlightedText = styled.span`
    ${tw`font-bold`}
    color: #0ABD19;
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
        <>Доставка товаров из США и Турции в <HighlightedText>Казахстан</HighlightedText></>,
        <>Различные способы получения посылок для наших клиентов в <HighlightedText>Казахстан</HighlightedText></>,
        <>Выкуп товаров</>
    ];

    const paragraphs = [
        "Надежная и быстрая доставка посылок с товарами, купленных в интернет-магазинах.",
        "Выбирайте и получайте посылку в постамате, пункте выдаче заказов или курьер доставит прямо по Вашему адресу.",
        "Консультируем и помогаем купить товары в любом интернет-магазине в США и Турции."
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
                                <img key={index} style={{ opacity: currentSlide === index ? 1 : 0, display: currentSlide === index ? 'block' : 'none' }} src={image} alt={`Design Illustration ${index + 1}`} />
                            ))}
                        </IllustrationContainer>
                    </RightColumn>
                </TwoColumn>
            </Container>
        </>
    );
};


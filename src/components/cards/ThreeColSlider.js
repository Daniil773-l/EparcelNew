import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "../misc/Headings";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;

const ControlButton = styled.button`
    ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`};
    background-color: #0abd19; /* Зеленый фон */
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: #088013; /* Темно-зеленый при hover */
    }

    &:focus {
        outline: none; /* Убираем фокус */
        background-color: #088013; /* Темно-зеленый при focus */
    }

    svg {
        ${tw`w-6 h-6`};
        color: white; /* Белый цвет стрелки */
        fill: white; /* Заполнение стрелки белым */

        &:hover,
        &:focus {
            color: white; /* Убираем фиолетовый на hover/focus */
            fill: white; /* Убираем фиолетовый на hover/focus */
        }
    }
`;

const PrevButton = styled(ControlButton)``;
const NextButton = styled(ControlButton)``;

const CardSlider = styled(Slider)`
    ${tw`mt-16 overflow-hidden`} /* Скрываем лишние карточки */
    .slick-track {
        ${tw`flex`}
    }
    .slick-slide {
        ${tw`h-auto flex justify-center`}
    }
`;

const Card = styled.div`
    ${tw`flex flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`}
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardImage = styled.div((props) => [
    `background-image: url("${props.imageSrc}");`,
    tw`w-full bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
    `aspect-ratio: 4 / 3;` // Adjust aspect ratio as needed
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2`;
const Title = tw.h5`text-2xl font-bold mb-2`;
const Rating = tw.span`ml-2 font-bold`;
const Description = tw.p`text-base leading-relaxed mt-1 sm:mt-2 mb-1`;

export default () => {
    const [sliderRef, setSliderRef] = useState(null);

    const sliderSettings = {
        arrows: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // На планшетах показываем 2 карточки
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // На телефонах — 1 карточка
                },
            },
        ],
    };



    const cards = [
        {
            imageSrc: "https://eparcel.ru/image/cache/webp/catalog/raschet-tovarov-300x180.webp",
            title: "Как оплатить товар в Америке",
            description: "Оплата покупок за границей в 2025 году остается доступной с банковской картой...",
        },
        {
            imageSrc: "https://eparcel.ru/image/cache/webp/catalog/pokupat-s-vygodoj1-300x289.webp",
            title: "Где покупать товары с выгодой в США",
            description: "Покупки в американских магазинах — это выгодный способ экономить на брендах...",
        },
        {
            imageSrc: "https://eparcel.ru/image/cache/webp/catalog/kroksy-originalnye-300x242.webp",
            title: "Как заказать оригинальные кроксы",
            description: "Покупка оригинальных Crocs — это инвестиция в комфорт и долговечность...",
        },
        {
            imageSrc: "https://eparcel.ru/image/cache/webp/catalog/iherblogo-300x299.webp",
            title: "20% на товары iHerb",
            description: "Отличное качество и низкие цены!..",
        },
    ];

    return (
        <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Новости и специальные предложения</Heading>
                    <Controls>
                        <PrevButton onClick={sliderRef?.slickPrev}>
                            <ChevronLeftIcon />
                        </PrevButton>
                        <NextButton onClick={sliderRef?.slickNext}>
                            <ChevronRightIcon />
                        </NextButton>
                    </Controls>
                </HeadingWithControl>
                <CardSlider ref={setSliderRef} {...sliderSettings}>
                    {cards.map((card, index) => (
                        <Card key={index}>
                            <CardImage imageSrc={card.imageSrc} />
                            <TextInfo>
                                <TitleReviewContainer>
                                    <Title>{card.title}</Title>
                                    <Rating>{card.rating}</Rating>
                                </TitleReviewContainer>
                                <Description>{card.description}</Description>
                            </TextInfo>
                        </Card>
                    ))}
                </CardSlider>
            </Content>
        </Container>
    );
};

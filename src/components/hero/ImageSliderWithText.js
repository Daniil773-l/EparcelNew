import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Slide1 from "../../images/img/Slide1.svg"; // Убедитесь, что путь правильный

const Container = tw.div`relative mx-auto mt-0 max-w-screen-xl py-12 px-6`; // Центрируем содержимое и добавляем отступы
const TwoColumn = tw.div`flex flex-col lg:flex-row items-center lg:items-start`; // Убираем лишние отступы и выравниваем содержимое

const LeftColumn = styled.div`
    ${tw`w-full lg:w-1/2 flex flex-col items-start`}
`;

const RightColumn = styled.div`
    ${tw`w-full lg:w-1/2 flex justify-center`}
`;

const Heading = tw.h1`text-3xl sm:text-5xl font-bold font-black leading-tight text-center lg:text-left`; // Текст выравнивается влево на больших экранах

// Увеличиваем ширину текста еще больше
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-2xl`;

const Button = styled.button`
    ${tw`mt-6 px-6 py-3 bg-green-1002 text-white font-bold rounded-full transition duration-300`}
    &:hover {
        ${tw`bg-green-600`}
    }
`;

const Image = styled.img`
    ${tw`w-full max-w-lg`}
    object-fit: contain; /* Устанавливаем, чтобы изображение полностью помещалось */
`;

export default ({
                    heading = "Наш склад в США",
                    description = "Склад в США расположен в безналоговом штате Делавэр, на адрес которого покупатели из Казахстана могут отправить свои товары, купленные в онлайн-магазинах. Мы доставим их на Ваш адрес в Казахстан. Надежная доставка товаров из США до Вашего дома – полностью на нас.",
                }) => {
    return (
        <Container>
            <TwoColumn>
                <LeftColumn>
                    <Heading>{heading}</Heading>
                    <Paragraph>{description}</Paragraph>
                    <Button>Получить адрес доставки</Button>
                </LeftColumn>
                <RightColumn>
                    <Image src={Slide1} alt="Warehouse in USA" />
                </RightColumn>
            </TwoColumn>
        </Container>
    );
};

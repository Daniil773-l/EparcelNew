import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto`; // Без отступов сверху



const HeadingColumn = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;

const HeadingTitle = styled.h1`
  ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`}
  margin-bottom: 50px; /* Увеличение отступа между заголовком и абзацем */
`;

const HeadingDescription = tw.p`my-5 lg:my-8 text-base xl:text-2xl`;

const Break = styled.div`
  ${tw`my-4`}
`;

export default () => {
    return (
        <Container>
            <Content>
                <HeadingColumn>
                    <HeadingTitle>Выкуп товаров</HeadingTitle>
                    <HeadingDescription>
                        Не понимаете язык? Магазин не принимает к оплате карты зарубежных банков или не высылает товары на адрес склада? Не хотите тратить время на самостоятельный шопинг?
                        <Break />
                        Услуга «Выкуп товаров» решит все эти вопросы: Вы делаете заказ через удобную форму в личном кабинете, а мы выкупаем для Вас нужный товар в интернет-магазине и доставляем его на наш склад, упаковываем и отправляем на указанный адрес.
                    </HeadingDescription>
                </HeadingColumn>
            </Content>
        </Container>
    );
};

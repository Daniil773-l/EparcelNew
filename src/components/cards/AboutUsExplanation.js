import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-8 lg:py-12`; // Еще более уменьшенные отступы


const HeadingColumn = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;

const HeadingTitle = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;


const HeadingDescription = tw.p`my-5 lg:my-8 text-base xl:text-xl text-gray-700 `;

const Break = styled.div`
  ${tw`my-4`}
`;

export default () => {
    return (
        <Container>
            <Content>
                <HeadingColumn>
                    <HeadingTitle>O нас</HeadingTitle>
                    <HeadingDescription>

                        ЕPARCEL.kz является  службой доставки и мейлфорвардом посылок из зарубежных стран в Казахстан. Мы <br/> оказываем полный комплекс услуг по логистике и доставке посылок с товарами для физических лиц, купленных на маркетплейсах и в онлайн-магазинах в зарубежных странах.
                        <br/>
                        Доставка посылок с товарами из-за границы является нашей основной деятельностью с собственными методами  доставки до Казахстана. Доставка посылок производится по всему Казахстану.
                    </HeadingDescription>
                </HeadingColumn>
            </Content>
        </Container>
    );
};

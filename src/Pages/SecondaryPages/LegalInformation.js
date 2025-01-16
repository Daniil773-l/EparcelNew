import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header from '../../components/headers/MainHeader';
import Footer from "../../components/footers/MainFooterWithLinks";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Photo from "../../images/img/Правовая информация. КЗ.png";

const Container = tw.div`relative `;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16`; // Уменьшенные отступы
const HeadingColumn = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;


const HeadingTitle = styled.h1`
    ${tw`font-bold text-3xl md:text-2xl lg:text-4xl xl:text-4xl  leading-tight`}
    margin-bottom: 50px; /* Увеличение отступа между заголовком и абзацем */
    color: #2D2D2D;
`;

const GreenLink = styled.a`
    ${tw`text-green-1002`} // Зеленый цвет
    text-decoration: none;
    font-size: 22px; // Set the font size
    line-height: 32px; // Set the line height
 
    font-weight: normal; // Regular text less bold than HighlightedText
`;

const HeadingDescription = styled.p`
    ${tw.p`my-5 md:text-5xl lg:my-8 text-base text-black xl:text-xl`}
    font-size: 22px; // Set the font size
    line-height: 32px; // Set the line height
    color: #2D2D2D; // Maintain the color
   
    font-weight: normal; // Regular text less bold than HighlightedText
`;

const Break = styled.div`
    ${tw`my-4`}
`;

const Number = styled.span`
  font-size: 22px;
`;

export default () => {
    return (
        <>
            <AnimationRevealPage>
                <Header
                    heading="Правовая информация"
                    paragraph={false}
                    imageSrc=   {Photo}
                    roundedHeaderButton={false}
                />
                <Container>
                    <Content>
                        <HeadingColumn>
                            <HeadingTitle>Правовая информация</HeadingTitle>
                            <HeadingDescription>
                                <Number>1.</Number>{" "}
                                <GreenLink href="https://www.consultant.ru/document/cons_doc_LAW_215315/" >
                                    "Таможенный кодекс Евразийского экономического союза" (ред. от 29.05.2019, с изм. от 18.03.2023)
                                </GreenLink>
                                <Break />
                                <Number>2.</Number>{" "}
                                <GreenLink href="https://rulaws.ru/acts/Prikaz-FTS-Rossii-ot-05.07.2018-N-1060/">
                                    Приказ ФТС России от 05.07.2018 N 1060 "О Порядке использования в качестве пассажирской таможенной декларации реестра экспресс-грузов товаров для личного пользования, доставляемых перевозчиком (транспортной экспедиторской компанией или службой курьерской доставки) в адрес физических лиц, содержащего сведения, необходимые для выпуска товаров для личного пользования, с применением Единой автоматизированной информационной системы таможенных органов"
                                </GreenLink>
                                <Break />
                                <Number>3.</Number>{" "}
                                <GreenLink href="https://www.customs.gov.kg/wMBGZGPW-Оботдельныхвопросах,связанныхстоварамидляличногопользования.pdf">
                                    Решение Совета Евразийской экономической комиссии от 20 декабря 2017 г. N 107 "Об отдельных вопросах, связанных с товарами для личного пользования"
                                </GreenLink>
                                <Break />
                                <Number>4.</Number>{" "}
                                <GreenLink href="/TermsOfService">
                                    Политика экспортного и санкционного контроля (далее – ПОЛИТИКА)
                                </GreenLink>
                                <Break />
                                <Number>5.</Number>{" "}
                                <GreenLink href="/PublicOffer">
                                    Соглашение о возмездном оказании услуг на условиях публичной оферты
                                </GreenLink>
                                <Break />
                                <Number>6.</Number>{" "}
                                <GreenLink href="/PrivacyPolicy">
                                    Политика в отношении сбора, обработки и защиты персональных данных субъектов персональных данных
                                </GreenLink>
                            </HeadingDescription>
                        </HeadingColumn>
                    </Content>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>
    );
};

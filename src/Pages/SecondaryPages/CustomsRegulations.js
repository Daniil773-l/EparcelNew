import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Header from '../../components/headers/MainHeader';
import Footer from "../../components/footers/MainFooterWithLinks";

import DesignIllustration from "../../images/img/Таможенные правила. КЗ.png";
import Banner2 from "../../images/img/SecondBannerCustoms.svg";
import CustomImage from "../../images/img/BannerCustoms.svg"; // Import the uploaded image

const Container = tw.div`relative`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-4xl lg:text-4xl leading-tight`}
    color: #000;
    margin-bottom: 10px;
`;


const Paragraph = styled.p`
    ${tw`text-base md:text-lg lg:text-xl`}
    color: #2d2d2d;

    font-weight: normal;
    margin-bottom: 20px;
`;
const SectionContainer = styled.div`
    ${tw`py-8 px-4 lg:px-8 mb-8 bg-gray-100 rounded-lg`}
`;

const List = styled.ul`
    ${tw`list-disc pl-5 my-4`}
`;

const ListItem = styled.li`
    ${tw`text-lg my-2`}
    color: #2d2d2d;
`;
const Content = tw.div`max-w-screen-xl mx-auto py-8 lg:py-12`; // Adjusted padding for better spacing
const HeadingColumn = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;






const InfoSection = styled.div`
    ${tw`flex flex-col lg:flex-row items-center justify-center my-8`}

    font-size: 22px;
    line-height: 1.5;
    text-align: center;

    @media (max-width: 1024px) {
        ${tw`flex-col`}
    }
`;

const ImageContainer = styled.div`
    ${tw`flex-shrink-0 lg:mr-8`}
    img {
        ${tw`w-80 h-80`}
    }
`;

const InfoText = styled.div`
    ${tw`text-2xl leading-snug`}
    color: #243e63;
`;

const HighlightedInfoText = styled.span`
    font-weight: bold;
    color: #0abd19;
`;

export default ({roundedHeaderButton}) => {
    return (
        <>
            <AnimationRevealPage>
                <Header
                    heading="Как покупать товары за границей"
                    paragraph="Покупка товаров из зарубежных интернет-магазинов стала очень популярной среди покупателей в Казахстане"
                    imageSrc={DesignIllustration}
                    roundedHeaderButton={false}
                />
                <Container>
                    <Content>
                        <HeadingColumn>
                            <SectionContainer>
                                <Heading>Таможенные правила</Heading>
                                <Paragraph>
                                    На все посылки с товарами из-за рубежа применяются правила Таможенного союза:
                                    Таможенный кодекс Евразийского экономического союза, глава 37.
                                </Paragraph>
                            </SectionContainer>

                            <SectionContainer>
                                <Heading>Таможенное оформление, паспортные данные и ИИН</Heading>
                                <Paragraph>
                                    Согласно Таможенному Кодексу, таможенному декларированию подлежат все грузы,
                                    пересекающие границу ЕАЭС, вне зависимости от стоимости и веса. Все международные
                                    отправления проходят процедуру таможенного оформления с указанием паспортных данных
                                    и ИИН получателя.
                                </Paragraph>
                            </SectionContainer>

                            <SectionContainer>
                                <Heading>Ограничения и лимиты беспошлинного ввоза</Heading>
                                <Paragraph>
                                    Товары для личного пользования стоимостью до €200 и весом до 31 кг освобождаются от
                                    уплаты пошлин. При превышении нормы взимается пошлина в размере 15% от стоимости, но
                                    не менее 2 € за каждый кг превышения.
                                </Paragraph>
                                <InfoSection>
                                    <ImageContainer>
                                        <img src={CustomImage} alt="Customs Info"/>
                                    </ImageContainer>
                                    <InfoText>
                                        <strong style={{
                                            color: "#000000",
                                            fontSize: "30px",
                                            display: "block",
                                            marginBottom: "10px"
                                        }}>Стоимость таможенной пошлины</strong>
                                        <HighlightedInfoText>учитывается вес и стоимость отдельной
                                            посылки.</HighlightedInfoText>
                                    </InfoText>
                                </InfoSection>
                            </SectionContainer>

                            <SectionContainer>
                                <Heading>Количество и лимит товаров в одной посылке</Heading>
                                <Paragraph>
                                    Каждая посылка может содержать до 4 одинаковых товаров. В противном случае таможня
                                    может считать её коммерческой партией.
                                </Paragraph>
                                <img src={Banner2} alt="Customs Banner"
                                     style={{maxWidth: '100%', marginBottom: '20px'}}/>
                            </SectionContainer>

                            <SectionContainer>
                                <Heading>Необходимые документы для ввоза товаров</Heading>
                                <Paragraph>Для получения посылки из-за рубежа потребуются:</Paragraph>
                                <List>
                                    <ListItem>Паспорт</ListItem>
                                    <ListItem>Свидетельство о рождении (для детей до 16 лет)</ListItem>
                                    <ListItem>ИИН</ListItem>
                                    <ListItem>Квитанции или счета-фактуры, подтверждающие оплату</ListItem>
                                    <ListItem>Документы, подтверждающие стоимость товара (например, выписка из
                                        интернет-магазина)</ListItem>
                                </List>
                            </SectionContainer>

                            <SectionContainer>
                                <Heading>Завершение таможенного оформления</Heading>
                                <Paragraph>
                                    После подачи всей необходимой информации таможенные органы проводят оформление и
                                    выпуск товаров. Если данные заполнены корректно, посылка будет выпущена без
                                    задержек.
                                </Paragraph>
                            </SectionContainer>

                            <SectionContainer>
                                <Heading>Сроки прохождения таможни</Heading>
                                <Paragraph>
                                    Срок таможенного оформления составляет 1-3 рабочих дня с момента прибытия на
                                    территорию Казахстана. При правильном заполнении данных посылка будет выпущена без
                                    задержек.
                                </Paragraph>
                            </SectionContainer>
                        </HeadingColumn>
                    </Content>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>
    );
};
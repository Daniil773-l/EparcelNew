import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Header from '../../components/headers/MainHeader';
import Footer from "../../components/footers/MainFooterWithLinks";
import Buy from "../../images/icon/HowToBuyAbroad.svg"
import Choose from "../../images/icon/GoodChoose.svg";
import Purchase from "../../images/icon/PurchaseGood.svg";
import Delivery from "../../images/icon/DeliveryIcon.svg";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import DesignIllustration from "../../images/img/Как покупать товары из-за границы.png";
import {SectionHeading} from "../../components/misc/Headings";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16`;
const HeadingColumn = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0 flex flex-col items-center xl:items-start`;

const HeadingTitle = tw(SectionHeading)`
    text-3xl md:text-2xl lg:text-4xl xl:text-3xl leading-tight
    mb-5
    text-[#2D2D2D]
    flex items-center
`;


const GreenLink = styled.a`
    ${tw`text-green-500`}
    text-decoration: none;
`;

const HeadingDescription = styled.p`
    ${tw`text-lg font-medium`}
    font-size: 22px;
    line-height: 32px;
    color: #2D2D2D;
    font-family: 'Gilroy Medium', sans-serif;
    margin-top: 12px; /* Добавлено для выравнивания текста ниже */
`;

const SectionContainer = styled.div`
    ${tw`py-8 px-4 lg:px-8 mb-8 bg-gray-100 rounded-lg`}
`;

const IconTitleContainer = styled.div`
    ${tw`flex items-center mb-4`}
`;

const BuyIcon = styled.img`
    ${tw`mr-4 `} /* Добавлено для отступа между иконкой и текстом */
`;

export default () => {
    return (
        <>
            <AnimationRevealPage>
                <Header
                    heading="Как покупать товары из-за границы"
                    paragraph="Покупка товаров из зарубежных интернет-магазинов стала очень популярной среди покупателей в Казахстане. Это позволяет покупать оригинальные товары и заказывать их по более выгодным ценам."
                    imageSrc={DesignIllustration}
                    roundedHeaderButton={false}
                />
                <Container>
                    <Content>
                        <SectionContainer>
                            <HeadingColumn>
                                <IconTitleContainer>
                                    <HeadingTitle>
                                        <BuyIcon src={Buy} alt="How to Buy Abroad" />
                                        Как покупать товары за границей
                                    </HeadingTitle>
                                </IconTitleContainer>
                                <HeadingDescription>
                                    Покупка товаров из зарубежных интернет-магазинов стала очень популярной среди российских покупателей. Однако многие сталкиваются с проблемами при выборе и оплате товара, а также при его доставке в Казахстан. Как же все-таки правильно покупать товары за границей и как осуществляется их доставка в Казахстан?
                                </HeadingDescription>
                            </HeadingColumn>
                        </SectionContainer>
                        <SectionContainer>
                            <IconTitleContainer>
                                <BuyIcon src={Choose} alt="Choose Product"/>
                                <HeadingTitle>Выбор товара</HeadingTitle>
                            </IconTitleContainer>
                            <HeadingDescription>
                                Перед тем, как приступить к покупкам, необходимо определиться с выбором магазина и товара. Для этого нужно изучить характеристики товара, его стоимость и отзывы других покупателей. Стоит убедиться в том, что продавец имеет хорошую репутацию. Специально для наших покупателей на главной странице сайта мы собрали <GreenLink href="#">список проверенных временем магазинов из США и Турции</GreenLink>.
                            </HeadingDescription>
                        </SectionContainer>

                        <SectionContainer>
                            <IconTitleContainer>
                                <BuyIcon src={Purchase} alt="Purchase Product"/>
                                <HeadingTitle>Оплата товара</HeadingTitle>
                            </IconTitleContainer>
                            <HeadingDescription>
                                Оплата товара за границей производится обычно через интернет-магазин или платежные системы, такие как PayPal или кредитные карты. При этом необходимо убедиться в том, что сайт, на котором вы производите оплату, защищен протоколом SSL и имеет сертификат безопасности. Если у Вас возникли проблемы с оплатой, воспользуйтесь нашей функцией <GreenLink href="#">«Выкуп товаров»</GreenLink>.
                            </HeadingDescription>
                        </SectionContainer>

                        <SectionContainer>
                            <IconTitleContainer>
                                <BuyIcon src={Delivery} alt="Product Delivery"/>
                                <HeadingTitle>Доставка товара</HeadingTitle>
                            </IconTitleContainer>
                            <HeadingDescription>
                                Подробнее про указание адреса, сроки доставки и трекинг-номер Вы можете ознакомиться в другой статье. Компания Eparcel гарантирует Вам качественную и быструю доставку, а также сохранность товара во время перевозки. Мы с радостью поможем Вам с Вашей посылкой на всех этапах доставки!
                            </HeadingDescription>
                        </SectionContainer>
                    </Content>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>
    );
};
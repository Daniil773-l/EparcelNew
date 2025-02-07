import React from "react";
import tw from "twin.macro";
import styled from 'styled-components';
import AnimationRevealPage from "./components/helpers/AnimationRevealPage.js";
import Hero from "./components/hero/TwoColumnWithInput.js";

import FeatureWithSteps from "./components/features/TwoColWithSteps.js";
import MainFeature2 from "./components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";

import SliderCard from "./components/cards/ThreeColSlider.js";
import Footer from "./components/footers/MainFooterWithLinks";

import Dev1 from "./images/img/Flashlight-cuate.svg";
import Dev2 from "./images/img/Delivery address-amico.svg";
import Dev3 from "./images/img/Messenger-rafiki.svg";
import Email from "./images/img/Rechlama.d67980d053c9b6436a64.svg"

import { ContentWithPaddingXl } from "./components/misc/Layouts.js";

import { ReactComponent as One } from "./images/icon/01.svg";
import { ReactComponent as Two } from "./images/icon/02.svg";
import { ReactComponent as Three } from "./images/icon/03.svg";
import { ReactComponent as For } from "./images/icon/04.svg";

const NewSectionContainer = styled.div`
    ${tw`flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto py-20`}
    margin-bottom: 40px;
`;
const Navlink=styled.a`text-decoration: none
`
const TextColumn = styled.div`
    ${tw`lg:w-6/12 flex flex-col items-center lg:items-start`}
`;

const ImageColumn = styled.div`
    ${tw`lg:w-6/12 mt-10 lg:mt-0 flex justify-center`}
`;

const Heading = styled.h2`
    ${tw`mt-4 font-black text-left font-black   text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight `}
`;

const DeliveryHeading = styled.h2`
    ${tw`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight ml-16`}
`;


const Paragraph = styled.p`
    ${tw` mt-4 text-base xl:text-xl my-2 lg:my-4 text-gray-700`}
    margin-bottom: 10px; /* Added margin bottom */
    line-height: 1.8; /* Adjusted line height for more space between lines */
`;

const Button = styled.button`
    ${tw`mt-8 px-8 py-3 text-white text-lg rounded-full transition duration-300`}
    background-color: #0ABD19;
    border: none;
    &:hover {
        background-color: #70D392;
    }
    &:focus {
        outline: none;
    }
`;

const Image = styled.img`
    ${tw`w-full max-w-md rounded-lg`}
`;

const DeliveryMethodsContainer = styled.div`
    ${tw`flex flex-col items-center max-w-screen-xl mx-auto`} /* Уменьшены отступы сверху и снизу */
`;

const CardsContainer = styled.div`
    ${tw`flex flex-col md:flex-row justify-center items-center mt-6`}
`;

const Card = styled.div`
    ${tw`flex flex-col items-center max-w-xs mx-4 p-6 bg-white rounded-lg my-4 md:my-0 md:mx-4`}
    height: 350px; /* Установлена высота для карточек */
`;

const CardImage = styled.img`
    ${tw`w-40 h-40 mb-4`} /* Увеличен размер картинок */
`;

const CardHeading = styled.h4`
    ${tw`mt-4 font-bold text-2xl text-center`}
`;

const CardParagraph = styled.p`
    ${tw`text-lg xl:text-xl my-2 lg:my-4     text-center`}
`;

const EmailSectionContainer = styled.div`
    ${tw`flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto `}
    margin-top: 5%; /* Added margin top for spacing */
    
`;

const EmailTextColumn = styled.div`
    ${tw`flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto py-20`}
    margin-bottom: 40px;
`;

const EmailImageColumn = styled.div`
    ${tw`lg:w-6/12 mt-10 lg:mt-0 flex justify-center`}
`;

const EmailMainParagraph = styled.p`
    ${tw`mt-4 text-3xl lg:text-2xl text-gray-700 text-center lg:text-left`}
    font-weight: bold;
    line-height: 1.8; /* Adjusted line height for more space between lines */
`;

const EmailSubParagraph = styled.p`
    ${tw`mt-4 text-base lg:text-lg text-gray-700 text-center lg:text-left`}
    line-height: 1.8; /* Adjusted line height for more space between lines */
`;

const EmailButton = styled.button`
    ${tw`mt-8 px-8 py-3 text-white text-lg rounded-full transition duration-300`}
    background-color: #0ABD19;
    border: none;
    &:hover {
        background-color: #70D392;
    }
    &:focus {
        outline: none;
    }
`;

const EmailImage = styled.img`
    ${tw`w-full max-w-md rounded-lg`}
`;

export default () => {
    const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
    const HighlightedText = styled.span`
    ${tw`text-primary-500`} 
    color: #0ABD19; 
  `;
    const ContentWithPaddingXlCustom = styled(ContentWithPaddingXl)`
    ${tw`pb-5`} 
  `;
    const Steps = styled.span`
    ${tw`text-primary-500`} 
    color: #0ABD19; 
  `;
    const Prim = styled.span`
    ${tw`text-center text-primary-500 md:text-left`} 
    color: #0ABD19; 
  `;

    return (
        <AnimationRevealPage>
            <Hero roundedHeaderButton={true} />
            <FeatureWithSteps
                heading={
                    <>
                        Как это <HighlightedText>работает?</HighlightedText>
                    </>
                }
                textOnLeft={false}

                imageDecoratorBlob={true}
                decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
            />
            <DeliveryMethodsContainer>
                <DeliveryHeading>Способы доставки</DeliveryHeading>
                <CardsContainer>
                    <Card>
                        <CardImage src={Dev1} alt="Доставка до ПВЗ" />
                        <CardHeading>Доставка до ПВЗ</CardHeading>
                        <CardParagraph>
                            Доставка в пункты выдачи заказов наших партнеров
                        </CardParagraph>
                    </Card>
                    <Card>
                        <CardImage src={Dev2} alt="Доставка до постамата" />
                        <CardHeading>Доставка до постамата</CardHeading>
                        <CardParagraph>
                            Выбирайте постамат удобный для Вас и мы доставим Ваши покупки именно туда
                        </CardParagraph>
                    </Card>
                    <Card>
                        <CardImage src={Dev3} alt="Доставка до двери" />
                        <CardHeading>Доставка до двери</CardHeading>
                        <CardParagraph>
                            Укажите адрес и наш курьер доставит его прямо к Вам до двери
                        </CardParagraph>
                    </Card>
                </CardsContainer>
            </DeliveryMethodsContainer>
            <EmailSectionContainer>
                <TextColumn>
                    <Heading> Зарегистрируйтесь на нашем сайте, чтобы <HighlightedText>узнать адрес склада в США и Турции </HighlightedText> </Heading>
                    <Paragraph>
                        Получите личный адрес в США и Турции  для покупок в интернет магазинах, а Eparcel доставит их Вам в Казахстан.</Paragraph>
                    <Navlink href="/RegistrationPage"> <Button>Получить адрес доставки</Button></Navlink>
                </TextColumn>
                <ImageColumn>
                    <Image src={Email} alt="Rechlama" />
                </ImageColumn>
            </EmailSectionContainer>
            <MainFeature2
                heading={
                    <>
                        Преимущества нашей<HighlightedText> службы доставки</HighlightedText>
                    </>
                }

                showDecoratorBlob={false}
                features={[
                    {
                        Icon: One,
                        title: "Дешевая быстрая доставка",
                        description: "При регистрации на сайте Вы бесплатно получаете почтовый адрес склада для доставки ваших товаров",
                    },
                    {
                        Icon: Two,
                        title: "Услуги склада",
                        description: "Основные услуги  включены в стоимость доставки до адресата",
                    },
                    {
                        Icon: Three,
                        title: "Выкуп товаров",
                        description: "Пришлите ссылку или описание товара. Мы выкупим товар по Вашему желанию и быстро доставим Вам",
                    },
                    {
                        Icon: For,
                        title: "Оплата в тенге",
                        description: "Все услуги и товары оплачиваются в тенге и валюте на Ваше усмотрение. Различные методы оплаты",
                    },
                ]}
            />
            {/*<NewSectionContainer>*/}
            {/*    <TextColumn>*/}
            {/*        <Heading>Покупайте товары в США и Турции с большой выгодой</Heading>*/}
            {/*        <Paragraph>*/}
            {/*            Устали переплачивать за известные бренды? Благодаря высокой конкуренции на рынке в США и Турции, распродажа большинства товаров ощутимо дешевле, чем в России, а сэкономить на доставке поможет компания Eparcel.*/}
            {/*        </Paragraph>*/}
            {/*        <Navlink href="/RegistrationPage"> <Button>Получить адрес доставки</Button></Navlink>*/}
            {/*    </TextColumn>*/}
            {/*    <ImageColumn>*/}
            {/*        <Image src={Add} alt="Rechlama" />*/}
            {/*    </ImageColumn>*/}
            {/*</NewSectionContainer>*/}
            <SliderCard/>
            <Footer />
        </AnimationRevealPage>
    );
};

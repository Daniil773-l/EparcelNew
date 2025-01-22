import React from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage.js";
import Header from "./componets/AboutUsHeader";

import Footer from "../../components/footers/MainFooterWithLinks";
import Explanation from "../../components/cards/AboutUsExplanation";
import Slider from "../../components/hero/ImageSliderWithText";

import Offerings from "../../components/features/OffersToClients";

import "./componets/IncludedServicesSectionTariff.css";
import prototypeIllustrationImageSrc from "../../images/img/EparcelBallon.svg";
import styled from "styled-components";
import tw from "twin.macro";
import Alemtat from "../../images/logo/AlemTat.svg";
import Cdek from "../../images/logo/cdek.png" ;
import DHL from "../../images/logo/DHL.svg";
import FedEX from "../../images/logo/FedExLogo.svg";
import Ups from "../../images/logo/UPS.svg";
import USPS from "../../images/logo/USPS.svg";


import { ReactComponent as Star } from "../../images/img/GreenStar.svg";

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
    flex-shrink: 0;
`;

const Description = styled.p`
    margin: 0;
    font-size: 20px;
    margin-left: 15px;
`;

const SectionContainer = styled.section`
    ${tw`mx-auto w-full`}
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const CenteredContainer = styled.div`
    ${tw`flex items-center justify-center h-full`}
    margin-top: 100px; // Увеличьте значение для большего отступа
`;


const Heading = tw.h1`
    text-3xl sm:text-5xl md:text-6xl lg:text-4xl font-black leading-none
`;

const ContentAlignment = styled.div`
    ${tw`text-left mx-auto max-w-screen-xl flex flex-col lg:flex-row lg:items-center`}
    padding: 4rem 1rem;
`;

const SliderContentBlock = styled.div`
    ${tw`text-left mx-auto max-w-screen-xl`}
    padding: 0 0.5rem;
`;

const Prim = styled.span`
    ${tw`text-center md:text-left font-bold`}
    color: #0ABD19;
    font-size: 3rem;
    line-height: 1.2;
`;

const SmallStar = styled(Star)`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const LargerImage = styled.img`
    width: 100%;
    max-width: 600px;
    height: auto;
    margin-top: 20px;
`;

const GoalDescription = styled.p`
    ${tw`text-lg md:text-xl lg:text-2xl text-gray-700`}
    margin-top: 20px;
`;

const ResponsiveImage = styled.img`
    width: 100%;
    max-width: 800px;
    height: auto;
    ${tw`mx-auto`}
`;

const MarqueeContainer = styled.div`
    ${tw`w-full py-4 bg-white`} 
    overflow: hidden;
    position: relative;
`;

const MarqueeInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200%; /* Double the width for continuous scroll */
    animation: marquee 20s linear infinite;

    @keyframes marquee {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-50%); /* Move half of the width to loop */
        }
    }
`;

const PartnerLogo = styled.img`
    ${tw`mx-12`} /* Increased spacing between images */
    width: 100px;
    height: auto;
`;

const AlemLogo = styled.img`
    ${tw`mx-12`} /* Increased spacing between images */
    width: 200px;
    height: auto;
`;

const USPSLogo = styled.img`
    ${tw`mx-12`} /* Increased spacing between images */
    width: 200px;
    height: auto;
`;


export default () => {
    return (
        <AnimationRevealPage>
            <Header roundedHeaderButton={true}/>

            <Explanation/>
            <SectionContainer>
                <SliderContentBlock>
                    <Slider images={['Slide1', 'Slide2']} showDecoratorBlob={false}/>
                    {/*<Slider2 images={['Slide1', 'Slide2']} showDecoratorBlob={false}/>*/}
                </SliderContentBlock>
            </SectionContainer>
            <CenteredContainer>
                <Heading style={{ marginBottom: '150px' }}>Наши партнеры</Heading>
            </CenteredContainer>
            <MarqueeContainer>
                <MarqueeInner>
                    <AlemLogo src={Alemtat} alt="Alemtat"/>
                    <PartnerLogo src={DHL} alt="DHL"/>
                    <PartnerLogo src={FedEX} alt="FedEx"/>
                    <PartnerLogo src={Ups} alt="UPS"/>
                    <USPSLogo src={USPS} alt="USPS"/>
                    <img
                        src={Cdek}
                        style={{marginLeft: '3rem', marginRight: '3rem', width: '200px', height: 'auto'}}
                    />

                    <AlemLogo src={Alemtat} alt="Alemtat"/> {/* Duplicated logos */}
                    <PartnerLogo src={DHL} alt="DHL"/>
                    <PartnerLogo src={FedEX} alt="FedEx"/>
                    <PartnerLogo src={Ups} alt="UPS"/>
                    <USPSLogo src={USPS} alt="USPS"/>
                </MarqueeInner>
            </MarqueeContainer>
            <Offerings
                heading={<>Что мы предлагаем для наших клиентов:</>}
                imageSrc={prototypeIllustrationImageSrc}
                showDecoratorBlob={false}
                features={[
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Дешевые и фиксированные тарифы доставки</Description>
                            </FeatureItem>
                        ),
                    },
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Отсутствие скрытых комиссий и дополнительных платежей</Description>
                            </FeatureItem>
                        ),
                    },
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Понятные и простые правила расчета посылок</Description>
                            </FeatureItem>
                        ),
                    },
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Выкуп товаров в других странах и доставка по всему Казахстану, даже в самые удаленные города</Description>
                            </FeatureItem>
                        ),
                    },
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Различные способы оплаты для максимального удобства наших клиентов</Description>
                            </FeatureItem>
                        ),
                    },
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Большой выбор дополнительных услуг</Description>
                            </FeatureItem>
                        ),
                    },
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Индивидуальное консультирование по всем вопросам</Description>
                            </FeatureItem>
                        ),
                    },
                    {
                        description: (
                            <FeatureItem>
                                <SmallStar />
                                <Description>Гарантия быстрой и качественной доставки</Description>
                            </FeatureItem>
                        ),
                    },
                ]}
            />
            <Footer/>
        </AnimationRevealPage>
    );
};


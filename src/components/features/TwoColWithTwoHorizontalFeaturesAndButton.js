import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import {SectionHeading, Subheading as SubheadingBase} from "../misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "../misc/Buttons";
import {ReactComponent as BriefcaseIcon} from "feather-icons/dist/icons/briefcase.svg";
import {ReactComponent as MoneyIcon} from "feather-icons/dist/icons/dollar-sign.svg";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto items-center `;

const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = styled(Column)`
    ${tw`md:w-6/12 flex-shrink-0 relative mt-8`}
 
    order: 1; /* На всех устройствах по умолчанию первый */
margin-top: 170px;
    @media (min-width: 768px) {
        order: 1; /* На десктопах также первый */
    }
`;



const TextColumn = styled(Column)((props) => [
    tw`md:w-6/12 mb-10 md:mb-0`, // Основные отступы и ширина

    props.textOnLeft
        ? tw`md:mr-8 lg:mr-10 md:order-first order-2` // Если текст слева
        : tw`md:ml-8 lg:ml-10 md:order-last order-2`, // Если текст справа
    css`
        
        @media (max-width: 768px) {
            order: 1; /* На мобильных устройствах идет первым */
            margin-top: 10px; /* Немного ниже на мобильных */
        }

        @media (min-width: 768px) {
            margin-top: 30px; /* На десктопах чуть больше */
        }

        @media (min-width: 1024px) {
            margin-top: 60px; /* На больших экранах увеличен отступ */
        }
    `
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left `;




const Heading = tw(
    SectionHeading
)`mt-6 font-black  text-3xl  sm:text-4xl lg:text-5xl text-center md:text-left leading-tight md:leading-normal`;
const Description = tw.p`text-left text-base xl:text-xl my-2 lg:my-4 text-gray-700 leading-relaxed `;


const FeatureHeadingContainer = tw.div`
  flex items-center mt-2 mb-2
`;

const FeatureIconContainer = styled.div`
    ${tw`flex items-center justify-center w-12 h-12 text-white text-2xl   font-semibold rounded-full`}
    margin-right: 1rem; /* Уменьшаем отступ справа от иконки */
`;


const Features = tw.div`flex flex-col gap-8 mt-12`;

const Feature = tw.div`flex flex-row items-start gap-6`;

const StepNumber = styled.div`
    ${tw`font-bold text-4xl text-[#0ABD19]`}
    min-width: 50px; /* Фиксированная ширина для выравнивания */
`;

const FeatureContent = tw.div`flex flex-col`;

const FeatureHeading = tw.div`font-extrabold text-2xl  mb-2`;

const FeatureDescription = tw.div`text-base xl:text-xl  text-gray-700 leading-relaxed`;



const defaultFeatures = [
    {
        Icon: BriefcaseIcon,
        title: "Professionalism",
        description: "We have the best professional marketing people across the globe just to work with you.",
        iconContainerCss: tw`bg-teal-300 text-teal-800`
    },
    {
        Icon: MoneyIcon,
        title: "Affordable",
        description: "We promise to offer you the best rate we can - at par with the industry standard.",
        iconContainerCss: tw`bg-red-300 text-red-800`
    }
];

export default ({
                    subheading = "",
                    heading = (
                        <>
                            Designed & Developed by <span tw="text-primary-500">Professionals.</span>
                        </>
                    ),
                    textOnLeft = true,
                    features = null,

                }) => {
    if (!features) features = defaultFeatures;

    return (
        <Container>
            <TwoColumn>
                <ImageColumn>
                    <Features>
                        {features.map((feature, index) => (
                            <Feature key={index}>
                                <StepNumber>{(index + 1).toString().padStart(2, '0')}</StepNumber>
                                <FeatureContent>
                                    <FeatureHeading>{feature.title}</FeatureHeading>
                                    <FeatureDescription>{feature.description}</FeatureDescription>
                                </FeatureContent>
                            </Feature>
                        ))}
                    </Features>





                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>

                        <Heading>{heading}</Heading>
                        <Description>
                            <span style={{color: "#0ABD19"}}>Eparcel</span> - Ваш надежный мейлфорвард — с собственными
                            методами доставки и удобными автоматизированными складами.
                        </Description>
                        <Description>
                            <span style={{color: "#0ABD19"}}>Доставка</span> - товаров из-за границы — наша основная
                            деятельность, сотни тысяч клиентов из Казахстана получают свои покупки благодаря нам.
                        </Description>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
    );
};

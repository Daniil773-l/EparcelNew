import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import {SectionHeading, Subheading as SubheadingBase} from "../misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "../misc/Buttons";
import {ReactComponent as BriefcaseIcon} from "feather-icons/dist/icons/briefcase.svg";
import {ReactComponent as MoneyIcon} from "feather-icons/dist/icons/dollar-sign.svg";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-8 md:py-10 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = styled(Column)`
    ${tw`md:w-6/12 flex-shrink-0 relative mt-8 order-2`} /* По умолчанию идет второй */ @media (
    max-width: 768px) {
    order: 2; /* На мобильных устройствах остается второй */
}

    @media (min-width: 768px) {
        order: 1; /* На десктопах идет первым */
    }
`;


const TextColumn = styled(Column)(props => [
    tw`md:w-6/12 mb-10 md:mb-0`, // Убираем лишние отрицательные отступы
    props.textOnLeft
        ? tw`md:mr-8 lg:mr-10 md:order-first order-2` // На десктопе остается слева
        : tw`md:ml-8 lg:ml-10 md:order-last order-2`, // На десктопе справа
    css`
        @media (max-width: 768px) {
            order: 1; /* На мобильных устройствах идет первым */
        }
    `
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left `;




const Heading = tw(
    SectionHeading
)`mt-6 font-black text-3xl  text-black sm:text-4xl lg:text-5xl text-center md:text-left leading-tight md:leading-normal`;

const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-xl font-medium leading-relaxed text-secondary-100`;

const Features = tw.div`mx-auto md:mx-0 flex flex-col lg:flex-col max-w-xs lg:max-w-none w-full`;

const Feature = tw.div`mt-6 lg:mt-4 flex items-center md:items-start flex-col md:mr-8 last:mr-0`;

const FeatureHeadingContainer = tw.div`
    flex items-center mt-2 mb-2
`;
const FeatureIconContainer = styled.div`
    ${tw`flex items-center justify-center w-12 h-12 text-white text-2xl   font-semibold rounded-full`}
    margin-right: 1rem; /* Уменьшаем отступ справа от иконки */
`;

const FeatureHeading = tw.div`ml-3 font-bold text-3xl`;

const FeatureDescription = styled.div`
    ${tw`mt-1 text-center md:text-left text-gray-600 leading-relaxed text-xl`}
    margin-left: 4rem; /* Сдвигаем описание ближе к тексту */
    max-width: 600px; /* Ограничиваем ширину */
`;


const StepNumber = styled.div`
    ${tw`font-semibold text-5xl leading-none text-[#0ABD19]`}
    min-width: 90px;
margin-top: 30px;'
`;


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
                                <FeatureHeadingContainer>
                                    <FeatureIconContainer>
                                        <StepNumber>{(index + 1).toString().padStart(2, '0')}</StepNumber>
                                    </FeatureIconContainer>
                                    <FeatureHeading>{feature.title}</FeatureHeading>
                                </FeatureHeadingContainer>
                                <FeatureDescription>{feature.description}</FeatureDescription>
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
                            <span style={{color: "#0ABD19"}}>Доставка</span> товаров из-за границы — наша основная
                            деятельность, сотни тысяч клиентов из Казахстана получают свои покупки благодаря нам.
                        </Description>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
    );
};

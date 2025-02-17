import React from "react";
import tw from "twin.macro";
import styled, {css} from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import TeamIllustrationSrc from "../../images/img/team-illustration-2.svg";

import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

import Calculator from "../../Pages/Mainpages/componets/calculator";


const Container = tw.div`relative mt-12`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto items-center  `;

const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`
  md:w-6/12 flex-shrink-0 relative z-10 
`;


const TextColumn = styled(Column)(({ textOnLeft }) => [
    tw`md:w-6/12 mt-0`, // Убираем верхний отступ
    textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`,
    css
    `
        margin-top: -100px;
    @media (max-width: 768px) {
      margin-top: 0; /* Убираем отступ сверху на мобильных устройствах */
    }
  `,

]);


const Image = styled.img(props => [
    props.imageRounded && tw`rounded`,
    props.imageBorder && tw`border`,
    props.imageShadow && tw`shadow`
]);



const TextContent = tw.div`lg:py-4 text-center md:text-left`; // Уменьшаем отступ сверху


const Subheading = styled(SubheadingBase)`
    ${tw`text-center md:text-left`}
    color: #0ABD19; // Set the color to bright green
  `;

const Heading = tw(
    SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-8 text-center md:text-left text-base xl:text-xl my-2 lg:my-4 text-gray-700`;

const Features = tw.div`mx-auto md:mx-0 flex flex-col lg:flex-col max-w-xs lg:max-w-none w-full`;

const Feature = tw.div`mt-10 lg:mt-8 flex items-center md:items-start flex-col md:mr-8 last:mr-0`;

const FeatureHeadingContainer = tw.div`flex items-center`;
const FeatureIconContainer = styled.div`
    ${tw`mx-auto inline-block border border-primary-500 text-primary-500 text-center p-2 flex-shrink-0`}
    svg {
      ${tw`w-6 h-6`}
    }
  `;

const FeatureHeading = tw.div`ml-3 font-bold text-xl`;

const FeatureDescription = tw.div`mt-4 text-center md:text-left text-gray-600 leading-relaxed`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
    tw`mt-12 text-sm inline-block mx-auto md:mx-0`,
    props.buttonRounded && tw`rounded-full`
]);

export default ({
                    subheading = "Our Expertise",
                    heading = (
                        <>
                            Designed & Developed by <span tw="text-primary-500">Professionals.</span>
                        </>
                    ),
                    description="Eparcel - Ваш надежный мейлфорвард — с собственными методами доставки и удобными автоматизированными складами.",
                    description1="Доставка товаров из-за границы — наша основная деятельность, сотни тысяч клиентов из России получают свои покупки благодаря нам.",
                    primaryButtonText = "Learn More",
                    primaryButtonUrl = "https://timerse.com",
                    imageSrc = TeamIllustrationSrc,
                    buttonRounded = true,
                    imageRounded = true,
                    imageBorder = false,
                    imageShadow = false,
                    showDecoratorBlob = false,
                    textOnLeft = true,
                    features = null,
                    iconRoundedFull = true,
                    iconFilled = true,
                    iconContainerCss = null
                }) => {
    // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

    /*
     * Change the features variable as you like, add or delete objects
     * `icon` must be a React SVG component. See how BriefcaseIcon is imported above. For a full list of available icons, see Feather Icons.
     */
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

    if (!features) features = defaultFeatures;

    return (
        <Container>
            <TwoColumn>
                <ImageColumn>
                    <Calculator />

                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        <Subheading>{subheading}</Subheading>
                        <Heading>{heading}</Heading>
                        <Description>
                            <span style={{ color: "#0ABD19" }}>Заказывайте</span> товары на наш склад, при необходимости мы переупакуем  посылки для снижения объемного веса и отправим Вам надежно упакованными.
                        </Description>
                        <Description>
                            <span style={{ color: "#0ABD19" }}>Калькулятор </span>
                    стоимости доставки товара поможет рассчитать стоимость доставки до Вашего города.
                        </Description>
                        


                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
    );
};

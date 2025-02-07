import React from "react";
import tw from "twin.macro";
import styled,{ css }  from "styled-components";

import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import TeamIllustrationSrc from "../../images/img/team-illustration-2.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;

// Изменение ширины колонки в зависимости от размера экрана
css`
    @media (max-width: 768px) {
        width: 100%;      // Колонка занимает 100% ширины на малых экранах
    }
`;

const TextColumn = styled(Column)(props => [
    tw`md:w-6/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.img(props => [
    props.imageRounded && tw`rounded`,
    props.imageBorder && tw`border`,
    props.imageShadow && tw`shadow`,
    css`
        width: 100%;      // Занимает всю доступную ширину
        height: auto;     // Высота изменяется пропорционально, сохраняя аспект изображения
        @media (max-width: 768px) {
            max-width: 100%; // Ограничивает максимальную ширину на малых экранах
        }
    `
]);



// Скрыть декоративные элементы на малых экранах, если они мешают восприятию контента
css`
    @media (max-width: 768px) {
        display: none;    // Скрывает декоративный элемент на малых экранах
    }
`;

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = styled(SubheadingBase)`
    ${tw`text-center md:text-left`}
    color: #0ABD19; // Set the color to bright green
`;

const Heading = tw(
    SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Features = tw.div`mx-auto md:mx-0 flex flex-col lg:flex-col max-w-xs lg:max-w-none w-full`;

const Feature = tw.div`mt-6 lg:mt-4 flex items-center md:items-start flex-col md:mr-8 last:mr-0`; // Reduced the margin-top

const FeatureHeadingContainer = tw.div`flex items-center`;

const FeatureHeading = tw.div`ml-3 font-bold text-xl`;

const FeatureDescription = tw.div`mt-2 text-center md:text-left text-gray-600 leading-relaxed`; // Reduced the margin-top


export default ({
                    subheading = "",
                    heading = (
                        <>
                            Designed & Developed by <span tw="text-primary-500">Professionals.</span>
                        </>
                    ),
                    description = "Eparcel - Выыаш надежный мейлфорвард — с собственными методами доставки и удобными автоматизированными складами.",
                    description1 = "Доставка товаров из-за границы — наша основная деятельность, сотни тысяч клиентов из Казахстана получают свои покупки благодаря нам.",
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

            title: "Professionalism",
            description: "We have the best professional marketing people across the globe just to work with you.",
            iconContainerCss: tw`bg-teal-300 text-teal-800`
        },
        {

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
                    <Image src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded} />
                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        <Subheading>{subheading}</Subheading>
                        <Heading>{heading}</Heading>

                        <Features>
                            {features.map((feature, index) => (
                                <Feature key={index}>
                                    <FeatureHeadingContainer>
                                        <FeatureHeading>{feature.title}</FeatureHeading>
                                    </FeatureHeadingContainer>
                                    <FeatureDescription>{feature.description}</FeatureDescription>
                                </Feature>
                            ))}
                        </Features>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
    );
};

import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import Header from '../../components/headers/light';
import Footer from "../../components/footers/MainFooterWithLinks";


import Calculator from "../Mainpages/componets/calculator";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
    tw`md:w-6/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);




const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = styled(SubheadingBase)`
    ${tw`text-center md:text-left`}
    color: #0ABD19; // Set the color to bright green
  `;

const Heading = tw(
    SectionHeading
)`mt-4  text-left text-3xl sm:text-3xl lg:text-4xl text-center md:text-left leading-tight`;


const Description = tw.p`mt-8 text-center md:text-left text-sm md:text-base lg:text-2xl font-medium leading-relaxed text-secondary-500`;





export default ({
                    subheading = "",
                    heading = (
                        <>
                            Калькулятор доставки
                        </>
                    ),


                    textOnLeft = true,
                    features = null,

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
        <>
            <AnimationRevealPage>
                <Header/>
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
                                    <span style={{ color: "#0ABD19" }}>Заказывайте</span> товары на наш склад, при необходимости мы переупаковываем посылки для снижения веса и отправляем вам надежно упакованными.
                                </Description>
                                <Description>
                                    <span style={{ color: "#0ABD19" }}>Онлайн калькулятор</span> стоимости доставки товара поможет рассчитать приблизительную стоимость доставки.
                                </Description>


                            </TextContent>
                        </TextColumn>
                    </TwoColumn>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>

    );
};

import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line

import Header from "../../../components/headers/light";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight`}
    color: rgb(36 62 99 / var(--tw-text-opacity));
    margin-bottom: 50px; /* Увеличение отступа между заголовком и абзацем */
`;

const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;



const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)





const FAQSection = ({ heading, paragraph, imageSrc, roundedHeaderButton }) => {
    return (
        <>
            <Header roundedHeaderButton={roundedHeaderButton} />
            <Container>
                <TwoColumn>
                    <LeftColumn>
                        <Heading>{heading}</Heading>
                        <Paragraph>{paragraph}</Paragraph>
                    </LeftColumn>
                    <RightColumn>
                        <IllustrationContainer>
                            <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={imageSrc} alt="Design Illustration" />
                        </IllustrationContainer>
                    </RightColumn>
                </TwoColumn>
            </Container>
        </>
    );
};

export default FAQSection;

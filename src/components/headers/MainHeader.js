import React from "react";
import styled, { css } from "styled-components";



import tw from "twin.macro";
//eslint-disable-next-line

import Header from "../../components/headers/light";


const Container = styled.div`
    ${tw`relative`}
    background-color: #e2ffe2;!important;  /* Set background color */
`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto `;


const LeftColumn = tw.div`relative lg:w-6/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;

const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`}
    margin-bottom: 20px; // Уменьшили отступ между заголовком и параграфом
`;

const Paragraph = tw.p`my-2 lg:my-4 text-base xl:text-lg`; // Уменьшили вертикальные отступы для параграфа



const IllustrationContainer = styled.div`
    ${tw`flex justify-center lg:justify-end items-center`}


    img {
      // Ограничиваем высоту
      width: auto;
      height: auto;
     
    }
   
  `;

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
                            <img tw="min-w-0 w-11/12 max-w-lg xl:max-w-3xl" src={imageSrc} alt="Design Illustration" />
                        </IllustrationContainer>
                    </RightColumn>
                </TwoColumn>
            </Container>
        </>
    );
};

export default FAQSection;

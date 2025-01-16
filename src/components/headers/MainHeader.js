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
    ${tw`font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight`}
    /* Центрируем текст на маленьких экранах */
    margin-bottom: 20px;

    @media (max-width: 768px) {
        ${tw`text-2xl`} /* Уменьшаем размер текста для планшетов */
    }

    @media (max-width: 480px) {
        ${tw`text-xl`} /* Ещё меньше для мобильных устройств */
    }
`;

const Paragraph = styled.p`
    ${tw`text-base xl:text-lg my-2 lg:my-4 text-gray-700`}
   
    margin: 0 auto;

    @media (max-width: 768px) {
        ${tw`text-sm`} /* Уменьшаем текст на планшетах */
    }

    @media (max-width: 480px) {
        ${tw`text-xs`} /* Минимальный размер текста на мобильных устройствах */
    }
`;




const IllustrationContainer = styled.div`
    ${tw`flex justify-center lg:justify-end items-center`}


    img {
      // Ограничиваем высоту
      width: auto;
      height: auto;
        object-fit: contain;
        @media (max-width: 768px) {
            max-width: 100%; /* Растягиваем на всю ширину экрана на планшетах */
        }

        @media (max-width: 480px) {
            max-width: 90%; /* Немного уменьшаем ширину на мобильных устройствах */
        }
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

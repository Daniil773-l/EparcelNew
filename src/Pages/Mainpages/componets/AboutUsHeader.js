import React  from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

// eslint-disable-next-line

import Header from "../../../components/headers/light.js";

import DesignIllustration from "../../../images/img/о нас.png";
import { getAuth } from "firebase/auth";


const Container = styled.div`
    ${tw`relative`}
    background-color: #e2ffe2;!important;  /* Set background color */
`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-2 md:py-2`;
const LeftColumn = tw.div`relative lg:w-6/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;

const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl  leading-tight`}
    margin-bottom: 20px; // Уменьшили отступ между заголовком и параграфом
`;

const Paragraph = tw.p`my-2 lg:my-4 text-base xl:text-lg`; // Уменьшили вертикальные отступы для параграфа


const Actions = styled.div`
    ${tw`relative max-w-md text-center mx-auto lg:mx-0`}

    input {
        ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-[225px] font-medium focus:outline-none transition duration-300`}
    }

    input:hover,
    input:focus {
        border-color: #0ABD19;
    }

    button {
        ${tw`w-[220px] sm:absolute right-0 top-0 bottom-0 bg-green-500 text-white font-bold my-4 sm:my-2 rounded-full py-5 flex items-center justify-center sm:leading-none focus:outline-none transition duration-300`}
        background-color: #0ABD19;
        border: none;
        margin-right: 220px; /* Сдвигаем кнопку левее */
    }

    button:hover,
    button:focus {
        transform: scale(1.1);
    }
`;


const IllustrationContainer = styled.div`
    ${tw`flex justify-center lg:justify-end items-center`}


    img {
      // Ограничиваем высоту
      width: auto;
      height: auto;
     
    }
   
  `;

// Random Decorator Blobs (shapes that you see in background)




export default ({ roundedHeaderButton }) => {
    const navigate = useNavigate(); // Используйте useNavigate
    const auth = getAuth();
    const user = auth.currentUser; // Получите текущего пользователя

    const handleGetAddressClick = () => {
        if (user) {
            navigate("/PersonalArea"); // Перенаправление на PersonalArea, если пользователь авторизован
        } else {
            navigate("/Login"); // Перенаправление на Login, если не авторизован
        }
    };

    return (
        <>
            <Header roundedHeaderButton={roundedHeaderButton} />
            <Container>
                <TwoColumn>
                    <LeftColumn>
                        <Heading>Eparcel – самый выгодный</Heading>
                        <Paragraph>
                            Оказание качественных услуг, быстрая и надежная доставка посылок с товарами по минимальной стоимости для наших клиентов по минимальной стоимости для наших клиентов – главная цель Eparcel.
                        </Paragraph>
                        <Actions>
                            <button onClick={handleGetAddressClick}>Получить адрес</button>
                        </Actions>
                    </LeftColumn>
                    <RightColumn>
                        <IllustrationContainer>
                            <img tw="min-w-0 w-11/12 max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
                        </IllustrationContainer>
                    </RightColumn>
                </TwoColumn>

            </Container>
        </>
    );
};

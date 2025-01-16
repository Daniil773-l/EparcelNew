import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Header from "../../components/headers/MainCabinetHeader";
import { FaWarehouse } from "react-icons/fa";

import AnimationRevealPage from "../../components/helpers/AnimationRevealPage"; // Ensure you have the search icon SVG file
import Footer from "../../components/footers/MainFooterWithLinks";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import warehouseIcon from "../../images/img/warehouse.png"; // Импортируем PlusIcon

const Container = styled.div`
    ${tw`relative w-full`}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;

const InfoContainer = styled.div`
    ${tw`flex w-full items-center justify-start gap-2 mt-4`};
    padding-left: 0;  // Убираем лишние отступы слева
    padding-right: 0; // Убираем отступы справа
    margin-left: 0;   // Убираем отступы слева
    margin-right: 0;  // Убираем отступы справа
    margin-bottom: 10px;  // Добавляем небольшой отступ снизу
`;

const InfoBox = styled.div`
    ${tw`flex items-center justify-between bg-white shadow-md rounded-lg p-2`}
    border: 1px solid #0ABD19;
    width: auto;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    background-color: ${(props) => (props.isHighlighted ? "#EBFAE5" : "white")};
`;

const InfoText = styled.span`
    ${tw`text-gray-600`}
`;

const IconButton = styled.a`
    ${tw`ml-4 bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    background-color: #0ABD19;
    border: none;
    margin-left: auto; // Automatically push the button to the end
    margin-top: 0; // Remove top margin
    width: 20px; // Set button width
    height: 20px; // Set button height

    &:hover, &:focus {
        transform: scale(1.1);
    }
`;

const BaseButtonStyles = css`
    ${tw`px-6 py-2 font-semibold rounded-lg shadow-md bg-white text-lg text-gray-600`}
    ${tw`h-10 w-full sm:w-auto`}
    ${tw`m-2`}
    border: 2px solid #0ABD19;

    &:hover {
        ${tw`text-black bg-green-200`}
    }

    &:focus {
        ${tw`text-black bg-green-200`}
    }
`;

const TwoColumn = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-start max-w-screen-xl mx-auto py-20 md:py-24`}
`;

const LeftColumn = styled.div`
    ${tw`relative w-full text-left mx-auto`}
`;



const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-4xl leading-tight`}
    margin-bottom: 20px;
    color: #2D2D2D;
`;

const PrimaryButton = styled.button`
    ${BaseButtonStyles}
    ${({ selected }) =>
    selected &&
    css`
                ${tw`bg-green-200 border-green-600 text-black`}
            `}
`;

const ButtonContainer = styled.div`
    ${tw`flex flex-wrap items-center justify-start gap-4`}
    ${tw`p-0`} // Remove padding
    ${tw`sm:px-0 md:px-0 lg:px-0 xl:px-0`} // Ensure no extra padding
    ${tw`mt-8`} // Add top margin
`;



const InfoMessageBox = styled.div`
    ${tw`flex flex-col items-start p-4 bg-yellow-100 rounded-lg mt-8`}
    width: calc(100% - 2rem); // Adjust width to span full container with padding considered
    max-width: 100%; // Ensure it does not exceed container
    color: #333;
    background-color: #fffbe5;
    border: 1px solid #f5e1a4;
`;

const InfoMessageHeading = styled.h2`
    ${tw`text-lg font-bold mb-2`}
`;

const InfoMessageText = styled.p`
    ${tw`text-base`}
`;

const BottomButtonsContainer = styled.div`
    ${tw`flex justify-start gap-6 mt-8 sm:px-0 md:px-0 lg:px-0 xl:px-0`}
`;

const BottomButton = styled.button`
    ${tw`w-auto bg-green-500 text-white font-bold py-4 px-6 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    background-color: #0ABD19;
    border: none;

    &:hover, &:focus {
        transform: scale(1.1);
    }
`;

const Icon1 = styled(FaWarehouse)`
    ${tw`mr-2 text-green-1002 `} /* Добавляем отступ и цвет */
    width: 24px; /* Настраиваем размер */
    height: 24px;
`;


export default ({ roundedHeaderButton }) => {
    const [showFirstImage, setShowFirstImage] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState("США");
    const [selectedCategory, setSelectedCategory] = useState("Детский мир");

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirstImage((prev) => !prev); // Toggle between true and false
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <>
            <AnimationRevealPage>
                <Header roundedHeaderButton={roundedHeaderButton} />
                <Container>
                    <TwoColumn>
                        <LeftColumn>
                            <Heading>Доставленные посылки</Heading>
                          {/*  <ButtonContainer>
                                <PrimaryButton onClick={() => setSelectedCountry('Все склады')} selected={selectedCountry === 'Все склады'}>Все склады</PrimaryButton>
                                <PrimaryButton onClick={() => setSelectedCountry('США')} selected={selectedCountry === 'США'}>США</PrimaryButton>
                                <PrimaryButton onClick={() => setSelectedCountry('Турция')} selected={selectedCountry === 'Турция'}>Турция</PrimaryButton>
                            </ButtonContainer>*/}
                            <InfoContainer>
                                <InfoBox>
                                    <Icon1 />
                                    <InfoText>
                                        На складе:  6шт | 20$ | 20 кг
                                    </InfoText>
                                </InfoBox>
                                <IconButton href="#">
                                    <PlusIcon />
                                </IconButton>
                            </InfoContainer>
                            <InfoMessageBox>
                                <InfoMessageHeading>У Вас нет исходящих посылок!</InfoMessageHeading>
                                <InfoMessageText>Выберите товар, оформите доставку на адрес склада, добавьте посылку и в этом разделе Вы сможете отслеживать прибытие посылки на наш склад.</InfoMessageText>
                            </InfoMessageBox>
                            <BottomButtonsContainer>
                                <BottomButton>Добавить ожидаемую посылку</BottomButton>
                                <BottomButton>В профиль</BottomButton>
                            </BottomButtonsContainer>
                        </LeftColumn>
                    </TwoColumn>
                </Container>
                <Footer />
            </AnimationRevealPage>
        </>
    );
};

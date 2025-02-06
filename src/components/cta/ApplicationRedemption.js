import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import tw from "twin.macro";

// Import images
import FlyAfter from "../../images/img/flyafter.svg";
import Receive from "../../images/img/receive.svg";

const Container = tw.div`relative bg-[ #e2ffe2] text-gray-900 max-w-screen-xl mx-auto rounded-lg`;
const Content = tw.div`flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto py-12 mb-20`; // Added bottom margin

const IllustrationContainer = styled.div`
    ${tw`flex justify-center items-center w-full md:w-1/3`}
    img {
        width: 350px;
        height: auto;
    }
`;

const TextContainer = tw.div`flex flex-col items-center text-center md:w-1/3`;

const Heading = styled.h1`
    ${tw`font-bold text-4xl text-gray-900 my-4`}
`;

const Paragraph = styled.p`
    ${tw`text-lg text-gray-900 mb-4 `}
`;

const StyledLink = styled(Link)`
    color: #0ABD19; // Sets the initial and visited link color to green
    text-decoration: none;

    &:visited {
        color: #0ABD19; // Keeps the color green even after the link has been visited
    }
    &:hover {
        color: #0ABD50; // Lighter green on hover
    }
`;

const ActionButton = styled.button`
    ${tw`bg-green-500 text-white font-bold py-4 px-8 rounded-full focus:outline-none transition-transform duration-300 hover:scale-110`}
    background-color: #0ABD19;
    &:hover {
        background-color: #0ABD50;
    }
`;

export default function PurchasePage() {
    return (
        <Container>
            <Content>
                <IllustrationContainer>
                    <img src={Receive} alt="Shopping illustration" />
                </IllustrationContainer>
                <TextContainer>
                    <Heading>Выкуп товаров</Heading>
                    <Paragraph>
                        Чтобы оставить заявку на выкуп товаров, необходимо авторизоваться в
                        <StyledLink to="/Login"> личном кабинете</StyledLink>.
                    </Paragraph>
                    <StyledLink to="/Login">
                        <ActionButton>Войти в личный кабинет</ActionButton>
                    </StyledLink>
                </TextContainer>
                <IllustrationContainer>
                    <img src={FlyAfter} alt="Delivery illustration" />
                </IllustrationContainer>
            </Content>
        </Container>
    );
}

import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading, SectionSteps} from "../misc/Headings";



const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col items-center justify-center max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-128 max-w-md mx-auto md:max-w-none md:mx-0`;

const TextColumn = styled(Column)(props => [
    tw`md:w-6/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);




const TextContent = tw.div`lg:py-8 text-center`;


const Heading = tw(
    SectionSteps
)`mt-4 font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center leading-tight`;

const StepsContainer = styled.div`
    ${tw`mt-1 flex justify-center items-stretch flex-wrap`} // добавили flex-wrap
    gap: 1rem;
    width: 100%;

    @media (min-width: 1024px) {
        flex-wrap: nowrap;
        justify-content: center;
        padding: 0 1rem;
    }
`;



const Step = styled.div`
    ${tw`flex flex-col items-center relative`}
    background: #ffffff;
    border-radius: 12px;
    padding: 36px;
    margin: auto;
    width: 100%;
    min-width: 250px;
    flex: 1 1 100%; // 👈 добавили

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 100%;
        background-color: #0ABD19;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
    }

    @media (min-width: 768px) {
        flex: 1 1 calc(50% - 1rem); // 2 карточки в ряд
    }

    @media (min-width: 1024px) {
        flex: 1 1 calc(25% - 1rem); // 4 карточки в ряд
    }
`;




const StepNumber = styled.div`
    ${tw`font-semibold text-4xl leading-none text-[#0ABD19]`}
    margin-top: -25px;
    min-width: 60px;
    margin-bottom: 20px; /* Отступ между номером и заголовком */
`;
const StepText = styled.div`
    ${tw`flex flex-col flex-grow justify-between w-full text-center`} /* Растягиваем содержимое */
`;

const StepHeading = styled.h6`
    ${tw`text-xl font-bold leading-none`}
    margin: 0 0 12px 0;
    width: 100%;
    text-align: center;
`;

const StepDescription = styled.p`
    ${tw`text-base xl:text-xl my-2 lg:my-4 text-gray-700`}
    margin: 0 0 8px 0;
    width: 100%;
    text-align: center;
`;

export default ({

                    heading = (
                        <>
                            Как это <span tw="text-primary-500">работает?</span>
                        </>
                    ),

                    textOnLeft = true,
                    steps = null,

                }) => {

    const defaultSteps = [
        {
            heading: "РЕГИСТРАЦИЯ",
            description: "Зарегистрируйтесь на нашем сайте и получите адрес для доставки ваших покупок за рубежом"
        },
        {
            heading: "ПОКУПКА",
            description: "Заказывайте товары в зарубежных интернет-магазинах и отправляйте их к нам на склад"
        },
        {
            heading: "ОФОРМЛЕНИЕ",
            description: "Оформляйте доставку в Казахстан. Отправляйте товары из-за границы друзьям, клиентам или себе"
        },
        {
            heading: "ПОЛУЧЕНИЕ",
            description: "Получайте посылки в ПВЗ, постаматах или курьер доставит прямо домой"
        }
    ];

    if (!steps) steps = defaultSteps;

    return (
        <Container>
            <TwoColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        <Heading>{heading}</Heading>
                        <StepsContainer>
                            {steps.map((step, index) => (
                                <Step key={index} style={{ borderRight: index === 3 ? '10px solid #0ABD19' : undefined }}>
                                    <StepNumber>{(index + 1).toString().padStart(2, '0')}</StepNumber>
                                    <StepText>
                                        <StepHeading>{step.heading}</StepHeading>
                                        <StepDescription>{step.description}</StepDescription>
                                    </StepText>
                                </Step>
                            ))}
                        </StepsContainer>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
    );
};

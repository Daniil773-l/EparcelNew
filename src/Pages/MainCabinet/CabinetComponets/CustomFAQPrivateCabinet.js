import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../../../components/misc/Headings.js";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as MinusIcon } from "feather-icons/dist/icons/minus.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto `;

const TwoColumn = tw.div`flex flex-col items-center`;
const Column = tw.div`w-full`;

const FAQContent = styled.div`
    ${tw`lg:ml-6 w-full`}
`;

const Subheading = tw(SubheadingBase)`mb-4 text-center lg:text-left`;
const HeadingContainer = tw.div`flex flex-col items-center justify-center w-full text-center`;

const Heading = styled(SectionHeading)`
    ${tw`text-center text-3xl lg:text-4xl`} /* Удалена привязка к lg:text-left */
    span {
        ${tw`text-green-1002`}
    }
`;


const FAQSContainer = tw.dl`mt-12 w-full`;
const FAQ = styled.div`
    ${tw`cursor-pointer mt-8 select-none border lg:border-0 px-8 py-4 lg:p-0 rounded-lg lg:rounded-none`}
    @media (max-width: 768px) {
        ${tw`px-4 py-2`} /* Reduce padding for mobile */
    }
`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = styled.span`
    ${tw`text-lg lg:text-xl font-semibold`}
    @media (max-width: 768px) {
        ${tw`text-base`} /* Reduce text size for mobile */
    }
`;
const QuestionToggleIcon = styled.span`
    ${tw`ml-2 text-gray-100 p-2 rounded-full group-hover:text-gray-200 transition duration-300`}
    background-color: #0ABD19;
    width: 32px; /* Ensure width and height are equal */
    height: 32px; /* Ensure width and height are equal */
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        ${tw`w-6 h-6`} /* Increased size of the plus/minus icons */
    }
`;
const Answer = motion(tw.dd`pointer-events-none mt-4 text-base xl:text-lg my-2 lg:my-4 text-gray-700  leading-relaxed `);

export default ({
                    subheading = "",
                    heading = "Ответы на популярные вопросы",
                    faqs = null
                }) => {
    const defaultFaqs = [
        {
            question: "Я никогда не заказывал товары в США или Турции и не понимаю, как это сделать?",
            answer: "Если Вы не заказывали товары из-за границы и не знаете, как это сделать, то советуем Вам воспользоваться нашей услугой «Выкуп товаров». Вам нужно зайти в свой личный кабинет и в разделе «Выкуп товаров» нажать на кнопку «Добавить заявку», заполнить необходимую информацию о товаре и нажать на кнопку «Отправить заявку». Далее наш специалист проверит заявку и подтвердит возможность выкупа товара. После этого Вам нужно будет оплатить стоимость товара и дождаться, когда выкупленный товар доставят нам на склад. Затем оформить доставку до Вашего адреса в Казахстане."
        },
        {
            question: "Какие сроки доставки из США в Казахстан?",
            answer: "На сегодняшний день сроки доставки до Казахстана из США составляют 15-25 дней и 5-10 дней из Турции. В ближайшее время планируется сократить сроки доставки из США в Казахстан до 10-15 дней."
        },
        {
            question: "Какие товары можно заказывать?",
            answer: "Наша компания доставляет любые товары, не запрещенные для ввоза на территорию страны. С подробным списком запрещенных товаров Вы можете ознакомиться на нашем сайте."
        },
        {
            question: "Могу ли я заказать сумки, косметику, парфюмерию, электронику?",
            answer: "Да! Мы доставляем косметику, парфюмерию, мисты, одежду, обувь, сумки и многое другое, что не запрещено для ввоза законодательством."
        },
        {
            question: "Где и как я могу получить свою посылку?",
            answer: "При оформлении доставки посылки Вам будет предложено выбрать метод доставки: постамат, курьерская доставка или ПВЗ. Как только Ваша посылка будет доставлена на территорию Казахстана, посылка сразу же будет передана в выбранную Вами службу доставки."
        },
        {
            question: "Какой максимальный вес посылки?",
            answer: "Максимальный вес посылки не должен превышать 31 кг. В случае превышения нормы дополнительно уплачивается пошлина в размере 2 евро за каждый дополнительный кг."
        }
    ];

    if (!faqs || faqs.length === 0) faqs = defaultFaqs;

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const toggleQuestion = questionIndex => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };

    return (
        <Container>
            <Content>
                <TwoColumn>
                    <Column>
                        <FAQContent>
                            {subheading && <Subheading>{subheading}</Subheading>}
                            <HeadingContainer>
                                <Heading>
                                    <span>Ответы</span> на популярные вопросы
                                </Heading>
                            </HeadingContainer>
                            <FAQSContainer>
                                {faqs.map((faq, index) => (
                                    <FAQ
                                        key={index}
                                        onClick={() => {
                                            toggleQuestion(index);
                                        }}
                                        className="group"
                                    >
                                        <Question>
                                            <QuestionText>{faq.question}</QuestionText>
                                            <QuestionToggleIcon>
                                                {activeQuestionIndex === index ? <MinusIcon /> : <PlusIcon />}
                                            </QuestionToggleIcon>
                                        </Question>
                                        <Answer
                                            variants={{
                                                open: { opacity: 1, height: "auto", marginTop: "16px" },
                                                collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                                            }}
                                            initial="collapsed"
                                            animate={activeQuestionIndex === index ? "open" : "collapsed"}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            {faq.answer}
                                        </Answer>
                                    </FAQ>
                                ))}
                            </FAQSContainer>
                        </FAQContent>
                    </Column>
                </TwoColumn>
            </Content>
        </Container>
    );
};

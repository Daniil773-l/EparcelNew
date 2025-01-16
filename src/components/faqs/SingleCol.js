import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";


import { Container, ContentWithPaddingXl } from "../misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";

const Column = tw.div`flex flex-col items-center`;
const FAQSContainer = tw.dl`max-w-4xl relative mt-0`;
const FAQ = tw.div`cursor-pointer select-none mt-5 sm:px-10 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300 rounded-full`}
  svg {
    ${tw`w-4 h-4`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-lg sm:text-base leading-relaxed`);

const Heading = styled.h1`
  ${tw`text-3xl sm:text-4xl font-extrabold text-center mt-10`}
`;

const Subheading = styled.h2`
  ${tw`text-lg sm:text-xl font-semibold text-center mt-2 mb-8`}
`;

const Description = styled.p`
  ${tw`text-center text-gray-600 mb-12`}
`;

export default ({
                    subheading = "FAQs",
                    heading = "У Вас остались вопросы? ",
                    description = "Эта страница поможет разобраться с каждым этапом доставки из-за рубежа в Казахстан",
                    faqs = [
                        {
                            question: "Is lunch provided free of cost?",
                            answer:
                                "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system."
                        },
                        {
                            question: "Do you have 2 Bedroom suites?",
                            answer:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        },
                        {
                            question: "Are Wi-Fi costs included in the price?",
                            answer:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        },
                        {
                            question: "Where can I reach you for support?",
                            answer:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        }
                    ]
                }) => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const toggleQuestion = questionIndex => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };

    return (
        <Container>
            <ContentWithPaddingXl>
                <Column>
                    <Subheading>{subheading}</Subheading>
                    <Heading>{heading}</Heading>
                    <Description>{description}</Description>
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
                                    <QuestionToggleIcon
                                        variants={{
                                            collapsed: { rotate: 0 },
                                            open: { rotate: -180 }
                                        }}
                                        initial="collapsed"
                                        animate={activeQuestionIndex === index ? "open" : "collapsed"}
                                        transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <ChevronDownIcon />
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
                </Column>
            </ContentWithPaddingXl>
        </Container>
    );
};

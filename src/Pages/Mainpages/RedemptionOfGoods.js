import React from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Header from "./componets/RedemptionOfGoodsHeader";
import FeatureWithSteps from "../../components/features/HowDoesItWorkPage5";
import Footer from "../../components/footers/MainFooterWithLinks";
import Explanation from "../../components/cards/JustExplanation";
import SectionApplication from "../../components/cta/ApplicationRedemption";
import "./componets/IncludedServicesSectionTariff.css";
import tw from "twin.macro";
import styled from "styled-components";
import Step1 from "../../images/img/Step1.svg";
import Step2 from "../../images/img/Step2.svg";
import Step3 from "../../images/img/PacageWoman.svg";

export default () => {
    const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
    const HighlightedText = tw.span`text-primary-500`;

    const StepHighlight = styled.span`
        ${tw`text-primary-500 font-bold`} // Apply primary color and bold font
    `;

    const Prim = styled.span`
        ${tw`text-center text-primary-500 md:text-left text-xl`} // Base styles from twin.macro
        color: #0ABD19; // Setting desired color explicitly
    `;

    return (
        <AnimationRevealPage>
            <Header roundedHeaderButton={true}/>
            <Explanation></Explanation>
            <FeatureWithSteps
                heading={
                    <>
                        Как это работает?
                    </>
                }
                plans={[
                    {
                        icon: Step1,
                        mainFeature: (
                            <>
                                <Prim>Шаг 1:</Prim> Вы находите товар и заполняете форму выкупа
                            </>
                        ),
                    },
                    {
                        icon: Step2,
                        mainFeature: (
                            <>
                                <Prim>Шаг 2:</Prim> Наша компания самостоятельно выкупает товар
                            </>
                        ),
                    },
                    {
                        icon: Step3,
                        mainFeature: (
                            <>
                                <Prim>Шаг 3:</Prim> Мы принимаем товар, упаковываем и доставляем Вам
                            </>
                        ),
                    },
                ]}
            />
            <SectionApplication></SectionApplication>
            <Footer/>
        </AnimationRevealPage>
    );
};

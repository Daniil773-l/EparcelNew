import React from "react";
import tw from "twin.macro";



import Header from '../../components/headers/light';
import Footer from "../../components/footers/MainFooterWithLinks";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import CustomsDutyCalculator from "../Mainpages/componets/customsDutyCalculator";

const Container = tw.div`relative pt-16 `;

const DutyCalculator = ({
                            subheading = "", heading = (
        <>
            Заказали на сумму более €200 евро? <span tw="text-primary-500"></span> Рассчитайте стоимость таможенной
            пошлины заранее!
        </>
    ), textOnLeft = true
                        }) => {


    return (
        <>
            <AnimationRevealPage>
                <Header/>
                <Container>
                    <CustomsDutyCalculator/>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>

    );
};

export default DutyCalculator;

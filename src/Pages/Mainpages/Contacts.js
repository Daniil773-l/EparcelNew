import React from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage.js";
import Header from "../../components/headers/light.js";
import Footer from "../../components/footers/MainFooterWithLinks";
import ContactUsForm from "./componets/ContactUsForm";


export default () => {
    return (
        <AnimationRevealPage>
            <Header/>
            <ContactUsForm/>
            <Footer/>
        </AnimationRevealPage>
    );
};

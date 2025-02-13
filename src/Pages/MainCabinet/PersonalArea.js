import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Header from "../../components/headers/MainCabinetHeader";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from "../../components/footers/MainFooterWithLinks";
import ProfileCard from "./CabinetComponets/ProfileCard";
import IncomingPackagesCard from "./CabinetComponets/IncomingPackagesCard";
import OutgoingPackagesCard from "./CabinetComponets/OutgoingPackagesCard";
import RedemptionCard from "./CabinetComponets/RedemptionOfGoodsCard";
import FAQ from "./CabinetComponets/CustomFAQPrivateCabinet";
import WarehouseServiceCard from "./CabinetComponets/WarehouseServicesCard"; // Import the new card
import TopUpCard from "./CabinetComponets/TopUpCard";
import CursCard from "./CabinetComponets/CursCard";

const Container = styled.div`
    ${tw`relative w-full min-h-screen`}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;

const TwoColumn = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-start max-w-screen-xl mx-auto py-20 md:py-24`}
`;

const LeftColumn = styled.div`
    ${tw`relative w-full text-left mx-auto`}
`;

const Banner = styled.div`
    ${tw`w-full text-secondary-600 text-xl font-medium py-8 mb-16 text-center`}
    background:   #DDF2E6;


    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 4px;
    }
`;

const BannerLink = styled.a`
    ${tw`text-green-1002`}
    text-decoration: none;
    cursor: pointer;
`;

const CardsContainer = styled.div`
    ${tw`grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto`}
    margin-top: 1px; /* Reduced top margin */
    @media (max-width: 768px) {
        ${tw`gap-2`}
    }
`;

const NavigationBanner = styled.div`
    ${tw`w-full py-8 mb-12 mt-10 text-center`}
    background:  #DDF2E6;
    font-size: 1rem;
    color: #2D2D2D;

    @media (max-width: 768px) {
        font-size: 0.5rem;
        padding: 4px;
    }
`;

const NavigationLinkContainer = styled.div`
    ${tw`flex justify-center`}
    
    @media (max-width: 768px) {
        ${tw`flex-col items-center `}
    }
`;

const NavigationLink = styled.a`

    ${tw`text-lg mx-6 my-0 font-medium tracking-wide transition duration-300 pb-1 text-secondary-600`}
    ${tw`hover:border-primary-500 hover:text-primary-500 focus:text-primary-500`}
    text-decoration: none;
   

    &:hover, &:focus {
        color: #0ABD19;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        ${tw`mx-0 my-2`} /* Убираем боковые отступы и добавляем вертикальные отступы на мобильных устройствах */
    }
`;
const NavigationLink1 = styled.a`
    font-family: 'SFUIText', sans-serif;
    ${tw`text-lg mx-6 my-0 font-medium tracking-wide transition duration-300 pb-1`}
    ${tw`hover:border-primary-500 hover:text-primary-500 focus:text-primary-500`}
    text-decoration: none;
    color: #0ABD19;

    &:hover, &:focus {
        color: #0ABD19;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        ${tw`mx-2`}
    }
`;

const PrimaryLink = styled(NavigationLink)`
    ${tw`lg:mx-0 px-8 py-3 rounded text-gray-100 hocus:text-gray-200 focus:shadow-outline rounded-full border-b-0`}
    background-color: #0ABD19;
    border: none;
    transition: background-color 0.3s ease;

    &:not(:hover):not(:focus) {
        animation: pulsate 1.5s infinite alternate;
    }

    &:hover, &:focus {
        background-color: #0ABD50;
        transform: scale(1.1);
    }
`;

const CardsContainer1 = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto mb-8`}
    margin-top: 46px; /* Reduced top margin */
    @media (max-width: 768px) {
        ${tw`gap-4`}
    }
`;

const PersonalCabinet = ({ roundedHeaderButton }) => {
    return (
        <>
            <AnimationRevealPage>
                <Header roundedHeaderButton={roundedHeaderButton} />
                <Container>
                    <TwoColumn>
                        <LeftColumn>
                            <ProfileCard />
                        </LeftColumn>
                    </TwoColumn>
                    <Banner>
                        Таможенный лимит 200 € / 31 кг на 1 посылку! <BannerLink href="/DutyCalculatorPage">Рассчитайте</BannerLink> размер таможенной пошлины прямо сейчас
                    </Banner>
                    <CardsContainer>
                        <IncomingPackagesCard />
                        <OutgoingPackagesCard />
                        <RedemptionCard />
                        <WarehouseServiceCard /> {/* Add the new card */}
                    </CardsContainer>
                    <NavigationBanner>
                        <NavigationLinkContainer>
                            <NavigationLink href="/ExpectedLink">Добавить посылку</NavigationLink>
                            <NavigationLink href="/CustomRegulations">Таможенные правила</NavigationLink>
                            <NavigationLink href="/DeliveryCalculator">Калькулятор доставки</NavigationLink>
                            <NavigationLink href="/ProhibitedProductsPage">Запрещенные товары к пересылке</NavigationLink>
                            <NavigationLink href="/Contacts">Задать вопрос</NavigationLink>
                        </NavigationLinkContainer>
                    </NavigationBanner>
                    <CardsContainer1>
                        <TopUpCard/>
                        <CursCard/>
                    </CardsContainer1>
                    <FAQ />
                </Container>
                <Footer />
            </AnimationRevealPage>
        </>
    );
};

export default PersonalCabinet;

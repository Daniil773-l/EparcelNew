import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import AnimationRevealPage from "../../../components/helpers/AnimationRevealPage";
import MainCabinetHeader from "../../../components/headers/MainCabinetHeader";
import Step1 from "./Step/step1";
import Step2 from "./Step/STEP2";
import Step3Backend from "./Step/STEP3";
import Step4and5Step from "./Step/Step4and5";
import Button from "./Step/Buttons";
import Footer from "../../../components/footers/MainFooterWithLinks";
const PageContainer = styled.div`
    ${tw`min-h-screen flex flex-col`};
`;

const ExpectedLink = () => {
    const [paymentData, setPaymentData] = useState({
        totalCostUSD: 0,
        totalCostKZT: 0,
        insuranceAmount: 0,
        customDutyKZT: 0,
        deliveryCost: 0,     step3DeliveryCost: 0, // Добавляем deliveryCost
    });
    const [insuranceIncluded, setInsuranceIncluded] = useState(false);

    const [parcelData, setParcelData] = useState({});
    const [servicesIds, setServicesIds] = useState([]);
    const [parcelId, setParcelId] = useState(null);

    const handleDataPassFromStep1 = ({ parcelId, servicesIds, parcelData, city, recipient }) => {
        console.log("Полученные данные из Step1:", { parcelId, servicesIds, parcelData, city, recipient });

        setParcelId(parcelId);
        setServicesIds(servicesIds);
        setParcelData(parcelData);
        setPaymentData((prevState) => ({
            ...prevState,
            city,
            recipient, // Сохраняем данные о получателе
        }));
    };


    const handleDataPass = (data) => {
        console.log("Полученные данные из Step2:", data);

        setPaymentData((prevState) => ({
            ...prevState,
            ...data,
        }));
    };


    const handleInsuranceUpdate = (data) => {
        if (!data || typeof data !== "object") {
            console.error("Получены неверные данные:", data);
            return;
        }

        setPaymentData((prevState) => ({
            ...prevState,
            totalCostKZT: data.totalCostKZT || prevState.totalCostKZT,
            insuranceAmount: data.insuranceAmount || prevState.insuranceAmount,
            customDutyKZT: data.customDutyKZT || prevState.customDutyKZT,
        }));

        if (data.insuranceIncluded !== undefined) {
            setInsuranceIncluded(data.insuranceIncluded);
        }
    };

    const handleStep3DeliveryCostUpdate = (step3DeliveryCost) => {
        setPaymentData((prevState) => ({
            ...prevState,
            step3DeliveryCost,
        }));
    };

    return (
        <AnimationRevealPage>
            <MainCabinetHeader />
            <PageContainer>
                <Step1
                    onDataPass={(data) => {
                        handleDataPassFromStep1(data);
                    }}
                />
                <Step2
                    onDataPass={(data) => {
                        handleDataPass(data);
                        handleDataPassFromStep1(data);
                    }}
                    city={paymentData.city}
                />
                <Step3Backend onDeliveryCostUpdate={handleStep3DeliveryCostUpdate} />

                <Step4and5Step
                    onInsuranceUpdate={handleInsuranceUpdate}
                    setInsuranceIncluded={setInsuranceIncluded}
                    insuranceIncluded={insuranceIncluded}
                />
                <Button
                    totalCostUSD={paymentData.totalCostUSD}
                    totalCostKZT={paymentData.totalCostKZT}
                    insuranceAmount={paymentData.insuranceAmount} // Передаём сумму страхования
                    customDutyKZT={paymentData.customDutyKZT}
                    insuranceIncluded={insuranceIncluded}
                    deliveryCost={paymentData.deliveryCost}
                    parcelId={parcelId}
                    servicesIds={servicesIds}
                />


                <Footer />
            </PageContainer>
        </AnimationRevealPage>
    );
};

export default ExpectedLink;
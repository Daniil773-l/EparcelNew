import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Step4and5 } from "../../../../components/misc/Headings.js";
import { useParams } from "react-router-dom";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../../FireBaseConfig";

const HighlightedText = styled.span`
    ${tw`text-primary-500`};
    color: #0ABD19;
`;

const FormContainer = styled.div`
    ${tw`flex justify-center items-center flex-grow`};
`;

const StepTitle = styled(Step4and5)`
    ${tw`w-full mt-2 mb-6`};
`;




const StepRowContainer = styled.div`
    ${tw`grid grid-cols-2 gap-12 max-w-6xl mx-auto mb-8`};
    padding-top: 30px;
`;

const StepContainer = styled.div`
    ${tw`w-full p-8 bg-white shadow-lg rounded-lg border`};
    border: 2px solid #1BA557;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    width: 550px;
`;
const StepContainer5 = styled.div`
    ${tw`w-full p-8 bg-white shadow-lg rounded-lg border`};
    border: 2px solid #1BA557;
    border-radius: 15px;
    padding: 20px;
    height: 115px;
    text-align: center;
    width: 520px;
`;
const StepText = styled.p`
    ${tw`text-base text-gray-600`};
    margin-top: 8px;
`;

const BoldGreenText = styled.h3`
    ${tw` font-bold text-lg`}
    color: #0ABD19;
`;

const Step4Container = styled.div`
    margin-left: -50px;
    text-align: left;
`;

const Step5Container = styled.div`
    text-align: left;
    
`;

const Step4and5Step  = ({ onInsuranceUpdate }) => {
    const { id } = useParams();
    const [totalCostUSD, setTotalCostUSD] = useState(0); // Общая стоимость в долларах
    const [totalCostKZT, setTotalCostKZT] = useState(0); // Общая стоимость в тенге
    const [insuranceAmount, setInsuranceAmount] = useState(0); // Сумма страхования в тенге
    const [usdToKztRate, setUsdToKztRate] = useState(0); // Курс доллара к тенге
    const [buttonActive, setButtonActive] = useState(false); // Состояние кнопки
    const [customDutyEUR, setCustomDutyEUR] = useState(0); // Сумма таможенной пошлины в евро
    const [customDutyKZT, setCustomDutyKZT] = useState(0);
    const [usdToEurRate, setUsdToEurRate] = useState(0); // Курс доллара к евро
    const [customDuty, setCustomDuty] = useState(0); // Сумма таможенной пошлины
    const [insuranceIncluded, setInsuranceIncluded] = useState(false);
    useEffect(() => {
        // Получаем курс доллара к тенге
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=dcdd8eb0771e4dffa7bdf44d9637fc6f`);
                const data = await response.json();
                const rate = data.rates.KZT; // Курс доллара к тенге
                setUsdToKztRate(rate);

            } catch (error) {
            }
        };

        // Функция для получения данных о посылке
        const fetchParcelData = async (parcelId) => {
            const cleanId = parcelId.trim();

            try {
                const q = query(collection(db, "parcels"), where("id", "==", cleanId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const parcelData = doc.data();
                        const products = parcelData.products || [];
                        const totalUSD = products.reduce(
                            (acc, product) => acc + parseFloat(product.productPrice),
                            0
                        );

                        const totalKZT = totalUSD * usdToKztRate;
                        const insurance = totalKZT * 0.01;


                        setTotalCostUSD(totalUSD);
                        setTotalCostKZT(totalKZT);
                        setInsuranceAmount(insurance);
                    });
                }
            } catch (error) {

            }
        };

        if (id) {
            fetchExchangeRate();
            fetchParcelData(id);
        }
    }, [id, usdToKztRate]);
    useEffect(() => {

    }, [totalCostKZT, insuranceAmount]);
    const handleInsuranceToggle = () => {
        setInsuranceIncluded((prevInsuranceIncluded) => {
            const insuranceValue = parseFloat(insuranceAmount);

            if (isNaN(insuranceValue)) {

                return prevInsuranceIncluded;
            }

            const updatedTotalCostKZT = prevInsuranceIncluded
                ? totalCostKZT - insuranceValue // Убираем страховку
                : totalCostKZT + insuranceValue; // Добавляем страховку

            setTotalCostKZT(updatedTotalCostKZT);

            // Передача данных в родительский компонент
            // Передача данных в родительский компонент
            onInsuranceUpdate({
                totalCostKZT: updatedTotalCostKZT,
                insuranceAmount: prevInsuranceIncluded ? 0 : insuranceValue,
                customDutyKZT: customDutyKZT, // Обязательно передаем
                insuranceIncluded: !prevInsuranceIncluded,
            });





            return !prevInsuranceIncluded; // Обновляем состояние страховки
        });
    };
    useEffect(() => {
        if (customDutyKZT > 0 || insuranceAmount > 0) {
            onInsuranceUpdate({
                totalCostKZT: totalCostKZT,
                insuranceAmount: Math.round(insuranceAmount), // Передаём округлённую сумму страхования
                customDutyKZT: customDutyKZT,
                insuranceIncluded: insuranceIncluded,
            });
        }
    }, [customDutyKZT, totalCostKZT, insuranceAmount, insuranceIncluded]);










    useEffect(() => {
        // Получаем курсы валют
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch(
                    `https://openexchangerates.org/api/latest.json?app_id=dcdd8eb0771e4dffa7bdf44d9637fc6f`
                );
                const data = await response.json();
                setUsdToKztRate(data.rates.KZT); // Курс доллара к тенге
                setUsdToEurRate(data.rates.EUR); // Курс доллара к евро
            } catch (error) {

            }
        };

        const fetchParcelData = async (parcelId) => {
            const cleanId = parcelId.trim();
            try {
                const q = query(
                    collection(db, "parcels"),
                    where("id", "==", cleanId)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const parcelData = doc.data();
                        const products = parcelData.products || [];
                        const totalUSD = products.reduce(
                            (acc, product) => acc + parseFloat(product.productPrice),
                            0
                        );

                        const totalKZT = totalUSD * usdToKztRate;
                        const insurance = totalKZT * 0.03;

                        // Конвертация стоимости в евро
                        const totalEUR = totalUSD * usdToEurRate;

                        // Рассчитываем таможенную пошлину
                        let dutyEUR = 0;
                        if (totalEUR > 200) {
                            dutyEUR = (totalEUR - 200) * 0.15; // 15% от превышения
                        }
                        const dutyKZT = dutyEUR * usdToKztRate; // Конвертируем пошлину в тенге

                        // Устанавливаем состояния
                        setTotalCostUSD(totalUSD);
                        setTotalCostKZT(totalKZT);
                        setInsuranceAmount(insurance);
                        setCustomDutyEUR(dutyEUR); // Пошлина в евро
                        setCustomDutyKZT(dutyKZT); // Пошлина в тенге
                    });
                }
            } catch (error) {

            }
        };

        if (id) {
            fetchExchangeRates();
            fetchParcelData(id);
        }
    }, [id, usdToKztRate, usdToEurRate]);


    return (
        <FormContainer>
            <StepRowContainer>
                {/* Шаг 4 */}
                <Step4Container>
                    <StepTitle active={true}>
                        <HighlightedText>Шаг 4. </HighlightedText>Страхование посылки
                    </StepTitle>
                    <StepContainer>
                        <BoldGreenText>Сумма страхования - {Math.round(insuranceAmount)} ₸</BoldGreenText>

                        <StepText>
                            В стоимость доставки включена обязательная страховка — 1% от объявленной стоимости товаров.
                        </StepText>
                    </StepContainer>

                </Step4Container>

                {/* Шаг 5 */}
                <Step5Container>
                    <StepTitle active={true}>
                        <HighlightedText>Шаг 5. </HighlightedText>Таможенный лимит
                    </StepTitle>
                    <StepContainer5>
                        <BoldGreenText>
                            Таможенная пошлина - {customDutyKZT.toFixed(2)} ₸
                        </BoldGreenText>
                        <StepText>Стоимость товаров в посылке: {totalCostKZT.toFixed(2)} ₸</StepText>
                        <StepText>Беспошлинный лимит РК на одну посылку 200 €. </StepText>
                    </StepContainer5>
                </Step5Container>
            </StepRowContainer>
        </FormContainer>
    );
};

export default Step4and5Step;

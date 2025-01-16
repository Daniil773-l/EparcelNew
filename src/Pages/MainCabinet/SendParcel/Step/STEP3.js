import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ExpecteLink } from "../../../../components/misc/Headings";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../FireBaseConfig";

const FormContainer = styled.div`
    ${tw`flex justify-center items-center flex-grow`};
`;
const Container = styled.div`
    ${tw`w-full max-w-[71rem] p-8 bg-white shadow-lg rounded-lg border`};
    border: 2px solid #1BA557;
    border-radius: 15px;
    padding: 40px;
    display: grid;
    margin-top: 0px;
    grid-template-columns: 1fr 1fr; /* Two columns */
    column-gap: 60px; /* Bigger gap between columns for better spacing */
`;
const HighlightedText = styled.span`
    ${tw`text-primary-500`};
    color: #0ABD19;
`;
const StepTitle = tw(ExpecteLink)`w-full mt-2 mb-4`;

const Step3Backend = () => {
    const widgetInitialized = useRef(false);
    const [parcelData, setParcelData] = useState(null); // Данные посылки
    const [loading, setLoading] = useState(true); // Загрузка
    const { id } = useParams(); // Получение ID из URL

    // Функция получения данных посылки из Firebase
    async function fetchParcelData(parcelId) {
        const cleanId = parcelId.trim();
        console.log(`Fetching parcel with ID: ${cleanId}`);
        try {
            const q = query(collection(db, "parcels"), where("id", "==", cleanId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    setParcelData(doc.data());
                });
            } else {
                console.error(`No parcel found with this ID: ${cleanId}`);
            }
        } catch (error) {
            console.error("Error fetching parcel:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchParcelData(id); // Загружаем данные посылки
        }
    }, [id]);

    // Инициализация виджета
    useEffect(() => {
        if (!parcelData) {
            console.warn("Данные посылки отсутствуют. Ждём загрузки...");
            return;
        }

        console.log("Данные посылки после загрузки:", parcelData);

        const { actualWeight, width, height, length } = parcelData;

        // Проверяем наличие всех данных
        if (!actualWeight || !width || !height || !length) {
            console.error("Не все данные для расчета присутствуют:", {
                actualWeight,
                width,
                height,
                length,
            });
            return;
        }

        // Преобразование данных
        const weightInGrams = Math.round(parseFloat(actualWeight) * 0.453592); // Фунты в граммы
        const widthInCm = Math.round(parseFloat(width) * 2.54); // Дюймы в сантиметры
        const heightInCm = Math.round(parseFloat(height) * 2.54); // Дюймы в сантиметры
        const lengthInCm = Math.round(parseFloat(length) * 2.54); // Дюймы в сантиметры

        console.log("Преобразованные данные для виджета:", {
            weightInGrams,
            widthInCm,
            heightInCm,
            lengthInCm,
        });

        // Инициализируем виджет только один раз
        if (!widgetInitialized.current) {
            try {
                new window.CDEKWidget({
                    from: {
                        country_code: 'KZ',
                        city: 'Алматы',
                        postal_code: '050039', // Сделать значение строкой
                        address: 'ул. Беимбета Майлина 2, Алматы',
                    },
                    root: 'cdek-map',
                    apiKey: '5c3971a4-b56c-41ba-bb60-2aef6e535a26',
                    canChoose: true,
                    servicePath: 'https://www.eparcel.kz/service.php',
                    hideFilters: {
                        have_cashless: false,
                        have_cash: false,
                        is_dressing_room: false,
                        type: false,
                    },
                    hideDeliveryOptions: {
                        office: false,
                        door: true,
                    },
                    debug: false,
                    goods: [
                        {
                            weight: weightInGrams,
                            width: widthInCm,
                            height: heightInCm,
                            length: lengthInCm,
                        },
                    ],
                    defaultLocation: "Алматы",
                    lang: 'rus',
                    currency: 'KZT',
                    tariffs: {
                        office: [136,138,481,483],
                        door: [ 137,139,482,480],
                    },
                    onReady() {

                    },
                    onCalculate() {

                    },
                    onChoose() {

                    },
                });

                widgetInitialized.current = true;
            } catch (error) {
                console.error("Ошибка инициализации виджета CDEK:", error);
            }
        }
    }, [parcelData]);

    return (
        <FormContainer>
            <div style={{ width: "100%", maxWidth: "1280px" }}>
                <StepTitle active={true}>
                    <HighlightedText>Шаг 3. </HighlightedText>Выберите способ доставки
                </StepTitle>
                <Container>
                    <div id="cdek-map" style={{ width: "1120px", height: "600px", overflow: "hidden" }}></div>


                </Container>
            </div>
        </FormContainer>
    );
};

export default Step3Backend;
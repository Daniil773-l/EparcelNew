import React, {useEffect, useState} from "react";
import tw, {styled} from "twin.macro";
import {ExpecteLink} from "../../../../components/misc/Headings";
import {useParams} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../../FireBaseConfig";

const FormContainer = styled.div`
    ${tw`flex justify-center items-center flex-grow`};
`;

const HighlightedText = styled.span`
    ${tw`text-primary-500`};
    color: #0ABD19;
`;
const Container = styled.div`
    ${tw`w-full max-w-[70rem] p-8 bg-white shadow-lg rounded-lg border`};
    border: 2px solid #1BA557;
    border-radius: 15px;
    padding: 40px;
    display: grid;
    margin-top: 0px;
    grid-template-columns: 1fr 1fr; /* Two columns */
    column-gap: 60px; /* Bigger gap between columns for better spacing */
`;

const Column = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
`;
const ColumnLeft = styled.div`
    ${tw`text-gray-600 font-semibold`};
    text-align: left;
`;

const ColumnRight = styled.div`
    ${tw`text-gray-900 font-normal`};
    text-align: right;
`;


const StepTitle = tw(ExpecteLink)`w-full mt-2 mb-4`;
const Step2 = ({ onDataPass, city }) => {
    const [parcelData, setParcelData] = useState(null);
    const { id } = useParams(); // Получаем id из URL
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const fetchExchangeRate = async () => {
        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
            const data = await response.json();
            if (data && data.rates && data.rates.KZT) {
                setExchangeRate(data.rates.KZT);
            } else {

                setExchangeRate(450); // Фиксированный курс в случае ошибки
            }
        } catch (error) {


            setExchangeRate(450); // Фиксированный курс
        }
    };
    const calculateDeliveryCost = (city, weightKg) => {
        let cost = 0;

        // Округляем вес до целого числа вверх
        const roundedWeightKg = Math.ceil(weightKg);

        if (!roundedWeightKg || roundedWeightKg <= 0) return cost;

        if (
            ["Алматы", "Абай", "Бесагаш", "Боралдай", "Каскелен", "Отеген-Батыр", "Талгар", "Туздыбастау", "Есик", "Конаев", "Кордай", "Талдыкорган"].includes(city)
        ) {
            cost = roundedWeightKg <= 5 ? roundedWeightKg * 16 : 80 + (roundedWeightKg - 5) * 14;
        } else if (
            ["Астана", "Балкаш", "Караганда", "Косшы", "Ленгер", "Приозёрск", "Сарань", "Сарыагаш", "Тараз", "Темиртау", "Туркестан", "Шахтинск", "Шымкент", "Атбасар", "Жезказган", "Житикара", "Кокшетау", "Костанай", "Лисаковск", "Новоишимское", "Петропавловск", "Рудный", "Сатпаев", "Степногорск", "Тайынша", "Тобыл", "Щучинск"].includes(city)
        ) {
            cost = roundedWeightKg <= 5 ? roundedWeightKg * 17 : 83 + (roundedWeightKg - 5) * 15;
        } else if (
            ["Алтай", "Кызылорда", "Павлодар", "Риддер", "Семей", "Усть-Каменогорск", "Шемонаиха", "Экибастуз", "Аксай", "Актау", "Актобе", "Атырау", "Жанаозен", "Уральск"].includes(city)
        ) {
            cost = roundedWeightKg <= 5 ? roundedWeightKg * 18 : 85 + (roundedWeightKg - 5) * 16;
        } else {

        }

        return cost;
    };

    async function fetchParcelData(parcelId) {
        const cleanId = parcelId.trim();


        try {
            const q = query(collection(db, 'parcels'), where('id', '==', cleanId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {


                    setParcelData(doc.data());
                });
            } else {

            }
        } catch (error) {

        } finally {
            setLoading(false); // Убираем состояние загрузки
        }
    }
    async function fetchServices(parcelId) {
        try {
            const q = query(collection(db, "applications"), where("packageId", "==", parcelId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const fetchedServices = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setServices(fetchedServices);
            } else {

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        // Получение данных при изменении id
        if (id) {
            setLoading(true); // Активируем состояние загрузки
            fetchExchangeRate(); // Загружаем курс валют
            fetchParcelData(id);
            fetchServices(id);
        }
    }, [id]);

    useEffect(() => {
        if (parcelData && exchangeRate) {
            const additionalServicesCostUSD = services.reduce((sum, service) => sum + service.cost, 0);
            const totalCostUSD = parcelData.totalCost + additionalServicesCostUSD;
            const additionalServicesCostKZT = Math.round(additionalServicesCostUSD * exchangeRate);
            const totalCostKZT = Math.round(totalCostUSD * exchangeRate);



            onDataPass({
                totalCostUSD,
                totalCostKZT,
                additionalServicesCostUSD,
                additionalServicesCostKZT,
            });
        }
    }, [parcelData, services, exchangeRate]);

    useEffect(() => {
        if (parcelData) {
            const servicesIds = services.map((service) => service.id);


            onDataPass({ parcelId: id, servicesIds, parcelData });
        }
    }, [parcelData, services, id]);


    useEffect(() => {
        if (parcelData && city) {
            const calculatedCost = calculateDeliveryCost(city, parcelData.width * 0.453592); // Преобразуем фунты в кг
            console.log("Рассчитанная стоимость доставки:", calculatedCost);
            setDeliveryCost(calculatedCost);
        }
    }, [parcelData, city]);



    return (
        <FormContainer>
            <div style={{width: '100%', maxWidth: '1280px'}}>
                <StepTitle active={true}>
                    <HighlightedText>Шаг 2. </HighlightedText>Проверьте состав посылки
                </StepTitle>
                {loading ? (
                    <div>Загрузка...</div>
                ) : parcelData ? (
                    <Container>
                        <div>
                            <Column>
                                <ColumnLeft>Номер посылки:</ColumnLeft>
                                <ColumnRight>{parcelData.id}</ColumnRight>
                            </Column>

                            <Column>
                                <ColumnLeft>Входящий трек №:</ColumnLeft>
                                <ColumnRight>{parcelData.trackingNumber}</ColumnRight>
                            </Column>
                            <Column>
                                <ColumnLeft>Наименование:</ColumnLeft>
                                <ColumnRight>{parcelData.parcelName}</ColumnRight>
                            </Column>
                            <Column>
                                <ColumnLeft>Дополнительные услуги:</ColumnLeft>
                                <ColumnRight>
                                    {services.length > 0 ? (
                                        services.map((service) => (
                                            <div key={service.id}>
                                                {Math.round(service.cost * exchangeRate)}₸ (${service.cost})
                                            </div>
                                        ))
                                    ) : (
                                        "Нет услуг"
                                    )}
                                </ColumnRight>
                            </Column>
                        </div>
                        <div>
                            <Column>
                                <ColumnLeft>Стоимость товаров:</ColumnLeft>
                                <ColumnRight>{parcelData.totalCost}$</ColumnRight>
                            </Column>
                            <Column>
                                <ColumnLeft>Количество товаров в посылке:</ColumnLeft>
                                <ColumnRight>{parcelData.totalQuantity}</ColumnRight>
                            </Column>
                            <Column>
                                <ColumnLeft style={{color:"#0ABD19"}}>Доставка до Казахстана:</ColumnLeft>
                                <ColumnRight style={{color:"#0ABD19"}}>{deliveryCost}$</ColumnRight>
                            </Column>
                            <Column>
                                <ColumnLeft>Вес посылки:</ColumnLeft>
                                <ColumnRight>
                                    {parcelData.width
                                        ? `${Math.ceil(parcelData.width * 0.453592)} кг` // Округление до целого числа
                                        : "Не указан"}
                                </ColumnRight>
                            </Column>

                            <Column>
                                <ColumnLeft>Габариты (В*Ш*Д):</ColumnLeft>
                                <ColumnRight>
                                    {parcelData.height} * {parcelData.width} * {parcelData.length}
                                </ColumnRight>
                            </Column>
                        </div>
                    </Container>
                ) : (
                    <div>Нет данных о посылке</div>
                )}
            </div>
        </FormContainer>
    );
};

export default Step2;
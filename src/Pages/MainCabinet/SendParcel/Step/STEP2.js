import React, {useEffect, useState} from "react";
import tw, {styled} from "twin.macro";
import {ExpecteLink} from "../../../../components/misc/Headings";
import {useParams} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../../FireBaseConfig";
const cityMapping = {
    "Almaty": "Алматы",
    "Abai": "Абай",
    "Besagash": "Бесагаш",
    "Boralday": "Боралдай",
    "Kaskelen": "Каскелен",
    "Otegen-Batyr": "Отеген-Батыр",
    "Talgar": "Талгар",
    "Tuzdybastau": "Туздыбастау",
    "Esik": "Есик",
    "Konayev": "Конаев",
    "Korday": "Кордай",
    "Taldykorgan": "Талдыкорган",
    "Kapshagay": "Капшагай",
    "Astana": "Астана",
    "Balkhash": "Балкаш",
    "Karaganda": "Караганда",
    "Kosshe": "Косшы",
    "Lenger": "Ленгер",
    "Priozersk": "Приозёрск",
    "Saran": "Сарань",
    "Saryagash": "Сарыагаш",
    "Taraz": "Тараз",
    "Temirtau": "Темиртау",
    "Turkestan": "Туркестан",
    "Shakhtinsk": "Шахтинск",
    "Shymkent": "Шымкент",
    "Atbasar": "Атбасар",
    "Zhezkazgan": "Жезказган",
    "Zhitikara": "Житикара",
    "Kokshetau": "Кокшетау",
    "Kostanay": "Костанай",
    "Lisakovsk": "Лисаковск",
    "Novoishimskoe": "Новоишимское",
    "Petropavlovsk": "Петропавловск",
    "Rudny": "Рудный",
    "Satpaev": "Сатпаев",
    "Stepnogorsk": "Степногорск",
    "Tainshe": "Тайынша",
    "Tobyl": "Тобыл",
    "Shchuchinsk": "Щучинск",
    "Altai": "Алтай",
    "Kyzylorda": "Кызылорда",
    "Pavlodar": "Павлодар",
    "Ridder": "Риддер",
    "Semey": "Семей",
    "Ust-Kamenogorsk": "Усть-Каменогорск",
    "Shu": "Шу",
    "Ekibastuz": "Экибастуз",
    "Aksay": "Аксай",
    "Aktau": "Актау",
    "Aktobe": "Актобе",
    "Atyrau": "Атырау",
    "Zhanaozen": "Жанаозен",
    "Uralsk": "Уральск",
    "Zyryanovsk": "Зыряновск",
};


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
    const { id } = useParams();
    const [parcelData, setParcelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [exchangeRate, setExchangeRate] = useState(450); // Default rate
    const [deliveryCost, setDeliveryCost] = useState(0);

    // Fetch exchange rate
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
                const data = await response.json();
                if (data?.rates?.KZT) {
                    setExchangeRate(data.rates.KZT);
                }
            } catch {
                setExchangeRate(450); // Fallback rate
            }
        };
        fetchExchangeRate();
    }, []);

    // Fetch parcel data
    const fetchParcelData = async (parcelId) => {
        try {
            const q = query(collection(db, "parcels"), where("id", "==", parcelId.trim()));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setParcelData(querySnapshot.docs[0].data());
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    // Fetch services data
    const fetchServices = async (parcelId) => {
        try {
            const q = query(collection(db, "applications"), where("packageId", "==", parcelId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const fetchedServices = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setServices(fetchedServices);
            }
        } catch (error) {

        }
    };

    // Calculate delivery cost
    // Calculate delivery cost
    const calculateDeliveryCost = (city, weightKg) => {
        if (!weightKg || weightKg <= 0) return 0;

        const cityName = cityMapping[city] || city;  // Используем маппинг, если город есть, иначе оставляем как есть

        const roundedWeightKg = [0.5, 1, 1.5, 2, 2.5, 3].reduce((prev, curr) =>
            Math.abs(curr - weightKg) < Math.abs(prev - weightKg) ? curr : prev
        );

        let cost = 0;

        console.log('Rounded weight:', roundedWeightKg);  // Проверка округленного веса
        console.log('Город:', cityName);  // Проверка, что город передается правильно

        // Группировка городов по регионам
        if (["Алматы", "Абай", "Бесагаш", "Боралдай", "Каскелен", "Отеген-Батыр", "Талгар", "Туздыбастау", "Есик", "Конаев", "Кордай", "Талдыкорган", "Капшагай"].includes(cityName)) {
            cost = roundedWeightKg <= 3
                ? roundedWeightKg === 0.5 ? 10 :
                    roundedWeightKg === 1 ? 14 :
                        roundedWeightKg === 1.5 ? 21 :
                            roundedWeightKg === 2 ? 28 :
                                roundedWeightKg === 2.5 ? 35 :
                                    roundedWeightKg === 3 ? 42 : 0
                : 42 + (roundedWeightKg - 3) * 14;
        } else if (["Астана", "Балкаш", "Караганда", "Косшы", "Ленгер", "Приозёрск", "Сарань", "Сарыагаш", "Тараз", "Темиртау", "Туркестан", "Шахтинск", "Шымкент", "Атбасар", "Жезказган", "Житикара", "Кокшетау", "Костанай", "Лисаковск", "Новоишимское", "Петропавловск", "Рудный", "Сатпаев", "Степногорск", "Тайынша", "Тобыл", "Щучинск"].includes(cityName)) {
            cost = roundedWeightKg <= 3
                ? roundedWeightKg === 0.5 ? 11 :
                    roundedWeightKg === 1 ? 15 :
                        roundedWeightKg === 1.5 ? 22 :
                            roundedWeightKg === 2 ? 29 :
                                roundedWeightKg === 2.5 ? 36 :
                                    roundedWeightKg === 3 ? 43 : 0
                : 43 + (roundedWeightKg - 3) * 15;
        } else if (["Алтай", "Кызылорда", "Павлодар", "Риддер", "Семей", "Усть-Каменогорск", "Шемонаиха", "Экибастуз", "Аксай", "Актау", "Актобе", "Атырау", "Жанаозен", "Уральск", "Зыряновск"].includes(cityName)) {
            cost = roundedWeightKg <= 3
                ? roundedWeightKg === 0.5 ? 12 :
                    roundedWeightKg === 1 ? 16 :
                        roundedWeightKg === 1.5 ? 23 :
                            roundedWeightKg === 2 ? 30 :
                                roundedWeightKg === 2.5 ? 37 :
                                    roundedWeightKg === 3 ? 44 : 0
                : 44 + (roundedWeightKg - 3) * 16;
        }

        console.log('Calculated delivery cost:', cost);  // Лог для проверки стоимости
        return cost;
    };




    // Update on changes
    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchParcelData(id);
            fetchServices(id);
        }
    }, [id]);

    useEffect(() => {
        if (parcelData && exchangeRate) {
            const servicesCostUSD = services.reduce((sum, service) => sum + service.cost, 0);
            const totalCostUSD = parcelData.totalCost + servicesCostUSD;
            const totalCostKZT = Math.round(totalCostUSD * exchangeRate);
            const servicesCostKZT = Math.round(servicesCostUSD * exchangeRate);

            onDataPass({
                totalCostUSD,
                totalCostKZT,
                servicesCostUSD,
                servicesCostKZT,
                parcelId: id,
                servicesIds: services.map((service) => service.id),
                parcelData,
                deliveryCost,
            });
        }
    }, [parcelData, services, exchangeRate, deliveryCost]);
    useEffect(() => {
        if (parcelData && city) {
            const weightKg = parcelData.width * 0.453592; // Convert pounds to kg
            const cost = calculateDeliveryCost(city.value, weightKg); // Передаем только строку city.value
            setDeliveryCost(cost);  // Устанавливаем стоимость доставки
            onDataPass({ deliveryCost: cost }); // Передаем в родительский компонент
        }
    }, [parcelData, city]);




    // Добавьте это в useEffect для проверки, передается ли город

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
                                <ColumnLeft style={{ color: "#0ABD19" }}>Доставка до Казахстана:</ColumnLeft>
                                <ColumnRight style={{ color: "#0ABD19" }}>
                                    {deliveryCost}$ / {Math.round(deliveryCost * exchangeRate)}₸
                                </ColumnRight>
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
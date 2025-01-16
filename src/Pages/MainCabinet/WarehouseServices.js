import React, {useState, useEffect} from "react";
import styled, {createGlobalStyle} from "styled-components";
import tw from "twin.macro";
import Header from "../../components/headers/MainCabinetHeader";
import {ReactComponent as SearchIcon} from "../../images/img/search-icon.svg";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from "../../components/footers/MainFooterWithLinks";
import {collection, getDocs, query, where, doc, getDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {db} from '../../FireBaseConfig';

// Импорты иконок флагов


// Import flag icons
import USAFlag from "../../images/icon/us-icon.png";
import TurkeyFlag from "../../images/icon/tr-icon.png";

const GlobalStyle = createGlobalStyle`
    select, option {
        color: #000 !important;
        background-color: #fff !important;
    }
`;

const Container = styled.div`
    ${tw`relative w-full`}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;

const TwoColumn = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-start max-w-screen-xl mx-auto py-20 md:py-24`}
    padding-bottom: 0;
`;

const LeftColumn = styled.div`
    ${tw`relative w-full text-left mx-auto`}
`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-4xl leading-tight`}
    margin-bottom: 20px;
    color: #2D2D2D;
`;

const Actions = styled.div`
    ${tw`relative flex items-center w-full`}
`;

const InputContainer = styled.div`
    ${tw`relative flex-grow flex items-center`}
    margin-right: 1rem;
`;

const SearchInput = styled.input`
    ${tw`pl-10 pr-4 py-3 rounded-full w-full font-medium`}
    height: 20px;
    border: 2px solid #0ABD19;

    &:hover {
        border: 2px solid #0ABD19;
    }

    &:focus {
        border: 2px solid #0ABD19;
    }
`;

const SearchIconContainer = styled.div`
    ${tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}
`;

const AddButton = styled.button`
    ${tw`bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    height: 37px;
    background-color: #0ABD19;
    border: none;
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);

    &:hover, &:focus {
        background-color: #025e07;
    }
`;

const ServiceCard = styled.div`
    ${tw`flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-md transition-all duration-300`}
    background: #fffbe1;
    border: 1px solid #ffc107;
    margin-top: 20px;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }
`;


const LeftSection = styled.div`
    ${tw`flex flex-col md:flex-row items-center md:items-start w-full md:w-1/3`}
    text-align: left;
`;


const MiddleSection = styled.div`
    ${tw`flex flex-col justify-center items-center text-center w-full md:w-1/3`}
`;


const RightSection = styled.div`
    ${tw`flex flex-col items-end text-right w-full md:w-1/3`}
`;
const ServiceCardInfo = styled.div`
    ${tw`text-sm`}
    color: #2d2d2d;

    strong {
        ${tw`block font-bold text-base mb-1`}
        color: #0abd19;
    }

    .date,
    .status {
        ${tw`text-sm text-gray-600`}
    }
`;
const FlagAndInfo = styled.div`
    ${tw`flex items-center`}
`;
const PriceDetails = styled.div`
    ${tw`text-sm`}
    color: #6c757d;

    strong {
        ${tw`block font-bold text-base mb-1`}
        color: #2d2d2d;
    }

    .total {
        ${tw`text-green-1002 font-bold`}
    }
`;
const CountryFlag = styled.img`
    ${tw`w-8 h-8 mr-4`}
    border-radius: 50%;
`;
const HighlightedText = styled.span`
    ${tw`font-bold`}
    color: #0abd19;
`;
const Price = styled.div`
    ${tw`text-gray-500`}
`;


const TotalPrice = styled.div`
    ${tw`font-bold text-green-600`}
`;

const InfoMessageBox = styled.div`
    ${tw`flex flex-col items-start p-4 bg-yellow-100 rounded-lg mt-8`}
    width: calc(100% - 2rem);
    max-width: 100%;
    color: #333;
    background-color: #fffbe5;
    border: 1px solid #f5e1a4;
`;

const InfoMessageHeading = styled.h2`
    ${tw`text-lg font-bold mb-2`}
`;

const InfoMessageText = styled.p`
    ${tw`text-base`}
`;

const renderFlag = (country) => {
    const countryFlags = {
        'США': USAFlag,
        'Турция': TurkeyFlag
    };
    return countryFlags[country] ? <CountryFlag src={countryFlags[country]} alt={country}/> : null;
};

export default ({roundedHeaderButton}) => {
    const [services, setServices] = useState(() => JSON.parse(localStorage.getItem('services')) || []);
    const [searchQuery, setSearchQuery] = useState("");
    const [parcelDetails, setParcelDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const getExchangeRate = async (base = "USD", target = "KZT") => {
        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
            const data = await response.json();

            if (data.result === "success" && data.rates[target]) {

                return data.rates[target];
            } else {

                return 450; // Фиксированный курс на случай ошибки
            }
        } catch (error) {

            return 450; // Фиксированный курс при ошибке
        }
    };


    const formatTimestamp = (timestamp) => {
        // Проверяем, является ли timestamp объектом Date
        const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);

        // Форматируем дату
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        const fetchServices = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                try {
                    const exchangeRate = await getExchangeRate();

                    const q = query(collection(db, "applications"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);

                    const servicesList = querySnapshot.docs.map(doc => {
                        const data = doc.data();

                        return {
                            id: doc.id,
                            ...data,
                            formattedTimestamp: formatTimestamp(data.timestamp), // Добавляем отформатированную дату
                            costInKZT: (data.cost * exchangeRate).toFixed(2),
                        };
                    });

                    setServices(servicesList);
                    localStorage.setItem('services', JSON.stringify(servicesList));

                    // Загрузка деталей посылок
                    const parcelPromises = servicesList.map(service =>
                        getDoc(doc(db, "parcels", service.packageId))
                    );

                    const parcelDocs = await Promise.all(parcelPromises);
                    const parcelDetailsMap = {};
                    parcelDocs.forEach((parcelDoc, index) => {
                        parcelDetailsMap[servicesList[index].packageId] = parcelDoc.exists() ? parcelDoc.data() : {};
                    });

                    setParcelDetails(parcelDetailsMap);
                } catch (error) {

                } finally {
                    setLoading(false);
                }
            }
        };

        fetchServices();
    }, []);



    const filteredServices = services.filter(service =>
        service.packageId.includes(searchQuery) ||
        service.comments.includes(searchQuery)
    );


    return (
        <>
            <GlobalStyle/>
            <AnimationRevealPage>
                <Header roundedHeaderButton={roundedHeaderButton}/>
                <Container>
                    <TwoColumn>
                        <LeftColumn>
                            <Heading>Мои услуги</Heading>
                            <Actions>
                                <InputContainer>
                                    <SearchIconContainer>
                                        <SearchIcon/>
                                    </SearchIconContainer>
                                    <SearchInput
                                        type="text"
                                        placeholder="Поиск по номеру посылки, трекингу, названию посылки или товара"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </InputContainer>
                                <a href="/ServisApplication"><AddButton>Добавить услугу</AddButton></a>
                            </Actions>
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service) => {
                                    const parcelDetail = parcelDetails[service.packageId] || {};
                                    const costInKZT = service.costInKZT || "Недоступно";
                                    return (
                                        <ServiceCard key={service.id}>
                                            <LeftSection>
                                                <FlagAndInfo>
                                                    {renderFlag(service.country)}
                                                    <ServiceCardInfo>
                                                        <strong>Посылка #{service.packageId}</strong>
                                                        <div
                                                            className="date">Создана: {service.formattedTimestamp || "Дата не указана"}</div>
                                                        <div
                                                            className="status">Статус: {service.status || "Не указан"}</div>
                                                    </ServiceCardInfo>
                                                </FlagAndInfo>
                                            </LeftSection>
                                            <MiddleSection>
                                                <strong>Название услуги:</strong>
                                                <div>{service.service}</div>
                                            </MiddleSection>
                                            <RightSection>
                                                <PriceDetails>
                                                    <strong>Стоимость услуг:</strong>
                                                    <div>Стоимость за услугу: {costInKZT} ₸ (${service.cost || "N/A"})
                                                    </div>
                                                    <div className="total">Итого стоимость за услуги: {costInKZT} ₸
                                                        (${service.cost || "N/A"})
                                                    </div>
                                                </PriceDetails>
                                            </RightSection>
                                        </ServiceCard>
                                    );
                                })
                            ) : (
                                <InfoMessageBox>
                                    <InfoMessageHeading>У Вас пока нет добавленных услуг!</InfoMessageHeading>
                                    <InfoMessageText>Если вам необходимо добавить услугу - нажмите на соответствующую
                                        кнопку, выберите нужную услугу и добавьте посылку, к которой необходимо
                                        применить выбранную Вами услугу.</InfoMessageText>
                                </InfoMessageBox>
                            )}

                        </LeftColumn>
                    </TwoColumn>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>
    );
};

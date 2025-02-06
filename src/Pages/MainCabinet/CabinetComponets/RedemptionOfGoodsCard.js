import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import tw from "twin.macro";
import plusIcon from "../../../images/icon/plus.png";
import {getAuth} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";

const CardContainer = styled.div`
    ${tw`w-full max-w-2xl mx-auto my-8`}
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 4px solid    #a0c1aa;
    min-height: 300px;
    border-radius: 20px;
    @media (max-width: 768px) {
        margin-left: 8px;
        width: calc(100% - 20px); /* Adding side margins on mobile */
    }
`;

const CardHeaderContainer = styled.div`
    ${tw`flex`}
    @media (max-width: 768px) {
    ${tw`flex-col`}
}
`;

const CardHeaderLink = styled.a`
    ${tw`text-purple-600 text-lg font-bold relative flex-shrink-0 h-auto py-8 no-underline`}
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
    padding-right: 20px;
    border-left: 4px solid #a0c1aa;
    padding-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: 34%;

    @media (max-width: 768px) {
        writing-mode: horizontal-tb;
        transform: rotate(0);
        padding: 10px;
        border-left: none;
        border-bottom: 3px solid  #a0c1aa;
    }
`;

const Icon = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 15px; // Add some space between the icon and text
`;

const CardContentContainer = styled.div`
    ${tw`flex flex-col p-8 w-full`}
    width: 70%;
    @media (max-width: 768px) {
        ${tw`w-full`}
        padding: 4px; /* Уменьшение padding для мобильных устройств */
    }
`;

const CardContent = styled.div`
    ${tw`text-gray-700 text-lg  text-base mb-6`}
    @media (max-width: 768px) {
    ${tw`text-sm`} /* Уменьшение размера текста для мобильных устройств */
}
`;

const CardStats = styled.div`
    ${tw`flex flex-col text-gray-500 text-base`}
`;

const Stat = styled.div`
    ${tw`mb-2 flex justify-between`}
`;

const StatLabel = styled.div`
    ${tw`flex items-center`}
`;

const StatValue = styled.div`
    ${tw`ml-2 text-right mr-6`}
`;

const CardActions = styled.div`
    ${tw`mt-auto flex justify-between items-center flex-wrap`}
    @media (max-width: 768px) {
    ${tw`flex-col w-full`}
}
`;

const Button = styled.button`
    ${tw`flex items-center justify-center py-4 text-white rounded-lg font-bold transition duration-300 ease-in-out hover:bg-purple-600 focus:outline-none`}
    svg {
        ${tw`mr-2`}
    }
    border: none;
    background-color: #979FFF;
    width: 48%; /* Ensure buttons take 48% width to fit in one line */
    min-width: 200px;
    @media (max-width: 768px) {
        ${tw`w-full mb-4`}
    }
`;

const Navlink = styled.a`
    text-decoration: none;
    ${tw`flex items-center justify-center text-white font-bold w-full`}
`;

const RedemptionCard = () => {
    const navigate = useNavigate();
    const [processedCount, setProcessedCount] = useState(0);
    const [inTransitCount, setInTransitCount] = useState(0);
    const [sentCount, setSentCount] = useState(0);
    const [arrivedCount, setArrivedCount] = useState(0);
    const [transferredCount, setTransferredCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const fetchParcelCounts = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getFirestore();

        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const userId = userData.userId;

                const processedQuery = query(collection(db, 'выкуп_товаров'), where("userId", "==", userId), where("status", "==", "Создан"));
                const inTransitQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "Отправление"));
                const sentQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "Отправлено"));
                const arrivedQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "Прибыло в Казахстан на таможне"));
                const transferredQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "Передача в службу доставки"));
                const deliveredQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "Доставлено"));

                const processedSnapshot = await getDocs(processedQuery);
                const inTransitSnapshot = await getDocs(inTransitQuery);
                const sentSnapshot = await getDocs(sentQuery);
                const arrivedSnapshot = await getDocs(arrivedQuery);
                const transferredSnapshot = await getDocs(transferredQuery);
                const deliveredSnapshot = await getDocs(deliveredQuery);

                setProcessedCount(processedSnapshot.docs.length);
                setInTransitCount(inTransitSnapshot.docs.length);
                setSentCount(sentSnapshot.docs.length);
                setArrivedCount(arrivedSnapshot.docs.length);
                setTransferredCount(transferredSnapshot.docs.length);
                setDeliveredCount(deliveredSnapshot.docs.length);
            }
        }
    };
    useEffect(() => {
        fetchParcelCounts();
    }, []);
    const handleViewRequests = () => {
        navigate('/Purchaseofgoods', { state: { activeTab: 'requests' } });
    };

    return (
        <CardContainer>
            <CardHeaderContainer>
                <CardHeaderLink href="/Purchaseofgoods">Выкуп товаров</CardHeaderLink>
                <CardContentContainer>
                    <CardContent>
                        Ожидаемые товары для выкупа:
                    </CardContent>
                    <CardStats>
                        <Stat>
                            <StatLabel>
                                <div>Заявки:</div>
                            </StatLabel>
                            <StatValue>{processedCount} шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Ждут подтверждения:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Отказано:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Ожидает оплаты:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Выкуплено:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>На складе:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                    </CardStats>
                    <CardActions>
                        <Button>
                            <Navlink href="/Purchaseofgoods">
                                <Icon src={plusIcon} alt="Plus Icon" />
                                Добавить заявку
                            </Navlink>
                        </Button>
                        <Button onClick={handleViewRequests}>
                            Смотреть заявки
                        </Button>
                    </CardActions>
                </CardContentContainer>
            </CardHeaderContainer>
        </CardContainer>
    );
};

export default RedemptionCard;

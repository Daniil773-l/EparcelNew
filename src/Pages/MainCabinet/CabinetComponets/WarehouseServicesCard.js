import React, {useEffect, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import plusIcon from "../../../images/icon/plus.png";
import {getAuth} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore"; // Updated import to follow naming conventions

const CardContainer = styled.div`
    ${tw`w-full max-w-2xl mx-auto my-8`}
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 4px solid #a0c1aa;
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
    ${tw`text-lg font-bold relative flex-shrink-0 h-auto py-8 no-underline text-secondary-600`}
    writing-mode: vertical-rl;
    transform: rotate(180deg);

    text-align: center;
    padding-right: 20px;
    border-left:4px solid #a0c1aa;
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
        border-bottom: 4px solid #a0c1aa;
    }
`;

const CardContentContainer = styled.div`
    ${tw`flex flex-col p-8 w-full`}
    width: 70%;

    @media (max-width: 768px) {
        ${tw`w-full`}
        padding: 4px; /* Уменьшение padding для мобильных устройств */
    }
`;

const Icon = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 15px; // Add some space between the icon and text
`;

const CardContent = styled.div`
    ${tw`text-secondary-600 text-base mb-6 text-xl `}
`;

const CardStats = styled.div`
    ${tw`flex flex-col text-secondary-600 text-base`}
`;

const Stat = styled.div`
    ${tw`mb-2 flex justify-between`}
`;

const StatLabel = styled.div`
    ${tw`flex items-center text-base xl:text-lg text-secondary-600`}
`;

const StatValue = styled.div`
    ${tw`ml-1 flex-grow text-right mr-12 text-base xl:text-lg text-secondary-600`}
    @media (max-width: 768px) {
    ${tw`text-sm`} /* Уменьшение размера текста для мобильных устройств */
}
`;

const CardActions = styled.div`
    ${tw`mt-auto flex justify-between items-center`}

    @media (max-width: 768px) {
    ${tw`flex-col items-center w-full`}
    & > * {
        ${tw`mb-4`} /* Добавление отступов между кнопками */
    }
}
`;

const Button = styled.button`
    ${tw`flex items-center justify-center py-4 text-white rounded-lg font-bold transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none`}
    svg {
        ${tw`mr-2`}
    }
    border: none;
    background-color:  #0abd19;
    width: 48%; /* Match the width of the button in the upper card */
    min-width: 200px; /* Adjust the min-width to make buttons the same size */

    @media (max-width: 768px) {
        ${tw`w-full`} 
        
    }
`;

const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z"
            fill="currentColor"
        />
    </svg>
);

const Navlink = styled.a`
    text-decoration: none;
    ${tw`flex items-center justify-center text-white font-bold`}
`;

const WarehouseServiceCard = () => {

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

                const processedQuery = query(collection(db, 'applications'), where("userId", "==", user.uid), where("status", "==", "Создана"));

                const processedSnapshot = await getDocs(processedQuery);


                setProcessedCount(processedSnapshot.docs.length);

            }
        }
    };
    useEffect(() => {
        fetchParcelCounts();
    }, []);


    return (
        <CardContainer>
            <CardHeaderContainer>
                <CardHeaderLink href="/WarehouseServices">Услуги склада</CardHeaderLink>
                <CardContentContainer>
                    <CardContent>
                        Заявки на услуги склада в США:
                    </CardContent>
                    <CardStats>
                        <Stat>
                            <StatLabel>
                                <div>Принятые заявки:</div>
                            </StatLabel>
                            <StatValue>{processedCount} шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>В обработке:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Выполненные заявки:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Отклоненные заявки:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                    </CardStats>
                    <CardActions>
                        <Navlink href="/ServisApplication">
                            <Button>
                                <Icon src={plusIcon} alt="Plus Icon" />
                                Добавить заявку
                            </Button>
                        </Navlink>
                        <Navlink href="/WarehouseServices">
                            <Button>
                                Смотреть услуги
                            </Button>
                        </Navlink>
                    </CardActions>
                </CardContentContainer>
            </CardHeaderContainer>
        </CardContainer>
    );
};

export default WarehouseServiceCard;

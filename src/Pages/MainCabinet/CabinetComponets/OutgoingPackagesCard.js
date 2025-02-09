import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs,doc,getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import styled from "styled-components";
import tw from "twin.macro";

const CardContainer = styled.div`
    ${tw` w-full max-w-2xl mx-auto my-8`}
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
    ${tw`text-lg font-bold relative flex-shrink-0 h-auto py-10 no-underline`}
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
    padding-right: 20px;
    color:   #a0c1aa;
    border-left:4px solid #a0c1aa;
    padding-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: 37%;
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

const CardContent = styled.div`
    ${tw`text-gray-700  text-xl text-base mb-6`}
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
    ${tw`flex items-center text-base xl:text-lg text-gray-700`}
`;

const StatValue = styled.div`
    ${tw`ml-1 flex-grow text-right mt-1 mr-16 text-base xl:text-lg text-gray-700`}
`;

const CardActions = styled.div`
    ${tw`mt-auto flex justify-between items-center`}
    @media (max-width: 768px) {
    ${tw`flex-col w-full`}
}
`;

const Navlink = styled.a`
    text-decoration: none;
    ${tw`flex items-center justify-center text-white font-bold`}
`;

const Button = styled.button`
    ${tw`flex items-center justify-center py-4  text-white rounded-lg font-bold transition duration-300 ease-in-out  focus:outline-none`}
    svg {
        ${tw`mr-2`}
    }
    border: none;
    background-color: #a0c1aa;
    width: 48%; // Ensure both buttons have the same width
    min-width: 200px; // Adjust the min-width to make buttons the same size
    @media (max-width: 768px) {
        ${tw`w-full mb-4 mr-8`}
    }
`;

const OutgoingPackagesCard = () => {
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

                const processedQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "Обработана"));
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

    return (
        <CardContainer>
            <CardHeaderContainer>
                <CardHeaderLink href="/OutgoingParcels">Исходящие посылки</CardHeaderLink> {/* Change the href to your desired page */}
                <CardContentContainer>
                    <CardContent>
                        Отправленные и доставленные посылки:
                    </CardContent>
                    <CardStats>
                        <Stat>
                            <StatLabel>
                                <div>Обработанные </div>
                            </StatLabel>
                            <StatValue>{processedCount} шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Отправление:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Отправлено:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Прибыло в Казахстан на таможне:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Передача в службу доставки:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>Доставлено:</div>
                            </StatLabel>
                            <StatValue>0 шт.</StatValue>
                        </Stat>
                    </CardStats>
                    <CardActions>
                        <Navlink href="/OutgoingParcels">
                            <Button>

                                Исходящие посылки

                            </Button>
                        </Navlink>
                        <Navlink href="/DeliveredParcels">
                            <Button>

                                Доставленные посылки

                            </Button>
                        </Navlink>
                    </CardActions>
                </CardContentContainer>
            </CardHeaderContainer>
        </CardContainer>
    );
};

export default OutgoingPackagesCard;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import plusIcon from "../../../images/icon/plus.png"; // Updated import to follow naming conventions
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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
    ${tw`text-lg font-medium relative flex-shrink-0 h-auto py-10 no-underline text-secondary-600`}
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
    min-height: 37%;
    @media (max-width: 768px) {
        writing-mode: horizontal-tb;
        transform: rotate(0);
        padding: 10px;
        border-left: none;
        border-bottom:4px solid #a0c1aa;
    }
`;

const CardContentContainer = styled.div`
    ${tw`flex flex-col p-8 w-full`}
    width: 70%;
    @media (max-width: 768px) {
        ${tw`w-full`}
        padding: 2px; /* Уменьшение padding для мобильных устройств */
    }
`;

const CardContent = styled.div`
    ${tw`text-secondary-600 text-xl text-base mb-6`}
    @media (max-width: 768px) {
    ${tw`text-sm`} /* Уменьшение размера текста для мобильных устройств */
}
`;

const CardStats = styled.div`
    ${tw`flex flex-col text-gray-500 text-base mb-6`}
`;

const Stat = styled.div`
    ${tw`mb-4`}
`;

const StatLabel = styled.div`
    ${tw`flex items-center justify-between text-base xl:text-lg  text-secondary-600`}
`;

const StatValue = styled.div`
    ${tw`ml-1 text-right text-secondary-600  mr-6`}
`;

const CardActions = styled.div`
    ${tw`mt-auto flex justify-between items-center`}
    @media (max-width: 768px) {
    ${tw`flex-wrap w-full justify-between`}
}
`;

const Navlink = styled.a`
    text-decoration: none;
    ${tw`flex items-center justify-center text-secondary-600 font-bold`}
`;

const Button = styled.button`
    ${tw`flex items-center justify-center py-4  text-white rounded-lg font-bold transition duration-300 ease-in-out  focus:outline-none`}
    svg {
        ${tw`mr-2`}
    }
    background-color:  #0abd19;
    border: none;
    width: 48%; // Ensure both buttons have the same width
    min-width: 200px; // Adjust the min-width to make buttons the same size
    @media (max-width: 768px) {
        ${tw`w-full`} // Ensure both buttons take up equal space on mobile
        min-width: unset; // Remove min-width for better fit on small screens
    }
`;

const Icon = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 8px; // Add some space between the icon and text
`;

const IncomingPackagesCard = () => {
    const [expectedCount, setExpectedCount] = useState(0);
    const [inStockCount, setInStockCount] = useState(0);

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

                const expectedQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "Создана"));
                const inStockQuery = query(collection(db, 'parcels'), where("userId", "==", userId), where("status", "==", "На складе"));

                const expectedSnapshot = await getDocs(expectedQuery);
                const inStockSnapshot = await getDocs(inStockQuery);

                setExpectedCount(expectedSnapshot.docs.length);
                setInStockCount(inStockSnapshot.docs.length);
            }
        }
    };

    useEffect(() => {
        fetchParcelCounts();
    }, []);

    return (
        <CardContainer>
            <CardHeaderContainer>
                <CardHeaderLink href="/IncomingParcels">Входящие посылки</CardHeaderLink>
                <CardContentContainer>
                    <CardContent>
                        Ожидаемые   и доставленые посылки  на склад в США:
                    </CardContent>
                    <CardStats>
                        <Stat>
                            <StatLabel>
                                <div>Ожидаемых:</div>
                                <StatValue>{expectedCount} шт.</StatValue>
                            </StatLabel>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <div>На складе:</div>
                                <StatValue>{inStockCount} шт.</StatValue>
                            </StatLabel>
                        </Stat>
                    </CardStats>
                    <CardActions>
                        <Navlink href="/ExpectedLink">
                            <Button>
                                <Icon src={plusIcon} alt="Plus Icon" />
                                Добавить посылку
                            </Button>
                        </Navlink>
                        <Navlink href="/IncomingParcels">
                            <Button>
                                Входящие посылки
                            </Button>
                        </Navlink>
                    </CardActions>
                </CardContentContainer>
            </CardHeaderContainer>
        </CardContainer>
    );
};

export default IncomingPackagesCard;

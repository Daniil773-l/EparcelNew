import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../FireBaseConfig';
import HeaderContainer from './ScaldComponets/WarehouseAccountingHeader';
import Sidebar from './ScaldComponets/Sidebar';
import Newrequst from "./purchaseofgoods/Newrequst"
import InWork from "./purchaseofgoods/InWork";
import AccepetGoods from "./purchaseofgoods/AccepetGoods";
import Redeemed from "./purchaseofgoods/Redeemed";
import styled, { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';
import PaidApllication from "./purchaseofgoods/PaidApplication";
const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SFUIText';
        font-weight: 300;
        font-style: normal;
    }

    body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'SFUIText', sans-serif;
    }
`;

const Container = styled.div`
    ${tw`min-h-screen`}
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    ${tw`flex flex-col lg:flex-row`}
    flex-grow: 1;
`;

const Content = styled.div`
    ${tw`flex-grow p-8`}
    display: flex;
    flex-direction: column;
`;

const Heading = styled.h1`
    ${tw`text-green-1002 font-semibold text-xl`}
`;

const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 1px;
    width: 100%;
    margin: 20px 0;
`;

const TabsContainer = styled.div`
    ${tw`flex mb-6 mt-4`}
    border-bottom: ${({ hideBorder }) => (hideBorder ? "none" : "1px solid #e5e5e5")};
`;

const Tab = styled.div`
    ${tw`py-4 px-4 cursor-pointer relative`}
    border-top: ${({ isActive }) => (isActive ? "1px solid #e5e5e5" : "none")};
    border-left: ${({ isActive }) => (isActive ? "1px solid #e5e5e5" : "none")};
    border-right: ${({ isActive }) => (isActive ? "1px solid #e5e5e5" : "none")};
    border-bottom: ${({ isActive }) => (isActive ? "none" : "1px solid #e5e5e5")};
    background-color: ${({ isActive }) => (isActive ? "#ffffff" : "transparent")};
    z-index: ${({ isActive }) => (isActive ? "1" : "0")};
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
`;

const Filler = styled.div`
    ${tw`flex-grow`}
    border-bottom: 1px solid #e5e5e5;
`;

const Badge = styled.span`
    ${tw`absolute top-0 right-0 transform translate-x-2 -translate-y-2`}
    background-color: #0ABD19;
    color: #fff;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 50%;
    padding: 0.25rem 0.5rem;
`;

const Purhaseofgoods = () => {
    const [activeTab, setActiveTab] = useState('Новые запросы');
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);

    const statuses = [
        { key: "new", label: "Новые запросы", status: "Создан" },
        { key: "inWork", label: "В работе", status: "Требует подтверждения" },
        { key: "accept", label: "Подтверждено", status: "Подтверждено" },
        { key: "paid", label: "Оплаченный товар", status: "Оплачено" },
        { key: "purchased", label: "Выкупленный товар", status: ["Выкуплен, ожидает отправки", "Выкуплен ,создаем посылку"] },
        { key: "rejected", label: "Отказано", status: "Отменен" },
    ];

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "выкуп_товаров"), (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data());

            // Подсчет статусов
            const countsObject = statuses.reduce((acc, statusObj) => {
                acc[statusObj.key] = data.filter(item =>
                    Array.isArray(statusObj.status)
                        ? statusObj.status.includes(item.status) // Проверяем наличие в массиве
                        : item.status === statusObj.status     // Простое сравнение для строки
                ).length;
                return acc;
            }, {});

            setCounts(countsObject);
            setLoading(false);
        }, (error) => {
            console.error("Ошибка при обновлении данных:", error);
        });

        // Отписка при размонтировании
        return () => unsubscribe();
    }, []);


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const renderForm = () => {
        if (loading) return <p>Loading...</p>;

        switch (activeTab) {
            case "Новые запросы":
                return <Newrequst />;
            case "В работе":
                return <InWork />;
            case "Подтверждено":
                return <AccepetGoods />;
            case "Оплаченный товар":
                return <PaidApllication />;
            case "Выкупленный товар":
                return <Redeemed />;
            case "Отказано":
                return <Newrequst />;
            default:
                return null;
        }
    };

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Выкуп товаров</Heading>
                    <Divider />
                    <TabsContainer hideBorder={activeTab !== ""}>
                        {statuses.map((status) => (
                            <Tab
                                key={status.key}
                                isActive={activeTab === status.label}
                                onClick={() => handleTabChange(status.label)}
                            >
                                {status.label}
                                <Badge>{counts[status.key] || 0}</Badge>
                            </Tab>
                        ))}
                        <Filler />
                    </TabsContainer>

                    {renderForm()}
                </Content>
            </MainContent>
        </Container>
    );
};

export default Purhaseofgoods;
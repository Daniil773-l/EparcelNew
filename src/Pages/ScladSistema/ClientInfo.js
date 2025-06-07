import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../FireBaseConfig';
import HeaderContainer from "./ScaldComponets/WarehouseAccountingHeader";
import Sidebar from "./ScaldComponets/Sidebar";

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

const Container = styled.div`${tw`min-h-screen`}; display: flex; flex-direction: column;`;
const MainContent = styled.div`${tw`flex flex-col lg:flex-row`}; flex-grow: 1;`;
const Content = styled.div`${tw`flex-grow p-8`}; display: flex; flex-direction: column;`;
const GreenHeading = styled.h1`${tw`text-green-1002 font-bold text-2xl mb-4`};`;
const Divider = styled.div`${tw`bg-gray-300`}; height: 1px; width: 100%; margin: 20px 0;`;
const InfoText = styled.p`${tw`text-gray-600 text-base items-start ml-2 font-bold`}; color: #999;`;

const ClientContainer = styled.div`
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
`;
const ClientName = styled.h3`${tw`text-lg font-bold text-black`};`;
const ClientDetail = styled.p`${tw`text-sm text-gray-700`};`;

const Table = styled.table`${tw`w-full text-sm mt-4`}; border-collapse: collapse;`;
const Th = styled.th`${tw`border p-2 bg-gray-100 text-left`};`;
const Td = styled.td`${tw`border p-2`};`;

const ClientInfo = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClientsWithParcels = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, "users"));
                const parcelsSnapshot = await getDocs(collection(db, "parcels"));

                const allParcels = parcelsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const filteredParcels = allParcels.filter((parcel) =>
                    parcel.status === "Создана" || parcel.status === "Отправлено"
                );

                const clientsData = usersSnapshot.docs.map((userDoc) => {
                    const user = userDoc.data();
                    const userParcels = filteredParcels.filter((parcel) => parcel.userId === user.userId);
                    return {
                        id: userDoc.id,
                        fullName: `${user.firstName || "—"} ${user.lastName || ""}`,
                        phone: user.phone || "—",
                        email: user.email || "—",
                        parcels: userParcels,
                    };
                });

                setClients(clientsData);
            } catch (error) {
                console.error("Ошибка при загрузке данных клиентов:", error);
            }
        };

        fetchClientsWithParcels();
    }, []);

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <GreenHeading>Клиенты и их посылки</GreenHeading>
                    <Divider />
                    <InfoText>Общее количество клиентов: {clients.length}</InfoText>

                    {clients.map((client, index) => (
                        <ClientContainer key={index}>
                            <ClientName>{client.fullName}</ClientName>
                            <ClientDetail><strong>Телефон:</strong> {client.phone}</ClientDetail>
                            <ClientDetail><strong>Email:</strong> {client.email}</ClientDetail>

                            {client.parcels.length > 0 ? (
                                <>
                                    <h4>Посылки:</h4>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <Th>№</Th>
                                            <Th>Tracking</Th>
                                            <Th>Статус</Th>
                                            <Th>Вес</Th>
                                            <Th>Дата приёма</Th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {client.parcels.map((parcel, i) => (
                                            <tr key={i}>
                                                <Td>{parcel.id}</Td>
                                                <Td>{parcel.trackingNumber || "—"}</Td>
                                                <Td>{parcel.status}</Td>
                                                <Td>{parcel.actualWeight || "—"}</Td>
                                                <Td>{parcel.dateReceived || "—"}</Td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </>
                            ) : (
                                <p>Нет подходящих посылок.</p>
                            )}
                        </ClientContainer>
                    ))}
                </Content>
            </MainContent>
        </Container>
    );
};

export default ClientInfo;

import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import HeaderContainer from "./ScaldComponets/WarehouseAccountingHeader"; // Import the header component
import { ReactComponent as SearchIcon } from "../../images/img/search-icon.svg";

import Sidebar from "./ScaldComponets/Sidebar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../FireBaseConfig';

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

const Icon = styled.img`
    ${tw`mr-1`} /* Adjusted the margin to ensure the text is closer to the icon */
    width: 25px;  // Increased the size of the icon
    height: 25px; // Increased the size of the icon
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

const Form = styled.div`
    ${tw`flex items-center space-x-6`} /* Increased the spacing between inputs */
    gap: 1rem;
`;

const Label = styled.label`
    ${tw`text-sm font-semibold mb-4`}
    color: #d3d3d3;
`;

const InputContainer = styled.div`
    ${tw`flex flex-col relative items-center`}
    flex: 1;
`;

const Input = styled.input`
    ${tw`border-2 rounded-lg p-3 w-full text-gray-600 mt-4 pl-10`} /* Adjusted padding for icon */
    border-color: #D3D3D3;
    width: 96%;
    &:hover, &:focus {
        border-color: #0ABD19;
    }
`;

const SearchIconContainer = styled.div`
    ${tw`absolute inset-y-0 left-0 flex items-center pl-3 mt-4 `}
    pointer-events: none;
`;

const InfoText = styled.p`
    ${tw`text-gray-600 text-base mt-4`}
    text-align: right;
    font-weight: bold;
`;
const LabelsContainer = styled.div`
    ${tw`grid grid-cols-12 gap-0 p-4 bg-gray-100`}
    border-bottom: 2px solid #d3d3d3;
    text-align: center;
    font-weight: bold;
`;
const DataGrid = styled.div`
    ${tw`grid grid-cols-12 gap-0`}
    border: 1px solid #e0e0e0;
    border-top: none;
    margin-top: 10px;
    border-radius: 8px;
`;
const DataCell = styled.div`
    ${tw`p-4`}
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
    font-size: 14px;
    &:nth-child(odd) {
        background-color: #f9f9f9;
    }
    &:nth-child(even) {
        background-color: #ffffff;
    }
    &:hover {
        background-color: #f0f8ff;
    }
`;
const Button = styled.button`
    ${tw`bg-green-500 text-white px-4 py-2 rounded-lg`}
    font-size: 14px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #0abd19;
        box-shadow: 0 0 10px rgba(0, 171, 25, 0.5);
    }
`;
const ContentContainer = styled.div`
    ${tw`p-8`}
    margin-left: 250px; /* Отступ равен ширине Sidebar */
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media (max-width: 768px) {
        margin-left: 200px; /* Уменьшение отступа для мобильных устройств */
    }
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: row; /* Sidebar и содержимое располагаются в ряд */
    min-height: 100vh; /* Высота равна высоте окна */
`;

const Link = styled.a`text-decoration: none`
const CellLabel = styled.span`
    ${tw`font-semibold text-sm text-gray-800`}
`;

const PrintIcon = styled.img`
    ${tw`w-5 h-5 cursor-pointer`}
`;

const ProccesingParcel = () => {
    const [parcels, setParcels] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const q = query(collection(db, "parcels"), where("status", "==", "На складе"));
                const querySnapshot = await getDocs(q);
                const parcelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Fetched parcels:", parcelsData); // Вывод данных в консоль
                setParcels(parcelsData);
            } catch (error) {
                console.error("Error fetching parcels:", error);
            }
        };

        fetchParcels();
    }, []);
    const filteredParcels = parcels.filter(parcel =>
        parcel.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Обработать посылку</Heading>
                    <Divider />
                    <Form>
                        <InputContainer>
                            <SearchIconContainer>
                                <SearchIcon />
                            </SearchIconContainer>
                            <Input
                                placeholder="Поиск по трекинг-номеру"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </InputContainer>
                    </Form>
                    <InfoText>Общее количество посылок: {filteredParcels.length}</InfoText>
                    <LabelsContainer>
                        <CellLabel style={{ gridColumn: 'span 2' }}>№ заявки</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 2' }}>Дата приема</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 3' }}>ID клиента</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 3' }}>Tracking ID</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 2' }}>Действие</CellLabel>
                    </LabelsContainer>
                    <DataGrid>
                        {filteredParcels.map((parcel, index) => (
                            <React.Fragment key={index}>
                                <DataCell style={{ gridColumn: 'span 2' }}>
                                    <Link href={`/EditingParcel/${parcel.id}`}>{parcel.id || "N/A"}</Link>
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 2' }}>
                                    {parcel.dateReceived || "Нет даты"}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 3' }}>
                                    {parcel.userId || "Нет ID клиента"}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 3' }}>
                                    {parcel.trackingNumber || "Нет Tracking ID"}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 2' }}>
                                    <Button onClick={() => (window.location.href = `/EditingParcel/${parcel.id}`)}>
                                        Обработать
                                    </Button>
                                </DataCell>
                            </React.Fragment>
                        ))}
                    </DataGrid>
                </Content>
            </MainContent>
        </Container>
    );
};
export default ProccesingParcel;

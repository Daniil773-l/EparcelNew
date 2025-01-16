import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import HeaderContainer from "./ScaldComponets/WarehouseAccountingHeader";
import { ReactComponent as SearchIcon } from "../../images/img/search-icon.svg";
import { FaPrint } from "react-icons/fa";

import Sidebar from "./ScaldComponets/Sidebar";
import JsBarcode from "jsbarcode";
import { collection, getDocs } from "firebase/firestore";
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
    ${tw`flex items-center space-x-6`}
    gap: 1rem;
`;

const InputContainer = styled.div`
    ${tw`flex flex-col relative items-center`}
    flex: 1;
`;

const SearchInput = styled.input`
    ${tw`rounded-lg p-3 w-full text-gray-600 mt-4 pl-8`};
    border: 1px solid #d3d3d3; /* Легкая серая граница */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: all 0.3s ease;
    width: 96%;
    &:focus {
        border-color: #0ABD19;
        box-shadow: 0 0 6px rgba(10, 189, 25, 0.5); /* Подсветка при фокусе */
        outline: none;
    }

    &::placeholder {
        color: #b0b0b0; /* Более светлый текст для placeholder */
        font-style: italic; /* Курсив для текстового подсказки */
    }

    &:hover {
        border-color: #0ABD19; /* Легкий акцент на hover */
    }
`;

const SearchIconContainer = styled.div`
    ${tw`absolute inset-y-0 left-0 flex items-center pl-3 mt-4`}
    pointer-events: none;
`;

const InfoText = styled.p`
    ${tw`text-gray-600 text-base items-start ml-2 font-bold`}
    color: #999999;
`;

const LabelsContainer = styled.div`
    ${tw`grid grid-cols-12 gap-0 p-4`};
    background-color: #f3f4f6; /* Светлый фон для заголовков */
    font-weight: bold;
    color: #374151; /* Темный текст */
    border-bottom: 2px solid #e5e7eb; /* Разделитель */
    text-align: center; /* Выравнивание заголовков */
`;

const DataGrid = styled.div`
    ${tw`grid gap-0`};
    margin-top: 10px;
    border-radius: 8px; /* Закругленные углы */
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Легкая тень */
    display: grid;
    grid-template-columns: repeat(12, 1fr); /* Делим на 12 равных частей */
    width: 100%; /* Заполняем всю ширину */
`;
const DataCell = styled.div`
    ${tw`p-3 text-sm`};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ index }) => (index % 2 === 0 ? '#ffffff' : '#f9fafb')}; /* Чередование строк */
    color: #4b5563; /* Серый текст */
    border-bottom: 1px solid #e5e7eb; /* Разделитель строк */
    text-align: center;

    &:hover {
        background-color: #f0f9ff; /* Легкий акцент на hover */
        cursor: pointer;
    }
`;
const CellLabel = styled.span`
    ${tw`font-semibold text-sm`};
    color: #000000; /* Зеленый текст для заголовков */
    display: block;
    width: 100%;
    text-align: center;
`;

const PrintIcon = styled.img`
    ${tw`w-6 h-6 cursor-pointer`};
    filter: grayscale(100%);
    transition: all 0.2s ease;

    &:hover {
        filter: grayscale(0%);
        transform: scale(1.1); /* Увеличение при наведении */
    }
`;
const ExpectedParcelsPage = () => {
    const [parcels, setParcels] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredParcels, setFilteredParcels] = useState([]);

    useEffect(() => {
        const fetchParcels = async () => {
            const querySnapshot = await getDocs(collection(db, "parcels"));
            const parcelsData = querySnapshot.docs.map(doc => doc.data());
            setParcels(parcelsData);
            setFilteredParcels(parcelsData); // Initialize filtered data
        };

        fetchParcels();
    }, []);

    useEffect(() => {
        const filtered = parcels.filter(parcel =>
            parcel.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredParcels(filtered);
    }, [searchQuery, parcels]);

    const printParcel = (parcel) => {
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Parcel</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { font-weight: bold; }
                            svg { margin-top: 10px; }
                        </style>
                    </head>
                    <body>
                        <h1>EPARCEL</h1>
                        <p>Date: ${parcel.dateReceived || "N/A"}</p>
                        <p>Client ID: ${parcel.userId || "N/A"}</p>
                        <p>Tracking Number: ${parcel.trackingNumber || "N/A"}</p>
                        <svg id="barcode"></svg>
                    </body>
                </html>
            `);

            printWindow.document.close();

            const barcodeSvg = printWindow.document.getElementById("barcode");
            if (barcodeSvg) {
                JsBarcode(barcodeSvg, parcel.trackingNumber || "N/A", {
                    format: "CODE128",
                    displayValue: true,
                    lineColor: "#000",
                    width: 2,
                    height: 50,
                });
            }

            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };
    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Входящие посылки</Heading>
                    <Divider />
                    <Form>
                        <InputContainer>
                            <SearchIconContainer>
                                <SearchIcon />
                            </SearchIconContainer>
                            <SearchInput
                                type="text"
                                placeholder="Поиск по трекинг-номеру"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </InputContainer>
                    </Form>
                    <InfoText>Общее количество посылок: {filteredParcels.length}</InfoText>
                    <LabelsContainer>
                        <CellLabel style={{ gridColumn: 'span 1' }}>Shelf no</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 1' }}>№ заявки</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 1' }}>Дата приема</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 3' }}>ID клиента</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 4' }}>Tracking ID</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 2' }}>Print</CellLabel>
                    </LabelsContainer>
                    <DataGrid>
                        {filteredParcels.map((parcel, index) => (
                            <React.Fragment key={index}>
                                <DataCell style={{ gridColumn: 'span 1' }}>
                                    {parcel.shelfNumber || "Еще не обработана"}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 1' }}>
                                    {parcel.id}
                                    <br />
                                    {parcel.status}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 1' }}>
                                    {parcel.dateReceived || "Еще нет"}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 3' }}>
                                    {parcel.userId}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 4' }}>
                                    {parcel.trackingNumber || "N/A"}
                                </DataCell>
                                <DataCell style={{ gridColumn: 'span 2' }}>
                                    <FaPrint
                                        alt="Print"
                                        onClick={() => printParcel(parcel)}
                                    />
                                </DataCell>
                            </React.Fragment>
                        ))}
                    </DataGrid>
                </Content>
            </MainContent>
        </Container>
    );
};

export default ExpectedParcelsPage;

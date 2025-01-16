import React, { useState, useEffect,useRef } from "react";
import JsBarcode from "jsbarcode";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import HeaderContainer from "./ScaldComponets/WarehouseAccountingHeader";
import { ReactComponent as SearchIcon } from "../../images/img/search-icon.svg";
import Sidebar from "./ScaldComponets/Sidebar";

import { FaPrint } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../FireBaseConfig';
import ReactDOM from "react-dom";

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
    ${tw`min-h-screen`};
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    ${tw`flex flex-col lg:flex-row`};
    flex-grow: 1;
`;

const Content = styled.div`
    ${tw`flex-grow p-8`};
    display: flex;
    flex-direction: column;
`;

const GreenHeading = styled.h1`
    ${tw`text-green-1002 font-bold text-2xl mb-4`};
    
`;

const Divider = styled.div`
    ${tw`bg-gray-300`};
    height: 1px;
    width: 100%;
    margin: 20px 0;
`;

const Form = styled.div`
    ${tw`flex items-center space-x-6 mb-4`};
    gap: 1rem;
`;

const InputContainer = styled.div`
    ${tw`flex flex-col relative items-center`};
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
    ${tw`absolute inset-y-0 left-0 flex items-center pl-3 mt-4`};
    pointer-events: none;
`;

const InfoText = styled.p`
    ${tw`text-gray-600 text-base items-start ml-2 font-bold`};
    color: #999999;
`;

const LabelsContainer = styled.div`
    ${tw`grid grid-cols-12 gap-0 p-4`};
    background-color: #f3f4f6;
    font-weight: bold;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
    text-align: center;
`;

const DataGrid = styled.div`
    ${tw`grid gap-0`};
    margin-top: 10px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    width: 100%;
`;

const DataCell = styled.div`
    ${tw`p-3 text-sm`};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ index }) => (index % 2 === 0 ? '#ffffff' : '#f9fafb')};
    color: #4b5563;
    border-bottom: 1px solid #e5e7eb;
    text-align: center;

    &:hover {
        background-color: #f0f9ff;
        cursor: pointer;
    }
`;

const CellLabel = styled.span`
    ${tw`font-semibold text-sm`};
    color: #000000;
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
        transform: scale(1.1);
    }
`;
const Paidparcels = () => {
    const [parcels, setParcels] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredParcels, setFilteredParcels] = useState([]);
    const barcodeRef = useRef();

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "parcels"));
                const parcelsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const processedParcels = parcelsData.filter((parcel) => parcel.status?.trim() === "Оплачено");
                setParcels(processedParcels);
                setFilteredParcels(processedParcels);
            } catch (error) {
                console.error("Ошибка при загрузке посылок:", error);
            }
        };

        fetchParcels();
    }, []);


    const printParcel = (parcel) => {
        const weightInKg = (parseFloat(parcel.actualWeight || 0) * 0.453592).toFixed(2);

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
                        <p>Weight: ${weightInKg} kg</p>
                        <p>Tracking:</p>
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

    useEffect(() => {
        const filtered = parcels.filter((parcel) =>
            parcel.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredParcels(filtered);
    }, [searchQuery, parcels]);

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <GreenHeading>Оплаченные посылки</GreenHeading>
                    <Divider />
                    <Form>
                        <InputContainer>
                            <SearchIconContainer>
                                <SearchIcon />
                            </SearchIconContainer>
                            <SearchInput
                                type="text"
                                placeholder="Search by tracking number"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputContainer>
                    </Form>
                    <InfoText>Общее количество посылок: {filteredParcels.length}</InfoText>
                    <LabelsContainer>
                        <span style={{ gridColumn: "span 1" }}>Shelf no</span>
                        <span style={{ gridColumn: "span 1" }}>№ заявки</span>
                        <span style={{ gridColumn: "span 1" }}>Дата приема</span>
                        <span style={{ gridColumn: "span 3" }}>ID клиента</span>
                        <span style={{ gridColumn: "span 4" }}>Tracking ID</span>
                        <span style={{ gridColumn: "span 2" }}>Print</span>
                    </LabelsContainer>
                    <DataGrid>
                        {filteredParcels.map((parcel, index) => (
                            <React.Fragment key={index}>
                                <DataCell style={{ gridColumn: "span 1" }}>{parcel.shelfNumber || "Еще не обработана"}</DataCell>
                                <DataCell style={{ gridColumn: "span 1" }}>{parcel.id}<br />{parcel.status}</DataCell>
                                <DataCell style={{ gridColumn: "span 1" }}>{parcel.dateReceived || "Еще нету"}</DataCell>
                                <DataCell style={{ gridColumn: "span 3" }}>{parcel.userId}</DataCell>
                                <DataCell style={{ gridColumn: "span 4" }}>{parcel.trackingNumber || "N/A"}</DataCell>
                                <DataCell style={{ gridColumn: "span 2" }}>
                                    <FaPrint alt="Print" onClick={() => printParcel(parcel)} />
                                </DataCell>
                            </React.Fragment>
                        ))}
                    </DataGrid>
                </Content>
            </MainContent>
        </Container>
    );
};

export default Paidparcels;
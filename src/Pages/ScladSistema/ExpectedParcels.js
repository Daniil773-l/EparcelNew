import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import jsbarcode from "jsbarcode";
import HeaderContainer from "./ScaldComponets/WarehouseAccountingHeader";
import Sidebar from "./ScaldComponets/Sidebar";
import { ReactComponent as SearchIcon } from "../../images/img/search-icon.svg";


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
    ${tw`text-green-1002 font-semibold text-2xl mb-4`}

`;



const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 2px;
    width: 100%;
    margin: 20px 0;
    border-radius: 2px;
`;

const Form = styled.div`
    ${tw`flex items-center space-x-6`}
    gap: 1rem;
    margin-bottom: 20px;
`;

const InputContainer = styled.div`
    ${tw`flex flex-col relative items-center`}
    flex: 1;
`;

const Input = styled.input`
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


const LabelsContainer = styled.div`
    ${tw`grid grid-cols-7 gap-0 p-4`}
    background-color: #f7f7f7;
    border-bottom: 1px solid #d3d3d3;
    border-radius: 8px 8px 0 0;
`;

const DataGrid = styled.div`
    ${tw`grid grid-cols-7 gap-0 bg-white p-4 rounded-md`}
    margin-top: 0px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const DataCell = styled.div`
    ${tw`p-2`}
    border: 1px solid #e0e0e0;
    background-color: ${({ index }) =>
    index % 2 === 0 ? '#f9f9f9' : '#ffffff'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding-left: 29px;
    height: 40px;
    &:hover {
        background-color: #f0f8ff;
        cursor: pointer;
    }
`;


const CellLabel = styled.span`
    ${tw`font-semibold text-sm text-gray-800`}
`;

const PrintIcon = styled.img`
    ${tw`w-6 h-6 cursor-pointer`}
    filter: grayscale(100%);
    &:hover {
        filter: grayscale(0%);
        transform: scale(1.1);
    }
`;

const ExpectedParcelsPage = () => {
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filteredData, setFilteredData] = useState([]); // State for filtered data

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const parcelsRef = collection(db, "parcels");
            const snapshot = await getDocs(parcelsRef);

            const data = snapshot.docs.map(doc => ({
                clientId: doc.data().id || doc.id, // Ensure correct field
                trackingId: doc.data().trackingNumber || "N/A",
                date: doc.data().createdAt || "Unknown",
                weight: doc.data().weight || "0",
            }));
            setTableData(data);
            setFilteredData(data); // Initialize filteredData with all data
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter data based on search query
        const filtered = tableData.filter(row =>
            row.trackingId.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, tableData]);

    const handlePrint = (trackingId, clientId, date, weight = 0) => {
        const canvas = document.createElement("canvas");

        if (trackingId) {
            jsbarcode(canvas, trackingId, { format: "CODE128" });
        }

        const barcodeDataUrl = trackingId ? canvas.toDataURL("image/png") : '';
        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
        <html>
            <head><title>Print Tracking Number</title></head>
            <body>
                <h1>EPARCEL</h1>
                <p>Date: ${date || "Unknown"}</p>
                <p>Weight: ${weight} kg</p>
                <p>Tracking:</p>
                ${trackingId ? `<img src="${barcodeDataUrl}" alt="Tracking Barcode" /><br><p>${trackingId}</p>` : '<p>N/A</p>'}
                <p>Client ID: ${clientId}</p>
            </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Ожидаемые посылки</Heading>
                    <Divider />
                    <Form>
                        <InputContainer>
                            <SearchIconContainer>
                                <SearchIcon />
                            </SearchIconContainer>
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)} // Update search query on input change
                            />
                        </InputContainer>
                    </Form>
                    <LabelsContainer>
                        <CellLabel style={{ gridColumn: 'span 3' }}>ID клиента</CellLabel>
                        <CellLabel style={{ gridColumn: 'span 4' }}>Tracking ID</CellLabel>
                    </LabelsContainer>
                    <DataGrid>
                        {filteredData.map((row, index) => (
                            <React.Fragment key={index}>
                                <DataCell style={{ gridColumn: 'span 3' }}>{row.clientId}</DataCell>
                                <DataCell style={{ gridColumn: 'span 4' }}>{row.trackingId}</DataCell>
                            </React.Fragment>
                        ))}
                    </DataGrid>
                </Content>
            </MainContent>
        </Container>
    );
};

export default ExpectedParcelsPage;

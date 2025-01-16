import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import { getFirestore, collection, getDocs ,deleteDoc, doc} from "firebase/firestore";
import HeaderContainer from "../ScaldComponets/WarehouseAccountingHeader";
import Sidebar from "../ScaldComponets/Sidebar";
import { ReactComponent as SearchIcon } from "../../../images/img/search-icon.svg";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
    ${tw`flex flex-col relative items-center`};
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
    ${tw`absolute inset-y-0 left-0 flex items-center pl-3 mt-4 `}
    pointer-events: none;
`;
const TableContainer = styled.div`
    ${tw`w-full`}
`;

const LabelsContainer = styled.div`
    ${tw`grid grid-cols-8 gap-0 p-4`}
    background-color: #f7f7f7;
    border-bottom: 1px solid #d3d3d3;
    border-radius: 8px 8px 0 0;
`;

const DataGrid = styled.div`
    ${tw`grid grid-cols-8 gap-0 bg-white p-4 rounded-md`}
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const DataCell = styled.div`
    ${tw`p-2 flex items-center justify-center`} /* Flex для центровки */
    border: 1px solid #e0e0e0;
    background-color: ${({ index }) =>
    index % 2 === 0 ? "#f9f9f9" : "#ffffff"};
    text-align: center;
    height: 50px; /* Установить высоту ячейки */
    &:hover {
        background-color: #f0f8ff;
        cursor: pointer;
    }
`;


const CellLabel = styled.span`
    ${tw`font-semibold text-sm text-gray-800`}
    text-align: center;
`;

const NavLink = styled(Link)`
    text-decoration: none;
`;
const NavLinkID = styled(Link)`
    text-decoration: underline #0ABD19;
    text-decoration-style: dotted;
    color: #0ABD19;
`;
const ListParcel = () => {
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filteredData, setFilteredData] = useState([]); // State for filtered data
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const palletsRef = collection(db, "Палеты");
            const snapshot = await getDocs(palletsRef);

            const data = snapshot.docs.map((doc, index) => {
                const docData = doc.data();
                return {
                    id: index + 1,
                    palletId: docData.palletId || "N/A",
                    date: docData.date || "N/A",
                    totalQuantity: docData.totalQuantity || "0", // Количество посылок
                    weightKg: docData.weight || "0", // Вес в кг
                    status: docData.status || "N/A",
                    docId: doc.id, // ID документа для удаления
                };
            });

            setTableData(data);
            setFilteredData(data); // Initialize filteredData with all data
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter data based on search query
        const filtered = tableData.filter((row) =>
            row.palletId.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);

    }, [searchQuery, tableData]);
    const handleDelete = async (id) => {
        try {
            const db = getFirestore();
            await deleteDoc(doc(db, "Палеты", id));
            alert("Паллет удален");
            // Обновите данные таблицы после удаления
        } catch (error) {
            console.error("Ошибка удаления: ", error);
        }
    };

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Список паллетов</Heading>
                    <Divider />
                    <Form>
                        <InputContainer>
                            <SearchIconContainer>
                                <SearchIcon />
                            </SearchIconContainer>
                            <Input
                                placeholder="Search by Pallet ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputContainer>
                    </Form>
                    <TableContainer>
                        <LabelsContainer>
                            <CellLabel>№</CellLabel>
                            <CellLabel>Pallet ID</CellLabel>
                            <CellLabel>Date</CellLabel>
                            <CellLabel>№ of box pieces</CellLabel>
                            <CellLabel>Weight (kg)</CellLabel>

                            <CellLabel>Status</CellLabel>
                            <CellLabel>Добавить посылки</CellLabel>
                            <CellLabel>Удалить</CellLabel>
                        </LabelsContainer>
                        <DataGrid>
                            {filteredData.map((row, index) => (
                                <React.Fragment key={index}>
                                    <DataCell>{row.id}</DataCell>
                                    <NavLinkID to={`/add-parcel-pallet/${row.palletId}`}>
                                        <DataCell>{row.palletId}</DataCell>
                                    </NavLinkID>
                                    <DataCell>{row.date}</DataCell>
                                    <DataCell>{row.totalQuantity}</DataCell> {/* Количество посылок */}
                                    <DataCell>{row.weightKg} kg</DataCell> {/* Вес в кг */}
                                    <DataCell>{row.status}</DataCell>
                                    <DataCell>
                                        <button
                                            onClick={() => (window.location.href = `/add-parcel-pallet/${row.palletId}`)}
                                            style={{
                                                backgroundColor: "#0ABD19",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                padding: "6px 10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Добавить посылки
                                        </button>
                                    </DataCell>
                                    <DataCell>
                                        <FaTrash
                                            onClick={() => handleDelete(row.docId)}
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </DataCell>
                                </React.Fragment>
                            ))}
                        </DataGrid>

                    </TableContainer>
                </Content>
            </MainContent>
        </Container>
    );
};

export default ListParcel;
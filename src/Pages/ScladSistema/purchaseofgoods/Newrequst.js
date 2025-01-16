import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import {ReactComponent as SearchIcon} from "../../../images/img/search-icon.svg";
import { query, where, onSnapshot, collection } from "firebase/firestore";
import {db} from "../../../FireBaseConfig"; // ваш файл конфигурации Firebase
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
const Container = styled.div`
    ${tw`p-8`}
    font-family: 'Arial', sans-serif;
`;

const SearchContainer = styled.div`
    ${tw`relative mb-6`}
    display: flex;
    align-items: center;
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


const Table = styled.table`
    ${tw`w-full border-collapse`}
    table-layout: fixed;
`;

const TableHead = styled.thead`
    ${tw`bg-gray-100`}
`;

const TableRow = styled.tr`
    ${tw`border-b`}
`;

const TableHeader = styled.th`
    ${tw`py-3 px-4 text-left text-gray-600 font-semibold`}
    font-size: 0.9rem;
`;

const TableBody = styled.tbody`
    ${tw`text-gray-700`}
`;

const TableCell = styled.td`
    ${tw`py-3 px-4`}
    font-size: 0.9rem;
`;

const EmptyMessage = styled.div`
    ${tw`text-center text-gray-500 py-8`}
    font-size: 1.1rem;
`;
const StyledButton = styled.button`
    ${tw`py-2 px-4 font-semibold rounded-lg shadow-md text-white focus:outline-none`}
    background: #0ABD19;
    transition: all 0.3s ease;

    &:hover {
      
        transform: scale(1.05);
        box-shadow: 0px 4px 15px rgba(10, 189, 25, 0.3);
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        ${tw`opacity-50 cursor-not-allowed`}
        background: gray;
    }
`;
const NewRequest = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]); // Состояние для данных из Firestore
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cachedData = localStorage.getItem('requests_cache');
        if (cachedData) {
            setData(JSON.parse(cachedData));
            setLoading(false);
        }

        const q = query(collection(db, "выкуп_товаров"), where("status", "==", "Создан"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedData = [];
            snapshot.forEach((doc) => {
                fetchedData.push({ id: doc.id, ...doc.data() });
            });

            // Обновляем данные и кэш
            setData(fetchedData);
            localStorage.setItem('requests_cache', JSON.stringify(fetchedData));
            setLoading(false);
        }, (error) => {
            console.error("Ошибка при получении данных:", error);
        });

        // Отписываемся от изменений при размонтировании компонента
        return () => unsubscribe();
    }, []);

    // Фильтрация данных по поиску
    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleProcessClick = (item) => {
        navigate("/FormEditingPurchamse", { state: { item } });
    };

    return (
        <Container>
            <SearchContainer>
                <SearchIconContainer>
                    <SearchIcon />
                </SearchIconContainer>
                <SearchInput
                    type="text"
                    placeholder="Поиск по названию товара или ID клиента"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchContainer>
            {loading ? (
                <EmptyMessage>Загрузка данных...</EmptyMessage>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Дата</TableHeader>
                            <TableHeader>№ заявки</TableHeader>
                            <TableHeader>ID клиента</TableHeader>
                            <TableHeader>Название товара</TableHeader>
                            <TableHeader>Количество</TableHeader>
                            <TableHeader>Цена</TableHeader>
                            <TableHeader>Ссылка</TableHeader>
                            <TableHeader>Статус</TableHeader>
                            <TableHeader>Обработать</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {item.createdAt
                                            ? new Date(item.createdAt.seconds * 1000).toLocaleDateString("ru-RU", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                            : "—"}
                                    </TableCell>
                                    <TableCell>{item.requestNumber}</TableCell>
                                    <TableCell>{item.userId}</TableCell>
                                    <TableCell>{item.products[0]?.productName || 'N/A'}</TableCell>
                                    <TableCell>{item.products[0]?.productQuantity || 'N/A'}</TableCell>
                                    <TableCell>
                                        {Number(item.products[0]?.productPrice?.trim()) *
                                            Number(item.products[0]?.productQuantity?.trim()) || 0}
                                    </TableCell>
                                    <TableCell>
                                        <a href={item.products[0]?.productLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: " #0ABD19" }}>
                                            Перейти
                                        </a>
                                    </TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <StyledButton onClick={() => handleProcessClick(item)}>
                                            Обработать
                                        </StyledButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">
                                    <EmptyMessage>Нет данных для отображения</EmptyMessage>
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            )}
        </Container>
    );
};

export default NewRequest;
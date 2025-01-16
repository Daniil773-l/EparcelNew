import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import HeaderContainer from "../ScaldComponets/WarehouseAccountingHeader";
import Sidebar from "../ScaldComponets/Sidebar";
import { getFirestore, collection, addDoc, getDocs, deleteDoc,doc,getDoc } from "firebase/firestore";
import { FaTrash, FaEdit, FaFileDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'SFUIText', sans-serif;
    }
`;

const Container = styled.div`
    ${tw`min-h-screen flex flex-col`};
`;

const MainContent = styled.div`
    ${tw`flex flex-col lg:flex-row`}
    flex-grow: 1;
`;

const Content = styled.div`
    ${tw`flex-grow p-8`}
`;

const Heading = styled.h1`
    ${tw`text-green-1002 font-bold text-3xl mb-6`}
`;

const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 1px;
    width: 100%;
    margin: 20px 0;
`;

const Form = styled.div`
    ${tw`grid gap-4 mb-6`}
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const InputContainer = styled.div`
    ${tw`flex flex-col`}
`;

const Label = styled.label`
    ${tw`text-gray-700 text-sm font-bold mb-2`}
`;

const Input = styled.input`
    ${tw`border rounded-lg p-3 text-gray-700`}
    border-color: #d1d5db;
    background-color: #f9fafb;

    &:hover {
        border-color: #0abd19;
    }

    &:focus {
        outline: none;
        border-color: #0abd19;
    }
`;

const Select = styled.select`
    ${tw`border rounded-lg p-3 text-gray-700`}
    border-color: #d1d5db;
    background-color: #f9fafb;

    &:hover {
        border-color: #0abd19;
    }

    &:focus {
        outline: none;
        border-color: #0abd19;
    }
`;

const ButtonContainer = styled.div`
    ${tw`flex justify-start`}
`;

const Button = styled.button`
    ${tw`bg-green-1002 text-white rounded-lg py-3 px-16 font-semibold`}
    transition: all 0.3s ease;

    &:hover {
        background-color: #278001;
    }

    &:focus {
        outline: none;
    }
`;

const Table = styled.table`
    ${tw`w-full mt-6 border-collapse`}
`;

const TableHead = styled.thead`
    ${tw`bg-gray-100`}
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const TableCell = styled.td`
    ${tw`border px-4 py-2 text-center`}
`;

const ShipmentPage = () => {
    const [shipmentId, setShipmentId] = useState(""); // Автоматический ID
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");
    const [shipments, setShipments] = useState([]);
    const navigate = useNavigate();
    const db = getFirestore();

    useEffect(() => {
        fetchShipments();
    }, []);

    useEffect(() => {
        generateShipmentId();
    }, [shipments]);

    const fetchShipments = async () => {
        try {
            const snapshot = await getDocs(collection(db, "Shipment"));
            const data = snapshot.docs.map((doc) => {
                const shipment = doc.data();

                // Подсчет количества паллет и посылок
                const totalPallets = shipment.pallets ? shipment.pallets.length : 0;
                const totalParcels = shipment.pallets
                    ? shipment.pallets.reduce((count, pallet) => count + (pallet.parcels ? pallet.parcels.length : 0), 0)
                    : 0;

                return {
                    id: doc.id,
                    ...shipment,
                    totalPallets,
                    totalParcels,
                };
            });
            setShipments(data);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };


    const generateShipmentId = () => {
        if (shipments.length > 0) {
            const lastShipment = shipments[shipments.length - 1];
            const lastId = lastShipment.shipmentId.split("-")[1];
            const newId = `#SHM-${String(parseInt(lastId) + 1).padStart(5, "0")}`;
            setShipmentId(newId);
        } else {
            setShipmentId("#SHM-00001"); // Если это первый ID
        }
    };

    const handleAddShipment = async () => {
        if (!shipmentId || !date || !country) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            await addDoc(collection(db, "Shipment"), {
                shipmentId,
                date,
                country,
                totalParcels: 0,
                grossWeight: 0,
                chargeableWeight: "weight chargeable",
                rateCharge: "rate chargeable",
                totalCost: 0,
            });
            alert("Отправление добавлено!");
            fetchShipments();
        } catch (error) {
            console.error("Ошибка при добавлении отправления:", error);
        }
    };

    const handleDeleteShipment = async (id) => {
        try {
            await deleteDoc(doc(db, "Shipment", id));
            alert("Отправление удалено!");
            fetchShipments();
        } catch (error) {
            console.error("Ошибка при удалении отправления:", error);
        }
    };
    const handleAddPallets = (shipment) => {
        navigate("/input-shipment", { state: { shipmentId: shipment.id, shipment } });
    };

    const handleGenerateManifest = async (shipmentId) => {
        try {
            const shipmentDocRef = doc(db, "Shipment", shipmentId);
            const shipmentDoc = await getDoc(shipmentDocRef);
            const shipmentData = shipmentDoc.data();

            if (!shipmentData || !shipmentData.pallets) {
                alert("Данные о паллетах отсутствуют.");
                return;
            }

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet([]);

            // Верхние заголовки
            const header1 = [
                [`SHIPMENT #${shipmentData.shipmentId}`, "", "", "", "", `Дата отгрузки: ${shipmentData.date}`],
            ];
            XLSX.utils.sheet_add_aoa(worksheet, header1, { origin: "A1" });

            // Объединение ячеек для заголовков
            worksheet["!merges"] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, // Объединение заголовка "SHIPMENT"
                { s: { r: 0, c: 5 }, e: { r: 0, c: 6 } }, // Объединение "Дата отгрузки"
            ];

            // Номер паллет
            const header2 = [
                ["№ ПАЛЛЕТЫ", shipmentData.pallets.map((pallet) => pallet.palletId).join(", ")],
            ];
            XLSX.utils.sheet_add_aoa(worksheet, header2, { origin: "A2" });

            // Заголовок таблицы
            const tableHeader = [
                [
                    "N", "Входящий номер посылки", "Исходящий номер посылки", "Фамилия", "Имя", "Отчество",
                    "Серия паспорта", "Номер паспорта", "Дата выдачи паспорта", "Кем выдан паспорт", "ИНН",
                    "Город доставки", "Телефон получателя", "Наименование товара", "Код ТН ВЭД", "Ссылка на сайт",
                    "Кол-во", "Вес нетто, кг", "Вес брутто, кг", "Цена в валюте", "Валюта", "Стоимость товара", "Email получателя",
                ],
            ];
            XLSX.utils.sheet_add_aoa(worksheet, tableHeader, { origin: "A4" });

            // Данные таблицы
            let row = 5; // Начало данных
            shipmentData.pallets.forEach((pallet, palletIndex) => {
                pallet.parcels.forEach((parcel, parcelIndex) => {
                    const recipient = parcel.recipient || {};
                    const products = parcel.products || [];
                    XLSX.utils.sheet_add_aoa(worksheet, [
                        [
                            palletIndex + 1,
                            parcel.trackingNumber || "Не указан",
                            parcel.outgoingTrackingNumber || "Не указан",
                            recipient.surname || "Не указан",
                            recipient.name || "Не указан",
                            recipient.patronymic || "Не указан",
                            recipient.passportSeries || "Не указан",
                            recipient.passportNumber || "Не указан",
                            recipient.issueDate || "Не указана",
                            recipient.issuedBy || "Не указан",
                            recipient.iin || "Не указан",
                            recipient.city || "Не указан",
                            recipient.phone || "Не указан",
                            products.map((p) => p.productName).join(", ") || "Не указано",
                            products.map((p) => p.productType).join(", ") || "Не указано",
                            products.map((p) => p.productLink).join(", ") || "Не указано",
                            parcel.totalQuantity || 0,
                            parcel.weight || 0,
                            parcel.volumetricWeight || 0,
                            parcel.totalCost || 0,
                            parcel.currency || "USD",
                            parcel.totalCost || 0,
                            recipient.email || "Не указан",
                        ],
                    ], { origin: `A${row}` });
                    row++;
                });
            });

            // Настройка ширины колонок
            worksheet["!cols"] = [
                { wch: 5 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 15 },
                { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 20 },
                { wch: 15 }, { wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 20 },
                { wch: 20 }, { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
                { wch: 10 }, { wch: 15 }, { wch: 25 },
            ];

            // Настройка стилей (жирный шрифт, выравнивание, желтый фон)
            const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
            for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
                const cell = worksheet[XLSX.utils.encode_cell({ r: 3, c: C })];
                if (cell) {
                    cell.s = {
                        font: { bold: true },
                        alignment: { horizontal: "center", vertical: "center" },
                        fill: { fgColor: { rgb: "FFFFAA00" } },
                    };
                }
            }

            // Сохраняем Excel
            XLSX.utils.book_append_sheet(workbook, worksheet, "Манифест");
            XLSX.writeFile(workbook, `Manifest_${shipmentId}.xlsx`);
            alert("Манифест успешно создан!");
        } catch (error) {
            console.error("Ошибка при создании манифеста:", error);
        }
    };


    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Shipment</Heading>
                    <Divider />
                    <Form>
                        <InputContainer>
                            <Label>Shipment</Label>
                            <Input type="text" value={shipmentId} readOnly />
                        </InputContainer>
                        <InputContainer>
                            <Label>Date</Label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Country</Label>
                            <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="" disabled>
                                    Выберите страну
                                </option>
                                {["США", "Склад 2"].map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </Select>
                        </InputContainer>
                        <ButtonContainer>
                            <Button onClick={handleAddShipment}>Add</Button>
                        </ButtonContainer>
                    </Form>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ shipment</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Total № of parcels</TableCell>
                                <TableCell>Gross weight</TableCell>
                                <TableCell>Total, $</TableCell>
                                <TableCell>Manifest</TableCell>
                                <TableCell>Add Pallet</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                        {shipments.map((shipment, index) => (
                            <TableRow key={shipment.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{shipment.date}</TableCell>
                                <TableCell>
                                    {shipment.totalPallets} паллет, {shipment.totalParcels} посылок
                                </TableCell>
                                <TableCell>{shipment.grossWeight}</TableCell>
                                <TableCell>{shipment.customFees}</TableCell>
                                <TableCell>
                                    <FaFileDownload
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleGenerateManifest(shipment.id)}
                                    />
                                </TableCell>

                                <TableCell>
                                    <Button onClick={() => handleAddPallets(shipment)}>
                                        Add Pallets
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <FaTrash
                                        style={{ color: "red", cursor: "pointer" }}
                                        onClick={() => handleDeleteShipment(shipment.id)}
                                    />
                                </TableCell>
                            </TableRow>

                        ))}
                        </tbody>
                    </Table>
                </Content>
            </MainContent>
        </Container>
    );
};

export default ShipmentPage;

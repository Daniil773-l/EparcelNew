import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import HeaderContainer from "../ScaldComponets/WarehouseAccountingHeader";
import Sidebar from "../ScaldComponets/Sidebar";
import { query, where, getDocs, collection, getFirestore, updateDoc, doc } from "firebase/firestore";
import {Link} from "react-router-dom";

const GlobalStyle = createGlobalStyle`
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
    ${tw`text-green-1002 font-bold text-3xl mb-6`}
`;

const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 1px;
    width: 100%;
    margin: 20px 0;
`;

const PalletDetailsSection = styled.div`
    ${tw`bg-white shadow-lg rounded-lg p-6 mb-6`}
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    border: 1px solid #e5e5e5;
`;

const DetailItem = styled.div`
    ${tw`w-full md:w-1/2`}
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;

    &:last-child {
        border-bottom: none;
    }
`;

const Label = styled.span`
    ${tw`text-gray-500 font-semibold uppercase tracking-wider`}
    font-size: 12px;
    margin-bottom: 5px;
`;

const Value = styled.span`
    ${tw`text-gray-900 font-bold text-lg`}
`;

const TrackingInputContainer = styled.div`
    ${tw`mt-8`}
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    ${tw`border rounded-lg p-3 text-gray-700 w-full md:w-1/2`}
    border-color: #d1d5db;
    background-color: #f9fafb;

    &:focus {
        outline: none;
        border-color: #0abd19;
    }
`;

const AddParcelButton = styled.button`
    ${tw`bg-green-1002 text-white rounded-lg py-2 px-6 mt-4 font-semibold`}
    transition: all 0.3s ease;

    &:hover {
        background-color: #278001;
    }
`;
const AndParcelButton = styled.button`
    ${tw`bg-red-500 text-white rounded-lg py-2 px-6 mt-4 font-semibold`}
    transition: all 0.3s ease;

   
`;
const Table = styled.table`
    ${tw`w-full mt-6`}
    border-collapse: collapse;
`;

const TableHead = styled.thead`
    ${tw`bg-gray-100`}
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
    ${tw`border px-4 py-2`}
`;
const NavLink = styled(Link)`
    // Добавьте стили для ссылки
    text-decoration: none;
    color: inherit;

   
`;
const AddPaletParcel = () => {
    const [palletId, setPalletId] = useState("");
    const [palletData, setPalletData] = useState(null);
    const [trackingId, setTrackingId] = useState("");
    const [addedParcels, setAddedParcels] = useState([]);
    const [isScanning, setIsScanning] = useState(false); // Для предотвращения повторных запросов

    useEffect(() => {
        const hashId = window.location.hash.slice(1);
        setPalletId(hashId);
        fetchPalletData(hashId);
    }, []);

    const fetchPalletData = async (id) => {
        try {
            const db = getFirestore();
            const formattedId = id.startsWith("#") ? id : `#${id}`;

            const q = query(collection(db, "Палеты"), where("palletId", "==", formattedId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data();
                setPalletData({ ...docData, docId: querySnapshot.docs[0].id });
                setAddedParcels(docData.parcels || []);
            } else {
                console.error("No document matches the query.");
            }
        } catch (error) {
            console.error("Error fetching pallet data:", error);
        }
    };

    const handleScan = async (trackingNumber) => {
        if (isScanning || !trackingNumber.trim()) return;
        setIsScanning(true);

        try {
            const db = getFirestore();
            const parcelQuery = query(collection(db, "parcels"), where("trackingNumber", "==", trackingNumber));
            const parcelSnapshot = await getDocs(parcelQuery);

            if (!parcelSnapshot.empty) {
                const parcelDoc = parcelSnapshot.docs[0];
                const parcelData = parcelDoc.data();

                // Проверка на статус "Оплачено"
                if (parcelData.status !== "Оплачено") {
                    alert("Добавлять можно только посылки со статусом 'Оплачено'.");
                    setTrackingId("");
                    setIsScanning(false);
                    return;
                }

                // Проверка на дубликат
                if (addedParcels.some((parcel) => parcel.trackingNumber === trackingNumber)) {
                    alert("Эта посылка уже добавлена в паллет.");
                    setTrackingId("");
                    setIsScanning(false);
                    return;
                }

                // Обновляем поле palletId в базе данных
                const parcelRef = doc(db, "parcels", parcelDoc.id);
                await updateDoc(parcelRef, { palletId: palletData.palletId });

                // Конвертация веса (из фунтов в килограммы, если указано в фунтах)
                const weightKg = parseFloat(parcelData.weight || 0).toFixed(2);

                // Стоимость посылки
                const parcelCost = parseFloat(parcelData.totalCost || 0);

                // Обновляем локальное состояние
                const updatedParcels = [
                    ...addedParcels,
                    { ...parcelData, weightKg, id: parcelSnapshot.docs[0].id }
                ];

                setAddedParcels(updatedParcels);

                // Обновляем данные паллеты
                const palletDocRef = doc(db, "Палеты", palletData.docId);
                const updatedWeight = updatedParcels.reduce((acc, p) => acc + parseFloat(p.weightKg || 0), 0).toFixed(2);
                const updatedCost = updatedParcels.reduce((acc, p) => acc + parseFloat(p.totalCost || 0), 0).toFixed(2);
                const updatedQuantity = updatedParcels.length;

                await updateDoc(palletDocRef, {
                    parcels: updatedParcels,
                    weight: updatedWeight,
                    totalCost: updatedCost,
                    totalQuantity: updatedQuantity,
                });

                setPalletData((prev) => ({
                    ...prev,
                    weight: updatedWeight,
                    totalCost: updatedCost,
                    totalQuantity: updatedQuantity,
                }));

                setTrackingId(""); // Очистка поля ввода
            } else {
                alert("Посылка с таким трек-номером не найдена.");
                setTrackingId("");
            }
        } catch (error) {
            console.error("Ошибка при добавлении посылки:", error);
        } finally {
            setIsScanning(false);
        }
    };





    const handleInputChange = (e) => {
        const value = e.target.value;
        setTrackingId(value);

        // Если введено значение (обычно сканер вводит всё сразу), запускаем проверку
        if (value.trim()) {
            handleScan(value);
        }
    };

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Детали паллета</Heading>
                    {palletData ? (
                        <PalletDetailsSection>
                            <DetailItem>
                                <Label>Pallet ID:</Label>
                                <Value>{palletData.palletId}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Gross weight:</Label>
                                <Value>{palletData.weight || 0} kg</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Total quantity parcels:</Label>
                                <Value>{palletData.totalQuantity || 0}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Total Cost:</Label>
                                <Value>${palletData.totalCost || 0}</Value>
                            </DetailItem>
                        </PalletDetailsSection>

                    ) : (
                        <p>Loading pallet data...</p>
                    )}
                    <TrackingInputContainer>
                        <Input
                            placeholder="Сканируйте штрих-код"
                            value={trackingId}
                            onChange={handleInputChange} // Обработка ввода
                        />
                        <NavLink to={'/pallet-list'}>
                            <AndParcelButton>Завершить</AndParcelButton>
                        </NavLink>
                    </TrackingInputContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tracking ID</TableCell>
                                <TableCell>Weight (kg)</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                        {addedParcels.map((parcel, index) => (
                            <TableRow key={index}>
                                <TableCell>{parcel.trackingNumber || "N/A"}</TableCell>
                                <TableCell>{parcel.weightKg || "N/A"} kg</TableCell>
                                <TableCell>{parcel.status || "N/A"}</TableCell>
                            </TableRow>
                        ))}
                        </tbody>
                    </Table>
                </Content>
            </MainContent>
        </Container>
    );
};

export default AddPaletParcel;

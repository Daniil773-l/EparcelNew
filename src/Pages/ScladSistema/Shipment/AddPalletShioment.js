import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import HeaderContainer from "../ScaldComponets/WarehouseAccountingHeader";
import Sidebar from "../ScaldComponets/Sidebar";
import { getFirestore, collection, getDocs, updateDoc,doc ,getDoc,where,query} from "firebase/firestore";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'SFUIText', sans-serif;
    }
`;

const Container = styled.div`
    ${tw`min-h-screen flex flex-col`}
`;

const MainContent = styled.div`
    ${tw`flex flex-col lg:flex-row`}
    flex-grow: 1;
`;

const Content = styled.div`
    ${tw`flex-grow p-8`}
`;

const Heading = styled.h1`
    ${tw`text-green-500 font-extrabold text-4xl mb-6`}
    text-align: center;
`;

const SectionTitle = styled.h2`
    ${tw`text-green-500 font-bold text-2xl mb-4`}
    text-align: center;
`;

const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 2px;
    width: 100%;
    margin: 20px 0;
`;

const InfoSection = styled.div`
    ${tw`bg-gray-100 p-4 rounded-lg shadow-md mb-8`}
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoItem = styled.div`
    ${tw`text-gray-700`}
    font-size: 16px;
`;

const PrintButton = styled.button`
    ${tw`bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-green-600`}
`;

const TableContainer = styled.div`
    ${tw`mt-6 grid grid-cols-2 gap-8`}
`;

const TableWrapper = styled.div`
    ${tw`shadow-lg rounded-lg bg-white`}
`;

const Table = styled.table`
    ${tw`w-full border-collapse`}
`;

const TableHead = styled.thead`
    ${tw`bg-green-100`}
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    ${tw`bg-gray-100`}
  }
`;

const TableCell = styled.td`
  ${tw`border px-4 py-2 text-center`}
  font-size: 14px;
`;

const IconButton = styled.div`
  ${tw`flex justify-center items-center cursor-pointer`}
  svg {
    ${tw`text-green-500 hover:text-green-600 transition-all`}
    font-size: 1.5rem;
  }
`;

const RemoveButton = styled(IconButton)`
  svg {
    ${tw`text-red-500 hover:text-red-600`}
  }
`;

const InputShipment = () => {
    const [pallets, setPallets] = useState([]);
    const [shipmentPallets, setShipmentPallets] = useState([]);
    const [shipmentDetails, setShipmentDetails] = useState({
        shipmentId: "9",
        totalPallets: 0,
        grossWeight: 0,
        customFees: 0,
    });
    const location = useLocation();
    const shipment = location.state?.shipment;
    const db = getFirestore();

    useEffect(() => {
        fetchPallets();
    }, []);

    const fetchPallets = async () => {
        try {
            const snapshot = await getDocs(collection(db, "Палеты"));
            const data = snapshot.docs.map((doc, index) => ({
                id: doc.id,
                ...doc.data(),
                number: index + 1,
            }));
            setPallets(data);
        } catch (error) {
            console.error("Ошибка загрузки паллетов:", error);
        }
    };

    const availablePallets = pallets.filter(pallet => pallet.status === "Создан");

    const addPalletToShipment = async (pallet) => {
        try {
            if (shipmentPallets.some(existingPallet => existingPallet.id === pallet.id)) {
                console.log("Эта палета уже добавлена в shipment.");
                return;
            }

            const palletRef = doc(db, "Палеты", pallet.id);
            const parcelsRef = collection(db, "parcels");

            // Получаем посылки по palletId
            const parcelQuery = query(parcelsRef, where("palletId", "==", pallet.palletId));
            const parcelSnapshot = await getDocs(parcelQuery);

            if (parcelSnapshot.empty) {
                console.error("Нет посылок, связанных с этой паллетой.");
                return;
            }

            // Обновляем статус каждой посылки в базе данных parcels
            const updateParcelPromises = parcelSnapshot.docs.map((parcelDoc) => {
                const parcelRef = doc(db, "parcels", parcelDoc.id);
                return updateDoc(parcelRef, { status: "Исходящая" });
            });
            await Promise.all(updateParcelPromises);
            console.log(`Обновлено ${parcelSnapshot.size} посылок в базе данных parcels.`);

            // Сохраняем обновлённые посылки в паллете
            const updatedParcels = parcelSnapshot.docs.map((parcelDoc) => ({
                id: parcelDoc.id,
                ...parcelDoc.data(),
                status: "Исходящая",
            }));

            const updatedPallet = {
                ...pallet,
                parcels: updatedParcels, // Обновляем посылки
                status: "Отправлено",    // Обновляем статус паллеты
            };

            // Обновляем паллету в базе данных
            await updateDoc(palletRef, updatedPallet);
            console.log("Палета успешно обновлена.");

            // Обновляем данные в shipment
            const shipmentDoc = await getShipmentDocById(shipment.shipmentId);
            const shipmentRef = shipmentDoc.ref;

            const updatedPallets = [...(shipmentDoc.data().pallets || []), updatedPallet];
            const updatedGrossWeight = parseFloat(shipmentDoc.data().grossWeight || 0) + parseFloat(pallet.weight || 0);
            const updatedCustomFees = parseFloat(shipmentDoc.data().customFees || 0) + parseFloat(pallet.totalCost || 0);

            await updateDoc(shipmentRef, {
                pallets: updatedPallets,
                totalPallets: updatedPallets.length,
                grossWeight: updatedGrossWeight,
                customFees: updatedCustomFees,
            });

            console.log("Данные shipment успешно обновлены.");

            // Обновляем локальное состояние
            setShipmentPallets(updatedPallets);
            setPallets((prev) => prev.filter((p) => p.id !== pallet.id));
            await fetchShipmentDetails();

        } catch (error) {
            console.error("Ошибка при добавлении паллеты и обновлении посылок:", error);
        }
    };







    const fetchShipmentDetails = async () => {
        try {
            const shipmentDoc = await getShipmentDocById(shipment.shipmentId);
            const shipmentData = shipmentDoc.data();
            console.log("Fetched shipment details:", shipmentData); // DEBUG LOG
            setShipmentDetails({
                shipmentId: shipmentData.shipmentId || "N/A",
                totalPallets: shipmentData.totalPallets || 0,
                grossWeight: shipmentData.grossWeight || 0,
                customFees: shipmentData.customFees || 0, // Ensure `customFees` is logged
            });
            setShipmentPallets(shipmentData.pallets || []);
        } catch (error) {
            console.error("Ошибка загрузки данных Shipment:", error);
        }
    };


    const removePalletFromShipment = async (pallet) => {
        try {
            const palletRef = doc(db, "Палеты", pallet.id);
            await updateDoc(palletRef, { status: "Создан" });

            const shipmentDoc = await getShipmentDocById(shipment.shipmentId);
            const shipmentRef = shipmentDoc.ref;
            const currentPallets = shipmentDoc.data().pallets || [];
            const updatedPallets = currentPallets.filter((p) => p.id !== pallet.id);

            const updatedGrossWeight = shipmentDoc.data().grossWeight - parseFloat(pallet.weight || 0);
            const updatedCustomFees = shipmentDoc.data().customFees - parseFloat(pallet.totalCost || 0);

            await updateDoc(shipmentRef, {
                pallets: updatedPallets,
                totalPallets: updatedPallets.length,
                grossWeight: updatedGrossWeight,
                customFees: updatedCustomFees,
            });

            // Re-fetch shipment details to update UI
            await fetchShipmentDetails();
            setPallets(prev => [...prev, pallet]);
            setShipmentPallets(updatedPallets);
        } catch (error) {
            console.error("Ошибка при удалении паллеты из Shipment:", error);
        }
    };


    useEffect(() => {
        fetchPallets();
        fetchShipmentDetails();
    }, []);

    const getShipmentDocById = async (shipmentId) => {
        const db = getFirestore();
        const shipmentsRef = collection(db, "Shipment");
        const q = query(shipmentsRef, where("shipmentId", "==", shipmentId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`Shipment с ID ${shipmentId} не найден`);
        }

        return querySnapshot.docs[0];
    };

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Input Shipment</Heading>
                    <Divider />
                    <InfoSection>
                        <InfoItem>
                            <strong>Shipment ID:</strong> {shipment?.shipmentId || "N/A"}
                        </InfoItem>
                        <InfoItem>
                            <strong>Total Pallets:</strong> {shipmentPallets.length}
                        </InfoItem>
                        <InfoItem>
                            <strong>Gross Weight:</strong>{" "}
                            {shipmentDetails.grossWeight
                                ? shipmentDetails.grossWeight.toFixed(2) + " kg"
                                : "0.00 kg"}
                        </InfoItem>
                        <InfoItem>
                            <strong>Custom Fees:</strong>{" "}
                            {shipmentDetails.customFees
                                ? "$" + shipmentDetails.customFees.toFixed(2)
                                : "$0.00"}
                        </InfoItem>
                        <PrintButton>Print</PrintButton>
                    </InfoSection>
                    <TableContainer>
                        <TableWrapper>
                            <SectionTitle>Available Pallets</SectionTitle>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Pallet</TableCell>
                                        <TableCell>Department</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Add</TableCell>
                                    </TableRow>
                                </TableHead>
                                <tbody>
                                {availablePallets.map((pallet) => (
                                    <TableRow key={pallet.id}>
                                        <TableCell>{pallet.number}</TableCell>
                                        <TableCell>{pallet.palletId}</TableCell>
                                        <TableCell>{pallet.warehouse || "Не указано"}</TableCell>
                                        <TableCell>{pallet.status}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => addPalletToShipment(pallet)}>
                                                <FaPlus />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </tbody>
                            </Table>
                        </TableWrapper>
                        <TableWrapper>
                            <SectionTitle>Pallets in Shipment</SectionTitle>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Pallet</TableCell>
                                        <TableCell>Department</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Remove</TableCell>
                                    </TableRow>
                                </TableHead>
                                <tbody>
                                {shipmentPallets.map((pallet, index) => (
                                    <TableRow key={pallet.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{pallet.palletId}</TableCell>
                                        <TableCell>{pallet.warehouse || "Не указано"}</TableCell>
                                        <TableCell>{pallet.status}</TableCell>
                                        <TableCell>
                                            <RemoveButton onClick={() => removePalletFromShipment(pallet)}>
                                                <FaMinus />
                                            </RemoveButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </tbody>
                            </Table>
                        </TableWrapper>
                    </TableContainer>
                </Content>
            </MainContent>
        </Container>
    );
};

export default InputShipment;
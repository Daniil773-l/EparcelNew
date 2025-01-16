import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import HeaderContainer from "./ScaldComponets/WarehouseAccountingHeader";

import Sidebar from "./ScaldComponets/Sidebar";
import { collection, addDoc, query, where, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../../FireBaseConfig";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-weight: 300;
        font-style: normal;
    }
    body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const Container = styled.div`
    ${tw`min-h-screen flex flex-col`}
`;

const MainContent = styled.div`
    ${tw`flex flex-col lg:flex-row flex-grow`}
`;

const Content = styled.div`
    ${tw`flex-grow p-8 flex flex-col`}
`;

const Heading = styled.h1`
    ${tw`text-green-1002 font-bold text-2xl`}
`;

const Divider = styled.div`
    ${tw`bg-gray-300 my-4`}
    height: 1px;
`;

const Form = styled.form`
    ${tw`flex items-center space-x-6 gap-4`}
`;

const InputContainer = styled.div`
    ${tw`flex flex-col flex-1`}
`;

const Label = styled.label`
    ${tw`text-sm font-semibold mb-1`}
    color: #d3d3d3;
`;

const Input = styled.input`
    ${tw`rounded-lg p-3 text-gray-700 border focus:outline-none focus:border-green-500`}
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    border: 1px solid #d3d3d3; /* Легкая серая граница */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    &::placeholder {
        color: #b0b0b0;
        font-style: italic;
    }
`;

const Select = styled.select`
    ${tw`border-2 rounded-lg p-3 w-full text-gray-600 `}
    border-color: #d3d3d3;
    &:hover, &:focus {
        border-color: #0ABD19;
    }
;
`;

const Button = styled.button`
    ${tw`text-white font-bold py-3 px-8 rounded-lg`}
    background-color: #0ABD19;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #008f14;
        transform: scale(1.05);
    }
`;

const TableContainer = styled.div`
    ${tw`mt-8 w-full`}
    display: flex;
    justify-content: center;
`;

const Table = styled.table`
    ${tw`w-full bg-white rounded-lg shadow-lg border-collapse`}
`;

const TableHeader = styled.th`
    ${tw`p-4 text-left bg-green-100 text-green-700`}
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        ${tw`bg-gray-100`}
    }

    &:hover {
        ${tw`bg-gray-200`}
    }
`;

const TableCell = styled.td`
    ${tw`p-4 text-gray-700`}
    font-size: 0.9rem;
`;

const EmptyState = styled.div`
    ${tw`text-center text-gray-500 p-8`}
    font-size: 1.2rem;
`;

const MainPage = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [trackingId, setTrackingId] = useState('');
    const [packages, setPackages] = useState([]);
    const trackingIdRef = useRef(null);

    useEffect(() => {
        setCurrentDate(new Date().toISOString().split('T')[0]);
        trackingIdRef.current?.focus();
    }, []);

    const processPackage = useCallback(async () => {
        if (!selectedService || !trackingId) return;

        try {
            const q = query(collection(db, "parcels"), where("trackingNumber", "==", trackingId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, { status: "На складе", dateReceived: currentDate });

                if (!packages.some(pkg => pkg.trackingId === trackingId)) {
                    setPackages(prev => [
                        ...prev,
                        { service: selectedService, trackingId, date: currentDate }
                    ]);
                }
            } else {
                const newPackage = { service: selectedService, trackingId, date: currentDate };
                await addDoc(collection(db, "receivedPackages"), newPackage);

                setPackages(prev => [
                    ...prev,
                    newPackage
                ]);
            }
            setTrackingId('');
            trackingIdRef.current?.focus();
        } catch (error) {
            console.error("Error processing package:", error);
        }
    }, [selectedService, trackingId, currentDate, packages]);

    const handleAddPackage = async (e) => {
        e.preventDefault();
        await processPackage();
    };

    const handleScannerInput = async (e) => {
        if (e.key === 'Enter') {
            await processPackage();
        }
    };

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Приём посылок</Heading>
                    <Divider />
                    <Form onSubmit={handleAddPackage}>
                        <InputContainer>
                            <Label>Выберите службу доставки</Label>
                            <Select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                                <option value="">Выберите службу</option>
                                {["Amazon", "UPS", "FedEx", "DHL", "Lazership", "USPS", "Other"].map(service => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                            </Select>
                        </InputContainer>
                        <InputContainer>
                            <Label>Дата</Label>
                            <Input type="text" value={currentDate} readOnly />
                        </InputContainer>
                        <InputContainer>
                            <Label>Tracking ID</Label>
                            <Input
                                placeholder="Введите ID"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                ref={trackingIdRef}
                                onKeyPress={handleScannerInput}
                            />
                        </InputContainer>
                        <Button type="submit">Add Package</Button>
                    </Form>
                    {packages.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <thead>
                                <tr>
                                    <TableHeader>Служба доставки</TableHeader>
                                    <TableHeader>Tracking ID</TableHeader>
                                    <TableHeader>Дата</TableHeader>
                                </tr>
                                </thead>
                                <tbody>
                                {packages.map((pkg, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{pkg.service}</TableCell>
                                        <TableCell>{pkg.trackingId}</TableCell>
                                        <TableCell>{pkg.date}</TableCell>
                                    </TableRow>
                                ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <EmptyState>Нет добавленных посылок</EmptyState>
                    )}
                </Content>
            </MainContent>
        </Container>
    );
};

export default MainPage;

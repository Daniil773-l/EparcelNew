import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro"
import HeaderContainer from "../ScaldComponets/WarehouseAccountingHeader";
import Sidebar from "../ScaldComponets/Sidebar";
import { getFirestore, collection, addDoc ,getDocs} from "firebase/firestore";

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

const GreenHeading = styled.h1`
    ${tw`text-green-1002 font-bold text-2xl mb-6`}
`;

const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 1px;
    width: 100%;
    margin: 20px 0;
`;

const Form = styled.div`
    ${tw`grid gap-4 mb-6 items-center`}
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
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);

    &:hover {
        border-color: #0abd19;
    }

    &:focus {
        outline: none;
        border-color: #0abd19;
        box-shadow: 0 0 0 2px rgba(10, 189, 25, 0.2);
    }
`;

const StyledSelectContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;

    select {
        ${tw`border rounded-lg p-3 text-gray-700 w-full cursor-pointer`}
        border-color: #d1d5db;
        background-color: #f9fafb;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        transition: border-color 0.3s, box-shadow 0.3s;

        &:hover {
            border-color: #0abd19;
        }

        &:focus {
            outline: none;
            border-color: #0abd19;
            box-shadow: 0 0 0 2px rgba(10, 189, 25, 0.2);
        }
    }
`;

const ButtonContainer = styled.div`
    ${tw`flex justify-start`}
`;

const Button = styled.button`
    ${tw`bg-green-1002 text-white rounded-lg py-3 px-16 font-semibold`}
    transition: all 0.3s ease;
    border: none;
    margin-top: 15px;
    margin-left: 10px;

    &:hover {
        background-color: #278001;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px rgba(10, 189, 25, 0.2);
    }
`;

const AddPalet = () => {
    const [warehouse, setWarehouse] = useState("");
    const [palletNumber, setPalletNumber] = useState(null); // Убираем начальное значение 1
    const [generatedPallet, setGeneratedPallet] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const db = getFirestore();

    useEffect(() => {
        fetchLastPalletNumber(); // Загрузка последнего номера паллета из базы
    }, []);

    const fetchLastPalletNumber = async () => {
        try {
            const palletsRef = collection(db, "Палеты");
            const snapshot = await getDocs(palletsRef);
            if (!snapshot.empty) {
                const lastPallet = snapshot.docs[snapshot.docs.length - 1].data();
                const lastPalletNumber = parseInt(lastPallet.palletId.split("-")[1]); // Извлекаем число из PalletId
                setPalletNumber(lastPalletNumber + 1); // Увеличиваем номер
            } else {
                setPalletNumber(1); // Если это первый паллет, начинаем с 1
            }
        } catch (error) {
            console.error("Ошибка при получении последнего номера паллета:", error);
        }
    };

    useEffect(() => {
        if (palletNumber !== null) {
            generatePalletNumber();
        }
    }, [palletNumber]);

    const generatePalletNumber = () => {
        const newPallet = `#EPL-${String(palletNumber).padStart(8, "0")}`;
        setGeneratedPallet(newPallet);
    };

    const handleAddPallet = async () => {
        if (!warehouse || !selectedDate) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const palletData = {
            palletId: generatedPallet,
            warehouse,
            date: selectedDate,
            status: "Создан", // Добавляем статус "Создан"
        };

        try {
            await addDoc(collection(db, "Палеты"), palletData);
            alert(`Паллет добавлен: ${generatedPallet}`);
            setPalletNumber((prev) => prev + 1); // Увеличиваем номер для следующего паллета
            setWarehouse("");
            setSelectedDate("");
        } catch (error) {
            console.error("Ошибка при добавлении паллета:", error);
            alert("Ошибка при добавлении паллета.");
        }
    };

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <GreenHeading>Добавить новый паллет</GreenHeading>
                    <Divider />
                    <Form>
                        <InputContainer>
                            <Label>Pallet</Label>
                            <Input
                                type="text"
                                value={generatedPallet}
                                readOnly
                                placeholder="#EPL-00000001"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Дата</Label>
                            <Input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Склад</Label>
                            <StyledSelectContainer>
                                <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                                    <option value="" disabled>
                                        Выберите склад
                                    </option>
                                    {["США", "Склад 2"].map((warehouse, index) => (
                                        <option key={index} value={warehouse}>
                                            {warehouse}
                                        </option>
                                    ))}
                                </select>
                            </StyledSelectContainer>
                        </InputContainer>
                        <ButtonContainer>
                            <Button onClick={handleAddPallet}>Добавить</Button>
                        </ButtonContainer>
                    </Form>
                </Content>
            </MainContent>
        </Container>
    );
};

export default AddPalet;

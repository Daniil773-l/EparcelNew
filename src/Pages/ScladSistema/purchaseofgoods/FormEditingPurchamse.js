import React, { useState,useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import Sidebar from "../ScaldComponets/Sidebar";
import HeaderContainer from "../ScaldComponets/WarehouseAccountingHeader";
import { useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Импорт стрелок из react-icons
import { doc, onSnapshot, updateDoc, getFirestore ,collection,where,query,getDocs,addDoc} from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import { Toaster, toast } from "react-hot-toast";
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

// Основной контейнер
const Container = styled.div`
    ${tw`min-h-screen flex flex-col`}
`;

const MainContent = styled.div`
    ${tw`flex flex-grow`}
`;

const Content = styled.div`
    ${tw`flex-grow p-8`}
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
   
`;

// Customer Information - компактная таблица
const TableContainer = styled.div`
    ${tw`mb-8 p-4 rounded-lg`}
    background-color: #FAFAFA;
    border: 1px solid #E0E0E0;
`;

const TableHeader = styled.div`
    ${tw`text-gray-500 text-sm font-semibold uppercase`}
    display: grid;
    grid-template-columns: 1fr 1fr 2fr 2fr 1.5fr;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 2fr 2fr 1.5fr;
    padding: 8px 0;
    font-size: 14px;
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const TableCell = styled.div`
    ${tw`text-gray-700`}
`;

// Заголовок раздела
const SectionTitle = styled.h2`
    ${tw`text-lg font-bold mb-6`}
    color: #0ABD19;
    border-bottom: 2px solid #0ABD19;
    padding-bottom: 10px;
`;
const Title = styled.h2`
    ${tw`text-lg font-bold mb-6`}
    color:#0ABD19;
    border-bottom: 2px solid rgba(90, 90, 90, 0.5);

    padding-bottom: 10px;
`;
// Элементы формы
const Row = styled.div`
    ${tw`grid grid-cols-3 gap-8 mb-6`}
`;

const Label = styled.label`
    ${tw`block text-sm font-semibold mb-2 text-gray-600`}
`;
const Input = styled.input`
    ${tw`w-full p-3 rounded-lg border`}
    border: 1px solid #E0E0E0; /* Светлая граница */
   
    &:focus {
        border-color: #4CAF50; /* Зелёная граница при фокусе */
        box-shadow: none; /* Убираем тень */
        outline: none; /* Убираем стандартное выделение */
    }
`;

const Select = styled.select`
    ${tw`w-full p-3 rounded-lg border border-gray-300`}
`;

const ButtonContainer = styled.div`
    ${tw`flex justify-start gap-4 mt-8`}
`;

const GreenButton = styled.button`
    ${tw`bg-green-1002 text-white py-2 px-20 rounded-lg`}
    border: none;
    &:hover {
        background-color:#0ABD19;
    }
`;

const GrayButton = styled.button`
    ${tw`bg-gray-200 text-gray-900 py-2 px-20 rounded-lg`}
    border: none;
    &:hover {
        background-color: #ddd;
    }
`;
const SelectContainer = styled.div`
    ${tw`relative`}
    width: 100%; /* Контейнер устанавливает ширину */
`;

const CustomSelect = styled.div`
    ${tw`w-full bg-white border border-gray-300 rounded-lg p-3 cursor-pointer flex justify-between items-center`}
    &:hover {
        border-color: #0ABD19;
    }
    border: 1px solid #E0E0E0; /* Добавление границы */
    border-radius: 8px; /* Закругленные углы */
   
`;


const OptionsContainer = styled.ul`
    ${tw`absolute bg-white border border-gray-300 rounded-lg mt-1 shadow-lg h-56 overflow-y-auto z-10`}
    width: 100%; /* Наследуем ширину от контейнера */
    list-style: none; /* Убираем точки списка */
    padding: 0; /* Убираем внутренние отступы */
    margin: 0; /* Убираем внешние отступы */
`;

const Option = styled.li`
    ${tw`p-3 cursor-pointer hover:bg-gray-100`}
    ${({ selected }) => selected && tw`bg-green-100 text-green-700`};
    border-bottom: 1px solid #E0E0E0; /* Линия между пунктами */
    &:last-child {
        border-bottom: none; /* Убираем нижнюю линию у последнего пункта */
    }
`;


const ArrowIcon = styled.div`
    ${tw`ml-2`}
    display: inline-block;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(180deg)")};
    transition: transform 0.2s;
    font-size: 12px; /* Размер стрелки */
    color: #0ABD19; /* Цвет стрелки */
`;
const statuses = [

    "Требует подтверждения (если после проверки цены не совпадают)",
    "Отменен (если клиент не согласен с изменениями цен)",
    "Подтвержден (когда просмотрен из админки и проверен)",
    "Оплачен (когда клиент оплатил)",
    "Выкуплен, ожидает отправки (еще нет track номера)",
    "Выкуплен ,создаем посылку (есть track и создаем посылку)",
];

const FormProcessingPurchase = ({ documentId }) => {
    const location = useLocation();
    const { item } = location.state || {}; // Получение данных из state
    const [status, setStatus] = useState(item?.status || "Создан (когда создан клиентом)");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!documentId && !item?.requestNumber) {
            console.error("Ни documentId, ни requestNumber не указаны!");
            return;
        }

        let unsubscribe;

        if (documentId) {
            // Если documentId указан, используем его
            const docRef = doc(db, "выкуп_товаров", documentId);

            unsubscribe = onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Данные документа:", snapshot.data()); // Для проверки
                } else {
                    console.warn("Документ не найден!");
                }
            });
        } else if (item?.requestNumber) {
            // Если есть requestNumber, ищем документ по запросу
            const collectionRef = collection(db, "выкуп_товаров");
            const q = query(collectionRef, where("requestNumber", "==", item.requestNumber));

            unsubscribe = onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    console.log("Данные из запроса:", querySnapshot.docs[0].data()); // Для проверки
                } else {
                    console.warn("Документ с таким requestNumber не найден!");
                }
            });
        }

        return () => unsubscribe && unsubscribe(); // Отписываемся при размонтировании
    }, [documentId, item?.requestNumber]);


    const handleSave = async (selectedStatus = null) => {
        try {
            const cleanedStatus = selectedStatus
                ? typeof selectedStatus === "string"
                    ? selectedStatus.replace(/\s*\([^)]*\)/g, "").trim()
                    : status
                : status.replace(/\s*\([^)]*\)/g, "").trim();

            console.log("Очищенный статус:", cleanedStatus);

            const updatedData = {
                status: cleanedStatus,
                trackNumber: document.querySelector("#trackNumber")?.value || "",
                delivery: document.querySelector("#delivery")?.value || "",
                comment: document.querySelector("#comment")?.value || "",
            };

            const documentRef = doc(db, "выкуп_товаров", item?.id);
            await updateDoc(documentRef, updatedData);

            if (cleanedStatus === "Выкуплен ,создаем посылку") {
                const parcelsData = {
                    actualWeight: "",
                    attachedFiles: [],
                    comment: updatedData.comment || "",
                    createdAt: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) || "",
                    dateReceived: new Date().toISOString().split("T")[0] || "",
                    height: "",
                    id: item.requestNumber || "",
                    length: "",
                    parcelName: `Выкуп товаров` || "",
                    products: item.products || [],
                    recipient: {
                        address: item?.delivery || "",
                        city: "",
                        email: "",
                        id: item?.userId || "",
                        iin: "",
                        issueDate: "",
                        issuedBy: "",
                        name: "",
                        passportNumber: "",
                        patronymic: "",
                        phone: "",
                        surname: "",
                    },
                    shelfNumber: "",
                    status: "Создана",
                    storeName: item.storeName || "",
                    totalCost: (item.products?.reduce((sum, product) => sum + Number(product.productPrice || 0) * Number(product.productQuantity || 1), 0) || 0).toFixed(2) || "",
                    totalQuantity: item.products?.reduce((sum, product) => sum + Number(product.productQuantity || 0), 0) || "",
                    trackingNumber: updatedData.trackNumber || "",
                    userId: item.userId || "",
                    volumetricWeight: "",
                    warehouse: item.warehouse || "",
                    width: "",
                };

                const parcelsCollection = collection(db, "parcels");
                await addDoc(parcelsCollection, parcelsData);
                toast.success("Посылка успешно создана!");
            }

            setStatus(cleanedStatus);
            setIsOpen(false);
            toast.success("Данные успешно сохранены!");
            setTimeout(() => {
                navigate("/purchaseofgoodssclad");
            }, 2000); // Задержка 2 секунды
        } catch (error) {
            console.error("Ошибка при добавлении данных в parcels:", error);
            toast.error("Ошибка при сохранении данных!");
        }
    };

    const handleOptionClick = (selectedStatus) => {
        console.log("Выбранный статус:", selectedStatus);
        handleSave(selectedStatus);
    };




    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Toaster position="top-right" reverseOrder={false} /> {/* Добавляем Toaster */}

                    {/* Customer Information */}
                    <Title>Заявка на выкуп товаров</Title>
                    <SectionTitle>Customer Information</SectionTitle>
                    <TableContainer>
                        <TableHeader>
                            <TableCell>№ заявки</TableCell>
                            <TableCell>ID клиента</TableCell>
                            <TableCell>Имя и фамилия</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Телефон</TableCell>
                        </TableHeader>
                        <TableRow>
                            <TableCell>{item?.requestNumber || "—"}</TableCell>
                            <TableCell>{item?.userId || "—"}</TableCell>
                            <TableCell>{item?.firstName +" " +item?.lastName || "—"}</TableCell>
                            <TableCell>{item?.email || "—"}</TableCell>
                            <TableCell>{item?.phone || "—"}</TableCell>
                        </TableRow>
                    </TableContainer>

                    {/* General Information */}
                    <SectionTitle>General Information</SectionTitle>
                    <Row>
                        <div>
                            <Label>Тип товара</Label>
                            <Input defaultValue={item?.products[0]?.productType || ""} />
                        </div>
                        <div>
                            <Label>Бренд товара</Label>
                            <Input defaultValue={item?.products[0]?.productBrand|| ""} />
                        </div>
                        <div>
                            <Label>Цвет и размер товара</Label>
                            <Input defaultValue={item?.products[0]?.productColor|| ""} />
                        </div>

                    </Row>
                    <Row>
                        <div>
                            <Label>Количество товара</Label>
                            <Input defaultValue={item?.products[0]?.productQuantity|| ""} readOnly />
                        </div>
                        <div>
                            <Label>Цена за шт</Label>
                            <Input defaultValue={item?.products[0]?.productPrice|| ""}  readOnly/>
                        </div>
                        <div>
                            <Label>Общая цена</Label>
                            <Input defaultValue={item?.products[0]?.productPrice * item?.products[0].productQuantity|| ""} readOnly/>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Label>Название магазина</Label>
                            <Input defaultValue={item?.storeName || ""}/>
                        </div>
                        <div>
                            <Label>Товар</Label>
                            <Input defaultValue={item?.products[0]?.productName || ""}/>
                        </div>
                        <div>
                            <Label>Ссылка на товар</Label>
                            {item?.products[0]?.productLink ? (
                                <button
                                    onClick={() => window.open(item.products[0].productLink, "_blank", "noopener,noreferrer")}
                                    style={{
                                        backgroundColor: "#0ABD19",
                                        color: "white",
                                        width:"300px",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "10px 20px",
                                        cursor: "pointer",

                                        fontSize: "14px",
                                    }}
                                >
                                    Открыть товар
                                </button>
                            ) : (
                                <span style={{color: "gray"}}>Ссылка не указана</span>
                            )}
                        </div>
                    </Row>
                    <Row>
                        <div style={{gridColumn: "1 / span 3"}}>
                            <Label>Комментарий</Label>
                            <textarea
                                id="comment"
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    borderRadius: "8px",
                                    border: "1px solid #E0E0E0",
                                    padding: "10px",
                                    fontSize: "14px",
                                    backgroundColor: "#F9F9F9",
                                    resize: "none",
                                }}

                                placeholder="Введите комментарий"
                                defaultValue={item?.comment || ""}
                            />
                        </div>
                    </Row>
                    {/* Additional Information */}
                    <Row style={{gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center"}}>
                        <div>
                            <Label>Что делать, если цена изменится?</Label>
                            <Input defaultValue={item?.priceChange || ""} style={{width: "100%"}} readOnly/>
                        </div>
                        <div>
                            <Label>Доставка</Label>
                            <Input id="delivery" defaultValue={item?.delivery || ""} style={{width: "100%"}}/>
                        </div>
                    </Row>
                    <Row style={{gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "24px", alignItems: "center"}}>
                        <div>
                            <Label>Текущий статус</Label>
                            <SelectContainer>
                                <CustomSelect onClick={() => setIsOpen(!isOpen)}>
                                    <span>{status}</span> {/* Используем status вместо currentStatus */}
                                    <ArrowIcon isOpen={isOpen}>
                                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    </ArrowIcon>
                                </CustomSelect>
                                {isOpen && (
                                    <OptionsContainer>
                                        {statuses.map((statusOption) => (
                                            <Option
                                                key={statusOption}
                                                selected={status === statusOption}
                                                onClick={() => handleOptionClick(statusOption)}
                                            >
                                                {statusOption}
                                            </Option>
                                        ))}
                                    </OptionsContainer>
                                )}

                            </SelectContainer>
                        </div>

                        <div>
                            <Label>Трек номер</Label>
                            <Input id="trackNumber" defaultValue={item?.trackNumber || ""} style={{width: "100%"}}/>
                        </div>
                    </Row>


                    {/* Buttons */}
                    <ButtonContainer>
                        <GreenButton onClick={handleSave}>Save</GreenButton>
                        <GrayButton>Come back</GrayButton>
                    </ButtonContainer>


                </Content>
            </MainContent>
        </Container>
    );
};

export default FormProcessingPurchase;

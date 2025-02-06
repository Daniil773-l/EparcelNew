import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled , { createGlobalStyle } from 'styled-components';

import toast, { Toaster } from 'react-hot-toast';
import AnimationRevealPage from "../../../components/helpers/AnimationRevealPage";
import MainCabinetHeader from "../../../components/headers/MainCabinetHeader";
import { ExpecteLink } from "../../../components/misc/Headings.js";
import { db, auth } from "../../../FireBaseConfig";
import { collection, doc,addDoc, updateDoc } from "firebase/firestore";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Select from "react-select";
const GlobalStyles = createGlobalStyle`
  input:focus {
    outline: none; /* Убираем стандартный фокус */
    box-shadow: none; /* Убираем тень */
  }
`;
const cities = [
    { value: "Almaty", label: "Алматы" },
    { value: "Astana", label: "Астана" },
    { value: "Shymkent", label: "Шымкент" },
    { value: "Karaganda", label: "Караганда" },
    { value: "Aktobe", label: "Актобе" },
    { value: "Pavlodar", label: "Павлодар" },
    { value: "Semey", label: "Семей" },
    { value: "Atyrau", label: "Атырау" },
    { value: "Kostanay", label: "Костанай" },
    { value: "Taraz", label: "Тараз" },
    { value: "Oral", label: "Уральск" },
    { value: "Kyzylorda", label: "Кызылорда" },
    { value: "Aktau", label: "Актау" },
    { value: "Taldykorgan", label: "Талдыкорган" },
    { value: "Zhezkazgan", label: "Жезказган" },
    { value: "Petropavlovsk", label: "Петропавловск" },
    { value: "Turkestan", label: "Туркестан" },
    { value: "Ekibastuz", label: "Экибастуз" },
    { value: "Rudny", label: "Рудный" },
    { value: "Temirtau", label: "Темиртау" },
    { value: "Kokshetau", label: "Кокшетау" },
    { value: "Stepnogorsk", label: "Степногорск" },
    { value: "Baykonur", label: "Байконур" },
    { value: "Saryagash", label: "Сарыагаш" },
    { value: "Zharkent", label: "Жаркент" },
    { value: "Ayagoz", label: "Аягоз" },
    { value: "Balkhash", label: "Балхаш" },
    { value: "Zhanaozen", label: "Жанаозен" },
    { value: "Kapchagay", label: "Капшагай" },
    { value: "Satpayev", label: "Сатпаев" },
    { value: "Shakhtinsk", label: "Шахтинск" },
    { value: "Abay", label: "Абай" },
    { value: "Kentau", label: "Кентау" },
    { value: "Ridder", label: "Риддер" },
    { value: "Zyryanovsk", label: "Зыряновск" },
    { value: "Lisakovsk", label: "Лисаковск" },
    { value: "Esik", label: "Есик" },
    { value: "Shu", label: "Шу" },
    { value: "Talgar", label: "Талгар" },
    { value: "Tekeli", label: "Текели" },
    { value: "Zharkent", label: "Жаркент" },
    { value: "Aksay", label: "Аксай" },
    { value: "Kurchatov", label: "Курчатов" },
    { value: "Shardara", label: "Шардара" },
    { value: "Zhetysay", label: "Жетысай" },
    { value: "Sarkand", label: "Сарканд" },
    { value: "Lenger", label: "Ленгер" },
    { value: "Usharal", label: "Ушарал" },
    { value: "Zaysan", label: "Зайсан" },
    { value: "Fort-Shevchenko", label: "Форт-Шевченко" },
    { value: "Aralsk", label: "Аральск" },
    { value: "Zhanatas", label: "Жанатас" },
    { value: "Karazhal", label: "Каражал" },
    { value: "Priozersk", label: "Приозёрск" },
    { value: "Kandyagash", label: "Кандыагаш" },
    { value: "Atbasar", label: "Атбасар" },
    { value: "Bulaevo", label: "Булаево" },
    { value: "Stepnyak", label: "Степняк" },
    { value: "Zhualy", label: "Жуалы" },
    { value: "Derzhavinsk", label: "Державинск" }

];
const customStyles = {

    control: (base, state) => ({
        ...base,
        borderColor: state.isFocused ? "#0ABD19" : "#D1D5DB", // Граница зелёного цвета при фокусе
        boxShadow: state.isFocused ? "0 0 0 2px #A7F3D0" : "none", // Тень зелёного цвета при фокусе
        "&:hover": {
            borderColor: "#0ABD19",
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#A7F3D0" : state.isFocused ? "#D1FAE5" : "white", // Фон зелёный при выборе и наведении
        color: state.isSelected ? "#065F46" : "#111827", // Тёмно-зелёный текст для выбранного пункта
        "&:hover": {
            backgroundColor: "#D1FAE5", // Светло-зелёный при наведении
            color: "#065F46",
        },
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#0ABD19", // Индикатор зелёного цвета
        "&:hover": {
            color: "#065F46",
        },
    }),
    clearIndicator: (base) => ({
        ...base,
        color: "#0ABD19", // Крестик очистки
        "&:hover": {
            color: "#065F46",
        },
    }),
    singleValue: (base) => ({
        ...base,
        color: "#065F46", // Тёмно-зелёный текст выбранного элемента
    }),
    placeholder: (base) => ({
        ...base,
        color: "#6B7280", // Серый цвет для placeholder
    }),
};
const PageContainer = styled.div`
    ${tw`min-h-screen flex flex-col`}
`;

const HighlightedText = styled.span`
    ${tw`text-primary-500`}
    color: #0ABD19;
`;

const FormContainer = styled.div`
    ${tw`flex justify-center items-center flex-grow py-10`}
`;

const Container = styled.div`
    ${tw`w-full max-w-6xl p-8 bg-white shadow-lg rounded-lg border`}
    border: 2px solid #1BA557;
    border-radius: 15px;
    padding: 60px 57px;
`;

const Title = styled.h2`
    ${tw`text-2xl font-bold mb-8`}
    color: ${({ step }) => (step === 1 ? '#1BA557' : 'black')};
    font-family: 'Gilroy Medium';
`;

const Form = styled.form`
    ${tw`grid grid-cols-2 gap-6`}
`;

const FormGroup = styled.div`
    ${tw`relative flex flex-col mb-6`}
`;

const Label = styled.label`
    ${tw`mb-2 font-medium text-lg  text-secondary-100 leading-loose`}
    margin-top: 20px;
`;

const Text = styled.h6`
    ${tw`text-gray-700 font-bold tracking-widest text-2xl`}
    margin-top: 20px;
    margin-bottom: 50px;
`;

const TextGreen = styled.h6`
    ${tw`text-green-1002  font-bold tracking-widest text-2xl`}
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Input = styled.input`
    ${tw`mt-2 py-3 focus:outline-none text-sm font-medium transition duration-300 border-b-2`}
    color: #6c757d;
    border-color: transparent;
    border-bottom-color: #adb5bd;
    font-family: inherit;

    &::placeholder {
        color: #adb5bd;
    }

    &:hover {
        border-bottom-color: #0ABD19;
    }

    &:focus {
        border-bottom-color: #0ABD19;
        box-shadow: none; /* Убираем стандартный черный бордер */
    }
`;

const StyledPhoneInput = styled(PhoneInput)`
    width: 100%;
    margin-top: 16px;

    .form-control {
        ${tw`py-3 focus:outline-none font-medium transition duration-300 border-b-2`}
        color: #6c757d;
        border-color: transparent;
        border-bottom-color: #adb5bd;
        font-family: inherit;
        padding-left: 10px; // Отступ для читаемости
        &::placeholder {
            color: #adb5bd;
        }
        &:hover {
            border-bottom-color: #0ABD19;
        }
        &:focus {
            border-bottom-color: #0ABD19;
        }
    }
    .flag-dropdown {
        display: none; // Скрываем выбор страны
    }
`;

const TextArea = styled(Input).attrs({ as: "textarea" })`
    ${tw`mt-2 w-full`}
    height: 35px;
`;

const TextAreaContainer = styled.div`
    ${tw`relative`}
`;

const Tooltip = styled.div`
    ${tw`absolute left-0 w-64 p-2 bg-white text-black opacity-0 rounded-lg transition-opacity duration-300`}
    top: 2rem;
    white-space: pre-wrap;
    pointer-events: none;
    visibility: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const IconContainer = styled.div`
    ${tw`absolute right-0 mt-5 transform translate-y-3 cursor-pointer`}
    width: 20px;
    margin-top: 60px;
    height: 20px;
    &:hover .tooltip {
        opacity: 1;
        visibility: visible;
    }
    img {
        width: 20px;
        height: 20px;
    }
`;



const ButtonContainer = styled.div`
    ${tw`flex justify-center mt-5`}
    gap: 20px;
`;

const Button = styled.button`
    ${tw`px-8 py-3 font-bold text-white rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #0ABD19;
    width: 300px;
margin-bottom: 10px;
    &:hover {
        background-color: #0ABD50;
        transform: scale(1.05);
    }
`;

const WhiteButton = styled(Button)`
    ${tw`text-green-600 bg-white border border-green-600`}
    &:hover {
        background-color: #f0f0f0;
    }
`;

const NavLink = styled.a`
    ${tw`text-green-600 bg-white border border-green-600`}
`;

const Actions = styled.div`
    ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
    button {
        ${tw`w-[200px] sm:relative sm:right-0 sm:top-0 sm:bottom-0 bg-green-500 text-white font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:leading-none focus:outline-none transition duration-300`}
        background-color: #0ABD19;
        border: none;
        &:hover,
        &:focus {
            background-color: #0ABD50;
            transform: scale(1.1);
        }
    }
`;

const StepTitle = tw(ExpecteLink)`w-full mt-2 mb-4`;
const Subheading = tw(ExpecteLink)`w-full mt-4 mb-16`;

const RecipientForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [iin, setIin] = useState("");
    const [issuedBy, setIssuedBy] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [address, setAddress] = useState("");
    const handleSelectChange = (selectedOption) => {
        setCity(selectedOption ? selectedOption.value : ""); // Обновление состояния на основе Select
    };

    const handleInputChange = (e) => {
        setCity(e.target.value); // Обновление состояния на основе Input
    };

    useEffect(() => {
        if (location.state && location.state.recipient) {
            const { recipient } = location.state;
            setSurname(recipient.surname);
            setName(recipient.name);
            setPatronymic(recipient.patronymic);
            setPhone(recipient.phone);
            setEmail(recipient.email);
            setCity(recipient.city);
            setPassportNumber(recipient.passportNumber);
            setIin(recipient.iin);
            setIssuedBy(recipient.issuedBy);
            setIssueDate(recipient.issueDate);
            setAddress(recipient.address);
        }
    }, [location.state]);

    const validateFields = () => {
        if (!surname || !name || !patronymic || !phone || !email || !city || !passportNumber || !issuedBy || !issueDate) {
            toast.error("Пожалуйста, заполните все обязательные поля!");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateFields()) return;

        const user = auth.currentUser;
        if (user) {
            const recipientData = {
                surname,
                name,
                patronymic,
                phone,
                email,
                city,
                passportNumber,
                iin,
                issuedBy,
                issueDate,
                userId: user.uid,
            };

            try {
                if (location.state && location.state.recipient) {
                    const { recipient } = location.state;
                    const docRef = doc(db, "recipients", recipient.id);
                    await updateDoc(docRef, recipientData);
                    toast.success("Данные получателя успешно обновлены!");
                } else {
                    await addDoc(collection(db, "recipients"), recipientData);
                    toast.success("Данные получателя успешно сохранены!");
                }
                resetForm();
                navigate("/RecipientsPrivateCabinet");
            } catch (error) {
                toast.error("Ошибка при сохранении данных: " + error.message);
            }

        } else {
            toast.error("Пользователь не авторизован.");
        }
    };

    const resetForm = () => {
        setSurname("");
        setName("");
        setPatronymic("");
        setPhone("");
        setEmail("");
        setCity("");
        setPassportNumber("");
        setIin("");
        setIssuedBy("");
        setIssueDate("");

    };
// Функция преобразования формата даты (ГГГГ-ММ-ДД → ДД.ММ.ГГГГ)
    const formatDate = (inputDate) => {
        if (!inputDate) return ""; // Если пустая строка, не обрабатываем
        const date = new Date(inputDate);
        if (isNaN(date.getTime())) return ""; // Проверяем, является ли дата валидной

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };
// Функция для преобразования даты из YYYY-MM-DD в DD.MM.YYYY
    const formatDateToDisplay = (inputDate) => {
        if (!inputDate) return "";
        const [year, month, day] = inputDate.split("-");
        return `${day}.${month}.${year}`;
    };

// Функция для преобразования даты обратно в формат YYYY-MM-DD (для <input type="date">)
    const formatDateToInput = (inputDate) => {
        if (!inputDate.includes(".")) return inputDate; // Если дата уже в формате YYYY-MM-DD, не менять
        const [day, month, year] = inputDate.split(".");
        return `${year}-${month}-${day}`;
    };

    return (

        <AnimationRevealPage>
            <GlobalStyles />
            <MainCabinetHeader />
            <PageContainer>
                <Toaster position="top-right" reverseOrder={false} />
                <FormContainer>
                    <div style={{ width: '100%', maxWidth: '1280px' }}>
                        <Subheading active={true}>{location.state && location.state.recipient ? "Редактировать получателя" : "Добавить получателя"}</Subheading>
                        <StepTitle active={true}><HighlightedText>Шаг 1. </HighlightedText>Заполните основные данные получателя</StepTitle>
                        <Container>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="surname">Фамилия (по удостоверению) *</Label>
                                    <Input
                                        id="surname"
                                        type="text"
                                        placeholder="Фамилия (по удостоверению)"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name">Имя (по удостоверению) *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Укажите имя"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="patronymic">Отчество (по удостоверению) *</Label>
                                    <Input
                                        id="patronymic"
                                        type="text"
                                        placeholder="Укажите отчество"
                                        value={patronymic}
                                        onChange={(e) => setPatronymic(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
                                    <Label htmlFor="phone" style={{ marginRight: '385px' }}>Телефон получателя</Label>
                                    <StyledPhoneInput
                                        country={'ru'}
                                        value={phone}
                                        onChange={(phone) => setPhone(phone)}
                                        inputStyle={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '2px solid #adb5bd',
                                            borderRadius: '0',
                                            color: '#6c757d',
                                            fontFamily: 'inherit',
                                            fontSize: '16px',
                                            paddingLeft: '10px',
                                            transition: 'border-bottom-color 0.3s',
                                            '&:hover': {
                                                borderBottomColor: '#0ABD19',
                                            },
                                            '&:focus': {
                                                borderBottomColor: '#0ABD19',
                                            },
                                            '&::placeholder': {
                                                color: '#adb5bd',
                                            },
                                        }}
                                        disableDropdown={true} // Отключаем выпадающий список стран
                                        countryCodeEditable={false} // Код страны нельзя редактировать
                                        onlyCountries={['ru']} // Только Россия
                                        isValid={(inputNumber) => {
                                            if (!inputNumber) return false;
                                            return /^\+?[\d\s-()]{10,20}$/.test(inputNumber);
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="Пример: info@eparcel.ru"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="city">Город *</Label>
                                    <div style={{marginTop: "20px"}}>
                                        <Select
                                            options={cities}
                                            value={city}
                                            onChange={(selectedOption) => setCity(selectedOption)}
                                            placeholder="Выберите город"
                                            isClearable
                                            noOptionsMessage={() => "Город не найден"}
                                            styles={customStyles}
                                        />
                                    </div>
                                </FormGroup>
                            </Form>
                        </Container>
                    </div>
                </FormContainer>
                <FormContainer>
                    <div style={{width: '100%', maxWidth: '1280px'}}>
                        <StepTitle active={true}><HighlightedText>Шаг 2. </HighlightedText>Укажите паспортные данные получателя</StepTitle>
                        <Container>
                            <TextGreen>
                                Внимание!
                            </TextGreen>
                            <Text>
                                Пожалуйста, внимательно указывайте паспортные данные для международной доставки.
                            </Text>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="passportNumber">Номер удостоверение личности *</Label>
                                    <Input
                                        id="passportNumber"
                                        type="number"
                                        maxLength={9}
                                        placeholder="Укажите удостоверение личности"
                                        value={passportNumber}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.slice(0, 9);
                                        }}
                                        onChange={(e) => setPassportNumber(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="iin">ИИН</Label>
                                    <Input
                                        id="iin"
                                        type="number"
                                        maxLength={12}
                                        placeholder="Укажите ИИН"
                                        value={iin}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.slice(0, 12);
                                        }}
                                        onChange={(e) => setIin(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="issuedBy">Кем выдан *</Label>

                                    <Input
                                        id="issuedBy"
                                        placeholder="Укажите организацию выдачи паспорта"
                                        rows="4"
                                        value={issuedBy}
                                        onChange={(e) => setIssuedBy(e.target.value)}
                                    />

                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="issueDate">Дата выдачи *</Label>
                                    <Input
                                        id="issueDate"
                                        type="date"
                                        value={formatDateToInput(issueDate)} // Дата в формате YYYY-MM-DD
                                        onChange={(e) => setIssueDate(formatDateToDisplay(e.target.value))} // Конвертируем в DD.MM.YYYY
                                    />



                                </FormGroup>
                            </Form>
                        </Container>
                    </div>
                </FormContainer>
                <ButtonContainer>
                    <Button type="button" onClick={handleSave}>Сохранить</Button>
                    <NavLink href="/RecipientsPrivateCabinet">
                        <WhiteButton type="button">Вернуться</WhiteButton>
                    </NavLink>
                </ButtonContainer>
            </PageContainer>
        </AnimationRevealPage>
    );
};

export default RecipientForm;

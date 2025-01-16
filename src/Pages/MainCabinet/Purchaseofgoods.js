import React, {useState, useEffect, useCallback} from 'react';
import styled, {css} from 'styled-components';
import tw from 'twin.macro';
import {
    collection,
    query,
    where,
    doc,
    getDoc,
    updateDoc,
    getDocs,
    addDoc,
    deleteDoc,
    onSnapshot,
    getFirestore
} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { Toaster, toast } from 'react-hot-toast';

import {useNavigate} from 'react-router-dom';
import {ExpecteLink} from "../../components/misc/Headings";
import Header from '../../components/headers/MainCabinetHeader';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from '../../components/footers/MainFooterWithLinks';
import usFlag from '../../images/icon/us-icon.png';
import trFlag from '../../images/icon/tr-icon.png';
import {useLocation} from 'react-router-dom';
import {MdDelete} from "react-icons/md";
import InputMask from 'react-input-mask';

import Box from '../../images/img/BeautifullTinyBox.svg';

import {FaCheck, FaTimes} from 'react-icons/fa';

import Swal from 'sweetalert2';
import { MdOutlinePayment } from "react-icons/md";
const Container = styled.div`
    ${tw`relative w-full`}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;

const InfoContainer = styled.div`
    ${tw`flex w-full items-center justify-start gap-2 mt-4`};
    padding-left: 0;  // Убираем лишние отступы слева
    padding-right: 0; // Убираем отступы справа
    margin-left: 0;   // Убираем отступы слева
    margin-right: 0;  // Убираем отступы справа
    margin-bottom: 10px;  // Добавляем небольшой отступ снизу
`;

const InfoBox = styled.div`
    ${tw`flex items-center justify-between bg-white shadow-md rounded-lg p-2 cursor-pointer`}
    border: 1px solid #0ABD19;
    width: auto;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    background-color: ${(props) => (props.isHighlighted ? "#EBFAE5" : "white")};
    color: ${(props) => (props.isHighlighted ? "white" : "#000000")};

    &:hover {
        background-color: #EBFAE5;
    }
`;


const InfoText = styled.span`
    ${tw`text-black`}
    font-size: 0.875rem;
`;

const IconButton = styled.a`
    ${tw`ml-4 bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    background-color: #0ABD19;
    border: none;
    margin-left: 0; /* изменено */
    margin-top: 0;
    width: 20px;
    height: 20px;

    &:hover, &:focus {
        transform: scale(1.1);
    }
`;

const TwoColumn = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-start max-w-screen-xl mx-auto py-20 md:py-24`}
`;

const LeftColumn = styled.div`
    ${tw`relative w-full text-left mx-auto`}
`;

const Heading = styled.h1`
    ${tw`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl leading-tight`}
    margin-bottom: 20px;
    color: #2D2D2D;
`;

const PrimaryButton = styled.button`
    ${tw`px-6 py-2 font-semibold rounded-lg shadow-md bg-white text-lg text-gray-600`}
    ${tw`h-10 w-full sm:w-auto`}
    ${tw`m-2`}
    border: 2px solid #0ABD19;

    &:hover {
        ${tw`text-black bg-green-200`}
    }

    &:focus {
        ${tw`text-black bg-green-200`}
    }

    ${({selected}) =>
    selected &&
    css`
                ${tw`bg-green-200 border-green-600 text-black`}
            `}
`;

const ButtonContainer1 = styled.div`
    ${tw`flex flex-wrap items-center justify-start gap-4`}
    ${tw`p-0`}
    ${tw`sm:px-0 md:px-0 lg:px-0 xl:px-0`}
    ${tw`mt-8`}
`;

const Actions1 = styled.div`
    ${tw`relative flex items-center w-full `}
`;

const InputContainer = styled.div`
    ${tw`relative flex-grow flex items-center`}
    margin-right: 1rem;
`;

const SearchInput = styled.input`
    ${tw`pl-10 pr-4 py-3 rounded-full w-full font-medium`}
    height: 20px;
    border: 2px solid #0ABD19;

    &:hover {
        border: 2px solid #0ABD19;
    }

    &:focus {
        border: 2px solid #0ABD19;
    }
`;

const SearchIconContainer = styled.div`
    ${tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}
`;

const AddButton = styled.button`
    ${tw`ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    height: 37px;
    background-color: #0ABD19;
    border: none;
    margin-right: 15px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    &:hover, &:focus {
        background-color: #025e07;
    }
`;
const InfoMessageBox = styled.div`
    ${tw`flex flex-col items-start p-3 bg-yellow-100 rounded-xl mt-10 mb-5`} /* Добавлен отступ снизу (mb-5) */ width: calc(99% - 2rem); /* Уменьшена ширина до 80% */
    max-width: 99%; /* Ограничение ширины */
    color: #333;
    border: 2px solid #dad8b6;
    background-color: #fffbe5;
`;


const StyledNavLink = styled.a`
    text-decoration: none;
    font-size: 0.875rem;
    
`;

const InfoMessageHeading = styled.h2`
    ${tw`text-lg font-bold mb-2`}
`;

const InfoMessageText = styled.p`
    ${tw`text-base`}
`;

const BottomButtonsContainer = styled.div`
    ${tw`flex justify-start gap-4 mt-8 sm:px-0 md:px-0 lg:px-0 xl:px-0`}
`;

const BottomButton = styled.button`
    ${tw`w-auto bg-green-500 text-white font-bold py-4 px-6 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    background-color: #0ABD19;
    border: none;

    &:hover, &:focus {
        transform: scale(1.1);
    }
`;

const Icon1 = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

const ParcelCard = styled.div`
    ${tw`bg-white rounded-lg p-3 mb-4`}
    border: 1px solid #d9d9d9;
    cursor: pointer;
    border-radius: 15px;
    padding: 16px; /* Adjust padding to reduce overall height */
`;
const ParcelCardSclad = styled.div`
    ${tw`bg-white rounded-lg p-3 mb-4`}
    border: 1px solid #d9d9d9;
    cursor: pointer;
    border-radius: 15px;
    padding: 16px;
    position: relative;
`;
const ParcelHeading = styled.div`
    ${tw`flex items-center justify-between`}
`;

const ParcelColumn = styled.div`
    ${tw`flex flex-col`}
    margin-left: 4%;
    display: flex;
`;

const ColumnTitle = styled.h4`
    ${tw`text-sm font-medium inline-block `} /* Ensure this remains inline */ margin-right: 0.5rem; /* Add some space between the title and text */
    line-height: 0.1; /* Adjust line-height to ensure alignment */
`;

const ColumnText = styled.span`
    ${tw`text-sm text-gray-600 inline-block`} /* Ensure this remains inline */ line-height: 1.5; /* Adjust line-height to ensure alignment */
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Hide overflow if the text is too long */
    text-overflow: ellipsis; /* Add ellipsis for overflow text */
    vertical-align: middle; /* Align vertically with the title */
`;

const ParcelID = styled.div`
    ${tw`flex items-center text-lg`}
    width: 41%;
    color: #0ABD19;
`;

const SectionTitle = styled.h3`
    ${tw`font-medium text-sm justify-start items-start`} /* Reduced font size for section title */ width: 34%;
    color: #2D2D2D;
`;

const SectionThirdTitle = styled.h3`
    ${tw`font-semibold text-sm`}
    width: 25%;
    color: #2D2D2D;
`;

const LeftAlignedParcelColumn = styled(ParcelColumn)`
    margin-right: 10%; /* Настраиваем отступ влево */
`;

const RightAlignedParcelColumn = styled(ParcelColumn)`
    margin-left: 7%; /* Настраиваем отступ влево */
`;

const ExpandButton = styled.button`
    ${tw`ml-2 font-medium text-sm py-1 px-3 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    border: none;
    color: #0ABD19;
    font-size: 18px; /* Adjust font size for arrow */
    background-color: transparent;

    &:hover, &:focus {
        transform: scale(1.1);
    }
`;

const ExpandedInfo = styled.div`
    ${tw`mt-4 ml-12`}
`;

const ParcelInfo = styled.div`
    ${tw`flex justify-between items-start mt-2 `} /* Reduced margin top to decrease height */
`;

const TableContainer = styled.div`
    ${tw`w-full mt-4`}
`;
const TableRow = styled.div`
    ${tw`flex justify-between items-center py-2`}
    border-bottom: 1px solid #e5e7eb;
`;
const TableRowFirst = styled.div`
    ${tw`flex justify-between items-center py-2`}
`;

const TableHeader = styled(TableRow)`
    border-bottom: 1px solid #e5e7eb;
`;

const TableCell = styled.div`
    ${tw`text-sm text-gray-600`}
    width: 20%; /* Уменьшение ширины для других ячеек */
    text-align: left;
`;
const TotalCostCell = styled.div`
    ${tw`text-sm`}
    width: 20%;
    color: #0ABD19;
    text-align: left;
`;

const TableCellFirst = styled.div`
    ${tw`text-sm text-gray-600`}
    width: 40%; /* Увеличение ширины, чтобы текст помещался */
    text-align: left;
`;

const TotalRow = styled.div`
    ${tw`flex justify-between items-center py-2`}
`;


const TotalCell = styled.div`
    ${tw`text-sm font-bold text-green-600`}
    text-align: right;
`;

const EditLink = styled(StyledNavLink)`
    ${tw`text-sm text-green-600`}
    margin-left: auto;
`;

const ProductsTitle = styled.h4`
    ${tw`font-semibold text-lg`}
    color: #2D2D2D;
    margin-bottom: 0.5rem;
`;

const SendParcelButton = styled.div`
    ${tw`flex items-center cursor-pointer`}
    color: #0ABD19;
    font-size: 14px;
    padding: 0.5rem 0;
    border-bottom: 1px dashed #0ABD19;
`;

const GreenLabel = styled.div`
    ${tw`flex items-center justify-center text-white text-sm font-bold`}
    background-color: #0ABD19;
    border-radius: 0 15px 15px 0;
    padding: 0.5rem 1rem;
    height: 100%;
    margin-left: auto;
`;

const StyledParcelCard = styled(ParcelCard)`
    display: flex;
    align-items: center;
`;
const SendParcelLink = styled.p`
    ${tw`text-green-600 text-sm font-medium`}
    display: flex;
    align-items: center;
    text-decoration: none;
    padding-bottom: 4px;
    border-bottom: 1px dashed #00bc00;
    margin-top: 10px;
`;
const PaymentParcelLink = styled.p`
    ${tw`text-green-600 text-sm font-medium`}
    display: flex;
    align-items: center;
    text-decoration: none;
    padding-bottom: 4px;
    border-bottom: 1px dashed #00bc00;
    margin-top: 10px;
`;
const SendParcelIcon = styled.img`
    width: 20px;
    height: auto;
    margin-right: 5px;
`;
const GreenStrip = styled.div`
    ${tw`absolute top-0 right-0 h-full`}; /* Убрано скругление */
    width: 40px;
    background-color: #00bc00;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const CardHeaderLink = styled.a`
    ${tw`text-white text-sm font-medium relative flex-shrink-0 h-auto py-10 no-underline`}
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
    padding-right: 20px;
    padding-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;

    @media (max-width: 768px) {
        writing-mode: horizontal-tb;
        transform: rotate(0);
        padding: 10px;
        border-left: none;
        border-bottom: 2px solid #00bc00;
    }
`;

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

const Container12 = styled.div`
    ${tw`w-full max-w-6xl p-8 bg-white shadow-lg rounded-lg border`}
    border: 2px solid #1BA557;
    border-radius: 15px;
    padding: 60px 57px;
`;

const Title = styled.h2`
    ${tw`text-2xl font-bold mb-8`}
    color: ${({step}) => (step === 1 ? '#1BA557' : 'black')};
    font-family: 'Gilroy Medium';
`;

const Form = styled.form`
    ${tw`grid grid-cols-2 gap-6`}
`;

const FormGroup = styled.div`
    ${tw`relative flex flex-col mb-6`}
`;

const Label = styled.label`
    ${tw`mt-1 sm:mt-0 mb-2 font-medium text-secondary-100 leading-loose`}
`;

const Text = styled.h6`
    ${tw`text-gray-500 font-bold tracking-widest text-lg`}
    margin-top: 20px;
    margin-bottom: 50px;
`;

const Input = styled.input`
    ${tw`mt-2 first:mt-0 py-3 focus:outline-none font-medium transition duration-300 border-b-2`}
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
    }
`;

const InputSpis = styled.input`
    ${tw`mt-2 first:mt-0 py-3 focus:outline-none font-medium transition duration-300 border-b-2`}
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
    }
`;

const TextArea = styled(InputSpis).attrs({as: "textarea"})`
    ${tw`mt-2 w-full`}
    height: 35px;
`;

const CustomSelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const CustomSelect = styled.div`
    ${tw`mt-2 w-full px-4 py-3 bg-white text-left rounded-md shadow-sm border border-gray-300 cursor-pointer`}
    color: #6c757d;
    font-family: inherit;

    &:hover {
        border-color: #0ABD19;
    }
`;

const CustomOptions = styled.ul`
    ${tw`absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md`}
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const CustomOption = styled.li`
    ${tw`px-4 py-3 text-black cursor-pointer`}
    &:hover {
        background: #f3f4f6;
    }

    ${({isSelected}) => isSelected && tw`bg-gray-200`}
`;

const SelectArrow = styled.div`
    ${tw`absolute right-0 top-0 h-full flex items-center px-2 text-gray-700 pointer-events-none`}
    &::after {
        content: '▾';
        font-size: 1.5em;
        color: #0ABD19;
    }
`;
const NavLink = styled.a`
    ${tw`px-8 py-3 font-medium text-white rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #0ABD19;
    text-decoration: none;
    border: none;

    &:hover, &:focus {
        transform: scale(1.1);
        background-color: #0ABD19;
        color: white;
    }

    &:focus::placeholder {
        color: transparent;
    }
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

const InfoIconComent = styled(IconContainer)`margin-top: -35px`;

const ButtonContainer = styled.div`
    ${tw`flex justify-center mt-10`}
    gap: 20px;
`;

const Button = styled.button`
    ${tw`px-8 py-3 font-bold text-white rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #0ABD19;

    &:hover {
        background-color: #0ABD50;
        transform: scale(1.05);
    }
`;
const ButtonCab = styled(NavLink)`
    ${tw`px-8 py-3 font-bold bg-gray-300 text-white rounded-full focus:outline-none transition-transform duration-300`}
    border: none;

    &:hover, &:focus {
        transform: scale(1.1);
        background-color: #0ABD19;
        color: white;
    }

    &:focus::placeholder {
        color: transparent;
    }
`;
const WhiteButton = styled(Button)`
    ${tw`text-green-600 bg-white border border-green-600`}
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Actions = styled.div`
    ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
    button {
        ${tw`w-[200px] sm:relative sm:right-0 sm:top-0 sm:bottom-0 bg-green-500 text-white font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:leading-none focus:outline-none transition duration-300`}
        background-color: #0ABD19; // Bright green background
        border: none;

        &:hover,
        &:focus {
            background-color: #0ABD50;
            transform: scale(1.1);
        }
    }
`;

const TabContainer = styled.div`
    ${tw`flex justify-center  items-center mt-20 mb-4`}
    gap: 10px;

`;

const TabButton = styled.button`
    ${tw`px-8 py-3 font-bold rounded-full focus:outline-none transition-transform duration-300`}
    background-color: ${({active}) => (active ? '#0ABD19' : 'white')};
    color: ${({active}) => (active ? 'white' : '#0ABD19')};
    border: 2px solid #0ABD19;

    &:hover {
        background-color: ${({active}) => (active ? '#0ABD50' : '#e6f9e6')};
        transform: scale(1.05);
    }
`;
const DeleteIconContainer = styled.div`
    ${tw`flex justify-end`}
    svg {
        ${tw`w-6 h-6 cursor-pointer`}
        color: red;

        &:hover {
            color: darkred;
        }
    }
`;
const BackButton = styled.button`
    ${tw`ml-1 px-8 py-3 font-bold text-gray-600 rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #f0f0f0;

    &:hover {
        background-color: #e0e0e0;
        transform: scale(1.05);
    }
`;
const SecondSelectArrow = styled.div`
    ${tw`absolute right-0 top-0 h-full flex items-center px-2 pointer-events-none`}
    margin-right: 5%;

    &::after {
        content: '▾';
        font-size: 2em;
        color: #0ABD19;
        margin-left: -10px;
    }
`;
const Container1 = styled.div`
    ${tw`relative w-full`}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;
const StepTitle = tw(ExpecteLink)`w-full mt-2 mb-4`;
const DeleteLink = styled.div`
    display: flex;
    align-items: center;
    color: rgb(10, 189, 25);
    font-size: 14px;
    cursor: pointer;
    border-bottom: 1px dashed rgb(10, 189, 25);
    padding-bottom: 2px;

    &:hover {
        color: rgb(10, 189, 25);
        text-decoration: none;
        transform: scale(1.05);
    }
`;

// Стили для иконки
const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 8px;
`;

const ProductForm = ({index, handleDelete, handleChange}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('Тип товара');
    const productTypes = ['Одежда', 'Обувь', 'Парфюмерия', 'Косметика', 'Электроника', 'Канцтовары', 'Игрушки', 'Спортинвентарь', 'Домашний инвентарь', 'Бижутерия'];

    return (
        <>
            <StepTitle><HighlightedText>Товар {index + 1}</HighlightedText>
                <DeleteIconContainer>
                    <MdDelete onClick={() => handleDelete(index)}/>
                </DeleteIconContainer>
            </StepTitle>

            <Form>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productType-${index}`}>Тип товара</Label>
                    <CustomSelectWrapper>
                        <CustomSelect onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            {selectedType}
                            <SelectArrow/>
                        </CustomSelect>
                        {isDropdownOpen && (
                            <CustomOptions>
                                {productTypes.map(type => (
                                    <CustomOption
                                        key={type}
                                        onClick={() => {
                                            setSelectedType(type);
                                            handleChange({target: {id: `productType-${index}`, value: type}}, index);
                                            setIsDropdownOpen(false);
                                        }}
                                        isSelected={type === selectedType}
                                    >
                                        {type}
                                    </CustomOption>
                                ))}
                            </CustomOptions>
                        )}
                    </CustomSelectWrapper>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productBrand-${index}`}>Бренд товара</Label>
                    <Input id={`productBrand-${index}`} type="text" placeholder="Введите бренд товара"
                           onChange={(e) => handleChange(e, index)}/>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productColor-${index}`}>Цвет и размер</Label>
                    <Input id={`productColor-${index}`} type="text" placeholder="Введите цвет и размер"
                           onChange={(e) => handleChange(e, index)}/>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productQuantity-${index}`}>Количество товара(ов)</Label>
                    <Input id={`productQuantity-${index}`} type="number" placeholder="Введите количество"
                           onChange={(e) => handleChange(e, index)}/>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productPrice-${index}`}>Стоимость товара (за шт)</Label>
                    <Input id={`productPrice-${index}`} type="text" placeholder="Введите стоимость"
                           onChange={(e) => handleChange(e, index)}/>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productName-${index}`}>Назване товара на (англ)</Label>
                    <Input id={`productName-${index}`} type="text" placeholder="Введите название товара"
                           onChange={(e) => handleChange(e, index)}/>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 2'}}>
                    <Label htmlFor={`productLink-${index}`}>Ссылка на товар</Label>
                    <Input id={`productLink-${index}`} type="text" placeholder="Введите ссылку на товар"
                           onChange={(e) => handleChange(e, index)}/>
                </FormGroup>
            </Form>
        </>
    );
};

export default function Purchaseofgoods({roundedHeaderButton, parcel}) {
    const [selectedCountry, setSelectedCountry] = useState('Все склады');
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedParcel, setExpandedParcel] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('Все');
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState('Склад не выбран');
    const [isPriceChangeOpen, setIsPriceChangeOpen] = useState(false);
    const [selectedPriceChange, setSelectedPriceChange] = useState('Выберите действие');
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('newRequest');
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const auth = getAuth();
    const db = getFirestore();
    const [storeName, setStoreName] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    const toggleExpand = () => setExpanded(!expanded);

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return '';
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString("ru-RU") + " " + date.toLocaleTimeString("ru-RU");
    };

    const fetchParcels = async () => {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const correctUserId = userDocSnap.data().userId;
                const q = query(collection(db, 'выкуп_товаров'), where("userId", "==", correctUserId));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const fetchedParcels = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setParcels(fetchedParcels);
                    localStorage.setItem("cachedParcels", JSON.stringify(fetchedParcels));
                }, (error) => {
                    console.error("Ошибка при подписке на изменения:", error);
                });
                if (!unsubscribe) {
                    return () => {};
                }
                return unsubscribe;
            }
        }

        // Возвращаем заглушку, если условия не выполняются
        return () => {};
    };

    const validateInputs = () => {
        const errors = {};

        if (!storeName.trim()) {
            errors.storeName = "Название магазина обязательно.";
        }

        if (selectedWarehouse === "Склад не выбран") {
            errors.warehouse = "Выберите страну склада.";
        }

        if (selectedPriceChange === "Выберите действие") {
            errors.priceChange = "Выберите действие при изменении цены.";
        }

        if (!products.length) {
            errors.products = "Добавьте хотя бы один товар.";
        } else {
            products.forEach((product, index) => {
                if (!product.productType) {
                    errors[`productType-${index}`] = `Тип товара для товара ${index + 1} обязателен.`;
                }
                if (!product.productBrand) {
                    errors[`productBrand-${index}`] = `Бренд товара для товара ${index + 1} обязателен.`;
                }
                if (!product.productColor) {
                    errors[`productColor-${index}`] = `Цвет и размер для товара ${index + 1} обязательны.`;
                }
                if (!product.productQuantity) {
                    errors[`productQuantity-${index}`] = `Количество товара для товара ${index + 1} обязательно.`;
                }
                if (!product.productPrice) {
                    errors[`productPrice-${index}`] = `Стоимость товара для товара ${index + 1} обязательна.`;
                }
                if (!product.productName) {
                    errors[`productName-${index}`] = `Название товара для товара ${index + 1} обязательно.`;
                }
                if (!product.productLink) {
                    errors[`productLink-${index}`] = `Ссылка на товар для товара ${index + 1} обязательна.`;
                }
            });
        }

        setValidationErrors(errors);

        // Возвращаем true, если ошибок нет
        return Object.keys(errors).length === 0;
    };
// При монтировании компонента
    useEffect(() => {
        const cachedData = localStorage.getItem("cachedParcels");
        if (cachedData) {
            setParcels(JSON.parse(cachedData));
        }

        const unsubscribePromise = fetchParcels(); // Подписываемся на изменения

        return () => {
            unsubscribePromise.then((unsubscribe) => {
                if (typeof unsubscribe === "function") {
                    unsubscribe();
                }
            }).catch((error) => {
                console.error("Ошибка при отписке от слушателя:", error);
            });
        };
    }, []);

    useEffect(() => {
        if (location.state && location.state.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const handleDelete = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const handleChange = (event, index) => {
        const {id, value} = event.target;
        const updatedProducts = [...products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [id.split('-')[0]]: value
        };
        setProducts(updatedProducts);
    };

    const addProduct = () => {
        setProducts([...products, {}]);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const db = getFirestore();
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUserId(userData.userId);
                    setPhone(userData.phone || '');
                    setEmail(userData.email || '');
                } else {
                    console.error('User not found in Firestore!');
                }
            } else {
                console.error('User not logged in');
            }
        };

        fetchUserData();
    }, []);

    const resetForm = () => {
        setSelectedWarehouse('Склад не выбран');
        setSelectedPriceChange('Выберите действие');
        setProducts([]);
    };


    const generateRequestNumber = () => {
        const randomNum = Math.floor(100000 + Math.random() * 900000); // Генерация случайного шестизначного числа
        return `EPL-${randomNum}`;
    };


    const saveRequest = async () => {
        if (!validateInputs()) {
            toast.error("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(db, "users", user.uid); // Ссылка на документ пользователя
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data(); // Получаем данные пользователя

                // Генерация номера заявки
                const requestNumber = generateRequestNumber();

                // Рассчитываем общую стоимость товаров, комиссию и итоговую стоимость
                const totalProductCost = parseFloat(calculateTotalProductCost(products));
                const serviceFee = parseFloat(calculateServiceFee(products));
                const totalCostWithServiceFee = parseFloat(totalProductCost + serviceFee).toFixed(2);

                const requestData = {
                    userId,
                    email: user.email,
                    phone: userData.phone || "—",
                    firstName: userData.firstName || "—",
                    lastName: userData.lastName || "—",
                    storeName: storeName || "—", // Название магазина
                    warehouse: selectedWarehouse,
                    priceChange: selectedPriceChange,
                    products,
                    requestNumber, // Номер заявки
                    createdAt: new Date(), // Дата создания
                    status: "Создан", // Статус по умолчанию
                    totalProductCost: totalProductCost.toFixed(2), // Общая стоимость товаров
                    serviceFee: serviceFee.toFixed(2), // Комиссия
                    totalCost: totalCostWithServiceFee, // Итоговая стоимость
                };

                try {
                    // Сохраняем заявку в Firestore
                    await addDoc(collection(db, "выкуп_товаров"), requestData);
                    toast.success("Заявка успешно отправлена!");
                    resetForm();
                    setStoreName(""); // Сбрасываем поле магазина
                    setActiveTab("requests"); // Переключаемся на вкладку заявок
                } catch (error) {
                    toast.error("Ошибка при отправке заявки. Пожалуйста, попробуйте снова."); // Уведомление об ошибке
                }
            }
        }
    };


    const warehouseOptions = ['Склад не выбран', 'США', 'Турция'];
    const priceChangeOptions = [
        'Выкупать товар только по указанной цене',
        'Выкупать товар при увеличении цены до 10%',
        'Выкупать товар при увеличении цены до 20%',
        'Выкупать товар при увеличении цены до 30%',
        'Выкупать товар при увеличении цены до 40%',
        'Выкупать товар при увеличении цены до 50%',
        'Выкупать товар в любом случае',
    ];
    const onParcelClick = useCallback((parcel) => {
        const newExpandedParcel = expandedParcel === parcel.id ? null : parcel.id;
        setExpandedParcel(newExpandedParcel);

    }, [expandedParcel, navigate]);


    const handleDeletes = async (parcelId) => {
        const result = await Swal.fire({
            title: 'Вы уверены?',
            text: 'Это действие удалит заявку навсегда!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена',
        });

        if (result.isConfirmed) {
            try {
                await deleteDoc(doc(db, 'выкуп_товаров', parcelId));
                Swal.fire('Удалено!', 'Заявка успешно удалена.', 'success');
                await fetchParcels(); // Обновление списка заявок после удаления
            } catch (error) {
                console.error('Ошибка при удалении заявки:', error);
                Swal.fire('Ошибка!', 'Не удалось удалить заявку.', 'error');
            }
        }
    };

    const calculateServiceFee = (products) => {
        const totalProductCost = calculateTotalProductCost(products);
        return Math.max(10, totalProductCost * 0.1); // Минимум $10 или 10%
    };

    const calculateTotalProductCost = (products) => {
        if (!Array.isArray(products)) return 0; // Проверяем, что это массив
        return products.reduce((total, product) => {
            const productPrice = parseFloat(product.productPrice || 0);
            const productQuantity = parseInt(product.productQuantity || 0, 10);
            return total + productPrice * productQuantity;
        }, 0);
    };

    const calculateTotalCostWithServiceFee = (products) => {
        const totalProductCost = parseFloat(calculateTotalProductCost(products));
        const serviceFee = parseFloat(calculateServiceFee(products));
        return (totalProductCost + serviceFee).toFixed(2);
    };
    const handleConfirm = async (id) => {
        try {
            // Ссылка на документ заявки в Firestore
            const docRef = doc(db, "выкуп_товаров", id);
            // Обновление статусов на "Подтверждено"
            await updateDoc(docRef, {
                status: "Подтверждено",
                currentStatus: "Подтверждено"
            });
            console.log(`Заявка с ID: ${id} успешно подтверждена.`);
            alert("Заявка подтверждена!");
        } catch (error) {
            console.error("Ошибка при подтверждении заявки:", error);
            alert("Ошибка при подтверждении заявки. Пожалуйста, попробуйте снова.");
        }
    };

    const handleReject = async (id) => {
        try {
            // Ссылка на документ заявки в Firestore
            const docRef = doc(db, "выкуп_товаров", id);
            // Обновление статусов на "Отклонено"
            await updateDoc(docRef, {
                status: "Отклонено",
                currentStatus: "Отклонено"
            });
            toast.success("Заявка успешно отклонена!"); // Уведомление об успехе
        } catch (error) {
            toast.error("Не удалось отклонить заявку. Попробуйте снова.");
        }
    };


    const handlePaymentClick = (parcel) => {
        const totalProductCost = parseFloat(
            parcel?.products?.reduce((total, product) => total + product.productPrice * product.productQuantity, 0) || 0
        ).toFixed(2);

        const serviceFee = parseFloat(parcel?.serviceFee || 10).toFixed(2); // Минимум 10 $
        const delivery = parseFloat(parcel?.delivery || 0).toFixed(2); // Если не указано, 0

        const totalCost = (
            parseFloat(totalProductCost) +
            parseFloat(serviceFee) +
            parseFloat(delivery)
        ).toFixed(2);

        const paymentData = {
            totalProductCost,
            productQuantity: parcel?.products?.length || 0,
            delivery,
            serviceFee,
            totalCost,
            requestNumber: parcel?.requestNumber, // Передача номера заявки
        };

        navigate("/PaymentGoods", { state: paymentData });
    };
    useEffect(() => {
        const fetchUserData = async (auth, db) => {
            const user = auth.currentUser;
            if (!user) return null;

            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                return userDocSnap.exists() ? userDocSnap.data().userId : null;
            } catch (error) {
                console.error("Ошибка при загрузке данных пользователя:", error);
                return null;
            }
        };

        const fetchCollectionData = async (collectionName, userId) => {
            try {
                const db = getFirestore();
                const collectionRef = collection(db, collectionName);
                const querySnapshot = await getDocs(query(collectionRef, where("userId", "==", userId)));
                return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error(`Ошибка при загрузке данных из коллекции ${collectionName}:`, error);
                return [];
            }
        };

        const mergeParcelData = (buyGoodsParcels, parcelsData) => {
            const mergedParcels = buyGoodsParcels.map(parcel => {
                const matchedParcel = parcelsData.find(p => p.id === parcel.requestNumber);
                return matchedParcel
                    ? { ...parcel, ...matchedParcel, source: 'parcels' }
                    : { ...parcel, source: 'buyGoods' };
            });

            return mergedParcels;
        };

        const fetchParcelsFromBothBases = async () => {
            setLoading(true);
            try {
                const db = getFirestore();
                const auth = getAuth();

                // Получаем ID пользователя
                const userId = await fetchUserData(auth, db);

                if (!userId) {
                    console.error("Пользователь не найден");
                    return;
                }

                // Загружаем данные из обеих коллекций параллельно
                const [buyGoodsParcels, parcelsData] = await Promise.all([
                    fetchCollectionData('выкуп_товаров', userId),
                    fetchCollectionData('parcels', userId),
                ]);

                // Объединяем данные
                const mergedParcels = mergeParcelData(buyGoodsParcels, parcelsData);
                setParcels(mergedParcels);

                // Опционально: сохраняем данные в localStorage
                localStorage.setItem('mergedParcels', JSON.stringify(mergedParcels));
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchParcelsFromBothBases();
    }, []);





    return (
        <>
            <AnimationRevealPage>
                <Toaster position="top-right" reverseOrder={false} />
                <Header roundedHeaderButton={roundedHeaderButton}/>
                <Container>

                    <TwoColumn>
                        <LeftColumn>
                            <Heading>Выкуп товаров</Heading>


                            <InfoContainer>
                                <InfoBox
                                    active={activeTab === 'requests'}
                                    onClick={() => setActiveTab('requests')}
                                    isHighlighted={activeTab === 'requests'}
                                >
                                    <InfoText>Заявки на выкуп товаров</InfoText>
                                </InfoBox>

                                <InfoBox
                                    active={activeTab === 'newRequest'}
                                    onClick={() => setActiveTab('newRequest')}
                                    isHighlighted={activeTab === 'newRequest'}
                                >
                                    <InfoText>Оставить новую заявку на выкуп товаров</InfoText>
                                </InfoBox>


                                <StyledNavLink href="/PersonalArea">
                                    <InfoBox>В профиль</InfoBox>
                                </StyledNavLink>

                            </InfoContainer>

                            {activeTab === 'requests' ? (
                                parcels?.map((parcel, index) => (
                                    <ParcelCard key={parcel?.id || index} onClick={() => onParcelClick(parcel)}>
                                        <ParcelHeading>
                                            <ParcelID>
                                                {parcel?.warehouse === 'США' ? (
                                                    <Icon1 src={usFlag} alt="Country Flag" />
                                                ) : parcel?.warehouse === 'Турция' ? (
                                                    <Icon1 src={trFlag} alt="Country Flag" />
                                                ) : (
                                                    <span>Склад не указан</span>
                                                )}
                                                Заявка №{parcel?.requestNumber || 'Не указано'}
                                                <ExpandButton>
                                                    {expandedParcel === parcel?.id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                </ExpandButton>
                                            </ParcelID>
                                            <SectionTitle>Информация о посылке:</SectionTitle>

                                            <SectionThirdTitle>Стоимость</SectionThirdTitle>
                                        </ParcelHeading>
                                        <ParcelInfo>
                                            <RightAlignedParcelColumn>
                                                <div>
                                                    <ColumnTitle>Создано:</ColumnTitle>
                                                    <ColumnText>{formatDate(parcel?.createdAt) || 'Дата не указана'}</ColumnText>
                                                </div>
                                                <div>
                                                    <ColumnTitle>Статус:</ColumnTitle>
                                                    <ColumnText>
                                                        {(parcel?.status === 'Создана' ? 'Ожидается' : parcel?.status || 'Статус не указан').replace(/\s*\([^)]*\)/g, '')}
                                                    </ColumnText>

                                                </div>

                                                <div style={{
                                                    marginTop: '5px',
                                                    display: 'flex',
                                                    gap: '15px',
                                                    alignItems: 'center',
                                                }}>
                                                    <SendParcelLink onClick={() => handleDeletes(parcel.id)}>
                                                        <SendParcelIcon src={Box} alt="Send Parcel Icon" />
                                                        Удалить заявку
                                                    </SendParcelLink>
                                                    {parcel?.status === 'Требует подтверждения' && (
                                                        <>
                                                            <SendParcelLink
                                                                onClick={() => handleConfirm(parcel.id)}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <FaCheck style={{ marginRight: '5px' }} />
                                                                Подтвердить
                                                            </SendParcelLink>
                                                            <SendParcelLink
                                                                onClick={() => handleReject(parcel.id)}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <FaTimes style={{ marginRight: '5px' }} />
                                                                Отменить
                                                            </SendParcelLink>
                                                        </>
                                                    )}
                                                    {parcel?.status === 'Подтвержден' && (
                                                        <PaymentParcelLink
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handlePaymentClick(parcel);
                                                            }}
                                                        >
                                                            <MdOutlinePayment
                                                                style={{ marginRight: '5px', width: '20px', height: '20px' }}
                                                            />
                                                            Оплатить
                                                        </PaymentParcelLink>
                                                    )}
                                                </div>
                                            </RightAlignedParcelColumn>
                                            <RightAlignedParcelColumn>
                                                <div>
                                                    <ColumnText>
                                                        Товаров на выкуп: {parcel?.products?.length || 0}
                                                    </ColumnText>
                                                </div>
                                            </RightAlignedParcelColumn>
                                            <LeftAlignedParcelColumn>
                                                <div>
                                                    <ColumnTitle>Стоимость товара(ов):</ColumnTitle>
                                                    <ColumnText>
                                                        {parcel?.products
                                                            ? parcel.products.reduce((total, product) => {
                                                                const productTotal =
                                                                    parseFloat(product.productPrice) * parseInt(product.productQuantity);
                                                                return total + productTotal;
                                                            }, 0).toFixed(2)
                                                            : 0}{' '}
                                                        $
                                                    </ColumnText>
                                                </div>
                                                <div>
                                                    <ColumnTitle>Комиссия за услугу:</ColumnTitle>
                                                    <ColumnText>
                                                        {parcel?.serviceFee ? `${parcel.serviceFee} $` : '—'}
                                                    </ColumnText>
                                                </div>
                                                <div>
                                                    <ColumnTitle>Итого:</ColumnTitle>
                                                    <ColumnText>
                    <span style={{ color: 'rgb(10, 189, 25)' }}>
                        {(
                            Number(calculateTotalProductCost(parcel?.products || [])) +
                            Number(parseFloat(calculateServiceFee(parcel?.products || [])))
                        ).toFixed(2)}{' '}
                        $
                    </span>
                                                    </ColumnText>
                                                </div>
                                            </LeftAlignedParcelColumn>
                                        </ParcelInfo>
                                        {expandedParcel === parcel.id && (
                                            <ExpandedInfo>
                                                <ProductsTitle>Товары</ProductsTitle>
                                                {parcel.products && parcel.products.length > 0 ? (
                                                    parcel.products.map((product, idx) => (
                                                        <React.Fragment key={idx}>
                                                            <h4 style={{ color: 'rgb(10, 189, 25)' }}>Товар {idx + 1}</h4>
                                                            <TableRow>
                                                                <TableCellFirst>Название магазина:</TableCellFirst>
                                                                <TableCell>{parcel.storeName || '—'}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCellFirst>Тип товара:</TableCellFirst>
                                                                <TableCell>{product.productType}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCellFirst>Цвет и размер:</TableCellFirst>
                                                                <TableCell>{product.productColor}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCellFirst>Количество:</TableCellFirst>
                                                                <TableCell>{product.productQuantity}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCellFirst>Цена за штуку:</TableCellFirst>
                                                                <TableCell>{product.productPrice} $</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCellFirst>Итоговая стоимость:</TableCellFirst>
                                                                <TableCell style={{ color: 'rgb(10, 189, 25)' }}>
                                                                    {(
                                                                        parseFloat(product.productPrice) *
                                                                        parseFloat(product.productQuantity)
                                                                    ).toFixed(2)}{' '}
                                                                    $
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCellFirst>Ссылка на товар:</TableCellFirst>
                                                                <TableCell>
                                                                    <a
                                                                        href={product.productLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        style={{
                                                                            color: 'rgb(10, 189, 25)',
                                                                            textDecoration: 'none',
                                                                        }}
                                                                    >
                                                                        Ссылка на товар
                                                                    </a>
                                                                </TableCell>
                                                            </TableRow>
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <p>Нет товаров для отображения.</p>
                                                )}
                                            </ExpandedInfo>
                                        )}
                                    </ParcelCard>


                                ))
                            ) : activeTab === 'newRequest' ? (
                                <>
                                    <FormContainer>
                                        <div style={{width: '100%', maxWidth: '1280px'}}>
                                            <StepTitle active={true}><HighlightedText>Шаг 1. </HighlightedText>Заполните
                                                информацию о заявке</StepTitle>
                                            <InfoMessageBox>
                                                <InfoMessageHeading>Стоимость услуг по выкупу товаров составляет 10% от
                                                    стоимости товаров, но не менее 10$</InfoMessageHeading>
                                            </InfoMessageBox>
                                            <Container12> <Form>
                                                <FormGroup>
                                                    <Label htmlFor="warehouse">Выберите страну склада</Label>
                                                    <CustomSelectWrapper>
                                                        <CustomSelect
                                                            onClick={() => setIsWarehouseOpen(!isWarehouseOpen)}>
                                                            {selectedWarehouse}
                                                            <SelectArrow/>
                                                        </CustomSelect>
                                                        {isWarehouseOpen && (
                                                            <CustomOptions>
                                                                {warehouseOptions.map(option => (
                                                                    <CustomOption
                                                                        key={option}
                                                                        onClick={() => {
                                                                            setSelectedWarehouse(option);
                                                                            setIsWarehouseOpen(false);
                                                                        }}
                                                                        isSelected={option === selectedWarehouse}
                                                                    >
                                                                        {option}
                                                                    </CustomOption>
                                                                ))}
                                                            </CustomOptions>
                                                        )}
                                                    </CustomSelectWrapper>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label htmlFor="userId">ID Вашего аккаунта</Label>
                                                    <Input id="userId" type="text" value={userId} readOnly/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" value={email} readOnly/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="phone">Телефон получателя</Label>
                                                    <InputMask mask="+7 (999) 999-9999" value={phone} readOnly>
                                                        {(inputProps) => <Input {...inputProps} />}
                                                    </InputMask>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label htmlFor="storeName">Введите название магазина (на
                                                        англ.)</Label>
                                                    <Input
                                                        id="storeName"
                                                        type="text"
                                                        placeholder="Введите название магазина"
                                                        value={storeName}
                                                        onChange={(e) => setStoreName(e.target.value)}
                                                    />
                                                </FormGroup>

                                                <FormGroup>

                                                    <Label htmlFor="priceChange">Что делать, если цена
                                                        изменится?</Label>
                                                    <CustomSelectWrapper>
                                                        <CustomSelect
                                                            onClick={() => setIsPriceChangeOpen(!isPriceChangeOpen)}>
                                                            {selectedPriceChange}
                                                            <SelectArrow/>
                                                        </CustomSelect>
                                                        {isPriceChangeOpen && (
                                                            <CustomOptions>
                                                                {priceChangeOptions.map(option => (
                                                                    <CustomOption
                                                                        key={option}
                                                                        onClick={() => {
                                                                            setSelectedPriceChange(option);
                                                                            setIsPriceChangeOpen(false);
                                                                        }}
                                                                        isSelected={option === selectedPriceChange}
                                                                    >
                                                                        {option}
                                                                    </CustomOption>
                                                                ))}
                                                            </CustomOptions>
                                                        )}
                                                    </CustomSelectWrapper>
                                                </FormGroup>
                                            </Form>
                                            </Container12>
                                        </div>
                                    </FormContainer>

                                    <FormContainer>
                                        <div style={{width: '100%', maxWidth: '1280px'}}>
                                            <StepTitle active={false}><HighlightedText>Шаг 2.</HighlightedText> Добавьте
                                                информацию о товаре</StepTitle>
                                            <Container12>
                                                <Text>
                                                    Пожалуйста, внимательно опишите каждый товар в заказе. Эти данные
                                                    будут использоваться для оформления таможенной декларации.
                                                </Text>

                                                {products.map((product, index) => (
                                                    <ProductForm key={index} index={index} handleDelete={handleDelete}
                                                                 handleChange={handleChange}/>
                                                ))}
                                                <Actions>
                                                    <button type="button" onClick={addProduct}>+ Добавить товар</button>
                                                </Actions>
                                            </Container12>
                                        </div>
                                    </FormContainer>

                                    <ButtonContainer>
                                        <Button type="button" onClick={saveRequest}>Отправить заявку</Button>
                                        <WhiteButton type="button" onClick={resetForm}>Сбросить</WhiteButton>
                                    </ButtonContainer>
                                </>
                            ) : (
                                <div style={{textAlign: 'center', marginTop: '50px'}}>
                                    <h2>Здесь будет список заявок на выкуп товаров...</h2>
                                </div>
                            )}


                        </LeftColumn>
                    </TwoColumn>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>
    );
}
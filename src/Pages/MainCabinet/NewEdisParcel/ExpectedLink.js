import React, {useState, useEffect} from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import {Tooltip} from 'react-tooltip';  // Исправлено

import {getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import {getAuth} from 'firebase/auth';
import AnimationRevealPage from '../../../components/helpers/AnimationRevealPage';
import MainCabinetHeader from '../../../components/headers/MainCabinetHeader';
import InfoIconSrc from '../../../images/img/info.png';
import {MdDelete} from "react-icons/md";
import {ExpecteLink} from "../../../components/misc/Headings.js";
import {toast, Toaster} from 'react-hot-toast'; // Импортируем toast и Toaster
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Подключение стилей
import {useNavigate} from 'react-router-dom';
import Footer from "../../../components/footers/MainFooterWithLinks";


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


const Form = styled.form`
    ${tw`grid grid-cols-2 gap-6`}
`;

const FormGroup = styled.div`
    ${tw`relative flex flex-col mb-6`}
`;

const Label = styled.label`
    ${tw`mt-1 sm:mt-0 mb-2 font-medium text-lg text-secondary-100 leading-loose`}
`;

const Text = styled.h6`
    ${tw`text-gray-500 font-bold tracking-widest text-lg`}
    margin-top: 20px;
    margin-bottom: 50px;
`;

const Input = styled.input`
    ${tw`mt-2 first:mt-0 py-3 font-medium text-sm`}
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
        outline: none; /* Убираем стандартный бордер при фокусе */
        border-bottom-color: #0ABD19; /* Сохраняем прежний цвет бордера при фокусе */
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

const TextArea = styled(InputSpis).attrs({as: 'textarea'})`
    ${tw`mt-2 w-full`}
    height: 35px;

    &:focus {
        outline: none; /* Убираем стандартный бордер при фокусе */
        border-bottom-color: #0ABD19; /* Сохраняем прежний цвет бордера при фокусе */
    }
`;


const CustomSelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const CustomSelect = styled.div`
    ${tw`mt-2 w-full px-4 py-3 bg-white text-left rounded-md shadow-sm border border-gray-300 cursor-pointer`}
    color: #6c757d;
    width: 95% !important;
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
    ${tw`absolute right-0 top-0 h-full flex items-center px-2 pointer-events-none`}
    &::after {
        content: '▾';
        font-size: 2em;
        color: #0ABD19;
        margin-left: -10px; /* перемещение стрелки левее */
    }
`;

const SecondSelectArrow = styled.div`
    ${tw`absolute right-0 top-0 h-full flex items-center px-2 pointer-events-none`}
    margin-right: 5%;

    &::after {
        content: '▾';
        font-size: 2em;
        color: #0ABD19;
        margin-left: -10px; /* перемещение стрелки левее */
    }
`;


const TextAreaContainer = styled.div`
    ${tw`relative`}
`;


const IconContainer = styled.div`
    ${tw`absolute right-0 mt-5 transform translate-y-3 cursor-pointer`}
    width: 20px;
    margin-top: 60px;
    height: 20px;


    img {
        width: 20px;
        height: 20px;
    }
`;

const InfoIconComment = styled(IconContainer)`margin-top: -35px`;

const ButtonContainer = styled.div`
    ${tw`flex justify-center mt-10`}
    gap: 20px;
    margin-bottom: 50px; /* Добавляет отступ внизу */
`;


const Button = styled.button`
    ${tw`px-8 py-3 font-bold text-white rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #0ABD19;
    border: none;

    &:hover {
        background-color: #0ABD50;
        transform: scale(1.05);
    }
`;

const WhiteButton = styled(Button)`
    ${tw`text-white bg-red-600 border border-green-600`}
    &:hover {
        background-color: #9a0000;
    }
`;

const Actions = styled.div`
    ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
    button {
        ${tw`w-[200px] sm:relative sm:right-0 sm:top-0 sm:bottom-0 bg-green-500 text-white font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:leading-none focus:outline-none transition duration-300`}
        background-color: #0ABD19;
        border: none;

        &:hover,
        &:focus {
            background-color: #09d85c;
            transform: scale(1.1);
        }
    }
`;

const StepTitle = tw(ExpecteLink)`w-full mt-2 mb-4`;

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

const ProductForm = ({index, handleChange, handleDelete}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('Тип товара');
    const productTypes = ['Одежда', 'Обувь', 'Парфюмерия', 'Косметика', 'Электроника', 'Канцтовары', 'Игрушки', 'Спортинвентарь', 'Домашний инвентарь', 'Бижутерия'];

    return (
        <>
            <StepTitle>
                <HighlightedText>Товар {index + 1}</HighlightedText>
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
                            <SecondSelectArrow/>
                        </CustomSelect>
                        {isDropdownOpen && (
                            <CustomOptions>
                                {productTypes.map(type => (
                                    <CustomOption
                                        key={type}
                                        onClick={() => {
                                            setSelectedType(type);
                                            handleChange({target: {id: `productType`, value: type}}, index);
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
                    <Tippy content="Выберите тип товара для добавления" placement="top">
                        <IconContainer>
                            <img src={InfoIconSrc} alt="Info icon"/>
                        </IconContainer>
                    </Tippy>


                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productBrand-${index}`}>Бренд товара</Label>
                    <Input id={`productBrand-${index}`} type="text" placeholder="Введите бренд товара"
                           onChange={(e) => handleChange(e, index)}/>

                    <Tippy content="Пример: New balance" placement="top">
                        <IconContainer>
                            <img src={InfoIconSrc} alt="Info icon"/>
                        </IconContainer>
                    </Tippy>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productColor-${index}`}>Цвет и размер</Label>
                    <Input id={`productColor-${index}`} type="text" placeholder="Введите цвет и размер"
                           onChange={(e) => handleChange(e, index)}/>

                    <Tippy content="Пример: Green, 6S" placement="top">
                        <IconContainer>
                            <img src={InfoIconSrc} alt="Info icon"/>
                        </IconContainer>
                    </Tippy>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productQuantity-${index}`}>Количество товара(ов)</Label>
                    <Input id={`productQuantity-${index}`} type="number" placeholder="Введите количество"
                           onChange={(e) => handleChange(e, index)}/>
                    <Tippy content="Пример: 2" placement="top">
                        <IconContainer>
                            <img src={InfoIconSrc} alt="Info icon"/>
                        </IconContainer>
                    </Tippy>
                </FormGroup>
                <FormGroup style={{gridColumn: 'span 1'}}>
                    <Label htmlFor={`productPrice-${index}`}>Стоимость товара (за шт) $</Label>
                    <Input id={`productPrice-${index}`} type="number" placeholder="Введите стоимость"
                           onChange={(e) => handleChange(e, index)}/>
                    <Tippy content="Пример: 14$" placement="top">
                        <IconContainer>
                            <img src={InfoIconSrc} alt="Info icon"/>
                        </IconContainer>
                    </Tippy>
                </FormGroup>
                <FormGroup style={{ gridColumn: 'span 1' }}>
                    <Label htmlFor={`productName-${index}`}>Название товара (англ)</Label>
                    <Input
                        id={`productName-${index}`}
                        type="text"
                        placeholder="Введите название товара"
                        onChange={(e) => handleChange(e, index)}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Разрешаем только английские буквы и пробелы
                        }}
                    />
                    <Tippy content="Пример: New balance" placement="top">
                        <IconContainer>
                            <img src={InfoIconSrc} alt="Info icon" />
                        </IconContainer>
                    </Tippy>
                </FormGroup>

                <FormGroup style={{ gridColumn: 'span 2' }}>
                    <Label htmlFor={`productLink-${index}`}>Ссылка на товар</Label>
                    <Input
                        id={`productLink-${index}`}
                        type="text"
                        placeholder="Введите ссылку на товар"
                        onChange={(e) => handleChange(e, index)}
                        onInput={(e) => {
                            const urlRegex = /^(https?:\/\/[^\s]*$|^$)/;
                            if (!urlRegex.test(e.target.value)) {
                                e.target.value = e.target.value.slice(0, -1); // Удаляем последний символ, если ввод некорректен
                            }
                        }}
                    />
                    <Tippy content="Пример: https://www.newbalance.com" placement="top">
                        <IconContainer>
                            <img src={InfoIconSrc} alt="Info icon" />
                        </IconContainer>
                    </Tippy>
                </FormGroup>

            </Form>
        </>
    );
};

const ExpectedLink = () => {
    const {id} = useParams(); // Получаем id из URL
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Склад не выбран');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    // Функция для показа уведомления

    const [formValues, setFormValues] = useState({
        parcelName: '',
        warehouse: '',
        trackingNumber: '',
        storeName: '',
        comment: '',
        products: [],
    });

    useEffect(() => {
        const loadParcelData = async () => {
            if (id) {
                const db = getFirestore();

                const docRef = doc(db, 'parcels', id);


                try {
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const parcelData = docSnap.data();

                        setFormValues({
                            parcelName: parcelData.parcelName || '',
                            warehouse: parcelData.warehouse || '',
                            trackingNumber: parcelData.trackingNumber || '',
                            storeName: parcelData.storeName || '',
                            comment: parcelData.comment || '',
                        });
                        setSelectedOption(parcelData.warehouse || 'Склад не выбран');
                        setProducts(parcelData.products || []);
                    }
                } catch (error) {

                }
            }
        };


        loadParcelData();
    }, [id]);


    const handleChange = (e, index = null) => {
        const {id, value} = e.target;
        if (index === null) {
            setFormValues({
                ...formValues,
                [id]: value,
            });
        } else {
            const updatedProducts = [...products];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [id.replace(`-${index}`, '')]: value, // Убираем индекс из ключа
            };
            setProducts(updatedProducts);
        }
    };


    const handleDelete = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const addProduct = () => {
        setProducts([...products, {}]);
    };

    const resetForm = () => {
        setSelectedOption('Склад не выбран');
        setProducts([]);
        setFormValues({
            parcelName: '',
            warehouse: '',
            trackingNumber: '',
            storeName: '',
            comment: '',
            products: [],
        });
    };

    const generateFriendlyId = () => {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        return `EPL-${randomNum}`;
    };

    const calculateTotalCost = (products) => {
        return products.reduce((total, product) => {
            const price = parseFloat(product.productPrice) || 0;
            const quantity = parseInt(product.productQuantity) || 0;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const calculateTotalQuantity = (products) => {
        return products.reduce((total, product) => {
            const quantity = parseInt(product.productQuantity) || 0;
            return total + quantity;
        }, 0);
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).replace(',', '');
    };

    const handleSubmit = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            toast.error('Вы должны быть авторизованы для сохранения посылки!');
            return;
        }

        // Проверяем, что все обязательные поля первой формы заполнены
        const requiredFields = [
            { name: 'Название посылки', value: formValues.parcelName },
            { name: 'Склад', value: formValues.warehouse },
            { name: 'Трек-номер', value: formValues.trackingNumber },
            { name: 'Название магазина', value: formValues.storeName },
        ];

        const emptyFields = requiredFields.filter(field => !field.value.trim());

        if (emptyFields.length > 0) {
            const fieldNames = emptyFields.map(field => field.name).join(', ');
            toast.error(`Не заполнены обязательные поля: ${fieldNames}`);
            return;
        }

        // Проверяем, что хотя бы один товар добавлен
        if (products.length === 0) {
            toast.error('Добавьте хотя бы один товар!');
            return;
        }

        // Проверяем, что все поля для каждого товара заполнены
        const incompleteProducts = products.filter(product => {
            return (
                !product.productType?.trim() ||
                !product.productBrand?.trim() ||
                !product.productColor?.trim() ||
                !product.productQuantity ||
                !product.productPrice ||
                !product.productName?.trim() ||
                !product.productLink?.trim()
            );
        });

        if (incompleteProducts.length > 0) {
            toast.error('Заполните все обязательные поля для каждого товара!');
            return;
        }

        const db = getFirestore();

        try {
            const q = query(collection(db, 'users'), where('email', '==', user.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                const correctUserId = userData.userId;

                const totalCost = calculateTotalCost(products);
                const totalQuantity = calculateTotalQuantity(products);
                const friendlyId = generateFriendlyId();
                const formattedDateTime = formatDateTime(new Date().toISOString());

                // Создание посылки
                await addDoc(collection(db, 'parcels'), {
                    ...formValues,
                    products,
                    userId: correctUserId,
                    createdAt: formattedDateTime,
                    status: 'Создана',
                    totalCost,
                    totalQuantity,
                    id: friendlyId,
                });

                // Добавление уведомления
                await addDoc(collection(db, 'notifications'), {
                    userId: user.uid,
                    message: `Ваша посылка ${friendlyId} была создана`,
                    timestamp: new Date(),
                });

                // Показываем уведомление
                toast.success('Посылка успешно сохранена!');

                // Перенаправление после успешного сохранения
                setTimeout(() => {
                    navigate('/IncomingParcels');
                }, 2000); // 2000 миллисекунд = 2 секунды

            } else {
                toast.error('Ошибка при сохранении посылки!');
            }
        } catch (error) {
            toast.error('Ошибка при сохранении посылки!');
        }
    };



    const options = ['Склад не выбран', 'США'];

    return (
        <AnimationRevealPage>
            <MainCabinetHeader/>
            <PageContainer>
                <Toaster/>
                <FormContainer>
                    <div style={{width: '100%', maxWidth: '1280px'}}>
                        <StepTitle active={true}><HighlightedText>Шаг 1. </HighlightedText>Заполните информацию о
                            посылке</StepTitle>
                        <Container>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="parcelName">Название посылки</Label>
                                    <Input
                                        id="parcelName"
                                        type="text"
                                        placeholder="Введите название посылки"
                                        value={formValues.parcelName}
                                        onChange={handleChange}
                                    />

                                    <Tippy content="Посылке можно задать любое удобное для Вас название, например, «Одежда из США 12.08.2024»" placement="top">
                                        <IconContainer>
                                            <img src={InfoIconSrc} alt="Info icon" />
                                        </IconContainer>
                                    </Tippy>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="warehouse">Выберите склад</Label>
                                    <CustomSelectWrapper>
                                        <CustomSelect onClick={() => setIsOpen(!isOpen)}>
                                            {selectedOption}
                                            <SelectArrow/>
                                        </CustomSelect>
                                        {isOpen && (
                                            <CustomOptions>
                                                {options.map(option => (
                                                    <CustomOption
                                                        key={option}
                                                        onClick={() => {
                                                            setSelectedOption(option);
                                                            setFormValues({
                                                                ...formValues,
                                                                warehouse: option,
                                                            });
                                                            setIsOpen(false);
                                                        }}
                                                        isSelected={option === selectedOption}
                                                    >
                                                        {option}
                                                    </CustomOption>
                                                ))}
                                            </CustomOptions>
                                        )}
                                    </CustomSelectWrapper>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="trackingNumber">Трек-номер</Label>
                                    <Input
                                        id="trackingNumber"
                                        type="text"
                                        placeholder="Введите трек-номер"
                                        value={formValues.trackingNumber}
                                        onChange={handleChange}
                                    />
                                    <IconContainer>
                                        <img src={InfoIconSrc} alt="Info icon"/>
                                        <Tooltip className="tooltip">При оформлении заказа в интернет-магазине Вам
                                            необходимо получить трек-номер и указать его здесь</Tooltip>
                                    </IconContainer>
                                    <Tippy content="При оформлении заказа в интернет-магазине Вам
                                            необходимо получить трек-номер и указать его здесь">
                                        <IconContainer>
                                            <img src={InfoIconSrc} alt="Info icon" />
                                        </IconContainer>
                                    </Tippy>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="storeName">Название магазина (на англ.)</Label>
                                    <Input
                                        id="storeName"
                                        type="text"
                                        placeholder="Укажите название магазина на английском языке"
                                        value={formValues.storeName}
                                        onChange={(e) => {
                                            const onlyEnglishRegex = /^[A-Za-z\s]*$/; // Разрешает только буквы и пробелы
                                            if (onlyEnglishRegex.test(e.target.value)) {
                                                handleChange(e); // Обновляем состояние только если ввод корректен
                                            }
                                        }}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Удаляет некорректные символы
                                        }}
                                    />
                                    <Tippy content="Информация о названии магазина">
                                        <IconContainer>
                                            <img src={InfoIconSrc} alt="Info icon" />
                                        </IconContainer>
                                    </Tippy>
                                </FormGroup>

                                <FormGroup style={{gridColumn: 'span 2'}}>
                                    <Label htmlFor="comment">Комментарий для оператора</Label>
                                    <TextAreaContainer>
                                        <TextArea
                                            id="comment"
                                            placeholder="Оставьте комментарий для оператора"
                                            rows="4"
                                            value={formValues.comment}
                                            onChange={handleChange}
                                        />

                                        <Tippy content="Если вам потребуется переупаковка для
                                                уменьшения стоимости доставки - можете указать тут.">
                                            <InfoIconComment>
                                                <img src={InfoIconSrc} alt="Info icon" />
                                            </InfoIconComment>
                                        </Tippy>
                                    </TextAreaContainer>
                                </FormGroup>
                            </Form>
                        </Container>
                    </div>
                </FormContainer>
                <FormContainer>
                    <div style={{width: '100%', maxWidth: '1280px'}}>
                        <StepTitle active={false}><HighlightedText>Шаг 2.</HighlightedText> Добавьте информацию о товаре</StepTitle>
                        <Container>
                            <Text>
                                Пожалуйста, внимательно опишите каждый товар в заказе. Эти данные будут использоваться
                                для оформления таможенной декларации.
                            </Text>
                            {products.map((_, index) => (
                                <ProductForm key={index} index={index} handleChange={handleChange}
                                             handleDelete={handleDelete}/>
                            ))}
                            <Actions>
                                <button type="button" onClick={addProduct}>+ Добавить товар</button>
                            </Actions>
                        </Container>
                    </div>
                </FormContainer>
                <ButtonContainer>
                    <Button type="button" onClick={handleSubmit}>
                        {id ? "Сохранить изменения" : "Сохранить посылку"}
                    </Button>
                    <WhiteButton type="button" onClick={resetForm}>Сбросить</WhiteButton>
                </ButtonContainer>
            </PageContainer>


            <Footer/>
        </AnimationRevealPage>
    );
};

export default ExpectedLink;
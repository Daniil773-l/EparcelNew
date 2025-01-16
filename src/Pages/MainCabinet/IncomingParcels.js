import React, {useState, useEffect, useMemo, useCallback} from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getFirestore, collection, query, where,  onSnapshot, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import Header from '../../components/headers/MainCabinetHeader';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import AnimationRevealPage from '../../components/helpers/AnimationRevealPage';
import Footer from '../../components/footers/MainFooterWithLinks';
import usFlag from '../../images/icon/us-icon.png';
import trFlag from '../../images/icon/tr-icon.png';
import warehouseIcon from '../../images/img/warehouse.png';
import clockIcon from '../../images/img/clock.png';
import {ReactComponent as SearchIcon} from '../../images/img/search-icon.svg';
import Box from "../../images/img/BeautifullTinyBox.svg";

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
    ${tw`flex items-center justify-between bg-white shadow-md rounded-lg p-2 cursor-pointer`};
    border: 1px solid #0ABD19;
    width: auto;
    margin-left: 0;  // Добавляем отступ слева для выравнивания
    margin-right: 0; // Убираем отступ справа
    margin-bottom: 8px;  // Добавляем небольшой отступ снизу для каждого блока

    background-color: ${(props) => (props.isHighlighted ? "#EBFAE5" : "white")};

    &:hover {
        background-color: #EBFAE5;
    }
`;
const InfoText = styled.span`
    ${tw`text-gray-600`}
    font-size: 0.875rem;
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



const Actions = styled.div`
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
    ${tw`flex flex-col items-start p-4 bg-yellow-100 rounded-xl mt-8`}
    width: calc(100% - 2rem);
    max-width: 100%;
    color: #333;
    background-color: #fffbe5;
`;

const StyledNavLink = styled(Link)`
    text-decoration: none;
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
    ${tw`text-sm font-medium  inline-block`} /* Ensure this remains inline */ margin-right: 0.5rem; /* Add some space between the title and text */
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
    ${tw`font-medium text-sm justify-start items-start`}
    width: 34%;
    color: #2D2D2D;
    margin-left: 50px;  // Добавляем отступ слева, чтобы сдвигать текст вправо
    text-align: left;   // Выравнивание текста слева
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
    ${tw`text-lg text-gray-600`}
    width: 20%; /* Уменьшение ширины для других ячеек */
    text-align: left;
`;
const TotalCostCell = styled.div`
    ${tw`text-lg`}
    width: 20%;
    color: #0ABD19;
    text-align: left;
`;

const TableCellFirst = styled.div`
    ${tw`text-lg text-gray-600`}
    width: 40%; /* Увеличение ширины, чтобы текст помещался */
    text-align: left;
`;

const TotalRow = styled.div`
    ${tw`flex justify-between items-center py-2`}
`;


const TotalCell = styled.div`
    ${tw`text-lg font-bold text-green-1002`}
    text-align: right;
`;

const EditLink = styled(StyledNavLink)`
    ${tw`text-lg text-green-1002`}
    margin-left: auto;
`;
const PhotosContainer = styled.div`
    ${tw`mt-6`};
`;

const PhotosTitle = styled.h3`
    ${tw`text-lg font-semibold mb-4`};
    color: #0ABD19;
`;

const PhotoGallery = styled.div`
    ${tw`grid grid-cols-3 gap-4`};
`;

const PhotoCard = styled.div`
    ${tw`border rounded-lg overflow-hidden shadow-sm`};
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const PhotoImage = styled.img`
    ${tw`w-full h-32 object-cover`};
`;

const ProductsTitle = styled.h4`
    ${tw`font-semibold text-lg`}
    color: #2D2D2D;
    margin-bottom: 0.5rem;
`;






const SendParcelLink = styled(Link)`
    ${tw`text-green-1002 text-lg font-medium`}
    display: flex;
    align-items: center;
    text-decoration: none;
    padding-bottom: 4px;
    border-bottom: 1px dashed #00bc00;
    margin-top: 10px;
`;
const DamagedcelLink = styled(Link)`
    ${tw`text-red-500 text-sm font-medium`}
    display: flex;
    align-items: center;
    text-decoration: none;
    padding-bottom: 4px;
    border-bottom: 1px dashed #ff0000;
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
export default ({roundedHeaderButton, parcel}) => {
    const [selectedCountry, setSelectedCountry] = useState('Все склады');
    const [parcels, setParcels] = useState(() => JSON.parse(localStorage.getItem('parcels')) || []);
    const [loading, setLoading] = useState(true);
    const [expandedParcel, setExpandedParcel] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('Все');
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };
    useEffect(() => {
        const fetchParcels = async (user) => {
            setLoading(true);

            // Попытка загрузить посылки из кэша (localStorage)
            const cachedParcels = JSON.parse(localStorage.getItem('parcels')) || [];
            if (cachedParcels.length > 0) {
                setParcels(cachedParcels);
            }

            if (user) {
                const db = getFirestore();
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userId = userDoc.data().userId;

                    // Создаем запрос к коллекции 'parcels' для текущего пользователя
                    const q = query(
                        collection(db, 'parcels'),
                        where('userId', '==', userId)
                    );

                    // Подписка на обновления в Firestore
                    const unsubscribe = onSnapshot(q, (querySnapshot) => {
                        const fetchedParcels = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        // Сохраняем данные в localStorage для оптимизации последующих загрузок
                        localStorage.setItem('parcels', JSON.stringify(fetchedParcels));

                        // Обновляем состояние с полученными посылками
                        setParcels(fetchedParcels);
                        setLoading(false);
                    });

                    return () => unsubscribe(); // Отписка от Firestore при размонтировании компонента
                }
            }
        };

        // Отслеживаем изменения в состоянии авторизации пользователя
        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchParcels(user); // Если пользователь авторизован, загружаем посылки
            } else {
                setParcels([]); // Если пользователь не авторизован, очищаем состояние
                setLoading(false);
            }
        });

        return () => unsubscribeAuth(); // Отписка от изменения состояния авторизации
    }, []);




    // Объявляем переменную filteredParcels в самом начале компонента

    const onParcelClick = useCallback((parcel) => {
        const newExpandedParcel = expandedParcel === parcel.id ? null : parcel.id;
        setExpandedParcel(newExpandedParcel);

    }, [expandedParcel, navigate]);

    const filteredParcels = useMemo(() => {
        return parcels.filter(parcel => {
            const matchesStatus =
                selectedStatus === 'Все' ||
                parcel.status === selectedStatus ||
                (selectedStatus === 'На складе' &&
                    (parcel.status === 'Обработана' || parcel.status === 'Оплачено' || parcel.status === 'Обработана, повреждена'));

            const matchesSearchQuery =
                parcel.id.includes(searchQuery) ||
                parcel.trackingNumber.includes(searchQuery) ||
                parcel.parcelName.includes(searchQuery) ||
                parcel.storeName.includes(searchQuery);

            return matchesStatus && matchesSearchQuery;
        });
    }, [parcels, searchQuery, selectedStatus]);



    const uniqueParcels = Array.from(new Map(filteredParcels.map(parcel => [parcel.id, parcel])).values());


    const handleStatusClick = useCallback((status) => {
        setSelectedStatus(status);  // Сохраняем выбранный статус
    }, []);

    const convertPoundsToKg = (pounds) => {
        return (pounds * 0.453592).toFixed(2);
    };

    useEffect(() => {
        setExpandedParcel(null);
    }, [parcels]);



    const totalItemsAndCost = () => {
        const relevantParcels = parcels.filter(parcel =>
            parcel.status === 'На складе' || parcel.status === 'Обработана' || parcel.status === 'Оплачено'|| parcel.status === 'Обработана, повреждена'
        );

        const totalParcels = relevantParcels.length; // Считаем количество посылок
        const totalCost = relevantParcels.reduce((sum, parcel) => sum + parseFloat(parcel.totalCost || 0), 0).toFixed(2);
        const totalWeightInPounds = relevantParcels.reduce((sum, parcel) => sum + parseFloat(parcel.actualWeight || 0), 0);
        const totalWeightInKg = convertPoundsToKg(totalWeightInPounds);

        return {
            totalParcels,
            totalCost,
            totalWeightInKg
        };
    };


    const totalItemsAndCostForCreated = () => {
        const relevantParcels = parcels.filter(parcel => parcel.status === 'Создана');
        const totalParcels = relevantParcels.length; // Считаем количество посылок
        const totalCost = relevantParcels.reduce((sum, parcel) => sum + parseFloat(parcel.totalCost || 0), 0).toFixed(2);

        return {
            totalParcels: totalParcels || 0,
            totalCost: totalCost || '0.00'
        };
    };


    const relevantParcels = parcels.filter(parcel =>
        parcel.status === 'На складе' || parcel.status === 'Обработана' || parcel.status === 'Оплачено'|| parcel.status === 'Обработана, повреждена'
    );



    return (
        <>
            <AnimationRevealPage>
                <Header roundedHeaderButton={roundedHeaderButton}/>
                <Container>
                    <TwoColumn>
                        <LeftColumn>
                            <Heading>Входящие посылки</Heading>
                            <Actions>
                                <InputContainer>
                                    <SearchIconContainer>
                                        <SearchIcon/>
                                    </SearchIconContainer>
                                    <SearchInput
                                        type="text"
                                        placeholder="Поиск по номеру посылки, трекингу, названию посылки или товара"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <StyledNavLink to="/ExpectedLink">
                                        <AddButton>
                                            Добавить посылку
                                        </AddButton>
                                    </StyledNavLink>
                                </InputContainer>
                            </Actions>
                            {/*<ButtonContainer>*/}
                            {/*    <PrimaryButton*/}
                            {/*        onClick={() => setSelectedCountry("Все склады")}*/}
                            {/*        selected={selectedCountry === "Все склады"}*/}
                            {/*    >*/}
                            {/*        Все склады*/}
                            {/*    </PrimaryButton>*/}
                            {/*    <PrimaryButton*/}
                            {/*        onClick={() => setSelectedCountry("США")}*/}
                            {/*        selected={selectedCountry === "США"}*/}
                            {/*    >*/}
                            {/*        США*/}
                            {/*    </PrimaryButton>*/}
                            {/*    <PrimaryButton*/}
                            {/*        onClick={() => setSelectedCountry("Турция")}*/}
                            {/*        selected={selectedCountry === "Турция"}*/}
                            {/*    >*/}
                            {/*        Турция*/}
                            {/*    </PrimaryButton>*/}
                            {/*</ButtonContainer>*/}
                            <InfoContainer>
                                <InfoBox
                                    onClick={() => handleStatusClick('На складе')}
                                    style={{backgroundColor: selectedStatus === 'На складе' ? '#EBFAE5' : 'white'}}
                                >
                                    <Icon1 src={warehouseIcon} alt="Warehouse Icon"/>
                                    <InfoText>
                                        На складе и обработано: {totalItemsAndCost().totalParcels} шт
                                        | {totalItemsAndCost().totalCost} $ | {totalItemsAndCost().totalWeightInKg} кг
                                    </InfoText>

                                </InfoBox>

                                <InfoBox
                                    onClick={() => handleStatusClick('Создана')}
                                    style={{backgroundColor: selectedStatus === 'Создана' ? '#EBFAE5' : 'white'}}
                                >
                                    <Icon1 src={clockIcon} alt="Clock Icon"/>
                                    <InfoText>
                                        Ожидается: {totalItemsAndCostForCreated().totalParcels} шт
                                        | {totalItemsAndCostForCreated().totalCost} $
                                    </InfoText>

                                </InfoBox>
                            </InfoContainer>


                            {loading ? (
                                null
                            ) : filteredParcels.length === 0 ? (
                                <InfoMessageBox>
                                    <InfoMessageHeading>
                                        У Вас пока нет посылок на складе!
                                    </InfoMessageHeading>
                                    <InfoMessageText>
                                        Выберите товар, оформите доставку на адрес склада, добавьте посылку и в этом
                                        разделе Вы сможете отслеживать прибытие посылки на наш склад.
                                    </InfoMessageText>
                                </InfoMessageBox>
                            ) : (
                                <>


                                    {(selectedStatus === 'На складе' || selectedStatus === 'Обработано' || selectedStatus === 'Оплачено'|| selectedStatus === 'Обработана, повреждена'|| selectedStatus === 'Все') ? (
                                        relevantParcels.length > 0 ? (
                                            relevantParcels.map(parcel => (
                                                <ParcelCardSclad key={parcel.id} onClick={() => onParcelClick(parcel)}>
                                                    <ParcelHeading>
                                                        <ParcelID>
                                                            <Icon1 src={parcel.warehouse === 'США' ? usFlag : trFlag}
                                                                   alt="Country Flag"/>
                                                            Посылка #{parcel.id}
                                                            <ExpandButton>
                                                                {expandedParcel === parcel.id ? <IoIosArrowUp/> :
                                                                    <IoIosArrowDown/>}
                                                            </ExpandButton>
                                                        </ParcelID>
                                                        <SectionTitle >{parcel.parcelName}</SectionTitle>

                                                        <SectionThirdTitle style={{ marginRight: '35px' }}>Информация о посылке</SectionThirdTitle>
                                                    </ParcelHeading>
                                                    <ParcelInfo>
                                                        <RightAlignedParcelColumn>
                                                            <div>
                                                                <ColumnTitle>Создано:</ColumnTitle>
                                                                <ColumnText>{parcel.createdAt}</ColumnText>
                                                            </div>
                                                            <div>
                                                                <ColumnTitle>Статус:</ColumnTitle>
                                                                <ColumnText>{parcel.status}</ColumnText>
                                                            </div>
                                                            {parcel.status.includes("Обработана") && (
                                                                <SendParcelLink to={`/SendParcelForm/${parcel.id}`}>
                                                                    <SendParcelIcon src={Box} alt="Send Parcel Icon" />
                                                                    Отправить посылку
                                                                </SendParcelLink>
                                                            )}
                                                            {parcel.status.includes("повреждена") && (
                                                                <DamagedcelLink to={`/SendParcelForm/${parcel.id}`}>
                                                                    <SendParcelIcon src={Box} alt="Send Parcel Icon" />
                                                                    Оформить возврат
                                                                </DamagedcelLink>
                                                            )}

                                                        </RightAlignedParcelColumn>
                                                        <RightAlignedParcelColumn>
                                                            <div>
                                                                <ColumnTitle>Магазин:</ColumnTitle>
                                                                <ColumnText>{parcel.storeName}</ColumnText>
                                                            </div>
                                                            <div>
                                                                <ColumnTitle>Входящий трек:</ColumnTitle>
                                                                <ColumnText>{parcel.trackingNumber}</ColumnText>
                                                            </div>
                                                        </RightAlignedParcelColumn>
                                                        <LeftAlignedParcelColumn>
                                                            <div>
                                                                <ColumnTitle>Общее количество товаров:</ColumnTitle>
                                                                <ColumnText>{parcel.totalQuantity}</ColumnText>
                                                            </div>
                                                            <div>
                                                                <ColumnTitle>Стоимость товара(ов):</ColumnTitle>
                                                                <ColumnText>{parcel.totalCost} $</ColumnText>
                                                            </div>
                                                        </LeftAlignedParcelColumn>
                                                    </ParcelInfo>
                                                    {expandedParcel === parcel.id && (
                                                        <ExpandedInfo>
                                                            <TableContainer>
                                                                <TableRowFirst>
                                                                    <EditLink to={`/edit/${parcel.id}`} style={{ marginRight: "50px" }}>
                                                                        Редактировать посылку
                                                                    </EditLink>
                                                                </TableRowFirst>

                                                                <ProductsTitle>Товары</ProductsTitle>
                                                                <TableHeader>
                                                                    <TableCellFirst>Название товара</TableCellFirst>
                                                                    <TableCell>Цена за штуку</TableCell>
                                                                    <TableCell>Количество</TableCell>
                                                                    <TableCell>{(parseFloat(parcel.totalCost)).toFixed(2)} $</TableCell>
                                                                </TableHeader>
                                                                {parcel.products &&
                                                                    parcel.products.length > 0 &&
                                                                    parcel.products.map((product, idx) => (
                                                                        <TableRow key={idx}>
                                                                            <TableCellFirst>{product.productName}</TableCellFirst>
                                                                            <TableCell>{product.productPrice} $</TableCell>
                                                                            <TableCell>{product.productQuantity}</TableCell>
                                                                            <TableCell>
                                                                                {(parseFloat(product.productPrice) * parseFloat(product.productQuantity)).toFixed(2)} $
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                <TotalRow>
                                                                    <TotalCostCell>Итого стоимость посылки:</TotalCostCell>
                                                                    <TotalCell style={{ marginRight: "160px" }}>{parcel.totalCost} $</TotalCell>
                                                                </TotalRow>
                                                            </TableContainer>

                                                            {/* Блок для просмотра фотографий */}
                                                            {parcel.attachedFiles && parcel.attachedFiles.length > 0 && (
                                                                <PhotosContainer>
                                                                    <PhotosTitle>Фото посылки</PhotosTitle>
                                                                    <PhotoGallery>
                                                                        {parcel.attachedFiles.map((file, index) => (
                                                                            <PhotoCard key={index} onClick={(e) => {
                                                                                e.stopPropagation(); // Остановить всплытие события
                                                                                openModal(file.content);
                                                                            }}>
                                                                                <PhotoImage
                                                                                    src={file.content}
                                                                                    alt={file.name || `Фото ${index + 1}`}
                                                                                />
                                                                            </PhotoCard>
                                                                        ))}
                                                                    </PhotoGallery>
                                                                </PhotosContainer>
                                                            )}

                                                            {isModalOpen && (
                                                                <div
                                                                    style={{
                                                                        position: "fixed",
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        zIndex: 1000,
                                                                    }}
                                                                    onClick={closeModal}
                                                                >
                                                                    <img
                                                                        src={selectedImage}
                                                                        alt="Просмотр изображения"
                                                                        style={{
                                                                            maxWidth: "90%",
                                                                            maxHeight: "90%",
                                                                            borderRadius: "8px",
                                                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}






                                                        </ExpandedInfo>
                                                    )}

                                                    <GreenStrip>
                                                        <CardHeaderLink href="#">
                                                            {parcel.status.includes("Обработана") ? "Обработана" : parcel.status}
                                                        </CardHeaderLink>
                                                    </GreenStrip>

                                                </ParcelCardSclad>


                                            ))
                                        ) : (
                                            <p>Нет посылок с статусом "На складе и обработано".</p>
                                        )
                                    ) : (
                                        selectedStatus === 'Создана'&& (
                                            filteredParcels
                                                .filter(parcel => parcel.status === 'Создана')
                                                .map(parcel => (
                                                    <ParcelCard key={parcel.id} onClick={() => onParcelClick(parcel)}>
                                                        <ParcelHeading>
                                                            <ParcelID>
                                                                <Icon1
                                                                    src={parcel.warehouse === 'США' ? usFlag : trFlag}
                                                                    alt="Country Flag"/>
                                                                Посылка #{parcel.id}
                                                                <ExpandButton>
                                                                    {expandedParcel === parcel.id ? <IoIosArrowUp/> :
                                                                        <IoIosArrowDown/>}
                                                                </ExpandButton>
                                                            </ParcelID>
                                                            <SectionTitle style={{ marginLeft: '30px' }}>{parcel.parcelName}</SectionTitle>
                                                            <SectionThirdTitle  style={{ marginRight: '35px' }}>Информация о посылке</SectionThirdTitle>
                                                        </ParcelHeading>
                                                        <ParcelInfo>
                                                            <RightAlignedParcelColumn>
                                                                <div>
                                                                    <ColumnTitle>Создано:</ColumnTitle>
                                                                    <ColumnText>{parcel.createdAt}</ColumnText>
                                                                </div>
                                                                <div>
                                                                    <ColumnTitle>Статус:</ColumnTitle>
                                                                    <ColumnText>{parcel.status}</ColumnText>
                                                                </div>
                                                            </RightAlignedParcelColumn>
                                                            <RightAlignedParcelColumn>
                                                                <div>
                                                                    <ColumnTitle>Магазин:</ColumnTitle>
                                                                    <ColumnText>{parcel.storeName}</ColumnText>
                                                                </div>
                                                                <div>
                                                                    <ColumnTitle>Входящий трек:</ColumnTitle>
                                                                    <ColumnText>{parcel.trackingNumber}</ColumnText>
                                                                </div>
                                                            </RightAlignedParcelColumn>
                                                            <LeftAlignedParcelColumn>
                                                                <div>
                                                                    <ColumnTitle>Общее количество товаров:</ColumnTitle>
                                                                    <ColumnText>{parcel.totalQuantity}</ColumnText>
                                                                </div>
                                                                <div>
                                                                    <ColumnTitle>Стоимость товара(ов):</ColumnTitle>
                                                                    <ColumnText>{parcel.totalCost} $</ColumnText>
                                                                </div>
                                                            </LeftAlignedParcelColumn>
                                                        </ParcelInfo>
                                                        {expandedParcel === parcel.id && (
                                                            <ExpandedInfo>
                                                                <TableContainer>
                                                                    <TableRowFirst>
                                                                        <EditLink to={`/edit/${parcel.id}`}>
                                                                            Редактировать посылку
                                                                        </EditLink>
                                                                    </TableRowFirst>

                                                                    <ProductsTitle>Товары</ProductsTitle>
                                                                    <TableHeader>
                                                                        <TableCellFirst>Название товара</TableCellFirst>
                                                                        <TableCell>Цена за штуку</TableCell>
                                                                        <TableCell>Количество</TableCell>
                                                                        <TableCell>{(parseFloat(parcel.totalCost)).toFixed(2)} $</TableCell>
                                                                    </TableHeader>
                                                                    {parcel.products && parcel.products.length > 0 && parcel.products.map((product, idx) => (
                                                                        <TableRow key={idx}>
                                                                            <TableCellFirst>{product.productName}</TableCellFirst>
                                                                            <TableCell>{product.productPrice} $</TableCell>
                                                                            <TableCell>{product.productQuantity}</TableCell>
                                                                            <TableCell>{(parseFloat(product.productPrice) * parseFloat(product.productQuantity)).toFixed(2)} $</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                    <TotalRow>
                                                                        <TotalCostCell>Итого стоимость
                                                                            посылки:</TotalCostCell>
                                                                        <TotalCell>{parcel.totalCost} $</TotalCell>
                                                                    </TotalRow>


                                                                </TableContainer>
                                                            </ExpandedInfo>
                                                        )}
                                                    </ParcelCard>
                                                ))
                                        )
                                    )}
                                </>
                            )}
                            <BottomButtonsContainer>
                                <StyledNavLink to="/ExpectedLink">
                                    <BottomButton>
                                        Добавить ожидаемую посылку
                                    </BottomButton>
                                </StyledNavLink>
                                <StyledNavLink to="/PersonalArea">
                                    <BottomButton>В профиль</BottomButton>
                                </StyledNavLink>
                            </BottomButtonsContainer>
                        </LeftColumn>
                    </TwoColumn>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>
    );
};
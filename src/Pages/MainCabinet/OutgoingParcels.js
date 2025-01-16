import React, {useState, useEffect, useMemo, useCallback} from "react";
import styled, {css} from "styled-components";
import tw from "twin.macro";
import { NavLink as RouterNavLink, Link} from "react-router-dom";
import Header from "../../components/headers/MainCabinetHeader";
import {ReactComponent as SearchIcon} from "../../images/img/search-icon.svg";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage"; // Ensure you have the search icon SVG file
import Footer from "../../components/footers/MainFooterWithLinks";
import {ReactComponent as PlusIcon} from "feather-icons/dist/icons/plus.svg";
import warehouseIcon from "../../images/img/shipment-tracking.png";
import { getFirestore, collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import usFlag from "../../images/icon/us-icon.png";
import trFlag from "../../images/icon/tr-icon.png";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useNavigate} from "react-router-dom"; // Импорт navigate
import { FaShippingFast } from "react-icons/fa";
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
    ${tw`flex items-center justify-between bg-white shadow-md rounded-lg p-2`}
    border: 1px solid #0ABD19;
    width: auto;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    background-color: ${(props) => (props.isHighlighted ? "#EBFAE5" : "white")};
    svg {
        ${tw`mr-2 text-green-1002`} /* Настройка цвета и отступа иконки */
        width: 1.2rem;
        height: 1.2rem;
    }

`;


const InfoText = styled.span`
    ${tw`text-gray-600`}
`;

const IconButton = styled.a`
    ${tw`ml-4 bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    background-color: #0ABD19;
    border: none;
    margin-left: auto; // Automatically push the button to the end
    margin-top: 0; // Remove top margin
    width: 20px; // Set button width
    height: 20px; // Set button height

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

const RightColumn = styled.div`
    ${tw`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`}
`;

const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-4xl leading-tight`}
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
const NavLink = styled(RouterNavLink)`
    text-decoration: none;
`;
const SearchIconContainer = styled.div`
    ${tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}
`;

const AddButton = styled.button`
    ${tw`bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    height: 37px;
    background-color: #0ABD19;
    border: none;
    position: absolute;
    right: 5px;
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

const TableRow = styled.div`
    ${tw`flex justify-between items-center py-2`}
    border-bottom: 1px solid #e5e7eb;
`;
const Icon1 = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;
const ParcelCard = styled.div`
    ${tw`bg-white rounded-lg p-3 mb-4`}
    border: 1px solid #d9d9d9;
    cursor: pointer;
    border-radius: 15px;
    padding: 16px; /* Adjust padding to reduce overall height */
`;
const TotalCell = styled.div`
    ${tw`text-lg font-bold text-green-1002 text-right`} /* Выравнивание текста по правому краю */
    display: flex;
    justify-content: flex-start; /* Выровнять контент внутри ячейки */
    align-items: center; /* Вертикальное выравнивание */
    padding-right: 1rem; /* Отступ от края */
`;

const ParcelHeading = styled.div`
    ${tw`flex items-center justify-between`}
`;
const ParcelID = styled.div`
    ${tw`flex items-center text-lg`}
    width: 41%;
    color: #0ABD19;
`;
const ParcelColumn = styled.div`
    ${tw`flex flex-col`}
    margin-left: 4%;
    display: flex;
`;

const RightAlignedParcelColumn = styled(ParcelColumn)`
    margin-left: 7%; /* Настраиваем отступ влево */
`;

const ColumnText = styled.span`
    ${tw`text-sm text-gray-600 inline-block`} /* Ensure this remains inline */ line-height: 1.5; /* Adjust line-height to ensure alignment */
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Hide overflow if the text is too long */
    text-overflow: ellipsis; /* Add ellipsis for overflow text */
    vertical-align: middle; /* Align vertically with the title */
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
const SectionTitle = styled.h3`
    ${tw`font-medium text-sm justify-start items-start`} /* Reduced font size for section title */ width: 34%;
    color: #2D2D2D;
`;
const SectionThirdTitle = styled.h3`
    ${tw`font-semibold text-sm`}
    width: 25%;
    color: #2D2D2D;
`;
const StyledNavLink = styled(Link)`
    text-decoration: none;
`;
const ParcelInfo = styled.div`
    ${tw`flex justify-between items-start mt-2 `} /* Reduced margin top to decrease height */
`;
const ColumnTitle = styled.h4`
    ${tw`text-sm font-medium inline-block`} /* Ensure this remains inline */ margin-right: 0.5rem; /* Add some space between the title and text */
    line-height: 0.1; /* Adjust line-height to ensure alignment */
`;
const LeftAlignedParcelColumn = styled(ParcelColumn)`
    margin-right: 10%; /* Настраиваем отступ влево */
`;

const ExpandedInfo = styled.div`
    ${tw`mt-4 ml-12`}
`;
const TableContainer = styled.div`
    ${tw`w-full mt-4`}
`;
const TableRowFirst = styled.div`
    ${tw`flex justify-between items-center py-2`}
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
const TableHeader = styled(TableRow)`
    border-bottom: 1px solid #e5e7eb;
`;
const TableCellFirst = styled.div`
    ${tw`text-lg text-gray-600`}
    width: 40%; /* Увеличение ширины, чтобы текст помещался */
    text-align: left;
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

const TotalRow = styled.div`
    ${tw`flex justify-between items-center py-2`}
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

const OutgoingParcels = ({roundedHeaderButton}) => {
    const [parcels, setParcels] = useState(() => {
        const cachedParcels = localStorage.getItem("parcels");
        return cachedParcels ? JSON.parse(cachedParcels) : [];
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [expandedParcel, setExpandedParcel] = useState(null);
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
            const db = getFirestore();
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userId = userDoc.data().userId;

                const q = query(
                    collection(db, "parcels"),
                    where("userId", "==", userId),
                    where("status", "==", "Исходящая")
                );

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const updatedParcels = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    localStorage.setItem("parcels", JSON.stringify(updatedParcels));
                    setParcels(updatedParcels);
                });

                return () => unsubscribe();
            }
        };

        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(true);
                fetchParcels(user).finally(() => setLoading(false));
            } else {
                setParcels([]);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    const filteredParcels = useMemo(() => {
        return parcels.filter(
            (parcel) =>
                parcel.trackingNumber.includes(searchQuery) ||
                parcel.parcelName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [parcels, searchQuery]);

    const totalItemsAndCost = useMemo(() => {
        const totalCost = filteredParcels.reduce((sum, parcel) => sum + parseFloat(parcel.totalCost || 0), 0);
        const totalWeight = filteredParcels.reduce((sum, parcel) => sum + parseFloat(parcel.actualWeight || 0), 0);

        return {
            totalParcels: filteredParcels.length,
            totalCost: totalCost.toFixed(2),
            totalWeight: totalWeight.toFixed(2),
        };
    }, [filteredParcels]);

    const onParcelClick = useCallback((parcel) => {
        setExpandedParcel((prev) => (prev === parcel.id ? null : parcel.id));
    }, []);



    return (
        <AnimationRevealPage>
            <Header roundedHeaderButton={roundedHeaderButton}/>
            <Container>
                <TwoColumn>
                    <LeftColumn>
                        <Heading>Исходящие посылки</Heading>
                        <Actions>
                            <InputContainer>
                                <SearchIconContainer>
                                    <SearchIcon/>
                                </SearchIconContainer>
                                <SearchInput
                                    type="text"
                                    placeholder="Поиск по номеру посылки, трекингу, названию посылки"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <NavLink to="/OutgoingParcelForm">
                                    <AddButton>Добавить посылку</AddButton>
                                </NavLink>
                            </InputContainer>
                        </Actions>
                        {/*<ButtonContainer>*/}
                        {/*    <PrimaryButton onClick={() => setSelectedCountry('Все склады')}*/}
                        {/*                   selected={selectedCountry === 'Все склады'}>Все склады</PrimaryButton>*/}
                        {/*    <PrimaryButton onClick={() => setSelectedCountry('США')}*/}
                        {/*                   selected={selectedCountry === 'США'}>США</PrimaryButton>*/}
                        {/*    <PrimaryButton onClick={() => setSelectedCountry('Турция')}*/}
                        {/*                   selected={selectedCountry === 'Турция'}>Турция</PrimaryButton>*/}
                        {/*</ButtonContainer>*/}
                        <InfoContainer>
                            <InfoBox>
                                <FaShippingFast />
                                <InfoText>
                                    Отправлено: {totalItemsAndCost.totalParcels} шт | {totalItemsAndCost.totalCost} $
                                    | {totalItemsAndCost.totalWeight} кг
                                </InfoText>
                            </InfoBox>

                            <IconButton href="#">
                                <PlusIcon/>
                            </IconButton>
                        </InfoContainer>

                        {loading ? (
                            <p>Загрузка...</p>
                        ) : filteredParcels.length === 0 ? (
                            <InfoMessageBox>
                                <InfoMessageHeading>У Вас нет исходящих посылок!</InfoMessageHeading>
                                <InfoMessageText>Выберите товар, оформите доставку на адрес склада, добавьте посылку и в этом разделе Вы сможете отслеживать прибытие посылки на наш склад.</InfoMessageText>
                            </InfoMessageBox>
                        ) : (
                            filteredParcels.map((parcel) => (
                                <ParcelCard key={parcel.id} onClick={() => onParcelClick(parcel)}>
                                    <ParcelHeading>
                                        <ParcelID>
                                            <Icon1
                                                src={parcel.warehouse === "США" ? usFlag : trFlag}
                                                alt="Country Flag"
                                            />
                                            Посылка #{parcel.id}
                                            <ExpandButton>
                                                {expandedParcel === parcel.id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                            </ExpandButton>
                                        </ParcelID>
                                        <SectionTitle>{parcel.parcelName}</SectionTitle>
                                        <SectionThirdTitle>Информация о посылке</SectionThirdTitle>
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
                                    {expandedParcel === parcel.id && parcel.products && (
                                        <ExpandedInfo>
                                            <TableContainer>
                                                <ProductsTitle>Товары</ProductsTitle>
                                                <TableHeader>
                                                    <TableCellFirst>Название товара</TableCellFirst>
                                                    <TableCell>Цена за штуку</TableCell>
                                                    <TableCell>Количество</TableCell>
                                                    <TableCell>Общая стоимость</TableCell>
                                                </TableHeader>
                                                {parcel.products.map((product, idx) => (
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
                                                    <TotalCell>{parcel.totalCost} $</TotalCell>
                                                </TotalRow>
                                            </TableContainer>
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
                                </ParcelCard>
                            ))
                        )}
                        <BottomButtonsContainer>
                            <NavLink to="/ExpectedLink">
                                <BottomButton>Добавить ожидаемую посылку</BottomButton>
                            </NavLink>
                            <NavLink to="/PersonalArea">
                                <BottomButton>В профиль</BottomButton>
                            </NavLink>
                        </BottomButtonsContainer>
                    </LeftColumn>
                </TwoColumn>
            </Container>
            <Footer/>
        </AnimationRevealPage>
    );
};

export default OutgoingParcels;

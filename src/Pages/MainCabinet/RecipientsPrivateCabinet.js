import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../components/headers/MainCabinetHeader";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from "../../components/footers/MainFooterWithLinks";
import plusIcon from "../../images/icon/plus.png";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth } from "../../FireBaseConfig";
import { MdDelete } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import TopUpCard from "../MainCabinet/CabinetComponets/TopUpCard";
import SingleProfileCard from "./RecipientForm/SingleProfileCard";

const Container = styled.div`
    ${tw`relative w-full min-h-screen`}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;



const TwoColumn = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-start max-w-screen-xl mx-auto py-20 md:py-8`}
    padding-bottom: 0;
`;

const LeftColumn = styled.div`
    ${tw`relative w-full text-left mx-auto`}
`;


const Heading = styled.h1`
    ${tw`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-4xl text-gray-900 leading-tight`}
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;



const ButtonAdd = styled.button`
    ${tw`ml-4 w-auto bg-gray-300 text-gray-600 font-bold py-3 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    border: none;
    width: 200px;
    height: 40px;
    padding: 0 1rem;

    &:hover, &:focus {
        transform: scale(1.1);
        background-color: #0ABD19;
        color: white;
    }
    &:focus::placeholder {
        color: transparent;
    }
`;



const Description = styled.p`
    ${tw`my-5 lg:my-8 text-base xl:text-lg`}
`;

const BottomButtonsContainer = styled.div`
    ${tw`flex justify-start gap-4 `}
`;

const BottomButton = styled.button`
    ${tw`ml-4 w-auto bg-gray-300 text-white  font-bold py-3 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    border: none;
    width: 300px;
    height: 40px;
    padding: 0 1rem;
    background-color: #0ABD19;
   
`;

const NavigationBanner = styled.div`
    ${tw`w-full py-8 mb-8 `}
    background: #EBFAE5;
    text-align: center;
    font-size: 1rem;
    color: #2D2D2D;
`;

const NavigationLink = styled.a`
    ${tw`text-3xl my-2 lg:text-lg lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1`}
    ${tw`hover:border-primary-500 hover:text-primary-500 focus:text-primary-500`}
    text-decoration: none;
    color: #2D2D2D;

    &:hover, &:focus {
        color: #0ABD19;
        text-decoration: none;
    }
`;


const CustomLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: none;
        color: inherit;
    }
`;

const CardContainer = styled.div`
    ${tw`grid gap-6 mt-6`}
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Гибкая сетка */
`;


const Icon = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 15px;
`;

const BackButton = styled(ButtonAdd)`
    ${tw`w-auto bg-gray-300 text-gray-600 font-bold py-3 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    margin-left: 0;
`;

const NavLink = styled.a`
    ${tw`text-lg mx-6 my-0 font-medium tracking-wide transition duration-300 pb-1`}
    text-decoration: none;
    color: inherit;

    &:hover, &:focus {
        color: #0ABD19;
        text-decoration: none;
    }
`;

const Card = styled.div`
    ${tw`p-4 border rounded-xl shadow-md`}
    border: 2px solid #0ABD19;
    background: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
`;
const CardTitle = styled.h3`
    ${tw`text-lg font-semibold mb-2`}
    color: #0ABD19;
`;

const CardsContainer = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto mb-5`}

`;
const CardText = styled.p`
    ${tw`text-sm text-gray-700`}
`;
const CardActions = styled.div`
  ${tw`flex justify-between items-center mt-4`}
`;


const EditLink = styled.a`
    ${tw`text-sm font-semibold text-blue-500 hover:underline cursor-pointer`}
`;

const DeleteButton = styled.button`
  ${tw`text-red-500 hover:text-red-700 cursor-pointer`}
  font-size: 1.2rem;
  background: none;
  border: none;
`;
const AddButtonContainer = styled.div`
  ${tw`flex justify-center mt-8`}
`;
const AddButton = styled.button`
  ${tw`px-6 py-3 bg-green-500 text-white font-bold rounded-full focus:outline-none transition-transform duration-300`}
  &:hover {
    background-color: #0ABD19;
    transform: scale(1.05);
  }
`;
const DeleteIcon = styled.button`
    ${tw`ml-auto `}
    background: none;
    border: none;
    cursor: pointer;
    margin-top: -20px;
    &:hover {
        color: red;
    }
`;

const PersonalCabinet = ({ roundedHeaderButton }) => {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchRecipients = async () => {
            const db = getFirestore();
            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, "recipients"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const fetchedRecipients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRecipients(fetchedRecipients);
            }
            setLoading(false);
        };

        fetchRecipients();
    }, []);

    const [showFirstImage, setShowFirstImage] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirstImage((prev) => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleEdit = (recipient) => {
        navigate('/RecipientsForm', { state: { recipient } });
    };

    const handleDelete = async (recipientId) => {
        try {
            const db = getFirestore();
            await deleteDoc(doc(db, "recipients", recipientId));
            setRecipients(recipients.filter(recipient => recipient.id !== recipientId));
        } catch (error) {
            console.error("Error deleting recipient: ", error);
        }
    };

    return (
        <>
            <AnimationRevealPage>
                <Header roundedHeaderButton={roundedHeaderButton} />
                <Container>
                    <TwoColumn>
                        <LeftColumn>
                            <Heading>
                                Получатели
                                <CustomLink to="/PersonalArea">
                                    <BackButton>
                                        Назад в личный кабинет
                                    </BackButton>
                                </CustomLink>
                            </Heading>
                            {loading ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                                    <ClipLoader color="#0ABD19" size={50} />
                                </div>
                            ) : recipients.length === 0 ? (
                                <Description>
                                    У Вас не добавлено ни одного получателя посылок.<br />
                                    Нажмите кнопку "Добавить получателя" и следуйте инструкции, заполните все поля и выберите получателя в данном шаге.
                                </Description>
                            ) : (
                                <CardContainer>
                                    <Card>
                                        <CardTitle>Даниил Шеховцов</CardTitle>
                                        <CardText>77761517243</CardText>
                                        <CardActions>
                                            <EditLink>Редактировать данные</EditLink>
                                            <DeleteButton title="Удалить получателя">🗑</DeleteButton>
                                        </CardActions>
                                    </Card>
                                    <Card>
                                        <CardTitle>Кто-то Кто-то</CardTitle>
                                        <CardText>77761517243</CardText>
                                        <CardActions>
                                            <EditLink>Редактировать данные</EditLink>
                                            <DeleteButton title="Удалить получателя">🗑</DeleteButton>
                                        </CardActions>
                                    </Card>
                                    {/* Добавьте больше карточек по необходимости */}
                                </CardContainer>

                            )}
                            <NavLink href="/RecipientsForm">
                                <BottomButtonsContainer>
                                    <BottomButton>
                                        <Icon src={plusIcon} alt="Plus Icon" />
                                        Добавить получателя
                                    </BottomButton>
                                </BottomButtonsContainer>
                            </NavLink>
                        </LeftColumn>
                    </TwoColumn>
                    <NavigationBanner>
                        <NavigationLink href="/CustomRegulations">Таможенные правила</NavigationLink>
                        <NavigationLink href="/DeliveryCalculator">Калькулятор доставки</NavigationLink>
                        <NavigationLink href="/ProhibitedProductsPage">Запрещенные товары к пересылке</NavigationLink>
                        <NavigationLink href="/Contacts">Задать вопрос</NavigationLink>
                        <NavigationLink href="/ExpectedLink">Добавить посылку</NavigationLink>
                    </NavigationBanner>
                    <CardsContainer>
                        <TopUpCard />
                        <SingleProfileCard />
                    </CardsContainer>
                </Container>
                <Footer />
            </AnimationRevealPage>
        </>
    );
};

export default PersonalCabinet;

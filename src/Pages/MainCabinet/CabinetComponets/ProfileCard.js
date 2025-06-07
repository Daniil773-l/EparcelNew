import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext"; // Adjust the path as needed
import styled from "styled-components";
import tw from "twin.macro";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, collection, query, where,onSnapshot } from "firebase/firestore";
import { db } from "../../../FireBaseConfig"; // Import Firestore config
import { motion, AnimatePresence } from "framer-motion";
import icon3 from "../../../images/icon/profile.png";
import icon2 from "../../../images/icon/receiver (1).png";
import icon5 from "../../../images/icon/lock (1).png";
import icon6 from "../../../images/icon/notification.png";
import plusIcon from "../../../images/icon/plus.png"; // Updated import to follow naming conventions
import NotificationPopup from "../CabinetComponets/NotificationPopup";
const Container = tw.div``;
const Header = tw.div`flex flex-col md:flex-row justify-between items-center mb-8`;
const Title = tw.h1`text-3xl font-semibold mt-4 md:mt-0`;
const Breadcrumb = tw.div`text-sm text-gray-500`;

const AddButton = styled.a`
    ${tw`ml-2  text-sm w-auto bg-green-500 text-white font-medium py-3 rounded-xl flex items-center justify-center leading-none focus:outline-none transition duration-300 mt-4 md:mt-0`}
    width: 250px;
    height: 20px;

    background-color: #0ABD19;
    border: none;
    text-decoration: none;
    text-align: center;

    &:hover, &:focus {
        transform: scale(1.1);
    }
`;
const Content = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 gap-8`}
`;

const Card = styled.div`
    ${tw`bg-white shadow-lg p-6 relative`}
    width: calc(100% - 40px);
    border-radius: 20px;
    min-height: 350px;
`;
const TabContentWrapper = styled.div`
    position: relative;
    height: 250px; /* Фиксированная высота для содержимого */
    overflow: hidden; /* Скрыть содержимое вне области */
`;

const StyledMotionContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 200px; /* Минимальная высота */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
`;


const CardHeader = styled.div`
    ${tw`flex items-center mb-4 relative`}
`;

const GreenStrip = styled.div`
    background-color: #DDF2E6;
    ${tw`absolute top-0 left-0 w-full h-16 rounded-t-2xl`}
`;

const Avatar = styled.div`
    ${tw`w-20 h-20 bg-white rounded-full flex items-center justify-center text-green-1002 text-xl font-bold absolute shadow-lg`}
    top: 4px;
    left: 16px;
`;

const CardTitle = styled.div`
    ${tw`ml-24 relative`}
    top: 20px;
`;

const Icon1 = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 10px; // Add some space between the icon and text
`;

const Name = styled.div`
    ${tw`font-bold text-secondary-600 text-lg mt-2 ml-2`}

`;

const Balance = styled.div`
    ${tw`text-green-1002 font-bold absolute text-lg`}
    right: 16px;

    top: 15px;
`;

const List = styled.ul`
    ${tw`space-y-4 mt-16`}  // Increase space between items
`;

const ListItem = styled.li`
    ${tw`flex items-center  text-secondary-600 text-lg`}  // Increase text size
`;

const Icon = styled.img`
    width: 23px;  // Set icon size to 16x16
    height: 23px;
    margin-right: 10px; // Increase space between icon and text
`;

const Divider = styled.div`
    ${tw`w-full h-px bg-gray-300`}
    position: absolute;
    width: 93%;
    bottom: 60px;
`;

const LogoutText = styled.div`
    ${tw`text-gray-600 text-lg cursor-pointer`}
    position: absolute;
    bottom: 20px;
    left: 26px;
`;

const TabContainer = styled.div`
    ${tw`flex justify-center mb-4`}
    background-color: #FFFFFF;
    border-radius: 24px;
    padding: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 70%;
    margin: 0 auto;
    position: relative;
`;

const Tab = styled.button`
    ${tw`py-3 px-8 rounded-full w-full transition-all duration-300 text-gray-700`}
    ${({ active }) => active ? tw`bg-green-1000 text-green-700 border border-green-500` : tw`bg-white`}
    border: none;

    &:not(:last-child) {
        margin-right: 4px;
    }
`;

const Address = styled.div`
    ${tw`text-gray-700 mt-4`}
`;

const AddressHeader = styled.div`
    ${tw`font-bold  text-secondary-600 text-lg mb-2`}
   
`;

const AddressID = styled.div`
    ${tw`text-green-1002 mb-1`}
`;

const AddressInfo = styled.div`
    ${tw`text-secondary-600 text-lg mb-2`}
`;

const AddressDetails = styled.div`
    ${tw`text-secondary-600 mt-6`}
`;

const AddressLine = styled.div`
    ${tw`text-lg`}
`;

const IDText = styled.div`
    ${tw`font-semibold ml-2`}
    color: #999999;
    font-size: 15px;
`;

const SecondCardGreenStrip = styled.div`
    ${tw`absolute top-0 left-0 w-full h-16 bg-green-1000 rounded-t-2xl`}
`;

const Navlink = styled.a`
    text-decoration: none;
    ${tw`flex items-center text-gray-700 text-lg`}
`;

const SecondCardText = styled.a`
    ${tw`text-gray-600 text-lg mt-4`}
    position: absolute;
    text-decoration: none;
    bottom: 20px;
    left: 26px;
`;

const animationVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const PersonalCabinet = () => {
    const { user, setUser } = useUser();
    const [activeTab, setActiveTab] = useState("usa");
    const [balance, setBalance] = useState(() => parseFloat(localStorage.getItem("balance")) || 0.0);
    const [notifications, setNotifications] = useState([]); // Состояние для уведомлений
    const [isPopupOpen, setPopupOpen] = useState(false); // Состояние для попапа
    const navigate = useNavigate();
    const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem("userData")) || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;

            // Получаем и кэшируем баланс
            const balanceDocRef = doc(db, "balances", userId);
            const unsubscribeBalance = onSnapshot(balanceDocRef, (docSnapshot) => {
                const newBalance = docSnapshot.exists() ? docSnapshot.data().balance : 0.0;
                setBalance(newBalance);
                localStorage.setItem("balance", newBalance.toString());
            });

            // Получаем и кэшируем уведомления
            const parcelsQuery = query(collection(db, "parcels"), where("userId", "==", userId));
            const unsubscribeNotifications = onSnapshot(parcelsQuery, (snapshot) => {
                const updatedNotifications = [];
                snapshot.docChanges().forEach((change) => {
                    const parcel = change.doc.data();
                    if (change.type === "added") {
                        updatedNotifications.push({
                            message: `Новая посылка "${parcel.trackingNumber}" была создана.`,
                            timestamp: new Date(),
                        });
                    }
                    if (change.type === "modified") {
                        updatedNotifications.push({
                            message: `Статус посылки "${parcel.trackingNumber}" изменен на "${parcel.status}".`,
                            timestamp: new Date(),
                        });
                    }
                });
                setNotifications((prev) => [...updatedNotifications, ...prev]);
            });

            // Получаем и кэшируем данные пользователя
            const userDocRef = doc(db, "users", userId);
            const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
                const data = docSnapshot.data();
                setUserData(data);
                localStorage.setItem("userData", JSON.stringify(data));
                setLoading(false);
            });

            return () => {
                unsubscribeBalance();
                unsubscribeNotifications();
                unsubscribeUser();
            };
        }
    }, []);




    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("User signed out");
            localStorage.removeItem('userData');
            setUser(null);
            navigate("/");
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };
    const animationVariants = {
        initial: { opacity: 0, y: 0 }, // Убираем смещение по оси Y
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 }, // Убираем смещение при выходе
    };


    const handleNotificationClick = () => {
        // Обновляем уведомления перед открытием
        setPopupOpen(true);
    };


    const handleClosePopup = () => {
        setPopupOpen(false); // Закрываем попап
    };

    const addressInfo = {
        usa: {
            id: "EPL-1021",
            address: (
                <>
                    <AddressLine> 209 Carson Drive</AddressLine>
                    <AddressLine>Bear</AddressLine>
                    <AddressLine> Delaware</AddressLine>
                    <AddressLine> 19701</AddressLine>
                </>
            ),
            phone: "+1 (484) 966-1610",
        },
        turkey: {
            id: "EPL-1021",
            address: (
                <>
                    <AddressLine>Скоро будет!</AddressLine>
                    {/*<AddressLine>FAST DEPO ESENYURT İСТАНБУЛ</AddressLine>*/}
                </>
            ),
            phone: "+90 534 081 3187",
        },
    };

    const currentInfo = addressInfo[activeTab];

    if (!user) {
        return <div>Loading...</div>;
    }

    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    const cabinetName = user.cabinetName || "Личный кабинет";
    return (
        <Container>
            <Header>
                <div>
                    <Breadcrumb>Главная / Личный Кабинет</Breadcrumb>
                    <Title>Личный кабинет</Title>
                </div>
                <AddButton href="/ExpectedLink">
                    <Icon1 src={plusIcon} alt="Plus Icon" /> Добавить ожидаемую посылку
                </AddButton>
            </Header>
            <Content>
                <Card>
                    <GreenStrip />
                    <CardHeader>
                        <Avatar>{initials}</Avatar>
                        <CardTitle>
                            <IDText>Ваш ID: {user.userId}</IDText>
                            <Name>{cabinetName}</Name>
                        </CardTitle>
                        <Balance>Баланс: {balance.toFixed(2)} ₸</Balance>
                    </CardHeader>
                    <List>
                        <Navlink href="/ChangingContactDetails">
                            <ListItem>
                                <Icon src={icon3} alt="Profile" />Профиль
                            </ListItem>
                        </Navlink>
                        <Navlink href="/RecipientsPrivateCabinet">
                            <ListItem>
                                <Icon src={icon2} alt="Receivers" /> Получатели
                            </ListItem>
                        </Navlink>
                        <Navlink href="/ChangePassword">
                            <ListItem>
                                <Icon src={icon5} alt="Change Password" /> Сменить пароль
                            </ListItem>
                        </Navlink>
                        <Navlink href="#" onClick={handleNotificationClick}> {/* Обработчик для уведомлений */}
                            <ListItem>
                                <Icon src={icon6} alt="Notification" /> Уведомления
                            </ListItem>
                        </Navlink>
                    </List>
                    <Divider />
                    <LogoutText onClick={handleLogout}>Выйти из аккаунта</LogoutText>
                    {isPopupOpen && (
                        <NotificationPopup notifications={notifications} onClose={handleClosePopup} />
                    )}
                </Card>
                <Card>
                    <SecondCardGreenStrip />
                    <TabContainer>
                        <Tab active={activeTab === "usa"} onClick={() => setActiveTab("usa")}>США</Tab>
                    </TabContainer>
                    <TabContentWrapper>
                        <AnimatePresence exitBeforeEnter>
                            <StyledMotionContainer
                                key={activeTab}
                                variants={animationVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <Address>
                                    <AddressHeader>Ваш адрес склада:</AddressHeader>
                                    <AddressID>Ваш ID: EKZ -{user.userId}</AddressID>
                                    <AddressInfo>* Не забывайте указывать Ваш ID при покупке товаров</AddressInfo>
                                    <AddressDetails>
                                        {currentInfo.address}
                                        tel: {currentInfo.phone}
                                    </AddressDetails>
                                </Address>
                            </StyledMotionContainer>
                        </AnimatePresence>
                    </TabContentWrapper>


                    <Divider />
                    <SecondCardText href="/Deliveryaddress">Как правильно указывать адрес для доставки?</SecondCardText>
                </Card>
            </Content>
        </Container>
    );
};

export default PersonalCabinet;

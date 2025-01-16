import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../FireBaseConfig";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileHeaderWrapper = styled.header`
    ${tw`flex lg:hidden justify-between items-center bg-white h-[70px] px-4 shadow-md`};
    box-sizing: border-box;
`;

const HamburgerIcon = styled.div`
    ${tw`text-2xl cursor-pointer text-gray-800`};
`;

const MobileMenuOverlay = styled(motion.div)`
    ${tw`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50`};
`;

const MobileMenuContainer = styled(motion.div)`
    ${tw`fixed top-0 left-0 h-full bg-white w-4/5 max-w-sm shadow-lg z-50`};
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto; /* Добавляем прокрутку, если содержимого больше, чем высота экрана */
`;

const CloseIcon = styled.div`
    ${tw`text-xl text-gray-700 mb-4 cursor-pointer self-end`};
`;

const ProfileSection = styled.div`
    ${tw`flex flex-col items-center mb-6`};
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
`;

const InitialsCircle = styled.div`
    ${tw`flex items-center justify-center w-16 h-16 rounded-full bg-white text-green-1002 text-2xl font-semibold
    `
};
border: 2px solid #0ABD19 `;


const ProfileName = styled.div`
    ${tw`mt-4 text-lg font-bold text-gray-900`};
`;

const Balance = styled.div`
    ${tw`text-sm text-gray-500 mt-1`};
`;

const NavLinksContainer = styled.div`
    ${tw`flex flex-col space-y-4 mt-4`};
`;

const NavLink = styled.a`
    ${tw`text-base font-semibold text-gray-700 hover:text-green-500 transition duration-300`};
    text-decoration: none;
    line-height: 1.2; /* Увеличиваем межстрочный интервал */
`;

const LogoutButton = styled.button`
    ${tw`mt-auto bg-red-500 text-white py-3 rounded-lg w-full text-center`};
    font-size: 16px;
    border: none;
    margin-top: 20px; /* Добавляем отступ сверху */
    transition: background-color 0.3s;
    &:hover {
        background-color: #b71c1c;
    }
`;


const MobileHeader = () => {
    const { isAuthenticated, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userData, setUserData] = useState(() => {
        // Используем локальный кэш для мгновенной загрузки
        const cachedUser = JSON.parse(localStorage.getItem("userData"));
        return cachedUser || null;
    });
    const [balance, setBalance] = useState(() => {
        // Кэшируем баланс
        const cachedBalance = localStorage.getItem("balance");
        return cachedBalance ? parseFloat(cachedBalance) : 0.0;
    });
    const navigate = useNavigate();
    const unsubscribeUserRef = useRef(null);
    const unsubscribeBalanceRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [balanceLoading, setBalanceLoading] = useState(true);
    useEffect(() => {
        if (user?.email) {
            const normalizedEmail = user.email.toLowerCase();
            const userQuery = query(collection(db, "users"), where("email", "==", normalizedEmail));

            unsubscribeUserRef.current = onSnapshot(userQuery, (snapshot) => {
                if (!snapshot.empty) {
                    const userDoc = snapshot.docs[0];
                    const data = { ...userDoc.data(), id: userDoc.id };
                    setUserData(data);
                    localStorage.setItem("userData", JSON.stringify(data)); // Кэшируем данные
                    setIsLoading(false);

                    // Обновляем баланс
                    const balanceDocRef = doc(db, "balances", userDoc.id);
                    if (unsubscribeBalanceRef.current) unsubscribeBalanceRef.current();
                    unsubscribeBalanceRef.current = onSnapshot(balanceDocRef, (docSnapshot) => {
                        const newBalance = docSnapshot.exists() ? docSnapshot.data().balance : 0.0;
                        setBalance(newBalance);
                        localStorage.setItem("balance", newBalance.toString()); // Кэшируем баланс
                        setBalanceLoading(false);
                    });
                } else {
                    setIsLoading(false);
                    setBalanceLoading(false);
                }
            });
        }

        return () => {
            if (unsubscribeUserRef.current) unsubscribeUserRef.current();
            if (unsubscribeBalanceRef.current) unsubscribeBalanceRef.current();
        };
    }, [user]);


    const getInitials = () => {
        if (userData) {
            return `${userData.firstName.charAt(0).toUpperCase()}${userData.lastName.charAt(0).toUpperCase()}`;
        }
        return "П";
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/App");
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    };

    return (
        <>
            <MobileHeaderWrapper>
                <HamburgerIcon onClick={() => setIsMenuOpen(true)}>
                    <FaBars/>
                </HamburgerIcon>
                <ProfileName>{userData?.firstName} {userData?.lastName}</ProfileName>


            </MobileHeaderWrapper>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <MobileMenuOverlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileMenuContainer
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                        >
                            <CloseIcon onClick={() => setIsMenuOpen(false)}>
                                <FaTimes />
                            </CloseIcon>
                            <ProfileSection>
                                <InitialsCircle>{getInitials()}</InitialsCircle>
                                <ProfileName>{userData?.firstName} {userData?.lastName}</ProfileName>
                                <Balance>Баланс: {parseInt(balance)} ₸</Balance>

                            </ProfileSection>
                            <NavLinksContainer>
                                <NavLink href="/PersonalArea">Личный кабинет</NavLink>
                                <NavLink href="/IncomingParcels">Входящие посылки</NavLink>
                                <NavLink href="/OutgoingParcels">Исходящие посылки</NavLink>
                                <NavLink href="/DeliveredParcels">Доставленные посылки</NavLink>
                                <NavLink href="/WarehouseServices">Услуги склада</NavLink>
                                <NavLink href="/Purchaseofgoods">Выкуп товаров</NavLink>
                                <NavLink href="/CustomRegulations">Таможенные правила</NavLink>
                                <NavLink href="/DeliveryCalculator">Калькулятор доставки</NavLink>
                                <NavLink href="/ProhibitedProductsPage">Запрещенные товары</NavLink>
                                <NavLink href="/Contacts">Задать вопрос</NavLink>
                                <NavLink href="/RedemptionOfGoods">Выкуп товаров</NavLink>

                            </NavLinksContainer>
                            <LogoutButton onClick={handleLogout}>Выйти из аккаунта</LogoutButton>
                        </MobileMenuContainer>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileHeader;

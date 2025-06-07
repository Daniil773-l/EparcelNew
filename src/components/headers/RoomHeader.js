import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import styled, { createGlobalStyle, css } from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as PlusIconSVG } from "../../images/icon/PlusIcon.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../FireBaseConfig";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import NavToggler from "../features/NavToggler";
import MobileHeader from "./MobileHeader";

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

const Header = styled.header`
    ${tw`hidden lg:flex justify-between items-center bg-[#F9F9F9] h-[70px] px-12 lg:px-20`}
    box-sizing: border-box;
    margin-left: 0;
    padding-left: 40px;
    border-bottom: 1px solid #E0E0E0;
`;

const NavContainer = styled.div`
    ${tw`flex justify-center flex-1`}
`;

const NavLinks = styled.div`
    ${tw`flex items-center space-x-6`}
    margin-left: 0;
`;

const NavLink = styled.a`
    ${tw`text-sm lg:text-base tracking-wide transition duration-300`}
    text-decoration: none;
    color: #2D2D2D;
    padding: 8px 12px;

    &:hover, &:focus {
        color: #0ABD19;
        text-decoration: underline;
    }
`;

const LastNavLink = styled(NavLink)`
    ${tw`mr-4 lg:mr-8`}
`;

const ProfileDropdownContainer = tw.div`relative inline-block text-left mt-4 lg:mt-0`;

const DropdownMenu = styled(motion.div)`
    ${tw`origin-top-right absolute right-0 mt-2 w-48 lg:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
`;

const DropdownItem = styled.a`
    ${tw`block px-4 py-3 text-sm text-gray-700 transition-colors duration-150`}
    font-family: 'SFUIText', sans-serif;
    text-decoration: none;

    &:hover {
        ${tw`bg-green-100 text-green-600`}
    }
`;

const ProfileButton = styled.button`
    ${tw`flex items-center text-sm font-medium text-white rounded-full focus:outline-none ml-4`}
    ${tw`w-[150px] lg:w-[180px] bg-green-500 py-1 flex items-center justify-center leading-none transition duration-300`}
    background-color: #0ABD19;
    border: none;
    &:hover, &:focus {
        transform: scale(1.1);
        background-color: #0ABD19;
    }
`;

const InitialsCircle = styled.div`
    ${tw`flex items-center justify-center w-8 h-8 rounded-full bg-white text-green-500 mr-2`}
    font-size: 14px;
    padding: 2px;
    font-weight: normal;
`;

const IconContainer = styled.div`
    ${tw`flex items-center cursor-pointer`}
`;

const PlusIcon = styled(PlusIconSVG)`
    ${({ iconMargin }) => iconMargin && css`
        margin: ${iconMargin};
    `}
    ${tw`w-6 h-6`}
`;

const BalanceText = styled.span`
    ${({ textMargin }) => textMargin && css`
        margin: ${textMargin};
    `}
    ${tw`text-sm`}
`;

const BalanceAndProfileContainer = styled.div`
    ${tw`flex items-center space-x-4`}
    margin-right: 40px;
`;

const HeaderContainer = () => {
    const { isAuthenticated, user, loading } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [userData, setUserData] = useState(() => {
        try {
            const stored = localStorage.getItem("userData");
            return stored && stored !== "undefined" ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const [balance, setBalance] = useState(() => {
        const raw = localStorage.getItem("balance");
        return raw && raw !== "undefined" ? parseFloat(raw) : 0.0;
    });

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [balanceLoading, setBalanceLoading] = useState(true);
    const unsubscribeUserRef = useRef(null);
    const unsubscribeBalanceRef = useRef(null);

    useEffect(() => {
        if (user?.email) {
            const normalizedEmail = user.email.toLowerCase();
            const userQuery = query(collection(db, "users"), where("email", "==", normalizedEmail));

            unsubscribeUserRef.current = onSnapshot(userQuery, (snapshot) => {
                if (!snapshot.empty) {
                    const userDoc = snapshot.docs[0];
                    const data = { ...userDoc.data(), id: userDoc.id };
                    setUserData(data);
                    localStorage.setItem("userData", JSON.stringify(data));
                    setIsLoading(false);

                    const balanceDocRef = doc(db, "balances", userDoc.id);
                    if (unsubscribeBalanceRef.current) unsubscribeBalanceRef.current();
                    unsubscribeBalanceRef.current = onSnapshot(balanceDocRef, (docSnapshot) => {
                        const newBalance = docSnapshot.exists() ? docSnapshot.data().balance : 0.0;
                        setBalance(newBalance);
                        localStorage.setItem("balance", newBalance.toString());
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

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    };

    const getInitials = () => {
        if (userData) {
            return `${userData.firstName?.[0]?.toUpperCase() || ""}${userData.lastName?.[0]?.toUpperCase() || ""}`;
        }
        return "П";
    };

    const handlePlusIconClick = () => {
        navigate("/PaymentForm");
    };

    return (
        <>
            <GlobalStyle />
            {isAuthenticated && (
                <>
                    <Header>
                        <NavContainer>
                            <NavLinks>
                                <NavLink href="/CustomRegulations">Таможенные правила</NavLink>
                                <NavLink href="/DeliveryCalculator">Калькулятор доставки</NavLink>
                                <NavLink href="/ProhibitedProductsPage">Запрещенные товары</NavLink>
                                <NavLink href="/Contacts">Задать вопрос</NavLink>
                                <LastNavLink href="/RedemptionOfGoods">Выкуп товаров</LastNavLink>
                            </NavLinks>
                        </NavContainer>
                        <BalanceAndProfileContainer>
                            <IconContainer onClick={handlePlusIconClick}>
                                <PlusIcon iconMargin="0 8px 0 0" />
                                <BalanceText textMargin="0 16px 0 0">Баланс: {balance.toFixed(0)} ₸</BalanceText>
                            </IconContainer>
                            <ProfileDropdownContainer ref={dropdownRef}>
                                <ProfileButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <InitialsCircle>{getInitials()}</InitialsCircle>
                                    Личный кабинет
                                </ProfileButton>
                                {isDropdownOpen && (
                                    <DropdownMenu
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <DropdownItem href="/PersonalArea">Профиль</DropdownItem>
                                        <DropdownItem href="/RecipientsPrivateCabinet">Получатели</DropdownItem>
                                        <DropdownItem href="/ChangingContactDetails">Изменить контактные данные</DropdownItem>
                                        <DropdownItem href="/ChangePassword">Сменить пароль</DropdownItem>
                                        <DropdownItem onClick={handleLogout}>Выйти из аккаунта</DropdownItem>
                                    </DropdownMenu>
                                )}
                            </ProfileDropdownContainer>
                        </BalanceAndProfileContainer>
                    </Header>
                    <MobileHeader>
                        <NavToggler handleLogout={handleLogout} />
                    </MobileHeader>
                </>
            )}
        </>
    );
};

export default HeaderContainer;

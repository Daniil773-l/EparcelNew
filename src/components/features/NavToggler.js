import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import logo from "../../images/logo/logo.svg";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FireBaseConfig";

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

const NavContainer = styled.div`
    ${tw`lg:hidden flex items-center justify-between p-4 bg-white shadow-md fixed w-full top-0 z-50 left-0`}
`;

const NavLinksContainer = styled(motion.div)`
    ${tw`fixed top-0 left-0 w-full h-full bg-white flex flex-col items-start justify-center z-40 `}
    padding-left: 0;
    margin-left: 0;
`;

const NavLink = styled.a`
    ${tw`text-base my-2 text-center text-gray-800 ml-8`}
    text-decoration: none;

    &:hover {
        ${tw`text-green-500`}
    }
`;

const ProfileButton = styled.button`
    ${tw`text-base my-2 text-center ml-6`}
    background: none;
    border: none;
    cursor: pointer;
    color: #B0B0B0;
    &:hover {
        ${tw`text-green-500`}
    }
`;

const Logo = styled.img`
    ${tw`w-40 h-10`}
    margin-right: 35%;
`;

const UserInfoContainer = styled.div`
    ${tw`flex flex-col items-start p-4 border-b border-gray-300 w-full`}
`;

const Avatar = styled.div`
    ${tw`w-12 h-12 rounded-full flex items-center justify-center shadow-md  text-lg `}
    color: #0ABD19;
    font-size: 18px;
`;

const UserName = styled.div`
    ${tw`mt-2 font-semibold text-lg `}
    color: #0ABD19;
    font-size: 16px;
    line-height: 20px;
`;

const UserID = styled.div`
    ${tw`text-sm text-gray-500`}
`;

const NavToggler = ({ handleLogout }) => {
    const { isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navRef = useRef(null);
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogoutClick = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("User signed out");
            localStorage.removeItem('userData');
            setUser(null);
            navigate("/App");
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    return (
        <>
            <GlobalStyle />
            <NavContainer>
                {isOpen ? (
                    <CloseIcon onClick={() => setIsOpen(false)} />
                ) : (
                    <MenuIcon onClick={() => setIsOpen(true)} />
                )}
                <Logo src={logo} alt="logo" />
            </NavContainer>
            <AnimatePresence>
                {isOpen && (
                    <NavLinksContainer
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        ref={navRef}
                    >
                        {user && (
                            <UserInfoContainer>
                                <Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>
                                <UserName>{user.firstName} {user.lastName}</UserName>
                                <UserID>ID: #{user.userId}</UserID>
                            </UserInfoContainer>
                        )}
                        <NavLink href="/PersonalArea">Личный кабинет</NavLink>
                        <NavLink href="/IncomingParcels">Входящие посылки</NavLink>
                        <NavLink href="/OutgoingParcels">Исходящие посылки</NavLink>
                        <NavLink href="/DeliveredParcels">Доставленные посылки</NavLink>
                        <NavLink href="/WarehouseServices">Услуги склада</NavLink>
                        <NavLink href="/CustomsRegulations">Таможенные правила</NavLink>
                        <NavLink href="/DeliveryCalculator">Калькулятор доставки</NavLink>
                        <NavLink href="/ProhibitedProductsPage">Запрещенные товары</NavLink>
                        <NavLink href="/Contacts">Задать вопрос</NavLink>
                        <NavLink href="/RedemptionOfGoods">Выкуп товаров</NavLink>
                        {isAuthenticated && (
                            <>
                                <NavLink href="/RecipientsPrivateCabinet">Получатели</NavLink>
                                <NavLink href="/ChangingContactDetails">Изменить контактные данные</NavLink>
                                <NavLink href="/ChangePassword">Сменить пароль</NavLink>
                                <ProfileButton onClick={handleLogoutClick}>Выйти из аккаунта</ProfileButton>
                            </>
                        )}
                    </NavLinksContainer>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavToggler;

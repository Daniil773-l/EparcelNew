import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import styled, { createGlobalStyle } from "styled-components";
import { ReactComponent as SearchIcon } from "../../../images/img/search-icon.svg"; // Ensure you have the search icon SVG file
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../FireBaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import logo from "../../../images/logo/logo.svg"; // Ensure you have the logo file

const GlobalStyle = createGlobalStyle`
   

    body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
       
    }
`;

const Header = styled.header`
    ${tw`hidden lg:flex flex-col`}
    box-sizing: border-box;
    margin: 0;
`;

const TopBar = styled.div`
    ${tw`flex justify-between items-center h-[70px] px-8 lg:px-16`}
`;

const BottomBar = styled.div`
    ${tw`w-full h-[1px] bg-gray-300`}
`;

const LogoLink = styled.a`
    ${tw`flex items-center font-black border-b-0`}
    img {
        ${tw`w-40 h-10 w-auto h-auto`}
    }
`;

const Actions = styled.div`
    ${tw`relative flex items-center w-full justify-between`}
`;

const InputContainer = styled.div`
    ${tw`relative flex-grow`}
    margin-left: 2rem; // Increase margin to increase distance between logo and input
`;

const SearchInput = styled.input`
    ${tw`pl-10 pr-4 py-3 rounded-lg border-2 w-full font-medium focus:outline-none transition duration-300`}
    height: 20px; // Set fixed height
    border-color: #D3D3D3; // Set border color to light grey
    width: 300px;
    &:hover, &:focus {
        border-color: #D3D3D3;
    }
`;

const SearchIconContainer = styled.div`
    ${tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}
`;

const ProfileDropdownContainer = tw.div`relative inline-block text-left mt-4 lg:mt-0`;

const DropdownMenu = styled.div`
    ${tw`origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
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
    ${tw`flex items-center text-sm font-medium text-white rounded-full focus:outline-none`}
    ${tw`w-[150px] bg-green-500 my-2 py-1 flex items-center justify-center leading-none transition duration-300`}
    background-color: #0ABD19;
    border: none;
    &:hover, &:focus {
        transform: scale(1.1);
        background-color: #0ABD19;
    }
`;

const InitialsCircle = styled.div`
    ${tw`flex items-center justify-center w-8 h-8 rounded-full bg-white text-green-500 font-bold mr-2`}
    font-size: 14px;
    padding: 2px;
`;

const HeaderContainer = () => {
    const { isAuthenticated, user, loading } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.email) {
                const normalizedEmail = user.email.toLowerCase();
                const q = query(collection(db, "users"), where("email", "==", normalizedEmail));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0].data();
                        setUserData(userDoc);
                    }
                });
                return () => unsubscribe();
            }
        };

        if (!loading) {
            fetchUserData();
        }
    }, [user, loading]);

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
            navigate("/App");
        }).catch((error) => {
            console.error("Ошибка выхода:", error);
        });
    };

    const getInitials = () => {
        if (userData) {
            return `${userData.firstName.charAt(0).toUpperCase()}${userData.lastName.charAt(0).toUpperCase()}`;
        }
        return "П";
    };

    return (
        <>
            <GlobalStyle />
            {isAuthenticated && (
                <>
                    <Header>
                        <TopBar>
                            <LogoLink href="/">
                                <img src={logo} alt="logo" />
                            </LogoLink>
                            <Actions>
                                <InputContainer>
                                    <SearchIconContainer>
                                        <SearchIcon />
                                    </SearchIconContainer>
                                    <SearchInput
                                        type="text"
                                        placeholder="Search"
                                    />
                                </InputContainer>
                                <ProfileDropdownContainer ref={dropdownRef}>
                                    <ProfileButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <InitialsCircle>
                                            {getInitials()}
                                        </InitialsCircle>
                                        Admin
                                    </ProfileButton>
                                    {isDropdownOpen && (
                                        <DropdownMenu>
                                            <DropdownItem onClick={handleLogout}>Выйти из аккаунта</DropdownItem>
                                        </DropdownMenu>
                                    )}
                                </ProfileDropdownContainer>
                            </Actions>
                        </TopBar>
                        <BottomBar />
                    </Header>
                </>
            )}
        </>
    );
};

export default HeaderContainer;

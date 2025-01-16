import React from "react";

import tw from "twin.macro";
import styled, { keyframes,css } from "styled-components";
import logo from "../../images/logo/logo.svg";
import NavToggler from "../../components/features/NavToggler"; // Import NavToggler

const HeaderContainer = styled.header`
    ${tw`hidden lg:flex justify-between items-center max-w-screen-2xl mx-auto`}
    margin-top: 20px;
    padding: 0;
    box-sizing: border-box;
`;



const NavLinks = tw.div`inline-block`;

const NavLink = styled.a`
    font-family: 'SFUIText', sans-serif;
    ${tw`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1`}
    ${tw`hover:border-primary-500 hover:text-primary-500 focus:text-primary-500`}
    ${css`
        text-decoration: none;
        color: #2D2D2D;

        &:hover, &:focus {
            color: #0ABD19;
            text-decoration: none;
            ${props => props.hasBorder ? tw`border-b-2 border-transparent` : tw`border-b-0`};
        }
    `}
`;

const pulsateAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
`;

const PrimaryLink = styled(NavLink)`
    ${tw`lg:mx-0 px-8 py-3 rounded text-gray-100 hocus:text-gray-200 focus:shadow-outline rounded-full border-b-0`}
    background-color: #0ABD19;
    border: none;
    transition: background-color 0.3s ease;

    &:not(:hover):not(:focus) {
        animation: ${pulsateAnimation} 1.5s infinite alternate;
    }

    &:hover, &:focus {
        background-color: #0ABD50;
        transform: scale(1.1);
    }
`;

const LogoLink = styled(NavLink)`
    ${tw`flex items-center font-black border-b-0`}
    margin-right: 15px;
    img {
        ${tw`w-40 h-10 w-auto h-auto`}
    }
`;

const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({ roundedHeaderButton = false, logoLink, links, className }) => {
    const defaultLinks = [
        <NavLinks key={1}>
            <NavLink href="/PersonalArea">Личный кабинет</NavLink>
            <NavLink href="/IncomingParcels">Входящие посылки</NavLink>
            <NavLink href="/OutgoingParcels">Исходящие посылки</NavLink>
            <NavLink href="/DeliveredParcels">Доставленные посылки</NavLink>
            <NavLink href="/WarehouseServices">Услуги склада</NavLink>
            <NavLink href="/Purchaseofgoods">Выкуп товаров</NavLink>
        </NavLinks>
    ];

    const defaultLogoLink = (
        <LogoLink href="/">
            <img src={logo} alt="logo" />
        </LogoLink>
    );

    logoLink = logoLink || defaultLogoLink;
    links = links || defaultLinks;

    return (
        <>

            <HeaderContainer className={className || "header-light"}>
                <DesktopNavLinks>
                    {logoLink}
                    {links}
                </DesktopNavLinks>
                <NavToggler />
            </HeaderContainer>
        </>
    );
};

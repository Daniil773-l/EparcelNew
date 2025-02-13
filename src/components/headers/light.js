import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled, { keyframes, createGlobalStyle, css } from "styled-components";
import useAnimatedNavToggler from "../helpers/useAnimatedNavToggler";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../FireBaseConfig"; // Make sure to import your Firebase config
import logo from "../../images/logo/logo-kz.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = styled.header`
  ${tw`flex justify-between items-center max-w-screen-xl mx-auto p-4`}
`;

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'SFUIText';
    font-style: italic;
    font-weight: normal;
  }
`;

const NavLinks = styled.div`
  ${tw`inline-block lg:flex lg:items-center justify-start`}
`;

const NavLink = styled.a`
  font-family: 'SFUIText', sans-serif;
  ${tw`text-sm lg:text-base my-2 lg:mx-5 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1`}
  ${tw`hover:border-primary-500 hover:text-primary-500 focus:text-primary-500`}
  ${css`
    text-decoration: none;
    color:#1d324f;

    &:hover, &:focus {
      color: #0ABD19;
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
    ${tw`lg:mx-0 px-8 py-3 rounded-full text-white focus:shadow-outline border-b-0`}
    background-color: #0ABD19;
    border: none;
    transition: all 0.3s ease;

    &:not(:hover):not(:focus) {
        animation: ${pulsateAnimation} 1.5s infinite alternate;
    }

    &:hover, &:focus {
        background-color: #098E14; /* Темнее зеленый для контраста */
        transform: scale(1.1);
        color: white; /* Обеспечивает сохранение белого текста */
    }
`;


const LogoLink = styled.a`
  ${tw`flex items-center font-black border-b-0 mr-24`} /* Added margin-right */
  img {
    ${tw`w-40 h-auto`}
  }
`;

const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between lg:hidden`;
const NavToggle = styled.button`
  ${tw`lg:hidden z-20 focus:outline-none transition duration-300`}
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${({ open }) => (open ? "#0ABD19" : "currentColor")};

  svg {
    path {
      stroke: ${({ open }) => (open ? "#0ABD19" : "currentColor")};
    }
  }
`;

const iconStyles = tw`w-6 h-6`;

const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

const DesktopNavLinks = styled.nav`
  ${tw`hidden lg:flex flex-1 justify-start items-center ml-0`}
  margin-left: 6%;
`;

const collapseBreakPointCssMap = {
    sm: {
        mobileNavLinks: tw`sm:hidden`,
        desktopNavLinks: tw`sm:flex`,
        mobileNavLinksContainer: tw`sm:hidden`
    },
    md: {
        mobileNavLinks: tw`md:hidden`,
        desktopNavLinks: tw`md:flex`,
        mobileNavLinksContainer: tw`md:hidden`
    },
    lg: {
        mobileNavLinks: tw`lg:hidden`,
        desktopNavLinks: tw`lg:flex`,
        mobileNavLinksContainer: tw`lg:hidden`
    },
    xl: {
        mobileNavLinks: tw`lg:hidden`,
        desktopNavLinks: tw`lg:flex`,
        mobileNavLinksContainer: tw`lg:hidden`
    }
};

export default ({ roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg" }) => {
    const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
    const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const defaultLinks = [
        <NavLinks key={1}>
            <NavLink href="/tariffs">Тарифы</NavLink>
            <NavLink href="/Rates">Услуги и стоимость</NavLink>
            <NavLink href="/Shops">Магазины</NavLink>
            <NavLink href="/RedemptionOfGoods">Выкуп товаров</NavLink>
            <NavLink href="/AboutUS">О нас</NavLink>
            <NavLink href="/Contacts">Контакты</NavLink>
            {!isAuthenticated && (
                <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} href="/Login">Войти</PrimaryLink>
            )}
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
            <GlobalStyles />
            <Header className={className || "header-light"}>
                <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
                    {logoLink}
                    {links}
                </DesktopNavLinks>

                <MobileNavLinksContainer>
                    {logoLink}
                    <NavToggle onClick={toggleNavbar} open={showNavLinks}>
                        {showNavLinks ? <CloseIcon css={iconStyles} /> : <MenuIcon css={iconStyles} />}
                    </NavToggle>
                    <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
                        {links}
                    </MobileNavLinks>
                </MobileNavLinksContainer>
            </Header>
        </>
    );
};

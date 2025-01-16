import React, {useState, useEffect} from "react";
import styled, {createGlobalStyle} from "styled-components";
import tw from "twin.macro";
import Header from "../../components/headers/MainCabinetHeader";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from "../../components/footers/MainFooterWithLinks";
import {reauthenticateWithCredential, EmailAuthProvider, updatePassword} from "firebase/auth";
import {auth} from "../../FireBaseConfig";
import TopUpCard from "../MainCabinet/CabinetComponets/TopUpCard";
import SingleProfileCard from "./RecipientForm/SingleProfileCard";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import toast, {Toaster} from "react-hot-toast";

const GlobalStyles = createGlobalStyle`
    input:focus {
        outline: none; /* Убираем стандартный фокус */
        box-shadow: none; /* Убираем тень */
    }
`;

const Container = styled.div`
    ${tw`relative w-full min-h-screen`}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;

const TwoColumn = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-start max-w-screen-xl mx-auto py-20 md:py-24`}
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

const FormContainer = styled.div`
    ${tw`flex flex-col w-full`}
`;

const InputsRow = styled.div`
    ${tw`flex flex-col lg:flex-row lg:items-center mb-4`}
    width: 100%;
`;

const InputContainer = styled.div`
    ${tw`relative flex-1 mr-4`}
`;

const Label = styled.label`
    ${tw`block text-gray-700 text-sm font-bold mb-2`}
`;

const PasswordInputWrapper = styled.div`
    ${tw`relative flex-1`}
`;

const SearchInput = styled.input`
    ${tw`pl-4 py-3 font-medium focus:outline-none transition duration-300 `}
    border-color: #0ABD19;
    width: 100%;
    border: none;
    border-bottom: 1px solid #0ABD19;
    padding-left: 0;

    &:hover, &:focus {
        border-color: #0ABD19;
    }

    &:focus::placeholder {
        color: transparent;
    }
`;

const TogglePasswordButton = styled.button`
    ${tw`absolute right-0 top-0 mt-3 mr-4`}
    border: none;
    background: none;
    cursor: pointer;

    svg {
        ${tw`w-5 h-5`} /* Adjust the size here */
    }
`;

const BottomButtonsContainer = styled.div`
    ${tw`flex justify-start gap-4 mt-8`}
`;

const BottomButton = styled.button`
    ${tw`w-auto bg-green-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    background-color: #0ABD19;
    border: none;
    width: 200px;
    height: 50px;

    &:hover, &:focus {
        transform: scale(1.1);
    }
`;

const NavigationBanner = styled.div`
    ${tw`w-full py-8 mb-12 mt-10`}
    background: #EBFAE5;
    text-align: center;
    font-size: 1rem;
    color: #2D2D2D;
`;

const NavigationLink = styled.a`
    font-family: 'SFUIText', sans-serif;
    ${tw`text-lg mx-6 my-0 font-medium tracking-wide transition duration-300 pb-1`}
    ${tw`hover:border-primary-500 hover:text-primary-500 focus:text-primary-500`}
    text-decoration: none;
    color: #2D2D2D;

    &:hover, &:focus {
        color: #0ABD19;
        text-decoration: none;
    }
`;

const NavigationLink1 = styled.a`
    font-family: 'SFUIText', sans-serif;
    ${tw`text-lg mx-6 my-0 font-medium tracking-wide transition duration-300 pb-1`}
    ${tw`hover:border-primary-500 hover:text-primary-500 focus:text-primary-500`}
    text-decoration: none;
    color: #0ABD19;

    &:hover, &:focus {
        color: #0ABD19;
        text-decoration: none;
    }
`;

const CardsContainer = styled.div`
    ${tw`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto mb-20`}
    margin-top: 46px;
`;

const BackButton = styled.button`
    ${tw`w-auto bg-gray-300 text-gray-600 font-bold py-3 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    margin-left: 0; // Remove left margin
    border: none;

    &:hover, &:focus {
        transform: scale(1.1);
        background-color: #0ABD19;
        color: white;
    }

    &:focus::placeholder {
        color: transparent;
    }
`;

export default ({roundedHeaderButton}) => {
    const [showFirstImage, setShowFirstImage] = useState(true);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = async () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, oldPassword);

        try {
            await reauthenticateWithCredential(user, credential);
            if (newPassword === confirmPassword) {
                await updatePassword(user, newPassword);
                toast.success("Пароль успешно обновлен!"); // Уведомление об успехе
            } else {
                toast.error("Новые пароли не совпадают."); // Уведомление об ошибке
            }
        } catch (error) {
            toast.error("Старый пароль указан неверно."); // Уведомление об ошибке
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirstImage((prev) => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>  <Toaster position="top-right" reverseOrder={false}/>
            <GlobalStyles/>
            <AnimationRevealPage>
                <Header roundedHeaderButton={roundedHeaderButton}/>
                <Container>
                    <TwoColumn>
                        <LeftColumn>
                            <Heading>
                                Смена пароля
                                <BackButton onClick={() => window.history.back()}>
                                    Назад в личный кабинет
                                </BackButton>
                            </Heading>
                            <FormContainer>
                                <InputsRow>
                                    <InputContainer>
                                        <Label>Старый пароль</Label>
                                        <PasswordInputWrapper>
                                            <SearchInput
                                                type={showOldPassword ? "text" : "password"}
                                                placeholder="Введите старый пароль"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                            <TogglePasswordButton onClick={() => setShowOldPassword(!showOldPassword)}>
                                                {showOldPassword ? <IoMdEyeOff/> : <IoMdEye/>}
                                            </TogglePasswordButton>
                                        </PasswordInputWrapper>
                                    </InputContainer>
                                    <InputContainer>
                                        <Label>Новый пароль</Label>
                                        <PasswordInputWrapper>
                                            <SearchInput
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Введите новый пароль"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <TogglePasswordButton onClick={() => setShowNewPassword(!showNewPassword)}>
                                                {showNewPassword ? <IoMdEyeOff/> : <IoMdEye/>}
                                            </TogglePasswordButton>
                                        </PasswordInputWrapper>
                                    </InputContainer>
                                    <InputContainer>
                                        <Label>Повторите пароль</Label>
                                        <PasswordInputWrapper>
                                            <SearchInput
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Повторите новый пароль"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <TogglePasswordButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <IoMdEyeOff/> : <IoMdEye/>}
                                            </TogglePasswordButton>
                                        </PasswordInputWrapper>
                                    </InputContainer>
                                </InputsRow>
                                <BottomButtonsContainer>
                                    <BottomButton onClick={handlePasswordChange}>Сохранить</BottomButton>
                                </BottomButtonsContainer>
                            </FormContainer>
                        </LeftColumn>
                    </TwoColumn>
                    <NavigationBanner>
                        <NavigationLink href="/custom-rules">Таможенные правила</NavigationLink>
                        <NavigationLink href="/delivery-calculator">Калькулятор доставки</NavigationLink>
                        <NavigationLink href="/prohibited-goods">Запрещенные товары к пересылке</NavigationLink>
                        <NavigationLink href="/ask-question">Задать вопрос</NavigationLink>
                        <NavigationLink1 href="/add-package">Добавить посылку</NavigationLink1>
                    </NavigationBanner>
                    <CardsContainer>
                        <TopUpCard/>
                        <SingleProfileCard/>
                    </CardsContainer>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        </>
    );
};

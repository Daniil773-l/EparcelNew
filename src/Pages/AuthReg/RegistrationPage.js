import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { Toaster , toast} from 'react-hot-toast';
import illustration from "../../images/img/signup-illustration.svg";
import logo from "../../images/logo/logo-kz.svg";

import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../FireBaseConfig"; // Import Firestore

const Container = styled(ContainerBase)`
    ${tw`min-h-screen bg-gray-100 text-gray-900 font-medium flex justify-center -m-8`}
`;
const Content = tw.div`
    max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 
    shadow-lg sm:rounded-lg flex justify-center flex-1
`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-3xl xl:text-4xl font-extrabold text-gray-800`;
const SubHeading = tw.h2`text-lg text-gray-600 mt-2`;
const FormContainer = tw.div`w-full flex flex-col items-center`;


// Улучшенные стили формы
const Form = tw.form`mx-auto w-full max-w-sm`;

const Input = styled.input`
    ${tw`w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 mt-5`}
    transition: all 0.2s ease-in-out;
    &:hover {
        border-color: #0ABD19;
    }
`;


const MaskedInput = styled(InputMask)`
    ${tw`w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 mt-5`}
    transition: all 0.2s ease-in-out;
    &:hover {
        border-color: #0ABD19;
    }
`;

const SubmitButton = styled.button`
    ${tw`w-full px-4 py-3 bg-green-1002 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300`}
    height: auto; /* Автоматическая высота */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem; /* Отступ сверху */
    box-sizing: border-box; /* Учет padding и границ */
    font-size: 1rem; /* Размер текста */
    width: 109%; /* Совпадает с инпутами */
`;


// Улучшенный контейнер для иллюстрации
const IllustrationContainer = styled.div`
    ${tw`sm:rounded-r-lg flex-1 text-center hidden lg:flex justify-center bg-gradient-to-r from-green-100 to-gray-100`}
`;
const IllustrationImage = styled.div`
    ${({ imageSrc }) => `background-image: url("${imageSrc}");`}
    ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const StyledLink = styled(Link)`
    color: #0ABD19;
    font-weight: bold;
    &:hover {
        color: #067D10;
        text-decoration: underline;
    }
`;
const Text = styled.p`
    ${tw`text-center mt-8 text-lg text-gray-600`}
`;
const HighlightedText = styled(StyledLink)`
    color: #0ABD19;
    font-weight: bold;
    text-decoration: none;
    &:hover {
        color: #067D10;
        text-decoration: underline;
    }
`;
export default ({
                    logoLinkUrl = "/",
                    illustrationImageSrc = illustration,
                    headingText = "Регистрация",

                    submitButtonText = "Регистрация",

                }) => {
    const navigate = useNavigate();
    const phoneRef = React.useRef(null);
    const handleInputFocus = () => {
        if (phoneRef.current) {
            phoneRef.current.focus();
        }
    };
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: localStorage.getItem('email') || "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateUserId = () => {
        return Math.floor(Math.random() * 10000);
    };
    const validateForm = () => {
        const { firstName, lastName, phone, email, password, confirmPassword } = formData;
        if (!firstName.trim()) return "Введите ваше имя.";
        if (!lastName.trim()) return "Введите вашу фамилию.";
        if (!phone.trim() || phone.length < 18) return "Введите корректный номер телефона.";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "Введите корректный email.";
        if (!password) return "Введите пароль.";
        if (password.length < 6) return "Пароль должен быть не менее 6 символов.";
        if (password !== confirmPassword) return "Пароли не совпадают.";
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errorMessage = validateForm();
        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }

        setLoading(true);

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email,
                userId: Math.floor(Math.random() * 10000),
            });

            toast.success("Вы успешно зарегистрировались!");
            navigate("/PersonalArea");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                toast.error("Этот email уже зарегистрирован!");
            } else {
                toast.error("Ошибка: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <AnimationRevealPage>
            <Container>
                <Content>
                    <MainContainer>
                        <LogoLink href={logoLinkUrl}>
                            <LogoImage src={logo} />
                        </LogoLink>
                        <MainContent>
                            <Heading>{headingText}</Heading>
                            <SubHeading>Присоединяйтесь к нашему сервису</SubHeading>
                            <FormContainer>
                                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                                <Form onSubmit={handleSubmit}>
                                    <Input
                                        name="firstName"
                                        type="text"
                                        placeholder="Имя"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="lastName"
                                        type="text"
                                        placeholder="Фамилия"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                    <MaskedInput
                                        ref={phoneRef}
                                        mask="+7 (999) 999-99-99"
                                        name="phone"
                                        type="text"
                                        placeholder="Телефон"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="Пароль"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Повторите пароль"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    <SubmitButton type="submit" disabled={loading}>
                                        <SignUpIcon className="icon" />
                                        <span className="text">{loading ? "Регистрация..." : submitButtonText}</span>
                                    </SubmitButton>
                                    <Text>
                                        Я согласен с <HighlightedText to="/TermsOfService">условиями обслуживания</HighlightedText> и{" "}
                                        <HighlightedText to="/PrivacyPolicy">политикой конфиденциальности</HighlightedText>.
                                    </Text>
                                    <Text>
                                        Уже зарегистрированы? <HighlightedText to="/login">Войти</HighlightedText>
                                    </Text>

                                </Form>
                            </FormContainer>
                        </MainContent>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
                <Toaster position="top-right" reverseOrder={false} />
            </Container>
        </AnimationRevealPage>
    );
};
import React, { useState } from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "../../images/img/login-illustration.svg";
import logo from "../../images/logo/logo-kz.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,db} from "../../FireBaseConfig";
import { Toaster, toast } from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
const Container = tw.div`min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden`; // Добавлен overflow-hidden


const Content = tw.div`
  flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden
`;

const LeftContainer = tw.div`w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center`;
const RightContainer = tw.div`hidden lg:flex w-1/2 bg-gray-100 items-center justify-center overflow-hidden`;

const Logo = tw.img`h-12 mb-6`;
const Heading = tw.h1`text-3xl font-bold text-secondary-600 mb-2 text-center`;
const SubText = tw.p`text-lg text-secondary-600 mb-6 text-center`;

const Form = tw.form`w-full max-w-sm`;
const Input = styled.input`
    ${tw`w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
    box-sizing: border-box; /* Учет отступов внутри */
    margin-bottom: 1rem; /* Отступ между инпутами */
`;

const PasswordWrapper = tw.div`relative w-full`;
const PasswordInput = styled(Input)`
    padding-right: 2.5rem; /* Учет кнопки показа пароля */
    margin-bottom: 0; /* Убираем нижний отступ, если он был добавлен */
`;
const TogglePasswordButton = styled.button`
    ${tw`absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500`}
    background: transparent;
    border: none;
    cursor: pointer;
`;

const SubmitButton = tw.button`
  w-full py-3 bg-green-1002 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mt-4 transition duration-300
`;

const LinksContainer = tw.div`flex flex-col items-center mt-6`;
const LinkText = styled(Link)`
    ${tw`text-lg text-green-1002 hover:underline mt-2`}
    text-decoration: none;
`;

const IllustrationContainer = tw.div`w-full max-w-md p-6`;
const IllustrationImage = tw.img`max-w-full h-auto`;


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                localStorage.setItem('userData', JSON.stringify(userData));

                // Check if the user is an admin
                if (email === "admin@gmail.com" && password === "admin123456") {
                    toast.success("Вы вошли как администратор!");
                    navigate("/admin"); // Navigate to admin page
                } else {
                    toast.success("Вход выполнен успешно!");
                    navigate("/PersonalArea"); // Navigate to personal area
                }
            } else {
                toast.error("Ошибка: данные пользователя не найдены!");

            }
        } catch (error) {

            toast.error("Ошибка входа. Проверьте данные!");
        }
    };


    return (
        <AnimationRevealPage>
            <Container>
                <Content>
                    <LeftContainer>
                        <Link to={"/"}  ><Logo src={logo} alt="Eparcel Logo" /></Link>
                        <Heading>Добро пожаловать</Heading>
                        <SubText>Войдите в аккаунт, чтобы продолжить.</SubText>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <PasswordWrapper>
                                <PasswordInput
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <TogglePasswordButton
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? (
                                        <AiFillEyeInvisible size={24} />
                                    ) : (
                                        <AiFillEye size={24} />
                                    )}
                                </TogglePasswordButton>
                            </PasswordWrapper>
                            <SubmitButton type="submit">Войти</SubmitButton>
                        </Form>
                        <LinksContainer>
                            <LinkText to="/ForgetThePasswordPage">Забыли свой пароль?</LinkText>
                            <LinkText to="/RegistrationPage">Нет личного кабинета? Зарегистрируйтесь</LinkText>
                        </LinksContainer>
                    </LeftContainer>
                    <RightContainer>
                        <IllustrationContainer>
                            <IllustrationImage src={illustration} alt="Login Illustration" />
                        </IllustrationContainer>
                    </RightContainer>
                </Content>
                <Toaster position="top-right" reverseOrder={false} />
            </Container>
        </AnimationRevealPage>
    );
};

export default Login;

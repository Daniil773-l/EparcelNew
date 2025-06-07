import React, { useState } from "react";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "../../images/img/Security-rafiki.svg";
import logo from "../../images/logo/logo-kz.svg";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { db, auth } from "../../FireBaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import {Link} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast"; // Подключаем Toaster и toast
const Container = tw.div`min-h-screen bg-gray-100 flex items-center justify-center`;

const Content = tw.div`
  flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden
`;

const LeftContainer = tw.div`w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center`;
const RightContainer = tw.div`hidden lg:flex w-1/2 bg-gray-100 items-center justify-center`;

const Logo = tw.img`h-12 mb-6`;
const Heading = tw.h1`text-3xl font-bold text-gray-800 mb-4 text-center`;
const SubText = tw.p`text-sm text-gray-600 mb-6 text-center`;

const Form = tw.form`w-full max-w-md`;
const Input = styled.input`
    ${tw`w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
    box-sizing: border-box; /* Учет padding и border */
    width: 100%; /* Гарантируем одинаковую ширину */
    margin-bottom: 1rem;
    padding: 0.75rem 1rem; /* Добавляем padding для согласования с кнопкой */
`;

const SubmitButton = styled.button`
    ${tw`w-full px-4 py-3 bg-green-1002 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300`}
    box-sizing: border-box; /* Учет padding и border */
    width: 100%; /* Совпадает с шириной инпута */
    padding: 0.75rem 1rem; /* Совпадает с padding инпута */
    margin-top: 1rem;
`;


const ErrorText = tw.p`text-sm text-red-600 text-center mt-4`;
const SuccessText = tw.p`text-sm text-green-600 text-center mt-4`;

const IllustrationContainer = tw.div`w-full h-full bg-contain bg-center `; // Увеличено значение p-16
const IllustrationImage = tw.img`max-w-full h-auto`; // Гарантируем пропорции

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSendPasswordResetEmail = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim(); // Убираем пробелы

        if (!trimmedEmail) {
            toast.error("Введите ваш email.");
            return;
        }

        try {
            // Поиск пользователя по email в коллекции Firestore
            const q = query(collection(db, "users"), where("email", "==", trimmedEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.error("Этот email не зарегистрирован.");
                return;
            }

            // Отправляем ссылку на сброс пароля
            await sendPasswordResetEmail(auth, trimmedEmail);
            toast.success("Ссылка для сброса пароля отправлена на вашу почту.");
        } catch (error) {
            console.error("Ошибка сброса пароля:", error.code, error.message); // ← это обязательно
            toast.error("Ошибка: " + error.message); // покажем текст ошибки
        }


    };


    return (
        <AnimationRevealPage>
            <Container>
                <Content>
                    <LeftContainer>
                     <Link to={"/"} > <Logo src={logo} alt="Eparcel Logo" /></Link>
                        <Heading>Восстановление пароля</Heading>
                        <SubText>Введите вашу почту, чтобы получить ссылку для сброса пароля.</SubText>
                        {error && <ErrorText>{error}</ErrorText>}
                        {success && <SuccessText>{success}</SuccessText>}
                        <Form onSubmit={handleSendPasswordResetEmail}>
                            <Input
                                type="email"
                                placeholder="Введите вашу почту"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <SubmitButton type="submit">Отправить ссылку</SubmitButton>
                        </Form>
                    </LeftContainer>
                    <RightContainer>
                        <IllustrationContainer>
                            <IllustrationImage src={illustration} alt="Forgot Password Illustration" />
                        </IllustrationContainer>
                    </RightContainer>
                </Content>
                <Toaster position="top-right" reverseOrder={false} /> {/* Добавляем Toaster */}

            </Container>
        </AnimationRevealPage>
    );
};

export default ForgotPassword;

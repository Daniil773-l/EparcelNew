import React, { useState, useEffect } from "react";
import styled, {createGlobalStyle, css} from "styled-components";
import tw from "twin.macro";
import Header from "../../components/headers/MainCabinetHeader";
import AnimationRevealPage from "../../components/helpers/AnimationRevealPage";
import Footer from "../../components/footers/MainFooterWithLinks";
import { doc, setDoc, onSnapshot  } from "firebase/firestore";
import { db } from "../../FireBaseConfig";
import { useUser } from "../../context/UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
const GlobalStyles = createGlobalStyle`
  input:focus {
    outline: none; /* Убираем стандартный фокус */
    box-shadow: none; /* Убираем тень */
  }
`;
const Container = styled.div`
    ${tw`relative w-full `}
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
    ${tw`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-gray-900 leading-tight`}
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;



const Actions = styled.div`
    ${tw`relative flex flex-wrap items-center w-full gap-8`}
`;



const InputContainer = styled.div`
    ${tw`relative flex-1`}
`;

const Label = styled.label`
    ${tw`block text-gray-700 text-sm font-bold mb-2 mt-4`}
`;

const SearchInput = styled.input`
    ${tw`pl-4 py-3 font-medium focus:outline-none transition duration-300`}
    border-color: #0ABD19;
    width: 100%;
    border: none;
    border-bottom: 1px solid #0ABD19;
    padding-left: 0;
    &:hover,
    &:focus {
        border-color: #0ABD19;
    }
    &:focus::placeholder {
        color: transparent;
    }
`;

const AddInput = styled.input`
    ${tw`ml-4 w-auto bg-gray-300 text-gray-600 font-bold py-3 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    border: none;
    width: 200px;
    height: 40px;
    padding: 0 1rem;

    &:hover,
    &:focus {
        transform: scale(1.1);
        background-color: #0ABD19;
        color: white;
    }
    &:focus::placeholder {
        color: transparent;
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

    &:hover,
    &:focus {
        transform: scale(1.1);
    }
`;

const BackButton = styled(AddInput)`
    ${tw`w-auto bg-gray-300 text-gray-600 font-bold py-3 px-4 rounded-full flex items-center justify-center leading-none focus:outline-none transition duration-300`}
    margin-left: 0;
`;

const SkeletonLoader = styled.div`
    ${tw`w-full h-full flex items-center justify-center`}
    font-size: 1.5rem;
    color: #888;
`;

const UserProfileForm = ({ user, onSave }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [email, setEmail] = useState(user.email || '');
    const [country, setCountry] = useState(user.country || '');
    const [city, setCity] = useState(user.city || '');
    const [cabinetName, setCabinetName] = useState(user.cabinetName || '');

    const handleSave = async () => {
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                firstName,
                lastName,
                phone,
                email,
                country,
                city,
                cabinetName,
            }, { merge: true });

            onSave({ firstName, lastName, phone, email, country, city, cabinetName });
            toast.success("Данные успешно сохранены!"); // Уведомление об успехе
        } catch (error) {
            console.error("Error saving user data: ", error);
            toast.error("Ошибка при сохранении данных."); // Уведомление об ошибке
        }
    };


    return (
        <>
            <InputContainer>
                <Label>Название личного кабинета</Label>
                <SearchInput
                    type="text"
                    placeholder="Личный кабинет"
                    value={cabinetName}
                    onChange={(e) => setCabinetName(e.target.value)}
                />
            </InputContainer>
            <Heading>
                Контактное лицо:
            </Heading>
            <Actions>
                <InputContainer>
                    <Label>Имя</Label>
                    <SearchInput
                        type="text"
                        placeholder="Имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Фамилия</Label>
                    <SearchInput
                        type="text"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Телефон</Label>
                    <SearchInput
                        type="text"
                        placeholder="Телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </InputContainer>
            </Actions>
            <Actions>
                <InputContainer>
                    <Label>E-mail</Label>
                    <SearchInput
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputContainer>
            </Actions>
            <Actions>
                <InputContainer>
                    <Label>Страна</Label>
                    <SearchInput
                        type="text"
                        placeholder="Страна"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Город</Label>
                    <SearchInput
                        type="text"
                        placeholder="Город"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </InputContainer>
            </Actions>
            <BottomButtonsContainer>
                <BottomButton onClick={handleSave}>Сохранить</BottomButton>
            </BottomButtonsContainer>
        </>
    );
};

const ChangingContactDetails = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                const auth = getAuth();
                const cachedUser = localStorage.getItem('userData');

                if (cachedUser) {
                    setUser(JSON.parse(cachedUser));
                } else {
                    onAuthStateChanged(auth, async (authUser) => {
                        if (authUser) {
                            const userDocRef = doc(db, "users", authUser.uid);
                            const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
                                if (docSnapshot.exists()) {
                                    const userData = { uid: authUser.uid, ...docSnapshot.data() };
                                    setUser(userData);
                                    localStorage.setItem('userData', JSON.stringify(userData));
                                }
                            });
                            return () => unsubscribe();
                        }
                    });
                }
            }
        };

        fetchData();
    }, [user, setUser]);

    if (!user) return <SkeletonLoader>Loading...</SkeletonLoader>;

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <GlobalStyles/>
            <AnimationRevealPage>
                <Header roundedHeaderButton />
                <Container>
                    <TwoColumn>
                        <LeftColumn>
                            <Heading>
                                Изменение контактных данных
                                <BackButton
                                    type="button"
                                    value="Назад в личный кабинет"
                                    onClick={() => window.history.back()}
                                />
                            </Heading>
                            <UserProfileForm user={user} onSave={(updatedUser) => {
                                setUser(updatedUser);
                            }} />
                        </LeftColumn>
                    </TwoColumn>
                </Container>
                <Footer />
            </AnimationRevealPage>
        </>
    );
};

export default ChangingContactDetails;
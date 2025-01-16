import React, {useState, useEffect} from "react";
import styled, {createGlobalStyle} from 'styled-components';
import { MdPhotoCamera } from "react-icons/md"; // Иконка для Photo
import { FaTools } from "react-icons/fa"; // Иконка для Service
import AnimationRevealPage from "../../../components/helpers/AnimationRevealPage";
import MainCabinetHeader from "../../../components/headers/MainCabinetHeader";
import Footer from "../../../components/footers/MainFooterWithLinks";
import tw from "twin.macro";
import {getAuth} from 'firebase/auth';
import {collection, addDoc, getDocs, query, where, doc, getDoc} from 'firebase/firestore';
import {db} from '../../../FireBaseConfig';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
const GlobalStyle = createGlobalStyle`
    select, option {
        color: #000 !important;
        background-color: #fff !important;
    }
`;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 15px;
    box-shadow: 2px 2px 10px rgba(45, 45, 45, 0.08);
    overflow: hidden;
    margin: 20px auto;
    width: 90%;
    max-width: 1300px;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    margin-top: 60px;
`;

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 250px;
    background: #ffffff;
    border-right: 1px solid #F5F5F5;
    @media (min-width: 768px) {
        width: 250px;
    }
`;

const TabButton = styled.button`
    display: flex;
    align-items: center;
    background: ${({active}) => (active ? '#DDF2E6' : 'transparent')};
    color: #000000;
    border: none;
    padding: 10px 22px;
    font-size: 16px;
    line-height: 18px;
    font-family: 'Gilroy Medium', sans-serif;
    cursor: pointer;
    text-align: left;

    &:hover {
        background-color: #DDF2E6;
    }

    svg {
        margin-right: 20px;
        width: 30px;
        height: 30px;
    }
`;

const IconContainer = styled.div`
    ${tw`flex items-center`};
    svg {
        ${tw`text-green-1002 mr-2`} /* Настраиваем цвет и отступ */
        width: 24px; /* Размер иконки */
        height: 24px;
    }
`;

const Title = styled.h1`
    font-size: 24px;
    line-height: 29px;
    color: #2D2D2D;
    margin-bottom: 20px;
    font-weight: 700;
    font-family: 'Gilroy Medium', sans-serif;
`;

const StyledParagraph = styled.p`
    padding: 0;
    margin-bottom: 30px;
    font-size: 20px;
    line-height: 30px;
    color: #2D2D2D;
    font-family: 'Gilroy Medium', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    outline: none;
    cursor: default;
    text-align: left;
`;

const Highlight = styled.span`
    color: #0ABD19;
    font-weight: bold;
    font-size: 25px;
`;

const FormGroup = styled.div`
    ${tw`relative flex flex-col mb-6`}
`;

const Label = styled.label`
    ${tw`mt-1 sm:mt-0 mb-2 font-medium text-secondary-100 leading-loose`}
`;


const CustomSelect = styled.select`
    ${tw`mt-2 w-full px-4 py-3 bg-white text-left rounded-md shadow-sm border border-gray-300 cursor-pointer`}
    color: #000 !important; /* Убедитесь, что текст черного цвета */
    background-color: #fff !important; /* Убедитесь, что фон белый */
    font-family: inherit;

    & option {
        color: #000 !important; /* Текст черного цвета */
        background-color: #fff !important; /* Белый фон */
    }
`;


const Input = styled.input`
    ${tw`mt-2 first:mt-0  focus:outline-none font-medium transition duration-300 border-b-2`}
    color: #6c757d;
    border-color: transparent;
    border-bottom-color: #adb5bd;
    font-family: inherit;
    width: calc(100% - 50px);

    &::placeholder {
        color: #adb5bd;
    }

    &:hover {
        border-bottom-color: #0ABD19;
    }

    &:focus {
        border-bottom-color: #0ABD19;
    }
`;

const CustomOptions = styled.ul`

`;

const FormContainer = styled.div`
    ${tw`flex justify-center items-center flex-grow py-4`}
`;
const CustomListItem = styled.li`
    ${tw`px-4 py-3 text-black cursor-pointer`}
    &:hover {
        background: #f3f4f6;
    }

    ${({isSelected}) => isSelected && tw`bg-gray-200`}
`;


const Form = styled.form`
    ${tw`grid grid-cols-1 gap-4 `}
    width: 100%;
    height: 100%;
`;

const StyledContainer = styled.div`
    ${tw`w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg border`}
    border: 2px solid #0ABD19;
    border-radius: 15px;
    padding: 20px 20px;
    margin: 20px auto;
    overflow: hidden;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    ${tw`px-8 py-3 font-medium text-white rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #0ABD19;
    text-decoration: none;

    &:hover {
        background-color: #0ABD50;
        transform: scale(1.05);
    }
`;

const CustomOption = styled.li`
    ${tw`px-4 py-3 text-black cursor-pointer`}
    &:hover {
        background: #f3f4f6;
    }

    ${({isSelected}) => isSelected && tw`bg-gray-200`}
`;

const ResetButton = styled.button`
    ${tw`px-8 py-3 font-medium text-white rounded-full focus:outline-none transition-transform duration-300`}
    background-color: #0ABD19;
    text-decoration: none;

    &:hover {
        background-color: #0ABD50;
        transform: scale(1.05);
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
    transition: opacity 0.5s ease;
    opacity: ${({isActive}) => (isActive ? 1 : 0)};
`;
const CustomSelectWrapper = styled.div`
    position: relative;
    width: 93%;
`;

const tabs = [
    {
        name: "Фото товаров в посылке",
        icon: MdPhotoCamera ,
        service: "Фото в посылке",
        content: "Для оформления данной услуги. Вам необходимо зайти в личный кабинет, в разделе «услуги склада» выбрать нужную вам посылку, затем нажать на услугу «фото товаров в посылке». В течение 24-48 часов мы выполним данную услугу. В стоимость данной услуги входит 3-5 фотографий всех товаров в посылке, а также Ваши товары сверяются на общее соответствие с описанием в личном кабинете. В случае несоответствия товаров мы уведомим Вас об этом в личном кабинете. Стоимость услуги – 5$ (3-5 фото)"
    },

    {
        name: "Дополнительная услуга",
        icon:FaTools ,
        service: "Дополнительная услуга",
        content: "Дополнительные услуги для вашего удобства стоимость 5$ "
    },
];

export default function App() {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [parcels, setParcels] = useState(() => JSON.parse(localStorage.getItem('parcels')) || []);

    const [activeContent, setActiveContent] = useState(tabs[0].content);
    const [isActive, setIsActive] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        setIsActive(false);
        setTimeout(() => {
            setActiveContent(tabs[activeTab].content);
            setIsActive(true);
        }, 500);
    }, [activeTab]);
    useEffect(() => {
        const fetchParcels = async () => {
            setLoading(true);
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const correctUserId = userDocSnap.data().userId;

                        // Запрос для посылок с фильтрацией по userId и статусу "Создана"
                        const parcelsQuery = query(
                            collection(db, 'parcels'),
                            where("userId", "==", correctUserId),
                            where("status", "==", "Создана")
                        );
                        const parcelsSnapshot = await getDocs(parcelsQuery);

                        const parcelsData = parcelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                        // Запрос для заявок на выкуп товаров со статусом "Создан"
                        const buyGoodsQuery = query(
                            collection(db, 'выкуп_товаров'),
                            where("userId", "==", correctUserId),
                            where("status", "==", "Создан")
                        );
                        const buyGoodsSnapshot = await getDocs(buyGoodsQuery);

                        const buyGoodsData = buyGoodsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                            parcelName: `Заявка на выкуп: ${doc.data().requestNumber || "Без названия"}`, // Название для отображения
                        }));

                        // Объединение двух массивов данных
                        const combinedParcels = [...parcelsData, ...buyGoodsData];

                        // Удаление дубликатов по `id` (если есть)
                        const uniqueParcels = Array.from(
                            new Map(combinedParcels.map(parcel => [parcel.id, parcel])).values()
                        );

                        localStorage.setItem('parcels', JSON.stringify(uniqueParcels)); // Сохраняем в кэш
                        setParcels(uniqueParcels);
                    }
                } catch (error) {

                } finally {
                    setLoading(false);
                }
            }
        };

        fetchParcels();
    }, []);



    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const form = event.target;
            const data = new FormData(form);
            const packageId = data.get('package');
            const comments = data.get('comments');



            try {
                // Поиск документа по полю "id" с использованием запроса query и where
                const q = query(collection(db, 'parcels'), where('id', '==', packageId));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {

                    throw new Error("Посылка не найдена");
                } else {
                    const packageData = querySnapshot.docs[0].data();


                    // Добавляем данные о заявке в коллекцию applications
                    await addDoc(collection(db, 'applications'), {
                        userId: user.uid, // ID пользователя
                        service: tabs[activeTab].service, // Название услуги
                        packageId: packageId, // ID посылки
                        trackingNumber: packageData.trackingNumber || "Не указан", // Трек-номер посылки
                        comments: comments, // Комментарий оператора
                        country: packageData.warehouse || "Unknown", // Страна/склад
                        timestamp: new Date(), // Дата создания
                        status: "Создана", // Статус заявки по умолчанию
                        cost: 5, // Стоимость услуги
                    });

                    toast.success("Заявка успешно создана!"); // Показываем тост об успешной операции

                    form.reset();

// Задержка перед редиректом
                    setTimeout(() => {
                        navigate('/WarehouseServices');
                    }, 2000); // 2000 мс = 2 секунды

                }
            } catch (error) {
                console.error("Ошибка создания заявки:", error);
                toast.error("Ошибка при создании заявки! Попробуйте снова."); // Показываем тост об ошибке

            }
        }
    };


    return (
        <AnimationRevealPage>
            <GlobalStyle/>
            <MainCabinetHeader/>
            <Layout>
                <SidebarContainer>
                    {tabs.map((tab, index) => (
                        <TabButton
                            key={index}
                            active={index === activeTab}
                            onClick={() => setActiveTab(index)}
                        >
                            <IconContainer>{<tab.icon active={index === activeTab}/>}</IconContainer>
                            {tab.name}
                        </TabButton>
                    ))}
                </SidebarContainer>
                <ContentContainer isActive={isActive}>
                    <StyledParagraph>{tabs[activeTab].content}</StyledParagraph>
                    <Highlight>Заявка на услугу склада - {tabs[activeTab].name}</Highlight>
                    <StyledContainer>
                        <FormContainer>
                            <Form id={`${tabs[activeTab].service}-form`} onSubmit={handleFormSubmit}>
                                <FormGroup>
                                    <Label htmlFor="package">Выберите посылку или заявку</Label>
                                    <CustomSelectWrapper>
                                        {parcels.length > 0 ? (
                                            <CustomSelect name="package">
                                                {parcels.map(parcel => (
                                                    <option key={parcel.id} value={parcel.id}>
                                                        {parcel.id} - {parcel.parcelName || "Без названия"}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                        ) : (
                                            <p>Нет доступных посылок или заявок для выбора</p>
                                        )}
                                    </CustomSelectWrapper>
                                </FormGroup>



                                <FormGroup>
                                    <Label htmlFor="comments">Комментарий для оператора</Label>
                                    <Input id="comments" name="comments" type="text"/>
                                </FormGroup>
                            </Form>
                        </FormContainer>
                    </StyledContainer>
                    <ButtonContainer>
                        <SubmitButton type="submit" form={`${tabs[activeTab].service}-form`}>Отправить
                            заявку</SubmitButton>
                        <ResetButton type="reset"
                                     onClick={() => document.getElementById(`${tabs[activeTab].service}-form`).reset()}>Сбросить</ResetButton>
                    </ButtonContainer>
                </ContentContainer>
            </Layout>
            <Footer/>
        </AnimationRevealPage>
    );
}
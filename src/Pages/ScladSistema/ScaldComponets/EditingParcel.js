import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../FireBaseConfig';
import HeaderContainer from './WarehouseAccountingHeader';
import Sidebar from './Sidebar';
import FormProcessing from './EditingForms/FormProcessing';
import FormProducts from './EditingForms/FormProducts';
import FormReceiver from './EditingForms/FormReceiver';
import FormProfile from './EditingForms/FormProfile';
import FormPayment from './EditingForms/FormPayment';
import FormShipping from './EditingForms/FormShipping';
import styled, { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

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

const Container = styled.div`
    ${tw`min-h-screen`}
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    ${tw`flex flex-col lg:flex-row`}
    flex-grow: 1;
`;

const Content = styled.div`
    ${tw`flex-grow p-8`}
    display: flex;
    flex-direction: column;
`;

const Heading = styled.h1`
    ${tw`text-green-1002 font-semibold text-xl`}
`;

const Divider = styled.div`
    ${tw`bg-gray-300`}
    height: 1px;
    width: 100%;
    margin: 20px 0;
`;

const TabsContainer = styled.div`
    ${tw`flex mb-6 mt-4`}
    border-bottom: ${({ hideBorder }) => (hideBorder ? "none" : "1px solid #e5e5e5")};
`;

const Tab = styled.div`
    ${tw`py-4 px-4 cursor-pointer relative`}
    border-top: ${({ isActive }) => (isActive ? "1px solid #e5e5e5" : "none")};
    border-left: ${({ isActive }) => (isActive ? "1px solid #e5e5e5" : "none")};
    border-right: ${({ isActive }) => (isActive ? "1px solid #e5e5e5" : "none")};
    border-bottom: ${({ isActive }) => (isActive ? "none" : "1px solid #e5e5e5")};
    background-color: ${({ isActive }) => (isActive ? "#ffffff" : "transparent")};
    z-index: ${({ isActive }) => (isActive ? "1" : "0")};
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
`;

const Filler = styled.div`
    ${tw`flex-grow`}
    border-bottom: 1px solid #e5e5e5;
`;

const ExpectedParcelsPage = () => {
    const { parcelId } = useParams();
    const location = useLocation();
    const [formData, setFormData] = useState(location.state?.formData || null);
    const [selectedFiles, setSelectedFiles] = useState(location.state?.selectedFiles || []);
    const [profileData, setProfileData] = useState(null);

    const navigate = useNavigate();
    const [parcelData, setParcelData] = useState(location.state?.parcelData || null);
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || "Обработка посылки");
    const [loading, setLoading] = useState(!location.state?.parcelData);

    const handleUpdateFormData = (updatedData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...updatedData,
        }));
    };

    useEffect(() => {
        const fetchParcelData = async () => {
            try {
                const q = query(collection(db, 'parcels'), where('id', '==', parcelId));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const parcelDoc = querySnapshot.docs[0].data();
                    console.log('Fetched Parcel Data:', parcelDoc);
                    setParcelData(parcelDoc);
                    setFormData(parcelDoc); // Инициализация данных формы

                    if (parcelDoc.userId) {
                        fetchUserProfile(parcelDoc.userId);
                    }
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching parcel data:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserProfile = async (userId) => {
            try {
                const q = query(collection(db, 'users'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userProfileDoc = querySnapshot.docs[0].data();
                    console.log('Fetched User Profile Data:', userProfileDoc);
                    setProfileData(userProfileDoc);
                } else {
                    console.error("No such user profile!");
                }
            } catch (error) {
                console.error("Error fetching user profile data:", error);
            }
        };

        if (parcelId) {
            fetchParcelData();
        }
    }, [parcelId]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem("formData");
            localStorage.removeItem("selectedFiles");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(location.pathname, {
            state: { parcelData, formData, selectedFiles, activeTab: tab },
        });
    };

    const renderForm = () => {
        if (loading) return <p>Loading...</p>;
        if (!parcelData) return <p>No parcel data found</p>;

        switch (activeTab) {
            case "Обработка посылки":
                return <FormProcessing parcelData={parcelData} formData={formData} onUpdateParcelData={handleUpdateFormData} />;
            case "Товары в посылке":
                return <FormProducts productsData={parcelData.products} />;
            case "Получатель":
                return <FormReceiver receiver={parcelData.receiver} />;
            case "Профиль":
                return <FormProfile profileData={parcelData} />;
            case "Оплата":
                return <FormPayment paymentData={parcelData.payment} />;
            case "Доставка по России":
                return <FormShipping shippingData={parcelData.shipping} />;
            default:
                return null;
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <GlobalStyle />
            <HeaderContainer />
            <MainContent>
                <Sidebar />
                <Content>
                    <Heading>Обработка посылки</Heading>
                    <Divider />
                    <TabsContainer hideBorder={activeTab !== ""}>
                        <Tab isActive={activeTab === "Обработка посылки"} onClick={() => handleTabChange("Обработка посылки")}>
                            Обработка посылки
                        </Tab>
                        <Tab isActive={activeTab === "Товары в посылке"} onClick={() => handleTabChange("Товары в посылке")}>Товары в посылке</Tab>
                        <Tab isActive={activeTab === "Получатель"} onClick={() => handleTabChange("Получатель")}>Получатель</Tab>
                        <Tab isActive={activeTab === "Оплата"} onClick={() => handleTabChange("Оплата")}>Оплата</Tab>
                        <Tab isActive={activeTab === "Доставка по России"} onClick={() => handleTabChange("Доставка по России")}>Доставка по Казахстану</Tab>
                        <Filler />
                    </TabsContainer>

                    {renderForm()}
                </Content>
            </MainContent>
        </Container>
    );
};

export default ExpectedParcelsPage;
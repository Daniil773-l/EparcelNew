import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router, Route, Routes, Navigate, useLocation, matchPath} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";
import ConditionalHeader from "./components/headers/ConditionalHeaderComponent";
import App from "./App";
import {UserProvider} from "./context/UserContext";
import {PaymentProvider} from './context/PaymentContext';
import {ParcelProvider} from "./context/ParcelContext";
import Tariff from "./Pages/Mainpages/Tariff";
import Rates from "./Pages/Mainpages/Rates";
import Shops from "./Pages/Mainpages/Shops";
import RedemptionOfGoods from "./Pages/Mainpages/RedemptionOfGoods";
import AboutUS from "./Pages/Mainpages/AboutUS";
import Contacts from "./Pages/Mainpages/Contacts";
import CustomsRegulations from "./Pages/SecondaryPages/CustomsRegulations";
import DeliveryCalculator from "./Pages/SecondaryPages/DeliveryCalculator";
import ProhibitedProductsPage from "./Pages/SecondaryPages/ProhibitedProductsPage";
import News from "./Pages/SecondaryPages/News";
import Questions from "./Pages/SecondaryPages/Questions";
import DutyCalculatorPage from "./Pages/SecondaryPages/DutyCalculatorPage";
import LegalInformation from "./Pages/SecondaryPages/LegalInformation";
import HowToBuyGoodsAbroadPage from "./Pages/SecondaryPages/HowToBuyGoodsAbroadPage";
import ClothesSizes from "./Pages/SecondaryPages/ClothesSizes";
import ForBussinesPage from "./Pages/SecondaryPages/ForBussinesPage";
import Login from "./Pages/AuthReg/Login";
import ForgetThePasswordPage from "./Pages/AuthReg/ForgetThePasswordPage";
import RegistrationPage from "./Pages/AuthReg/RegistrationPage";
import TermsOfService from "./Pages/TermsPrivacy/TermsOfService";
import PrivacyPolicy from "./Pages/TermsPrivacy/PrivacyPolicy";
import PublicOffer from "./Pages/TermsPrivacy/PublicOffer";
import PersonalArea from "./Pages/MainCabinet/PersonalArea";
import Deliveryaddress from "./Pages/MainCabinet/Deliveryaddress";
import IncomingParcels from "./Pages/MainCabinet/IncomingParcels";
import EdirParcelCabinet from "./Pages/MainCabinet/NewEdisParcel/EdirParcelCabinet";
import ExpectedLink from "./Pages/MainCabinet/NewEdisParcel/ExpectedLink";
import SendParcel from "./Pages/MainCabinet/SendParcel/SendParcel";
import PaymentSuccess from "./components/helpers/PaymentSuccess";
import RecipientsForm from "./Pages/MainCabinet/RecipientForm/RecipientsForm";
import RecipientsPrivateCabinet from "./Pages/MainCabinet/RecipientsPrivateCabinet";
import ChangingContactDetails from "./Pages/MainCabinet/ChangingContactDetails";
import ChangePassword from "./Pages/MainCabinet/ChangePassword";
import OutgoingParcels from "./Pages/MainCabinet/OutgoingParcels";
import DeliveredParcels from "./Pages/MainCabinet/DeliveredParcels";
import WarehouseServices from "./Pages/MainCabinet/WarehouseServices";
import ServisApplications from "./Pages/MainCabinet/ServisApplicationForm/ServisApplication";
import Purchaseofgoods from "./Pages/MainCabinet/Purchaseofgoods";
import PaymentForm from "./components/helpers/PaymentForm";
import AdminPage from "./Pages/ScladSistema/WareHouseMainPage"
import WareHouseMainPage from "./Pages/ScladSistema/WareHouseMainPage"
import PurchaseofgoodsSclad from "./Pages/ScladSistema/PurchaseofgoodsSclad";
import FormEditingPurchamse from "./Pages/ScladSistema/purchaseofgoods/FormEditingPurchamse";
import AcceptesParcel from "./Pages/ScladSistema/AcceptesParcel";
import ExpectedParcels from "./Pages/ScladSistema/ExpectedParcels";
import ProccessingParcels from "./Pages/ScladSistema/ProccessingParcels";
import EditingParcel from "./Pages/ScladSistema/ScaldComponets/EditingParcel";
import IncomingPParcels from "./Pages/ScladSistema/IncomingPParcels";
import Parsed from "./Pages/ScladSistema/Parsed";
import PaidParcel from "./Pages/ScladSistema/PaidParcel";
import OutgoingScladParcel from "./Pages/ScladSistema/OutgoingScladParcel";
import AddPalet from "./Pages/ScladSistema/Pallet/AddPalet";
import ListPallet from "./Pages/ScladSistema/Pallet/ListPallet";
import AddPaletParcel from  "./Pages/ScladSistema/Pallet/AddParcelPalets"
import Shipment from "./Pages/ScladSistema/Shipment/Shipment";
import AddPalletShioment from "./Pages/ScladSistema/Shipment/AddPalletShioment";
// Компонент для защиты маршрутов
const ProtectedRoute = ({children, role}) => {
    const {user} = useAuth();

    if (!user) {

        return <Navigate to="/login" replace/>;
    }

    if (role === "admin" && user.email !== "admin@gmail.com") {

        return <Navigate to="/login" replace/>;
    }

    return children;
};

// Компонент для маршрутизации
const AppRoutes = () => {
    const location = useLocation();

    // Обновлённый массив маршрутов для скрытия заголовка
    const hideHeaderOnRoutes = ["/login", "/RegistrationPage"];

    // Обновлённый массив маршрутов для администратора, включая параметры
    const adminRoutes = ["/admin",
        "/WareHouseMainPage",
        "/ExpectedParcels",
        "/IncomingPParcels",
        "/Parsed",
        "/EditingParcel/:parcelId",
        "/ProccessingParcels",
        "/FormProcessing",
        "/paid",
        "/add-pallet",
        "/pallet-list",
        "/add-parcel-pallet",
        "/add-parcel-pallet/:palletId",
        "/acceptedparcels",
        "/create-shipment",
        "/input-shipment",
        "/otgoingscaldparcel",
        "/purchaseofgoodssclad",
        "/FormEditingPurchamse"];

    // Проверка на скрытие заголовка
    const shouldHideHeader = hideHeaderOnRoutes.some(route => matchPath(route, location.pathname));

    // Проверка на администраторские маршруты
    const isAdminRoute = adminRoutes.some(route => matchPath(route, location.pathname));

    return (<>
        {/* Отображение ConditionalHeader, если не нужно скрывать заголовок и это не админский маршрут */}
        {!shouldHideHeader && !isAdminRoute && <ConditionalHeader/>}
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/Tariffs" element={<Tariff/>}/>
            <Route path="/Rates" element={<Rates/>}/>
            <Route path="/Shops" element={<Shops/>}/>
            <Route path="/RedemptionOfGoods" element={<RedemptionOfGoods/>}/>
            <Route path="/AboutUS" element={<AboutUS/>}/>
            <Route path="/Contacts" element={<Contacts/>}/>
            <Route path="/CustomRegulations" element={<CustomsRegulations/>}/>
            <Route path="/DeliveryCalculator" element={<DeliveryCalculator/>}/>
            <Route path="/ProhibitedProductsPage" element={<ProhibitedProductsPage/>}/>
            <Route path="/News" element={<News/>}/>
            <Route path="/Questions" element={<Questions/>}/>
            <Route path="/DutyCalculatorPage" element={<DutyCalculatorPage/>}/>
            <Route path="/LegalInformation" element={<LegalInformation/>}/>
            <Route path="/HowToBuyGoodsAbroadPage" element={<HowToBuyGoodsAbroadPage/>}/>
            <Route path="/ClothesSizes" element={<ClothesSizes/>}/>
            <Route path="/ForBussinesPage" element={<ForBussinesPage/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/ForgetThePasswordPage" element={<ForgetThePasswordPage/>}/>
            <Route path="/RegistrationPage" element={<RegistrationPage/>}/>
            <Route path="/TermsOfService" element={<TermsOfService/>}/>
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
            <Route path="/PublicOffer" element={<PublicOffer/>}/>
            <Route path="/PersonalArea" element={<PersonalArea/>}/>
            <Route path="/Deliveryaddress" element={<Deliveryaddress/>}/>
            <Route path="/IncomingParcels" element={<IncomingParcels/>}/>
            <Route path="/edit/:documentId" element={<EdirParcelCabinet/>}/>
            <Route path="/ExpectedLink" element={<ExpectedLink/>}/>
            <Route path="/SendParcelForm/:id" element={<SendParcel/>}/>
            <Route path="/PaymentSuccess" element={<PaymentSuccess/>}/>
            <Route path="/RecipientsForm" element={<RecipientsForm/>}/>
            <Route path="/RecipientsPrivateCabinet" element={<RecipientsPrivateCabinet/>}/>
            <Route path="/ChangingContactDetails" element={<ChangingContactDetails/>}/>
            <Route path="/ChangePassword" element={<ChangePassword/>}/>
            <Route path="/OutgoingParcels" element={<OutgoingParcels/>}/>
            <Route path="/DeliveredParcels" element={<DeliveredParcels/>}/>
            <Route path="/WarehouseServices" element={<WarehouseServices/>}/>
            <Route path="/ServisApplication" element={<ServisApplications/>}/>
            <Route path="/Purchaseofgoods" element={<Purchaseofgoods/>}/>
            <Route path="/PaymentForm" element={<PaymentForm/>}/>

            <Route path="/admin" element={<ProtectedRoute role="admin">
                <AdminPage/>
            </ProtectedRoute>}/>
            <Route path="/WareHouseMainPage" element={<ProtectedRoute role="admin">
                <WareHouseMainPage/>
            </ProtectedRoute>}/>
            <Route path="/purchaseofgoodssclad" element={<ProtectedRoute role="admin">
                <PurchaseofgoodsSclad/>
            </ProtectedRoute>}/>
            <Route path="/FormEditingPurchamse" element={<ProtectedRoute role="admin">
                <FormEditingPurchamse/>
            </ProtectedRoute>}/>
            <Route path="/acceptedparcels" element={<ProtectedRoute role="admin"><AcceptesParcel/></ProtectedRoute>}/>
            <Route path="/ExpectedParcels" element={<ProtectedRoute role="admin">
                <ExpectedParcels/>
            </ProtectedRoute>}/>
            <Route path="/ProccessingParcels" element={<ProtectedRoute role="admin">
                <ProccessingParcels/>
            </ProtectedRoute>}/>
            <Route path="/EditingParcel/:parcelId" element={<ProtectedRoute role="admin">
                <EditingParcel/>
            </ProtectedRoute>}/>
            <Route path="/IncomingPParcels" element={<ProtectedRoute role="admin">
                <IncomingPParcels/>
            </ProtectedRoute>}/>
            <Route path="/Parsed" element={<ProtectedRoute role="admin">
                <Parsed/>
            </ProtectedRoute>}/>
            <Route path="/paid" element={<ProtectedRoute role="admin">
                < PaidParcel/>
            </ProtectedRoute>}/>
            <Route path="/otgoingscaldparcel" element={<ProtectedRoute role="admin">
                <OutgoingScladParcel/>
            </ProtectedRoute>}/>
            <Route path="/add-pallet" element={<ProtectedRoute role="admin">
                <AddPalet/>
            </ProtectedRoute>}/>
            <Route path="/pallet-list" element={<ProtectedRoute role="admin">
                <ListPallet />
            </ProtectedRoute>}/>
            <Route path="/add-parcel-pallet" element={<ProtectedRoute role="admin">
                <AddPaletParcel/>
            </ProtectedRoute>}/>
            <Route path="/add-parcel-pallet/:palletId"
                   element={<ProtectedRoute role="admin"><AddPaletParcel/></ProtectedRoute>}/>
            <Route path="/create-shipment" element={<ProtectedRoute role="admin">
                <Shipment/>
            </ProtectedRoute>}/>
            <Route path="/input-shipment" element={<ProtectedRoute role="admin">
                <AddPalletShioment/>
            </ProtectedRoute>}/>
        </Routes>


        </>);
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<AuthProvider>
    <UserProvider>
        <Router>
            <PaymentProvider>
                <ParcelProvider>

                    <AppRoutes/>
                </ParcelProvider>
            </PaymentProvider>
        </Router>
    </UserProvider>
</AuthProvider>);
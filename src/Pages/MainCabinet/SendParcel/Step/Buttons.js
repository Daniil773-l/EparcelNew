import React, { useState,useEffect } from "react";
import tw, { styled } from "twin.macro";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { doc, getDoc, updateDoc ,getDocs,query,where,collection} from "firebase/firestore";
import { db, auth } from "../../../../FireBaseConfig";
import { toast,Toaster } from "react-hot-toast";
import { Modal, Button as AntButton, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Text } = Typography;

const CustomModal = styled(Modal)`
    .ant-modal-content {
        border-radius: 20px;
        padding: 30px;
        background: linear-gradient(135deg, #f0f4ff, #ffffff);
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    }
    .ant-modal-header {
        background: none;
        border-bottom: none;
        text-align: center;
        padding: 0;
    }
    .ant-modal-title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }
    .ant-modal-close {
        top: 20px;
        right: 20px;
    }
    .ant-modal-body {
        font-size: 18px;
        line-height: 1.6;
        text-align: center;
        padding: 20px 0;
    }
    .ant-modal-footer {
        display: none;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: start;
    gap: 15px;
    margin-left: 220px;
    margin-top: 20px;
`;
const ButtonContainerModal = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
`;
const StyledButton = styled(AntButton)`
    height: 45px;
    font-size: 16px;
    font-weight: bold;
    padding: 0 20px;
    border-radius: 10px;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-2px);
    }
`;

const PrimaryButton = styled(StyledButton)`
    background: #0ABD19;
    color: white;
    border: none;

    margin-bottom: 10px;
    justify-content: start;
    &:hover {
        background: #45a049;
    }
`;

const DangerButton = styled(StyledButton)`
  background: #f44336;
  color: white;
  border: none;

  &:hover {
    background: #e53935;
  }
`;

const Buttons = ({
                     totalCostUSD,
                     totalCostKZT,
                     insuranceAmount,
                     customDutyKZT,
                     insuranceIncluded,
                     parcelId, // ID посылки
                     servicesIds, // Массив ID услуг
                     deliveryCost, // Приходит в долларах// Приходит доставка в USD
                     deliveryCosts,
                 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [insufficientFunds, setInsufficientFunds] = useState(false);
    const [missingAmount, setMissingAmount] = useState(0);
    const navigate = useNavigate();
    const [exchangeRate, setExchangeRate] = useState(450); // Курс доллара к тенге (по умолчанию)
    console.log("Данные, переданные в Buttons:", {
        totalCostUSD,
        totalCostKZT,
        insuranceAmount,
        customDutyKZT,
        deliveryCost,
        deliveryCosts,
    });

    // Получение курса валют из API
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
                const data = await response.json();
                if (data && data.rates && data.rates.KZT) {
                    setExchangeRate(data.rates.KZT);
                } else {

                }
            } catch (error) {

            }
        };

        fetchExchangeRate();
    }, []);

    const deliveryCostKZT = Math.round(Number(deliveryCost) * exchangeRate);

    const totalKZT =
        (Number(customDutyKZT) || 0) +
        Math.round(Number(insuranceAmount) || 0) +
        (deliveryCostKZT || 0) +
        (Number(deliveryCosts) || 0);

    console.log("Общая сумма totalKZT:", totalKZT);




    const handlePayWithBalance = async () => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Пользователь не авторизован");

            const userId = user.uid;
            const userBalanceDoc = doc(db, "balances", userId);
            const balanceSnapshot = await getDoc(userBalanceDoc);

            if (!balanceSnapshot.exists()) throw new Error("Баланс пользователя не найден");

            const userBalance = balanceSnapshot.data().balance || 0;

            if (userBalance < totalKZT) {
                toast.error("Недостаточно средств на балансе.");

                navigate("/PaymentSuccess", { state: { success: false } });
                return;
            }

            // Списываем деньги
            await updateDoc(userBalanceDoc, { balance: userBalance - totalKZT });



            // Обновляем посылку и услуги
            const parcelUpdated = await updateParcelStatus();
            const servicesUpdated = await updateServicesStatus();

            if (parcelUpdated && servicesUpdated) {
                toast.success("Оплата успешно завершена!");
                navigate("/PaymentSuccess", { state: { success: true } });

            } else {

                navigate("/PaymentSuccess", { state: { success: false } });
            }
        } catch (error) {
            toast.error("Произошла ошибка при оплате.");
            navigate("/PaymentSuccess", { state: { success: false } });
        }
    };


    const updateParcelStatus = async () => {

        if (!parcelId) {

            return false;
        }
        try {
            // Поиск документа с совпадением по полю 'id'
            const querySnapshot = await getDocs(
                query(collection(db, "parcels"), where("id", "==", parcelId))
            );

            if (querySnapshot.empty) {

                return false;
            }

            // Получение реального ID документа
            const documentRef = querySnapshot.docs[0].ref;

            // Обновляем документ по реальному ID
            await updateDoc(documentRef, {
                status: "Оплачено",
                insuranceIncluded: insuranceIncluded,
                insuranceAmount: insuranceIncluded ? insuranceAmount : 0,
            });

            toast.success("Статус посылки обновлен.");
            return true;
        } catch (error) {

            return false;
        }
    };





    const handlePayWithCard = async () => {
        try {

            navigate("/PaymentForm", { state: { amount: totalKZT, parcelId, servicesIds } });
        } catch (error) {

        }
    };



    const updateServicesStatus = async () => {

        if (!servicesIds || !Array.isArray(servicesIds)) {

            return false;
        }
        try {
            const updatePromises = servicesIds.map(async (serviceId) => {
                const querySnapshot = await getDocs(
                    query(collection(db, "applications"), where("id", "==", serviceId))
                );

                if (querySnapshot.empty) {

                    return false;
                }

                const documentRef = querySnapshot.docs[0].ref;
                await updateDoc(documentRef, { status: "Оплачено" });

                return true;
            });

            await Promise.all(updatePromises);
            toast.success("Все услуги успешно обновлены.");
            return true;
        } catch (error) {

            return false;
        }
    };




    const handleCancel = () => {
        toast("Оплата отменена.", {
            icon: "🚫",
            style: {
                borderRadius: "8px",
                background: "#f5222d",
                color: "#fff",
            },
        });
        navigate("/IncomingParcels");
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (parcelId) {
            localStorage.setItem("currentParcelId", parcelId);
        }
    }, [parcelId]);

    const storedParcelId = localStorage.getItem("currentParcelId");
    return (
        <>
            <ButtonContainer>
                <PrimaryButton onClick={() => setIsModalOpen(true)}>Оплатить</PrimaryButton>
                <DangerButton onClick={handleCancel}>Отмена</DangerButton>
            </ButtonContainer>

            <CustomModal
                title="Выберите способ оплаты"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                closeIcon={<CloseOutlined style={{ fontSize: "20px", color: "#888" }} />}
            >
                <Text strong style={{ fontSize: "18px" }}>
                    Итоговая сумма: <span style={{ fontWeight: "bold" }}>{Math.round( totalKZT)} ₸</span>
                </Text>
                <ButtonContainerModal>
                    <DangerButton onClick={handleCancel}>Отмена</DangerButton>
                    <PrimaryButton onClick={handlePayWithBalance}>С баланса</PrimaryButton>
                    <PrimaryButton onClick={handlePayWithCard}>С карты</PrimaryButton>
                </ButtonContainerModal>
            </CustomModal>
        </>
    );
};

export default Buttons;


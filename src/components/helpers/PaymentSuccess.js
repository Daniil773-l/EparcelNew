import React ,{useEffect} from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";



// Анимация галочки
const checkmarkAnimation = keyframes`
    0% {
        stroke-dashoffset: 50;
    }
    100% {
        stroke-dashoffset: 0;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Стили для обертки
const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8f9fa;
    text-align: center;
`;

// Стили для карточки успеха
const MessageBox = styled.div`
    box-shadow: 0 15px 25px #00000019;
    padding: 45px;
    text-align: center;
    margin: 40px auto;
    border-bottom: solid 4px ${({ success }) => (success ? "#28a745" : "red")};
    background: white;
    animation: ${fadeIn} 0.5s ease-out;
    width: 100%;
    max-width: 500px;
`;

// Стили для заголовка
const Title = styled.h2`
    font-size: 40px;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 10px;
    margin-bottom: 12px;
    color: ${({ success }) => (success ? "#28a745" : "red")};
`;

// Стили для текста
const Subtitle = styled.p`
    margin-bottom: 0px;
    font-size: 18px;
    color: #495057;
    font-weight: 500;
`;

// Стили для иконки
const IconWrapper = styled.div`
    margin: 0 auto;
    width: 100px;
    height: 100px;
    position: relative;
`;

const CheckmarkCircle = styled.svg`
    width: 100px;
    height: 100px;
`;

const CheckmarkPath = styled.path`
    fill: none;
    stroke: ${({ success }) => (success ? "#28a745" : "red")};
    stroke-width: 4;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: ${checkmarkAnimation} 0.8s ease-out forwards;
`;

const Button = styled.button`
    background: ${({ success }) => (success ? "#28a745" : "red")};
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ success }) => (success ? "#218838" : "#c82333")};
        transform: scale(1.05);
    }
`;

// Компонент сообщения
const PaymentMessage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id: parcelIdFromParams } = useParams();
    const parcelId = location.state?.parcelId || parcelIdFromParams || localStorage.getItem("currentParcelId");

    useEffect(() => {
        if (parcelId) {
            localStorage.setItem("currentParcelId", parcelId);
        }
    }, [parcelId]);

    // ✅ Если success = false, передаем undefined (чтобы избежать ошибки)
    const success = location.state?.success ? true : undefined;

    const handleGoBack = () => {
        if (success) {
            navigate("/IncomingParcels");
        } else if (parcelId) {
            navigate(`/SendParcelForm/${parcelId}`);
        } else {
            navigate("/SendParcelForm");
        }
    };

    return (
        <Wrapper>
            <MessageBox success={success}>
                <IconWrapper>
                    <CheckmarkCircle>
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#ddd" strokeWidth="4" />
                        <CheckmarkPath
                            success={success}
                            d="M30 50 l15 15 l25 -25"
                        />
                    </CheckmarkCircle>
                </IconWrapper>
                <Title success={success}>
                    {success ? "Оплата прошла успешно!" : "Оплата не прошла"}
                </Title>
                <Subtitle>
                    {success
                        ? "Спасибо за использование нашего сервиса."
                        : "Попробуйте снова позже."}
                </Subtitle>
                <Button success={success} onClick={handleGoBack}>
                    {success ? "Вернуться на главную" : "Попробовать снова"}
                </Button>
            </MessageBox>
        </Wrapper>
    );
};


export default PaymentMessage;
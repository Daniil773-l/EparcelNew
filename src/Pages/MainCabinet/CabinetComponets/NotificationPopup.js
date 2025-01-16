import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const PopupContainer = styled.div`
    ${tw`fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50`};
`;

const PopupContent = styled.div`
    ${tw`bg-white p-6 rounded-lg shadow-lg`};
    width: 500px;
    max-height: 80%; /* Ограничение высоты */
    overflow-y: auto; /* Прокрутка для длинного списка */
`;

const Title = styled.h2`
    ${tw`text-2xl font-bold mb-4 text-center`}
`;

const Message = styled.p`
    ${tw`text-black`};
    word-wrap: break-word; /* Разбиение длинных слов */
`;

const NotificationCard = styled.div`
    ${tw`bg-gray-100 p-4 rounded-lg flex flex-col mb-2 shadow`};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0e0e0; /* Изменение цвета фона при наведении */
    }
`;

const NotificationHeader = styled.div`
    ${tw`flex justify-between items-center mb-2`};
`;

const NotificationType = styled.span`
    ${tw`text-sm font-semibold text-green-700`};
`;

const CloseButton = styled.button`
    ${tw`mt-4 py-3 bg-green-500 text-white rounded`};
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    background-color: #0ABD50;
    border: none;
`;

const DateTime = styled.span`
    ${tw`text-gray-600 text-sm`};
`;

const NotificationPopup = ({ notifications, onClose }) => {
    console.log("Received notifications in Popup:", notifications);

    return (
        <PopupContainer>
            <PopupContent>
                <Title>Уведомления</Title>
                {notifications.length === 0 ? (
                    <Message>Нет новых уведомлений.</Message>
                ) : (
                    notifications.map((notification, index) => (
                        <NotificationCard key={index}>
                            <NotificationHeader>
                                <NotificationType>
                                    {notification.type === "parcelCreated" && "Создание посылки"}
                                    {notification.type === "statusChanged" && "Изменение статуса"}
                                    {!notification.type && "Общее уведомление"}
                                </NotificationType>
                                <DateTime>
                                    {notification.timestamp
                                        ? new Date(notification.timestamp).toLocaleString()
                                        : "Без времени"}
                                </DateTime>
                            </NotificationHeader>
                            <Message>{notification.message}</Message>
                        </NotificationCard>
                    ))
                )}
                <CloseButton onClick={onClose}>Закрыть</CloseButton>
            </PopupContent>
        </PopupContainer>
    );
};


export default NotificationPopup;

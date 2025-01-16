import React, {useEffect, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import icon3 from "../../../images/icon/profile.png";
import icon2 from "../../../images/icon/receiver (1).png";
import icon5 from "../../../images/icon/lock (1).png";
import icon6 from "../../../images/icon/notification.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";


const Card = styled.div`
    ${tw`bg-white shadow-lg  p-6 relative`}
    width: calc(100% - 40px);
    min-height: 320px;
    border-radius: 20px;
    margin-bottom: 16px; /* Adding margin-bottom to match other cards */
`;

const Navlink = styled.a`
    text-decoration: none;
    ${tw`flex items-center text-gray-700 text-lg`}
`;

const List = styled.ul`
    ${tw`space-y-4 mt-16`}  // Increase space between items
`;

const ListItem = styled.li`
    ${tw`flex items-center text-gray-700 text-lg`}  // Increase text size
`;

const Icon = styled.img`
    width: 23px;  // Set icon size to 16x16
    height: 23px;
    margin-right: 10px; // Increase space between icon and text
`;

const GreenStrip = styled.div`
    ${tw`absolute top-0 left-0 w-full h-16 bg-green-1000 rounded-t-2xl`}
`;

const Avatar = styled.div`
    ${tw`w-20 h-20 bg-white rounded-full flex items-center justify-center text-green-500 text-xl font-bold absolute shadow-lg`}
    top: 13px;
    left: 36px;
`;

const CardTitle = styled.div`
    ${tw`ml-24 relative`}
    top: 20px;
`;

const IDText = styled.div`
    ${tw`font-semibold ml-2`}
    color: #999999;
    font-size: 15px;
`;

const Name = styled.div`
    ${tw`font-bold text-lg mt-2 ml-2`}
    color: #2D2D2D;
`;

const Balance = styled.div`
    ${tw`text-green-1002 font-bold text-lg absolute`}
    right: 30px;
    top: 40px;
`;


const Divider = styled.div`
    ${tw`w-full h-px bg-gray-400`}
    position: absolute;
    width: 93%;
    bottom: 60px;
`;

const LogoutText = styled.div`
    ${tw`text-gray-600 text-lg cursor-pointer`}
    position: absolute;
    bottom: 20px;
    left: 26px;
`;

const ProfileCard = () => {
    const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem("userData")) || null);
    const [balance, setBalance] = useState(() => parseFloat(localStorage.getItem("balance")) || 0.0);
    const [loading, setLoading] = useState(!userData);


    useEffect(() => {
        const auth = getAuth();

        const fetchUserData = () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userDocRef = doc(db, "users", user.uid);
                    const balanceDocRef = doc(db, "balances", user.uid);

                    // Загружаем данные пользователя и баланс в реальном времени
                    const unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            setUserData(data);
                            localStorage.setItem("userData", JSON.stringify(data));
                        }
                        setLoading(false);
                    });

                    const unsubscribeBalance = onSnapshot(balanceDocRef, (balanceSnap) => {
                        if (balanceSnap.exists()) {
                            const newBalance = balanceSnap.data().balance;
                            setBalance(newBalance);
                            localStorage.setItem("balance", newBalance.toString());
                        } else {
                            setBalance(0.0);
                        }
                    });

                    // Отписываемся при размонтировании
                    return () => {
                        unsubscribeUser();
                        unsubscribeBalance();
                    };
                }
            });
            return unsubscribe;
        };

        const unsubscribe = fetchUserData();
        return () => unsubscribe();
    }, []);


    // Return null or loading indicator while userData is null
    if (!userData) {
        return null; // You can return a loading spinner or placeholder if needed
    }
    const initials = `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    const cabinetName = userData.cabinetName || "Личный кабинет";
    return (
        <Card>
            <GreenStrip />
            <Avatar>{initials}</Avatar>
            <CardTitle>
                <IDText>Ваш ID: {userData.userId}</IDText>
                <Name>{cabinetName}</Name>
            </CardTitle>
            <Balance>Баланс: {balance.toFixed(2)} ₸</Balance>
            <List>
                <Navlink href="/ChangingContactDetails">
                    <ListItem>
                        <Icon src={icon3} alt="Profile" />Профиль
                    </ListItem>
                </Navlink>
                <Navlink href="/RecipientsPrivateCabinet">
                    <ListItem>
                        <Icon src={icon2} alt="Receivers" /> Получатели
                    </ListItem>
                </Navlink>
                <Navlink href="/ChangePassword">
                    <ListItem>
                        <Icon src={icon5} alt="Change Password" /> Сменить пароль
                    </ListItem>
                </Navlink>
                <Navlink href="/ChangePassword">
                    <ListItem>
                        <Icon src={icon6} alt="Change Password" /> Уведомления
                    </ListItem>
                </Navlink>
            </List>
            <Divider />
            <LogoutText>Выйти из аккаунта</LogoutText>
        </Card>
    );
};

export default ProfileCard;

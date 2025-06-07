import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FireBaseConfig";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", authUser.uid));
                    if (userDoc.exists()) {
                        const userData = { uid: authUser.uid, ...userDoc.data() };
                        setUser(userData);
                        localStorage.setItem("userData", JSON.stringify(userData));
                    }
                } catch (error) {
                    console.error("Ошибка при загрузке данных пользователя:", error);
                }
            } else {
                setUser(null);
                localStorage.removeItem("userData");
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const raw = localStorage.getItem("userData");
        if (raw === "undefined") {
            localStorage.removeItem("userData");
            return;
        }
        try {
            if (raw) {
                const parsed = JSON.parse(raw);
                setUser(parsed);
            }
        } catch (error) {
            console.error("Ошибка при парсинге userData из localStorage:", error);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

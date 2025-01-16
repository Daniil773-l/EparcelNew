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
                const userDoc = await getDoc(doc(db, "users", authUser.uid));
                if (userDoc.exists()) {
                    const userData = { uid: authUser.uid, ...userDoc.data() };
                    setUser(userData);
                    localStorage.setItem('userData', JSON.stringify(userData));
                }
            } else {
                setUser(null);
                localStorage.removeItem('userData');
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const cachedUser = localStorage.getItem('userData');
        if (cachedUser) {
            setUser(JSON.parse(cachedUser));
        }
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
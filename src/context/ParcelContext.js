import React, { createContext, useContext, useState } from "react";

const ParcelContext = createContext();

export const ParcelProvider = ({ children }) => {
    const [parcelData, setParcelData] = useState(null);

    const setParcelDatas = (data) => {
        setParcelData(data); // Сохраняем данные о посылке
    };

    return (
        <ParcelContext.Provider value={{ parcelData, setParcelDatas }}>
            {children}
        </ParcelContext.Provider>
    );
};

export const useParcel = () => useContext(ParcelContext);

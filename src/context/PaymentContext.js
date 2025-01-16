import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
    const [paymentDetails, setPaymentDetails] = useState({
        amount: 0,
        user: null
    });

    return (
        <PaymentContext.Provider value={{ paymentDetails, setPaymentDetails }}>
            {children}
        </PaymentContext.Provider>
    );
};

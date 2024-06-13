'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [rerender, setReRender] = useState(true);


    return (
        <UserContext.Provider value={{ rerender, setReRender }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

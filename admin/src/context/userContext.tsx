import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axiosAPI from "../services/axiosInstance";
import { IUser } from "../types/type";

const UserContext = createContext<{ user: IUser | null; updateUser: (updatedUser: any) => void; clearUser: () => void } | undefined>(undefined);
export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const fetchAPI = async () => {
        try {
            const { data } = await axiosAPI("/profile");
            setUser(data.data);
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        if (Cookies.get("accessToken")) fetchAPI();
    }, []);

    const updateUser = (updatedUser: any) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedUser,
        }));
    };

    const clearUser = () => {
        setUser(null);
        Cookies.remove("accessToken");
    };

    return <UserContext.Provider value={{ user, updateUser, clearUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

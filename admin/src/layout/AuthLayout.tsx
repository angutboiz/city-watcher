import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
export default function AuthLayout() {
    return (
        <>
            <Outlet />
            <ToastContainer />
        </>
    );
}

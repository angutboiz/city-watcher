import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AppWrapper } from "./components/common/PageMeta";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <AppWrapper>
        <ThemeProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ThemeProvider>
    </AppWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

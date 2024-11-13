import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/900.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const applyZoom = () => {
    const clWidth = (document.documentElement.clientWidth / 1920).toFixed(2);
    const clHeight = (document.documentElement.clientHeight / 1080).toFixed(2);
    const clZoom = clWidth < clHeight ? clWidth : clHeight;
    document.body.style.zoom = clZoom; 
};

function ZoomedApp() {
    useEffect(() => {
        applyZoom(); 
        window.addEventListener("resize", applyZoom);
        return () => {
            window.removeEventListener("resize", applyZoom);
        };
    }, []);

    return <App />;
}

root.render(
    <React.StrictMode>
        <ZoomedApp />
    </React.StrictMode>
);

reportWebVitals();

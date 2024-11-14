import React, { useState, useEffect } from "react";
import "./TechRadar.css";

const IntegrationTechRadar = ({ onPageChange }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTechRadarData = async () => {
            try {
                const authToken = localStorage.getItem("authToken");
                const url = `http://${localStorage.getItem("apiUrl")}:8080/api/v1/tech_radar`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.length === 0) {
                        setTimeout(fetchTechRadarData, 1000);
                    } else {
                        document
                            .getElementById("iframe")
                            ?.contentWindow.postMessage(
                                { type: "setData", data },
                                "*"
                            );
                    }
                } else {
                    console.error(
                        "Ошибка при загрузке данных с сервера:",
                        response.status
                    );
                }
            } catch (error) {
                console.error("Ошибка при запросе данных:", error);
            }
        };

        fetchTechRadarData(); // Начальный вызов функции
    }, []);

    return (
        <div className="techradar-page">
            {loading ? <></> : null}
            <iframe
                id="iframe"
                src={`http://${localStorage.getItem("apiUrl")}:5173/share`}
                onLoad={() => setLoading(false)}
                width="1500px"
                height="800px"
            />
            <div className="techradar-button-wrapper">
                <button
                    className="blue-button"
                    onClick={() => onPageChange("main")}
                >
                    На главную
                </button>
            </div>
        </div>
    );
};

export default IntegrationTechRadar;

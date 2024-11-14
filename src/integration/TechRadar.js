import React, { useState, useEffect } from "react";
import "./TechRadar.css";

const mockElements = [
    {
        id: 1,
        name: "Amazon1 Platforms",
        type: 0,
        level: "Hold",
    },
    {
        id: 2,
        name: "DataRobot1 Databases",
        type: 2,
        level: "Hold",
    },
    {
        id: 3,
        name: "Amazon1 Tools",
        type: 3,
        level: "Trial",
    },
    {
        id: 4,
        name: "Amazon2 Platforms",
        type: 0,
        level: "Trial",
    },
    {
        id: 5,
        name: "DataRobot2 Databases",
        type: 2,
        level: "Assess",
    },
    {
        id: 6,
        name: "Amazon2 Tools",
        type: 3,
        level: "Assess",
    },
    {
        id: 7,
        name: "Amazon3 Platforms",
        type: 0,
        level: "Adopt",
    },
    {
        id: 8,
        name: "DataRobot3 Databases",
        type: 2,
        level: "Trial",
    },
    {
        id: 9,
        name: "Amazon3 Tools",
        type: 3,
        level: "Trial",
    },
    {
        id: 10,
        name: "Amazon1 Languages",
        type: 1,
        level: "Trial",
    },
    {
        id: 11,
        name: "Amazon2 Languages",
        type: 1,
        level: "Adopt",
    },
    {
        id: 12,
        name: "Amazon3 Languages",
        type: 1,
        level: "Hold",
    },
];

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

                    document
                        .getElementById("iframe")
                        ?.contentWindow.postMessage(
                            { type: "setData", data },
                            "*"
                        );
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

        fetchTechRadarData();
    }, []);

    // document
    //     .getElementById("iframe")
    //     ?.contentWindow.postMessage(
    //         { type: "setData", data: mockElements },
    //         "*"
    //     );

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

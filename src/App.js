import React, { useState, useEffect } from "react";
import Login from "./auth/Login";
import RegisterProfile from "./auth/RegisterProfile";
import MainPage from "./main-page/MainPage";
import SkillPage from "./skill-map/SkillPage";
import RatingPage from "./rating-page/RatingPage";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentPage") || null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (currentPage) {
            localStorage.setItem("currentPage", currentPage);
        }
    }, [currentPage]);
    
    const handleLoginSuccess = async (token) => {
        setToken(token);
        localStorage.setItem("authToken", token);
        await fetchUserProfile(token);
    };

    const fetchUserProfile = async (authToken) => {
        const url = "http://localhost:8080/api/v1/specialists/profile";

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 404) {
                setCurrentPage("register-profile");
            } else if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                setCurrentPage("main");
            } else {
                throw new Error("Ошибка загрузки профиля");
            }
        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
        }
    };

    const handleLogout = () => {
        setToken(null);
        setProfileData(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentPage");
        setCurrentPage("login");
    };

    const renderPage = () => {
        if (!token) {
            return <Login onLoginSuccess={handleLoginSuccess} />;
        }

        switch (currentPage) {
            case "register-profile":
                return (
                    <RegisterProfile
                        onPageChange={setCurrentPage}
                        onLogout={handleLogout}
                    />
                );
            case "main":
                return (
                    <MainPage
                        token={token}
                        profileData={profileData}
                        onLogout={handleLogout}
                        onPageChange={setCurrentPage}
                        fetchUserProfile={() => fetchUserProfile(token)}
                    />
                );
            case "skill":
                return (
                    <SkillPage token={token} onPageChange={setCurrentPage} />
                );
            case "rating":
                return (
                    <RatingPage token={token} onPageChange={setCurrentPage} />
                );
            default:
                return <>{handleLogout()}</>;
        }
    };

    return <div>{renderPage()}</div>;
};

export default App;

import React, { useState, useEffect } from "react";
import Auth from "./auth/Auth";
import RegisterProfile from "./auth/RegisterProfile";
import MainPage from "./main-page/MainPage";
import SkillPage from "./skill-map/SkillPage";
import RatingPage from "./rating-page/RatingPage";

const App = () => {
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("currentPage") || null
    );
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (currentPage) {
            localStorage.setItem("currentPage", currentPage);
        }
    }, [currentPage]);

    const handleLoginSuccess = async (token, role) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        await fetchUserProfile(token);
    };

    const fetchUserProfile = async () => {
        const url = "http://localhost:8080/api/v1/specialists/profile";
        const authToken = localStorage.getItem("authToken");
        const isAdmin = localStorage.getItem("userRole") === "ROLE_ADMIN";
        console.log(localStorage.getItem("userRole"))
        if (isAdmin) {
            setCurrentPage("main");
            return;
        }

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
            }
        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
            handleLogout();
        }
    };

    const handleLogout = () => {
        setProfileData(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("currentPage");
        setCurrentPage("login");
    };

    const renderPage = () => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            return <Auth onLoginSuccess={handleLoginSuccess} />;
        }

        switch (currentPage) {
            case "register":
                return <Auth onPageChange={setCurrentPage}/>
            case "register-profile":
                return <RegisterProfile onPageChange={setCurrentPage} />;
            case "main":
                return (
                    <MainPage
                        profileData={profileData}
                        onLogout={handleLogout}
                        onPageChange={setCurrentPage}
                        fetchUserProfile={() => fetchUserProfile(authToken)}
                    />
                );
            case "skill":
                return <SkillPage onPageChange={setCurrentPage} />;
            case "rating":
                return <RatingPage onPageChange={setCurrentPage} />;
            default:
                return <>{handleLogout()}</>;
        }
    };

    return <div>{renderPage()}</div>;
};

export default App;

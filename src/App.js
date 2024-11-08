import React, { useState, useEffect, useCallback } from "react";
import Auth from "./auth/Auth";
import RegisterProfile from "./auth/RegisterProfile";
import MainPage from "./main-page/MainPage";
import SkillPage from "./skill-map/SkillPage";
import RatingPage from "./rating-page/RatingPage";
import Profile from "./profile/Profile";

const App = () => {
    const [profileData, setProfileData] = useState(null);
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("currentPage") || "login"
    );
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
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

        if (isAdmin) {
            renderPage("main");
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
                renderPage("register-profile");
            } else if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                renderPage("main");
            }
        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
            handleLogout();
        }
    };

    const fetchSkills = useCallback(async (type) => {
        const url = `http://localhost:8080/api/v1/skills?type=${type}`;
        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Ошибка при загрузке навыков");
            }
            const data = await response.json();

            const transformSkillsData = async (data) => {
                return Object.values(data).flatMap((typeResponse) =>
                    Object.entries(typeResponse).map(
                        ([categoryKey, skillArray]) => ({
                            categoryResponse: {
                                id: parseInt(categoryKey.match(/\d+/)[0]),
                                name: categoryKey.match(/name=([^,]+)\]/)[1],
                            },
                            skillResponses: skillArray.map((skill) => ({
                                id: skill.id,
                                name: skill.name,
                                description: skill.description,
                                progress: skill.progress || 0,
                            })),
                        })
                    )
                );
            };

            return transformSkillsData(data);
        } catch (error) {
            console.error("Ошибка при получении навыков:", error);
        }
    }, []);

    const handleLogout = () => {
        setProfileData(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("currentPage");
        setCurrentPage("login");
        setPageData(null);
    };

    const renderPage = (page, data = null) => {
        setCurrentPage(page);
        setPageData(data);
    };

    const renderCurrentPage = () => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            return <Auth onLoginSuccess={handleLoginSuccess} />;
        }

        switch (currentPage) {
            case "register":
                return <Auth onPageChange={renderPage} />;
            case "register-profile":
                return (
                    <RegisterProfile
                        onPageChange={renderPage}
                        fetchSkills={fetchSkills}
                    />
                );
            case "main":
                return (
                    <MainPage
                        profileData={profileData}
                        onLogout={handleLogout}
                        onPageChange={renderPage}
                        fetchUserProfile={() => fetchUserProfile(authToken)}
                        fetchSkills={fetchSkills}
                    />
                );
            case "skill":
                return (
                    <div className="user-skill-page">
                        <Profile userData={pageData.userData} display_page="skill-page" onPageChange={renderPage}/>
                        <SkillPage
                            onPageChange={renderPage}
                            initialSkillsData={pageData.initialSkillsData}
                            pageToRender={pageData.pageToRender}
                            typeId={pageData.typeId}
                            fetchSkills={fetchSkills}
                        />
                    </div>
                );
            case "rating":
                return <RatingPage onPageChange={renderPage} />;
            default:
                return <>{handleLogout()}</>;
        }
    };

    return <div>{renderCurrentPage()}</div>;
};

export default App;

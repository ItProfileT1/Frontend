import React, { useState, useEffect, useCallback } from "react";
import Auth from "./auth/Auth";
import RegisterProfile from "./auth/RegisterProfile";
import MainPage from "./main-page/MainPage";
import SkillPage from "./skill-map/SkillPage";
import Profile from "./profile/Profile";
import SkillPosition from "./skill-map/SkillPosition";
import MasterWorkersList from "./rating-page/MasterWorkersList";
import AssessmentWorkersList from "./rating-page/AssessmentWorkersList";
import IntegrationTechRadar from "./integration/TechRadar";

const App = () => {
    const [profileData, setProfileData] = useState(null);
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("currentPage") || "login"
    );
    const [pageData, setPageData] = useState(null);
    // console.log(localStorage.getItem('authToken'))
    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

    const handleLoginSuccess = async (token, role) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        await fetchUserProfile(token);
    };

    const fetchUserProfile = async () => {
        const authToken = localStorage.getItem("authToken");
        const role = localStorage.getItem("userRole");

        if (role === "ROLE_ADMIN" || role === "ROLE_MASTER") {
            return renderPage("main");
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/specialists/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 404) {
                return renderPage("register-profile");
            }

            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                return renderPage("main");
            }

            throw new Error("Failed to fetch profile");
        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
            handleLogout();
        }
    };

    const fetchSkills = useCallback(async (type) => {
        const url = `http://localhost:8080/api/v1/skills?type=${type}`;
        const authToken = localStorage.getItem("authToken");
        const isUser = localStorage.getItem("userRole") === "ROLE_USER";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) throw new Error("Ошибка при загрузке навыков");

            const data = await response.json();
            return await transformSkillsData(data, isUser, authToken);
        } catch (error) {
            console.error("Ошибка при получении навыков:", error);
        }
    }, []);

    const transformSkillsData = async (data, isUser, authToken) => {
        const skillsWithCategory = {};
        const skillsWithoutCategory = [];
        const currentPage = localStorage.getItem("currentPage");

        if (isUser && currentPage !== "register-profile") {
            const userProfileData = await fetchUserProfileData(authToken);
            const userSkillLevels = getUserSkillLevels(userProfileData);

            data.forEach((skill) =>
                categorizeSkill(
                    skill,
                    userSkillLevels,
                    skillsWithCategory,
                    skillsWithoutCategory
                )
            );
        } else {
            data.forEach((skill) =>
                categorizeSkill(
                    skill,
                    null,
                    skillsWithCategory,
                    skillsWithoutCategory
                )
            );
        }

        sortSkills(skillsWithCategory, skillsWithoutCategory);
        return {
            skillsWithCategory: Object.values(skillsWithCategory),
            skillsWithoutCategory,
        };
    };

    const fetchUserProfileData = async (authToken) => {
        const userProfileResponse = await fetch(
            "http://localhost:8080/api/v1/specialists/profile",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!userProfileResponse.ok)
            throw new Error("Ошибка при получении профиля");
        return await userProfileResponse.json();
    };

    const getUserSkillLevels = (userProfileData) => {
        return userProfileData.skillLevelResponses.reduce((acc, skillLevel) => {
            acc[skillLevel.skill.id] = skillLevel.level?.numericValue ?? null;
            return acc;
        }, {});
    };

    const categorizeSkill = (
        skill,
        userSkillLevels,
        skillsWithCategory,
        skillsWithoutCategory
    ) => {
        const progress = userSkillLevels ? userSkillLevels[skill.id] : null;

        if (skill.category && skill.category.id !== null) {
            const categoryId = skill.category.id;
            if (!skillsWithCategory[categoryId]) {
                skillsWithCategory[categoryId] = {
                    categoryResponse: {
                        id: skill.category.id,
                        name: skill.category.name,
                    },
                    skillResponses: [],
                };
            }
            skillsWithCategory[categoryId].skillResponses.push({
                id: skill.id,
                name: skill.name,
                description: skill.description,
                progress,
            });
        } else {
            skillsWithoutCategory.push({
                id: skill.id,
                name: skill.name,
                description: skill.description,
                progress,
            });
        }
    };

    const sortSkills = (skillsWithCategory, skillsWithoutCategory) => {
        Object.keys(skillsWithCategory).forEach((categoryId) => {
            skillsWithCategory[categoryId].skillResponses.sort(
                (a, b) => a.id - b.id
            );
        });
        skillsWithoutCategory.sort((a, b) => a.id - b.id);
    };

    const handleLogout = () => {
        setProfileData(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("currentPage");
        localStorage.removeItem("pageData");
        setCurrentPage("login");
        setPageData(null);
    };

    const renderPage = (page, data = null) => {
        setCurrentPage(page);
        setPageData(data);
    };

    // handleLogout();
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
            case "position":
                return (
                    <SkillPosition
                        onPageChange={renderPage}
                        fetchSkills={fetchSkills}
                    />
                );
            case "skill":
                return (
                    <div className="user-skill-page">
                        <Profile
                            userData={pageData?.userData}
                            display_page="skill-page"
                            onPageChange={renderPage}
                        />
                        <SkillPage
                            onPageChange={renderPage}
                            initialSkillsData={pageData.initialSkillsData}
                            pageToRender={pageData.pageToRender}
                            typeId={pageData.typeId}
                            fetchSkills={fetchSkills}
                            addSkillId={pageData?.addSkillId}
                        />
                    </div>
                );
            case "show-workers":
                return <MasterWorkersList onPageChange={renderPage} />;
            case "assessory-rating":
                return <AssessmentWorkersList onPageChange={renderPage} />;
            case "techradar-integration":
                return <IntegrationTechRadar onPageChange={renderPage}/>
            default:
                return <>{handleLogout()}</>;
        }
    };

    return <div>{renderCurrentPage()}</div>;
};

export default App;

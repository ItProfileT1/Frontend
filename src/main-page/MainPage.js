import React, { useEffect } from "react";
import "./MainPage.css";
import Profile from "../profile/Profile";
import MainPageMenu from "./MainPageMenu";

const MainPage = ({
    onLogout,
    onPageChange,
    profileData,
    fetchUserProfile,
    fetchSkills,
}) => {
    useEffect(() => {
        if (!profileData) {
            fetchUserProfile();
        }
    }, [profileData, fetchUserProfile]);

    return (
        <div className="main-page">
            <Profile userData={profileData} display_page={"main-page"} />
            <MainPageMenu
                onPageChange={onPageChange}
                onLogout={onLogout}
                fetchSkills={fetchSkills}
            />
        </div>
    );
};

export default MainPage;

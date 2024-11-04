import React, { useEffect } from "react";
import './MainPage.css';
import Profile from "../profile/Profile";
import MainPageMenu from "./MainPageMenu";

const MainPage = ({ onLogout, onPageChange, profileData, isAdmin, fetchUserProfile }) => {
    useEffect(() => {
        if (!profileData) {
            fetchUserProfile();
        }
    }, [profileData, fetchUserProfile]);
    
    return (
        <div className="main-page">
            <Profile userData={profileData} display_page={"main-page"} />
            <MainPageMenu isAdmin={isAdmin} />
            <button onClick={onLogout}>Выйти</button>
        </div>
    );
};

export default MainPage;

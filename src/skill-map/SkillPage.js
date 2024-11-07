import "./SkillPage.css";
import Profile from "../profile/Profile";
import SkillMap from "./SkillMap";
import SkillInfo from "./SkillInfo";
import SkillAdminPanel from "./SkillAdminPanel";
import SkillEdit from "./SkillEdit";
import { React, useState, useEffect } from "react";

const SkillPage = ({
    onPageChange,
    userData,
    fetchSkills,
    initialSkillsData,
    pageToRender,
    selectedSkills,
    addSkillId,
    typeId,
}) => {
    const [skillsData, setSkillsData] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState({
        id: "",
        name: "",
        description: "",
        progress: "",
    });
    const [isSkillInfoShown, setSkillInfoShown] = useState(false);

    useEffect(() => {
        if (initialSkillsData) {
            setSkillsData(initialSkillsData);
        }
    }, [initialSkillsData]);

    const handleSkillSelect = (id, name, description, progress) => {
        setSelectedSkill({ id, name, description, progress });
        setSkillInfoShown(true);
    };

    const handleSkillEditClick = (id, name, description) => {
        setSelectedSkill({ id, name, description });
        setSkillInfoShown(true);
    };

    const handleSkillSave = async (data) => {
        setSkillInfoShown(false);
        return console.log(data);
        const url = `http://localhost:8080/api/v1/edit-skill`;
        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedSkillsData = await fetchSkills(typeId); 
                setSkillsData(updatedSkillsData); 
            } else {
                throw new Error(`Ошибка запроса: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Произошла ошибка при запросе:", error); 
        }

        setSkillInfoShown(false);
    };

    const handleCloseInfo = () => setSkillInfoShown(false);

    const EditView = () => (
        <>
            <SkillAdminPanel
                fetchSkills={fetchSkills}
                onPageChange={onPageChange}
                skillsData={skillsData}
                setSkillsData={setSkillsData}
                onClose={handleCloseInfo}
                typeId={typeId}
            />
             <SkillMap
                initialSkillsData={skillsData}
                onSkillSelect={handleSkillEditClick}
                isEdit={true}
            />
            {isSkillInfoShown && (
                <SkillEdit
                    onClose={handleCloseInfo}
                    onSave={handleSkillSave}
                    id={selectedSkill.id}
                    name={selectedSkill.name}
                    description={selectedSkill.description}
                />
            )}
            <div className="skill-page-filler" hidden={isSkillInfoShown}></div>
        </>
    );

    const ProfileView = () => (
        <>
            <SkillMap
                initialSkillsData={initialSkillsData}
                onSkillSelect={handleSkillSelect}
            />
            {isSkillInfoShown && (
                <SkillInfo
                    onClose={handleCloseInfo}
                    id={selectedSkill.id}
                    name={selectedSkill.name}
                    description={selectedSkill.description}
                    isSelected={selectedSkills?.includes(selectedSkill.id)}
                    addSkillId={addSkillId}
                />
            )}
            <div className="skill-page-filler" hidden={isSkillInfoShown}></div>
        </>
    );

    const SkillsView = () => (
        <>
            <Profile userData={userData} display_page="skill-page" />
            <SkillMap
                initialSkillsData={initialSkillsData}
                onSkillSelect={handleSkillSelect}
            />
            {isSkillInfoShown && (
                <SkillInfo
                    onClose={handleCloseInfo}
                    id={selectedSkill.id}
                    name={selectedSkill.name}
                    description={selectedSkill.description}
                    progress={selectedSkill.progress}
                />
            )}
            <div className="skill-page-filler" hidden={isSkillInfoShown}></div>
        </>
    );

    const renderPage = (page) => {
        switch (page) {
            case "edit":
                return <EditView />;
            case "profile":
                return <ProfileView />;
            case "skills":
                return <SkillsView />;
            default:
                return null;
        }
    };

    return <div className="skill-page">{renderPage(pageToRender)}</div>;
};

export default SkillPage;

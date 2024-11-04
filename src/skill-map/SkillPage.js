import "./SkillPage.css";
import Profile from "../profile/Profile";
import SkillMap from "./SkillMap";
import SkillInfo from "./SkillInfo";
import SkillAdminPanel from "./SkillAdminPanel";
import SkillEdit from "./SkillEdit";
import { useState, useEffect } from "react";

const SkillPage = ({
    userData,
    initialSkillsData,
    isAdmin,
    isEdit,
    pageToRender,
    children,
    selectedSkills,
    addSkillId
}) => {
    const [skillsData, setSkillsData] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState({
        id: "",
        label: "",
        description: "",
        progress: "",
    });
    const [isSkillInfoVisible, setSkillInfoVisible] = useState(false);

    useEffect(() => {
        const skillsData = initialSkillsData;
        setSkillsData(skillsData);
    }, []);

    const handleSkillSelect = (id, label, description, progress) => {
        setSelectedSkill({ id, label, description, progress });
        setSkillInfoVisible(true);
    };

    const handleSkillEditClick = (id, label, description) => {
        setSelectedSkill({ id, label, description });
        setSkillInfoVisible(true);
    };

    const handleSkillSave = (id, newLabel, newDescription) => {
        const updatedSkillsData = skillsData.map((category) => ({
            ...category,
            skills: category.skills.map((skill) =>
                skill.id === id
                    ? { ...skill, label: newLabel, description: newDescription }
                    : skill
            ),
        }));
        setSkillsData(updatedSkillsData);
        setSkillInfoVisible(false);
    };

    const handleCloseInfo = () => {
        setSkillInfoVisible(false);
    };

    const renderPage = ( pageToRender ) => {
        switch (pageToRender) {
            case "edit":
                return (
                    <>
                        <SkillAdminPanel
                            initialSkillsData={skillsData}
                            setSkillsData={setSkillsData}
                            onClose={handleCloseInfo}
                        />
                        <SkillMap
                            initialSkillsData={skillsData}
                            onSkillSelect={handleSkillEditClick}
                            isEdit={isEdit}
                        />
                        <div
                            style={{
                                display: isSkillInfoVisible ? "block" : "none",
                            }}
                        >
                            <SkillEdit
                                onClose={handleCloseInfo}
                                onSave={handleSkillSave}
                                id={selectedSkill.id}
                                label={selectedSkill.label}
                                description={selectedSkill.description}
                                progress={selectedSkill.progress}
                                isAdmin={isAdmin}
                            />
                        </div>
                        <div
                            className="skill-page-filler"
                            style={{
                                display: isSkillInfoVisible ? "none" : "block",
                            }}
                        ></div>
                    </>
                );
            case "profile":
                return (
                    <>
                        {children}
                        <SkillMap
                            initialSkillsData={initialSkillsData}
                            onSkillSelect={handleSkillSelect}
                        />
                        <div
                            style={{
                                display: isSkillInfoVisible ? "block" : "none",
                            }}
                        >
                            <SkillInfo
                                onClose={handleCloseInfo}
                                id={selectedSkill.id}
                                label={selectedSkill.label}
                                description={selectedSkill.description}
                                isSelected={selectedSkills.includes(selectedSkill.id)}
                                addSkillId={addSkillId}
                                isProfile={true}
                            />
                        </div>
                        <div
                            className="skill-page-filler"
                            style={{
                                display: isSkillInfoVisible ? "none" : "block",
                            }}
                        ></div>
                    </>
                );
            case "skills":
                return (
                    <>
                        <Profile
                            userData={userData}
                            display_page={"skill-page"}
                        />
                        <SkillMap
                            initialSkillsData={initialSkillsData}
                            onSkillSelect={handleSkillSelect}
                        />
                        <div
                            style={{
                                display: isSkillInfoVisible ? "block" : "none",
                            }}
                        >
                            <SkillInfo
                                onClose={handleCloseInfo}
                                id={selectedSkill.id}
                                label={selectedSkill.label}
                                description={selectedSkill.description}
                                progress={selectedSkill.progress}
                                isAdmin={isAdmin}
                            />
                        </div>
                        <div
                            className="skill-page-filler"
                            style={{
                                display: isSkillInfoVisible ? "none" : "block",
                            }}
                        ></div>
                    </>
                );
            default:
                return <></>;
        }
    };

    return <div className="skill-page">{renderPage(pageToRender)}</div>;
};

export default SkillPage;

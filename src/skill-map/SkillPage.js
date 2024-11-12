import "./SkillPage.css";
import SkillAdminPanel from "./SkillAdminPanel";
import SkillMap from "./SkillMap";
import SkillInfo from "./SkillInfo";
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
    handleLinkToPosition,
    selectedPositionId
}) => {
    const [skillsData, setSkillsData] = useState({
        skillsWithCategory: [],
        skillsWithoutCategory: [],
    });
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

    const handleCloseInfo = () => setSkillInfoShown(false);

    const EditView = () => (
        <>
            <SkillAdminPanel
                fetchSkills={fetchSkills}
                onPageChange={onPageChange}
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
                <SkillInfo
                    onClose={handleCloseInfo}
                    id={selectedSkill.id}
                    name={selectedSkill.name}
                    description={selectedSkill.description}
                    isEdit={true}
                />
            )}
            <div className="skill-page-filler" hidden={isSkillInfoShown}></div>
        </>
    );

    const ProfileView = () => (
        <>
            <SkillMap
                initialSkillsData={skillsData}
                onSkillSelect={handleSkillSelect}
                selectedSkills={selectedSkills}
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
            <SkillMap
                initialSkillsData={skillsData}
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

    const PositionView = () => (
        <>
            <SkillMap
                initialSkillsData={skillsData}
                selectedSkills={selectedSkills}
                onSkillSelect={handleSkillSelect}
            />
            {isSkillInfoShown && (
                <SkillInfo
                    onClose={handleCloseInfo}
                    id={selectedSkill.id}
                    name={selectedSkill.name}
                    description={selectedSkill.description}
                    isSelected={selectedSkills?.includes(selectedSkill.id)}
                    addSkillId={handleLinkToPosition}
                    selectedPositionId={selectedPositionId}
                />
            )}
            <div className="skill-page-filler" hidden={isSkillInfoShown}></div>
        </>
    )

    const renderPage = (page) => {
        switch (page) {
            case "edit":
                return <EditView />;
            case "profile":
                return <ProfileView />;
            case "skills":
                return <SkillsView />;
            case "position": 
                return <PositionView />
            default:
                return null;
        }
    };

    return <div className="skill-page">{renderPage(pageToRender)}</div>;
};

export default SkillPage;

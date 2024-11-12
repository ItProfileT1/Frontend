import React from "react";
import "./SkillElement.css";

const SkillContainer = ({
    skillsWithCategory,
    skillsWithoutCategory,
    selectedSkills,
    onSkillSelect,
    isEdit,
}) => {
    if (!skillsWithCategory || !skillsWithoutCategory) return <></>;

    const renderSkills = (skills, categoryName) => (
        <div className="skills-column">
            {categoryName && (
                <div className="blue-button skill-parent-label">
                    {categoryName}
                </div>
            )}
            {skills.map((skill) => (
                <SkillElement
                    key={skill.id}
                    {...skill}
                    onSkillClick={onSkillSelect}
                    isEdit={isEdit}
                    selectedSkills={selectedSkills}
                />
            ))}
        </div>
    );

    return (
        <div className="skills-container">
            {skillsWithCategory.map((instance) =>
                renderSkills(
                    instance.skillResponses,
                    instance.categoryResponse.name
                )
            )}

            {skillsWithoutCategory.length > 0 &&
                renderSkills(skillsWithoutCategory, "Без категории")}
        </div>
    );
};

const SkillElement = ({
    id,
    name,
    progress,
    description,
    onSkillClick,
    isEdit,
    selectedSkills,
}) => {
    const handleClick = () => {
        onSkillClick(id, name, description, progress);
    };

    const renderSkillLevels = (levels) =>
        Array.from({ length: levels }, (_, i) => (
            <div key={i} className={`skill-level skill-level-${levels}`} />
        ));

    const isSelected = selectedSkills?.includes(id);
    const isRegister =
        localStorage.getItem("currentPage") === "register-profile";
    const isPosition = localStorage.getItem("currentPage") === "position";

    return (
        <div
            className={`blue-button skill-element ${
                isSelected ? "user-selected-skill" : ""
            }`}
            id={id}
            onClick={handleClick}
        >
            {!isEdit && !isRegister && !isPosition && (
                <div className="skill-level-container">
                    {renderSkillLevels(Math.max(1, progress))}
                </div>
            )}
            <div className="skill-label">{name}</div>
        </div>
    );
};

export default SkillContainer;

import React from 'react';
import SkillElement from './SkillElement';

const SkillContainer = ({ skillsData, onSkillSelect, isEdit }) => {
    return (
        <div className="skills-container">
            {skillsData.map((instance) => (
                <SkillCategory 
                    key={instance.categoryResponse.id} 
                    instance={instance} 
                    onSkillSelect={onSkillSelect} 
                    isEdit={isEdit} 
                />
            ))}
        </div>
    );
};

const SkillCategory = ({ instance, onSkillSelect, isEdit }) => {
    return (
        <div className="skills-column">
            <div className="blue-button skill-parent-label">{instance.categoryResponse.name}</div>
            {instance.skillResponses.map((skill) => (
                <SkillElement 
                    key={skill.id} 
                    id={skill.id} 
                    label={skill.name} 
                    progress={skill.progress} 
                    description={skill.description} 
                    onSkillClick={onSkillSelect} 
                    isEdit={isEdit} 
                />
            ))}
        </div>
    );
};

export default SkillContainer;
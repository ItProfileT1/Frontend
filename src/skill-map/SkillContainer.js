import React from 'react';
import SkillElement from './SkillElement';

const SkillContainer = ({ skills_data, onSkillSelect, isEdit }) => {
    return (
        <div className="skills-container">
            {skills_data.map((instance) => (
                <SkillCategory 
                    key={instance.category.id} 
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
            <div className="blue-button skill-parent-label">{instance.category.label}</div>
            {instance.skills.map((skill) => (
                <SkillElement 
                    key={skill.id} 
                    id={skill.id} 
                    label={skill.label} 
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
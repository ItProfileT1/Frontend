import React from 'react';
import SkillElement from './SkillElement';

const SkillContainer = ({ skillsWithCategory, skillsWithoutCategory, onSkillSelect, isEdit }) => {
    return (
        <div className="skills-container">
            {/* Отображаем навыки с категориями, если такие есть */}
            {skillsWithCategory.length > 0 && skillsWithCategory.map((instance) => (
                <SkillCategory 
                    key={instance.categoryResponse.id} 
                    instance={instance} 
                    onSkillSelect={onSkillSelect} 
                    isEdit={isEdit} 
                />
            ))}

            {/* Отображаем навыки без категории, если такие есть */}
            {skillsWithoutCategory.length > 0 && (
                <div className="skills-column">
                    <div className="blue-button skill-parent-label">Без категории</div>
                    {skillsWithoutCategory.map((skill) => (
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
            )}
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

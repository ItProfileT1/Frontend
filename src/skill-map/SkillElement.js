import './SkillElement.css';

const SkillElement = ({ id, label, progress, description, onSkillClick, isEdit }) => {
    const handleClick = () => {
        onSkillClick(id, label, description, progress);
    };

    const renderSkillLevels = () => {
        const numberOfLevels = progress >= 2 ? progress : 1;
        return Array.from({ length: numberOfLevels }, (_, i) => (
            <div 
                key={i} 
                className={`skill-level ${progress !== null ? `skill-level-${progress}` : ''}`} 
            />
        ));
    };

    return (
        <div 
            className="blue-button skill-element" 
            id={id} 
            onClick={handleClick}
        >
            {!isEdit && <div className="skill-level-container">{renderSkillLevels()}</div>}
            <div className="skill-label">{label}</div>
        </div>
    );
};

export default SkillElement;
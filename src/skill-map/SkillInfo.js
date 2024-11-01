import './SkillInfo.css';

const SkillInfo = ({ id, label, description, progress, onClose, isAdmin }) => {
    const handleClick = () => {
        
    };

    const renderProgress = () => {
        if (progress !== null) {
            return (
                <div className="block-with-line">
                    <div style={{ fontWeight: 100 }}>Текущий уровень</div>
                    <div className="line"></div>
                    <div className="skill-info-progress">{progress}</div>
                </div>
            );
        } else {
            return <div className="skill-info-noscore">Не оценено</div>;
        }
    };

    const renderButtonLabel = () => {
        if (isAdmin) {
            return 'Провести оценку';
        }
        return progress !== null ? 'Поднять' : 'Оценить';
    };

    return (
        <div className="skill-info">
            <div>
                <div className="skill-info-close">
                    <img 
                        src={`${process.env.PUBLIC_URL}/assets/close.svg`} 
                        alt="Close" 
                        onClick={onClose} 
                    />
                </div>
                <div className="skill-info-name">{label}</div>
                <textarea className="skill-info-description" value={description || ''} readOnly></textarea>
                {renderProgress()}
            </div>
            <div>
                <button 
                    className="blue-button" 
                    onClick={handleClick}
                >
                    {renderButtonLabel()}
                </button>
            </div>
        </div>
    );
};


export default SkillInfo;
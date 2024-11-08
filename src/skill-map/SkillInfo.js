import "./SkillInfo.css";

const SkillInfo = ({
    id,
    name,
    description,
    progress,
    onClose,
    isSelected,
    addSkillId,
}) => {
    const isAdmin = localStorage.getItem("userRole") === "ROLE_ADMIN";
    const isProfile = localStorage.getItem("currentPage") === "register-profile"; 

    const handleClick = () => { addSkillId(id) };
    const renderProgress = () => {
        if (isProfile) return;
        if (progress !== undefined) {
            return (
                <div className="block-with-line">
                    <div style={{ fontWeight: 700 }}>Текущий уровень</div>
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
            return "Провести оценку";
        }
        if (isProfile) {
            return isSelected ? 'Удалить' : 'Добавить';
        }
        return progress !== null ? "Поднять" : "Оценить";
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
                <div className="skill-info-name">{name}</div>
                <textarea
                    className="skill-info-description"
                    value={description || ""}
                    readOnly
                ></textarea>
                {renderProgress()}
            </div>
            <div>
                <button className="blue-button" onClick={handleClick}>
                    {renderButtonLabel()}
                </button>
            </div>
        </div>
    );
};

export default SkillInfo;

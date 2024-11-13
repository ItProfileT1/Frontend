import "./SkillInfo.css";

const SkillInfo = ({
    id,
    name,
    description,
    progress,
    onClose,
    isSelected,
    isEdit,
    addSkillId,
    selectedPositionId,
}) => {
    const isProfile =
        localStorage.getItem("currentPage") === "register-profile";
    const isPosition = localStorage.getItem("currentPage") === "position";
    if (!selectedPositionId) selectedPositionId = "none";

    const handleSkillToggle = () => {
        addSkillId(id);
    };

    const renderProgress = () => {
        if (isProfile) return null;
        
        if  (progress === null) return; 
        else if (progress !== undefined) {
            return (
                <div className="block-with-line">
                    <div style={{ fontWeight: 700 }}>Текущий уровень</div>
                    <div className="line"></div>
                    <div className="skill-info-progress">{progress}</div>
                </div>
            );
        }

        if (isEdit || isPosition) return null;

        return <div className="skill-info-noscore">Не оценено</div>;
    };

    const getButtonLabel = () => {
        if (isPosition) return "Добавить";
        if (isProfile) return isSelected ? "Удалить" : "Добавить";
        return null;
    };

    const shouldRenderButton =
        isProfile ||
        ((isPosition ? !isSelected : true) && selectedPositionId !== "none");

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
                {shouldRenderButton && (
                    <button className="blue-button" onClick={handleSkillToggle}>
                        {getButtonLabel()}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SkillInfo;

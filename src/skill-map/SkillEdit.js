import "./SkillEdit.css";
import { useState, useEffect } from "react";

const SkillEdit = ({ id, name, description, onClose, onSave }) => {
    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(
        description || ""
    );

    useEffect(() => {
        setEditedName(name);
        setEditedDescription(description || "");
    }, [name, description]);

    const handleSaveClick = () => {
        onSave({
            skillId: id,
            name: editedName,
            description: editedDescription,
        });
        onClose();
    };

    return (
        <div className="skill-edit">
            <div>
                <div className="skill-edit-close">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/close.svg`}
                        alt=""
                        onClick={onClose}
                    />
                </div>
                <div>
                    <span>Редактирование навыка</span>
                </div>
                <div>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        maxLength={30}
                        placeholder="Название навыка"
                    />
                </div>
                <div>
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Описание навыка"
                    />
                </div>
            </div>
            <div>
                <button className="blue-button" onClick={handleSaveClick}>
                    Подтвердить
                </button>
            </div>
        </div>
    );
};

export default SkillEdit;

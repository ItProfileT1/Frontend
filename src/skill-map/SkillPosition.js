import { React, useState, useEffect } from "react";
import InputBlock from "../auth/InputBlock";
import SkillPage from "./SkillPage";
import "./SkillPosition.css";

const SkillPosition = ({ onPageChange, fetchSkills }) => {
    const [positions, setPositions] = useState([]);
    const [positionNames, setPositionNames] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState({});
    const [skillType, setSkillType] = useState("Hard");
    const [hardSkills, setHardSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState([]);
    const [selectedPositionId, setSelectedPositionId] = useState("none");
    const [positionInput, setPositionInput] = useState({
        add: "",
        deleteConfirm: "",
    });

    useEffect(() => {
        fetchPositions();
    }, []);

    useEffect(() => {
        fetchSkillData();
    }, []);

    const fetchPositions = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/positions", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении позиций");
            }

            const data = await response.json();
            const positionNames = [
                { id: "none", name: "Выберите должность" },
                ...data,
            ].sort((a, b) => (a.id === "none" ? -1 : b.id === "none" ? 1 : a.id - b.id));

            const selectedSkills = data.reduce((acc, position) => {
                acc[position.id] = position.skillResponses.map((skill) => skill.id);
                return acc;
            }, {});

            setPositions(data);
            setPositionNames(positionNames);
            setSelectedSkills(selectedSkills);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSkillData = async () => {
        const hardSkillsData = await fetchSkills("Hard");
        const softSkillsData = await fetchSkills("Soft");
        setHardSkills(hardSkillsData);
        setSoftSkills(softSkillsData);
    };

    const handlePositionChange = (e) => setSelectedPositionId(e.target.value);

    const handleSkillTypeChange = (e) => setSkillType(e.target.value);

    const handleAddPosition = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/positions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: positionInput.add }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при добавлении должности");
            }

            const newPosition = await response.json();
            setPositionNames((prev) => [...prev, { id: newPosition.id, name: newPosition.name }]);
            setPositionInput((prev) => ({ ...prev, add: "" }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletePosition = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/positions/${selectedPositionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении должности");
            }

            setPositionNames((prev) => prev.filter((p) => p.id !== parseInt(selectedPositionId)));
            setSelectedPositionId("none");
            setPositionInput((prev) => ({ ...prev, deleteConfirm: "" }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLinkToPosition = async (skillId) => {
        if (
            selectedPositionId === "none" ||
            selectedSkills[selectedPositionId]?.includes(skillId)
        ) {
            return;
        }

        try {
            const url = `http://localhost:8080/api/v1/positions/${selectedPositionId}/skills`;
            const authToken = localStorage.getItem("authToken");
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([skillId]),
            });

            if (response.ok) {
                setSelectedSkills((prev) => ({
                    ...prev,
                    [selectedPositionId]: [
                        ...(prev[selectedPositionId] || []),
                        skillId,
                    ],
                }));
            } else {
                console.error("Ошибка при добавлении/удалении навыка.");
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
        }
    };

    const skillsData = skillType === "Hard" ? hardSkills : softSkills;

    return (
        <div className="skill-position">
            <div className="skill-position-menu">
                <div className="skill-position-menu-block">
                    <InputBlock id="position" data={positionNames} onChange={handlePositionChange} />
                    <InputBlock id="skills" value={skillType} onChange={handleSkillTypeChange} />
                </div>

                <PositionActions
                    positionInput={positionInput}
                    setPositionInput={setPositionInput}
                    handleAddPosition={handleAddPosition}
                    handleDeletePosition={handleDeletePosition}
                    selectedPositionId={selectedPositionId}
                    positionNames={positionNames}
                />

                <button className="blue-button" onClick={() => onPageChange("main")}>
                    На главную
                </button>
            </div>

            <SkillPage
                pageToRender="position"
                initialSkillsData={skillsData}
                selectedSkills={selectedSkills[selectedPositionId]}
                handleLinkToPosition={handleLinkToPosition} 
                selectedPositionId={selectedPositionId}
            />
        </div>
    );
};

const PositionActions = ({
    positionInput,
    setPositionInput,
    handleAddPosition,
    handleDeletePosition,
    selectedPositionId,
    positionNames,
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPositionInput((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="skill-position-menu-block">
            <div className="skill-position-menu-block">
                <div>
                    <span>Добавить должность</span>
                </div>
                <input
                    type="text"
                    name="add"
                    value={positionInput.add}
                    onChange={handleInputChange}
                    placeholder="Название должности"
                />
                <button className="blue-button" onClick={handleAddPosition}>
                    Добавить
                </button>
            </div>

            <div className="skill-position-menu-block">
                <div>
                    <span>Удалить текущую</span>
                </div>
                <input
                    type="text"
                    name="deleteConfirm"
                    value={positionInput.deleteConfirm}
                    onChange={handleInputChange}
                    placeholder="Название для подтверждения"
                />
                <button
                    className="blue-button"
                    onClick={handleDeletePosition}
                    disabled={positionInput.deleteConfirm !== positionNames.find((p) => p.id === parseInt(selectedPositionId))?.name}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default SkillPosition;

import React, { useState, useEffect, useCallback } from "react";
import "./MasterWorkersList.css";

const MasterWorkersList = ({ onPageChange }) => {
    const [workers, setWorkers] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [skills, setSkills] = useState([]);
    const [assessors, setAssessors] = useState([]);
    const [skillsIds, setSkillsIds] = useState([]);
    const [assessorsIds, setAssessorsIds] = useState([]);
    const [skillsType, setSkillsType] = useState(null);
    console.log(localStorage.getItem('authToken'))
    const workersData = {}; 

    useEffect(() => {
        const fetchWorkers = async () => {
            const url = "http://localhost:8080/api/v1/specialists";
            const authToken = localStorage.getItem("authToken");

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok)
                    throw new Error("Ошибка при загрузке списка специалистов");

                const data = await response.json();

                data.forEach((worker) => {
                    workersData[worker.id] = {
                        hard: worker.skillLevelResponses
                            .filter((skill) => skill.skill.type.name === "Hard")
                            .map((skill) => ({
                                id: skill.skill.id,
                                category: skill.skill.category
                                    ? skill.skill.category.name
                                    : "Без категории",
                                name: skill.skill.name,
                                level: skill.level
                                    ? skill.level.numericValue
                                    : "не оценено",
                            })),
                        soft: worker.skillLevelResponses
                            .filter((skill) => skill.skill.type.name === "Soft")
                            .map((skill) => ({
                                id: skill.skill.id,
                                category: skill.skill.category
                                    ? skill.skill.category.name
                                    : "Без категории",
                                name: skill.skill.name,
                                level: skill.level
                                    ? skill.level.numericValue
                                    : "не оценено",
                            })),
                        assessors: data.filter((w) => w.id !== worker.id), 
                    };
                });

                setWorkers(data); 
            } catch (error) {
                console.error("Ошибка при загрузке списка специалистов", error);
            }
        };

        fetchWorkers();
    }, []);

    const fetchSkills = useCallback((type, workerId) => {
        setSkillsType(type);
        const workerSkills = workersData[workerId]; 
        setSkills(workerSkills ? workerSkills[type.toLowerCase()] : []);
        setAssessors(workerSkills ? workerSkills.assessors : []);
        setSelectedWorker(workerId);
        setSkillsIds([]);
    }, []);

    const toggleSkill = (id) => {
        setSkillsIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((skillId) => skillId !== id)
                : [...prevIds, id]
        );
    };

    const toggleAssessor = (id) => {
        setAssessorsIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((assessorId) => assessorId !== id)
                : [...prevIds, id]
        );
    };

    const handleAssignAssessment = async () => {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 1);
        const formattedDeadline = deadline.toISOString();

        const requestData = {
            specialistId: selectedWorker,
            deadline: formattedDeadline,
            assessorsIds: assessorsIds,
            skillsIds: skillsIds,
        };

        const url = "http://localhost:8080/api/v1/assessment-processes";
        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) throw new Error("Ошибка при назначении оценки");

            setSelectedWorker(null);
            setSkills([]);
            setAssessors([]);
            setSkillsIds([]);
            setAssessorsIds([]);
            setSkillsType(null);
        } catch (error) {
            console.error("Ошибка при назначении оценки", error);
        }
    };

    const dimensions = {
        name: "200px",
        skill: "200px",
    };

    return (
        <div className="master-workers-list-page">
            <div>
                <div className="master-workers-list">
                    <div>
                        <span>Список сотрудников</span>
                    </div>
                    <div className="master-workers-list-static">
                        <div style={{ width: dimensions.name }}>Cотрудник</div>
                        <div style={{ width: dimensions.skill }}>
                            Отобразить навыки
                        </div>
                    </div>
                    <div
                        className="master-workers-list-scrollable"
                        style={{ width: "100%" }}
                    >
                        <div className="master-workers-list-wrapper">
                            {workers.map((worker) => (
                                <div
                                    className="master-worker-elem"
                                    key={`worker-${worker.id}`}
                                >
                                    <div
                                        style={{
                                            width: dimensions.name,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {worker.name} <br />
                                        {worker.surname}
                                    </div>
                                    <div
                                        style={{ width: dimensions.skill }}
                                        className="master-worker-list-button-wrapper"
                                    >
                                        <button
                                            className="blue-button"
                                            onClick={() =>
                                                fetchSkills("Hard", worker.id)
                                            }
                                        >
                                            Hard
                                        </button>
                                        <button
                                            className="blue-button"
                                            onClick={() =>
                                                fetchSkills("Soft", worker.id)
                                            }
                                        >
                                            Soft
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedWorker && (
                    <div className="master-worker-skills-list">
                        <div>
                            <span>{skillsType} навыки</span>
                        </div>
                        <div className="master-worker-skills-list-static">
                            <div>Категория - Навык (Уровень)</div>
                        </div>
                        <div
                            className="master-worker-skills-list-scrollable"
                            style={{ width: "100%" }}
                        >
                            <div className="master-worker-skills-list-wrapper">
                                {skills.map((skill, index) => (
                                    <div
                                        className={`master-worker-skill-elem ${
                                            skillsIds.includes(skill.id)
                                                ? "master-list-checked"
                                                : ""
                                        }`}
                                        key={`skill-${selectedWorker}-${skill.id}-${index}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={skillsIds.includes(
                                                skill.id
                                            )}
                                            onChange={() =>
                                                toggleSkill(skill.id)
                                            }
                                        />
                                        <span>
                                            {skill.category} - {skill.name}{" "}
                                            (Уровень: {skill.level})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {selectedWorker && (
                    <div className="master-assessors-list">
                        <div>
                            <span>Оценивающие сотрудники</span>
                        </div>
                        <div className="master-assessors-list-static">
                            <div>Сотрудник</div>
                        </div>
                        <div
                            className="master-assessors-list-scrollable"
                            style={{ width: "100%" }}
                        >
                            <div className="master-assessors-list-wrapper">
                                {assessors.map((assessor, index) => (
                                    <div
                                        className={`master-assessors-elem ${
                                            assessorsIds.includes(assessor.id)
                                                ? "master-list-checked"
                                                : ""
                                        }`}
                                        key={`assessor-${assessor.id}-${index}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={assessorsIds.includes(
                                                assessor.id
                                            )}
                                            onChange={() =>
                                                toggleAssessor(assessor.id)
                                            }
                                        />
                                        <span>
                                            {assessor.name} {assessor.surname}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="master-list-button-wrapper">
                <button
                    className="blue-button"
                    onClick={() => onPageChange("main")}
                >
                    На главную
                </button>
                {selectedWorker && (
                    <button
                        className="blue-button"
                        onClick={handleAssignAssessment}
                    >
                        Назначить оценку
                    </button>
                )}
            </div>
        </div>
    );
};

export default MasterWorkersList;

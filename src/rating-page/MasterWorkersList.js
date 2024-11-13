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

    const authToken = localStorage.getItem("authToken");
    const workersData = {};

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/v1/specialists",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                if (!response.ok) throw new Error("Error loading worker list");

                const data = await response.json();
                data.forEach((worker) => {
                    workersData[worker.id] = {
                        hard: formatSkills(worker.skillLevelResponses, "Hard"),
                        soft: formatSkills(worker.skillLevelResponses, "Soft"),
                        assessors: data.filter((w) => w.id !== worker.id),
                    };
                });
                setWorkers(data);
            } catch (error) {
                console.error("Error loading worker list", error);
            }
        };
        fetchWorkers();
    }, []);

    const formatSkills = (skills, type) => {
        return skills
            .filter((skill) => skill.skill.type.name === type)
            .map((skill) => ({
                id: skill.skill.id,
                category: skill.skill.category
                    ? skill.skill.category.name
                    : "No category",
                name: skill.skill.name,
                level: skill.level ? skill.level.numericValue : "Not rated",
            }));
    };

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

        const requestData = {
            specialistId: selectedWorker,
            deadline: deadline.toISOString(),
            assessorsIds,
            skillsIds,
        };

        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/assessment-processes",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );

            if (!response.ok) throw new Error("Error assigning assessment");

            resetSelections();
        } catch (error) {
            console.error("Error assigning assessment", error);
        }
    };

    const resetSelections = () => {
        setSelectedWorker(null);
        setSkills([]);
        setAssessors([]);
        setSkillsIds([]);
        setAssessorsIds([]);
        setSkillsType(null);
    };

    const dimensions = { name: "200px", skill: "200px" };

    return (
        <div className="master-workers-list-page">
            <div>
                <WorkerList
                    workers={workers}
                    dimensions={dimensions}
                    fetchSkills={fetchSkills}
                />
                {selectedWorker && (
                    <>
                        <SkillsList
                            skills={skills}
                            skillsIds={skillsIds}
                            skillsType={skillsType}
                            toggleSkill={toggleSkill}
                        />
                        <AssessorList
                            assessors={assessors}
                            assessorsIds={assessorsIds}
                            toggleAssessor={toggleAssessor}
                        />
                    </>
                )}
            </div>
            <div>
                <NavigationButtons
                    onPageChange={onPageChange}
                    onAssign={handleAssignAssessment}
                    hasSelection={!!selectedWorker}
                />
            </div>
        </div>
    );
};

const WorkerList = ({ workers, dimensions, fetchSkills }) => (
    <div className="master-workers-list">
        <div>
            <span>Список сотрудников</span>
        </div>
        <div className="master-workers-list-static">
            <div style={{ width: dimensions.name }}>Сотрудник</div>
            <div style={{ width: dimensions.skill }}>Отобразить навыки</div>
        </div>
        <div
            className="master-workers-list-scrollable"
            style={{ width: "100%" }}
        >
            <div className="master-workers-list-wrapper">
                {workers.map((worker) => (
                    <div className="master-worker-elem" key={worker.id}>
                        <div
                            style={{
                                width: dimensions.name,
                                textTransform: "capitalize",
                            }}
                        >
                            {worker.name} <br /> {worker.surname}
                        </div>
                        <div
                            style={{ width: dimensions.skill }}
                            className="master-worker-list-button-wrapper"
                        >
                            <button
                                className="blue-button"
                                onClick={() => fetchSkills("Hard", worker.id)}
                            >
                                Hard
                            </button>
                            <button
                                className="blue-button"
                                onClick={() => fetchSkills("Soft", worker.id)}
                            >
                                Soft
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const SkillsList = ({ skills, skillsIds, skillsType, toggleSkill }) => (
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
                {skills.map((skill) => (
                    <div
                        className={`master-worker-skill-elem ${
                            skillsIds.includes(skill.id)
                                ? "master-list-checked"
                                : ""
                        }`}
                        key={skill.id}
                    >
                        <input
                            type="checkbox"
                            checked={skillsIds.includes(skill.id)}
                            onChange={() => toggleSkill(skill.id)}
                        />
                        <span>
                            {skill.category} - {skill.name} (Уровень:{" "}
                            {skill.level})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AssessorList = ({ assessors, assessorsIds, toggleAssessor }) => (
    <div className="master-assessors-list">
        <div>
            <span>Оценивающие сотрудники</span>
        </div>
        <div className="master-assessors-list-static">
            <div>Сотрудники</div>
        </div>
        <div
            className="master-assessors-list-scrollable"
            style={{ width: "100%" }}
        >
            <div className="master-assessors-list-wrapper">
                {assessors.map((assessor) => (
                    <div
                        className={`master-assessors-elem ${
                            assessorsIds.includes(assessor.id)
                                ? "master-list-checked"
                                : ""
                        }`}
                        key={assessor.id}
                    >
                        <input
                            type="checkbox"
                            checked={assessorsIds.includes(assessor.id)}
                            onChange={() => toggleAssessor(assessor.id)}
                        />
                        <span>
                            {assessor.name} {assessor.surname}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const NavigationButtons = ({ onPageChange, onAssign, hasSelection }) => (
    <div className="master-list-button-wrapper">
        <button className="blue-button" onClick={() => onPageChange("main")}>
            На главную
        </button>
        {hasSelection && (
            <button className="blue-button" onClick={onAssign}>
                Назначить оценку
            </button>
        )}
    </div>
);

export default MasterWorkersList;

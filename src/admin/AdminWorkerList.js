import React, { useState, useEffect, useCallback } from 'react';
import "./AdminWorkerList.css";

const AdminWorkersList = ({ onPageChange }) => {
    const [workers, setWorkers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            const url = 'http://localhost:8080/api/v1/specialists';
            const authToken = localStorage.getItem("authToken");

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("Ошибка при загрузке списка специалистов");
                }

                const data = await response.json();
                setWorkers(data);
            } catch (error) {
                console.error("Ошибка при загрузке списка специалистов", error);
                setError("Ошибка при загрузке списка специалистов");
            }
        };

        fetchWorkers();
    }, []);

    const fetchSkills = useCallback(async (type, skillLevels = []) => {
        const url = `http://localhost:8080/api/v1/skills?type=${type}`;
        const authToken = localStorage.getItem("authToken");

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при загрузке навыков");
            }

            const data = await response.json();

            const transformSkillsData = async (skillsData) => {
                const skillsWithCategory = {};
                const skillsWithoutCategory = [];

                skillsData.forEach((skill) => {
                    const skillLevel = skillLevels.find(sl => sl.skill.id === skill.id);
                    const progress = skillLevel ? skillLevel.level?.numericValue : null;

                    if (skill.category && skill.category.id !== null) {
                        const categoryId = skill.category.id;
                        if (!skillsWithCategory[categoryId]) {
                            skillsWithCategory[categoryId] = {
                                categoryResponse: {
                                    id: skill.category.id,
                                    name: skill.category.name,
                                },
                                skillResponses: [],
                            };
                        }
                        skillsWithCategory[categoryId].skillResponses.push({
                            id: skill.id,
                            name: skill.name,
                            description: skill.description,
                            progress: progress,
                        });
                    } else {
                        skillsWithoutCategory.push({
                            id: skill.id,
                            name: skill.name,
                            description: skill.description,
                            progress: progress,
                        });
                    }
                });

                Object.keys(skillsWithCategory).forEach((categoryId) => {
                    skillsWithCategory[categoryId].skillResponses.sort((a, b) => a.id - b.id);
                });

                skillsWithoutCategory.sort((a, b) => a.id - b.id);

                return {
                    skillsWithCategory: Object.values(skillsWithCategory),
                    skillsWithoutCategory,
                };
            };
            return await transformSkillsData(data);
        } catch (error) {
            console.error("Ошибка при получении навыков:", error);
        }
    }, []);

    const handleSkillsView = async (type, worker) => {
        const skillsData = await fetchSkills(type, worker.skillLevelResponses);

        const userData = {
            name: worker.name || "Не указано", 
            surname: worker.surname || "Не указано", 
            positionResponse: {name: worker.positionResponse ? worker.positionResponse.name : "Не указана"}, 
        };

        const data = {
            initialSkillsData: skillsData,
            pageToRender: "skills",
            typeId: type,
            userData: userData,
        };

        console.log(data)
        onPageChange("skill", data);
    };

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className="admin-workers-list">
            {workers.map((worker) => (
                <div key={worker.id} className="worker-card">
                    <div>Имя: {worker.name || "Не указано"}</div>
                    <div>Фамилия: {worker.surname || "Не указано"}</div>
                    <button onClick={() => handleSkillsView("Hard", worker)}>Посмотреть Hard навыки</button>
                    <button onClick={() => handleSkillsView("Soft", worker)}>Посмотреть Soft навыки</button>
                </div>
            ))}
            <button onClick={() => onPageChange("main")}>На главную</button>
        </div>
    );
};

export default AdminWorkersList;

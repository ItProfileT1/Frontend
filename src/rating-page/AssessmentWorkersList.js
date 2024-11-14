import React, { useEffect, useState } from "react";
import "./AssessmentWorkersList.css";

const sampleAssessments = [
    {
        id: 1,
        createdAt: "2024-11-13T19:29:17.180Z",
        deadline: "2024-11-13T19:29:17.180Z",
        specialist: {
            id: 1,
            surname: "Doe",
            name: "John",
            patronymic: "Alexandrovich",
            birthday: "1990-05-23",
            sex: "Male",
            city: "New York",
        },
    },
    {
        id: 2,
        createdAt: "2024-11-13T19:30:17.180Z",
        deadline: "2024-11-20T19:29:17.180Z",
        specialist: {
            id: 2,
            surname: "Smith",
            name: "Anna",
            patronymic: "Ivanovna",
            birthday: "1988-08-14",
            sex: "Female",
            city: "Los Angeles",
        },
    },
    {
        id: 3,
        createdAt: "2024-11-14T19:29:17.180Z",
        deadline: "2024-11-21T19:29:17.180Z",
        specialist: {
            id: 3,
            surname: "Johnson",
            name: "Emily",
            patronymic: "Petrovna",
            birthday: "1992-09-03",
            sex: "Female",
            city: "Chicago",
        },
    },
    {
        id: 4,
        createdAt: "2024-11-15T19:29:17.180Z",
        deadline: "2024-11-22T19:29:17.180Z",
        specialist: {
            id: 4,
            surname: "Brown",
            name: "Michael",
            patronymic: "Fedorovich",
            birthday: "1985-04-18",
            sex: "Male",
            city: "Houston",
        },
    },
    {
        id: 5,
        createdAt: "2024-11-16T19:29:17.180Z",
        deadline: "2024-11-23T19:29:17.180Z",
        specialist: {
            id: 5,
            surname: "Taylor",
            name: "Sophia",
            patronymic: "Dmitrievna",
            birthday: "1995-12-11",
            sex: "Female",
            city: "Phoenix",
        },
    },
];

const sampleSkillsResponse = {
    totalPages: 0,
    totalElements: 5,
    pageable: {
        pageNumber: 0,
        paged: true,
        pageSize: 5,
        unpaged: false,
        offset: 0,
        sort: {
            sorted: true,
            unsorted: false,
            empty: false,
        },
    },
    first: true,
    last: true,
    numberOfElements: 5,
    size: 5,
    content: [
        {
            skill: {
                id: 1,
                name: "Новый проект ждёт ваше участие",
                description: "Effective communication skills",
                question: "How do you rate your communication?",
                type: { id: 1, name: "Soft Skill" },
                category: {
                    id: 1,
                    name: "Interpersonal",
                    typeResponse: { id: 1, name: "Rating" },
                },
            },
            rates: [{ id: 1, description: "Above Average" }],
        },
        {
            skill: {
                id: 2,
                name: "Problem Solving",
                description: "Ability to solve problems effectively",
                question: "How do you approach problems?",
                type: { id: 2, name: "Hard Skill" },
                category: {
                    id: 2,
                    name: "Analytical",
                    typeResponse: { id: 2, name: "Rating" },
                },
            },
            rates: [{ id: 2, description: "Excellent" }],
        },
        {
            skill: {
                id: 3,
                name: "Leadership",
                description: "Ability to lead teams",
                question: "How do you lead a team?",
                type: { id: 3, name: "Soft Skill" },
                category: {
                    id: 3,
                    name: "Management",
                    typeResponse: { id: 3, name: "Rating" },
                },
            },
            rates: [{ id: 3, description: "Good" }],
        },
        {
            skill: {
                id: 4,
                name: "Technical Knowledge",
                description: "Understanding of technical processes",
                question: "How deep is your technical expertise?",
                type: { id: 4, name: "Hard Skill" },
                category: {
                    id: 4,
                    name: "Technical",
                    typeResponse: { id: 4, name: "Rating" },
                },
            },
            rates: [{ id: 4, description: "Above Average" }],
        },
        {
            skill: {
                id: 5,
                name: "Time Management",
                description: "Efficient use of time",
                question: "How do you manage your time?",
                type: { id: 5, name: "Soft Skill" },
                category: {
                    id: 5,
                    name: "Organizational",
                    typeResponse: { id: 5, name: "Rating" },
                },
            },
            rates: [{ id: 5, description: "Excellent" }],
        },
    ],
    number: 0,
    sort: {
        sorted: true,
        unsorted: false,
        empty: false,
    },
    empty: false,
};

const sampleMasterSkillsResponse = [
    {
        skill: {
            id: 1,
            name: "Коммуникативные навыки",
            description: "Умение эффективно общаться",
            question: "Как вы оцениваете свои коммуникативные навыки?",
            type: {
                id: 1,
                name: "Soft Skill",
            },
            category: {
                id: 1,
                name: "Взаимодействие",
                typeResponse: {
                    id: 1,
                    name: "Оценка",
                },
            },
        },
        level: {
            id: 1,
            name: "Ниже среднего",
            numericValue: -1,
        },
        description: "Требует улучшения в общении",
        developmentWay: "Работать над навыками активного слушания",
        comments: ["Нуждается в улучшении невербальных навыков"],
    },
    {
        skill: {
            id: 2,
            name: "Решение проблем",
            description: "Способность эффективно решать задачи",
            question: "Как вы подходите к решению проблем?",
            type: {
                id: 2,
                name: "Hard Skill",
            },
            category: {
                id: 2,
                name: "Аналитика",
                typeResponse: {
                    id: 2,
                    name: "Оценка",
                },
            },
        },
        level: {
            id: 2,
            name: "Средний",
            numericValue: 2,
        },
        description: "Нуждается в большей структурированности подхода",
        developmentWay:
            "Изучить методы решения задач, такие как метод Декомпозиции",
        comments: ["Рекомендуется использовать больше анализа"],
    },
    {
        skill: {
            id: 3,
            name: "Лидерство",
            description: "Умение управлять командой",
            question: "Как вы оцениваете свои лидерские качества?",
            type: {
                id: 1,
                name: "Soft Skill",
            },
            category: {
                id: 3,
                name: "Управление",
                typeResponse: {
                    id: 1,
                    name: "Оценка",
                },
            },
        },
        level: {
            id: 3,
            name: "Хороший",
            numericValue: 3,
        },
        description: "Имеет уверенные лидерские качества",
        developmentWay: "Развивать навык делегирования задач",
        comments: ["Проявляет уверенность в управлении"],
    },
    {
        skill: {
            id: 4,
            name: "Технические знания",
            description: "Понимание технических процессов",
            question: "Как вы оцениваете свои технические знания?",
            type: {
                id: 2,
                name: "Hard Skill",
            },
            category: {
                id: 4,
                name: "Технические",
                typeResponse: {
                    id: 2,
                    name: "Оценка",
                },
            },
        },
        level: {
            id: 4,
            name: "Отлично",
            numericValue: 3,
        },
        description: "Отличные технические знания",
        developmentWay: "Продолжать изучение передовых технологий",
        comments: ["Уверенно разбирается в процессах"],
    },
    {
        skill: {
            id: 5,
            name: "Управление временем",
            description: "Эффективное использование времени",
            question: "Как вы оцениваете свой навык управления временем?",
            type: {
                id: 1,
                name: "Soft Skill",
            },
            category: {
                id: 5,
                name: "Организационные",
                typeResponse: {
                    id: 1,
                    name: "Оценка",
                },
            },
        },
        level: {
            id: 5,
            name: "Средний",
            numericValue: 0,
        },
        description: "Может улучшить планирование",
        developmentWay: "Работать над приоритизацией задач",
        comments: ["Иногда испытывает трудности с дедлайнами"],
    },
];

const getSelectClass = (selectedScore) => {
    switch (selectedScore) {
        case "-1":
            return "assessment-score-negative";
        case "0":
            return "assessment-score-zero";
        case "1":
        case "2":
        case "3":
            return `assessment-score-positive-${selectedScore}`;
        default:
            return "assessment-score-default";
    }
};

const AssessmentWorkersList = ({ onPageChange }) => {
    const [assessments, setAssessments] = useState(sampleAssessments);
    const [skills, setSkills] = useState([]);
    const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
    const [skillRatings, setSkillRatings] = useState({});
    const [allSkillsRated, setAllSkillsRated] = useState(false);

    const dimensions = { skill: "435px", score: "135px" };

    useEffect(() => {
        const fetchAssessments = async () => {
            const isMaster = localStorage.getItem("userRole") === "ROLE_MASTER";
            if (isMaster) {
                // try {
                //     const response = await fetch(
                //         `http://${localStorage.getItem("apiUrl")}:8080/api/v1/assessment-process/created`,
                //         {
                //             method: "GET",
                //             headers: {
                //                 Authorization: `Bearer ${authToken}`,
                //                 "Content-Type": "application/json",
                //             },
                //         }
                //     );
                //     const data = await response.json();
                //     setAssessments(data);
                // } catch (error) {
                //     console.error("Error fetching assessments:", error);
                // }
            } else {
                // try {
                //     const response = await fetch(
                //         `http://${localStorage.getItem("apiUrl")}:8080/api/v1/assessment-process`,
                //         {
                //             method: "GET",
                //             headers: {
                //                 Authorization: `Bearer ${authToken}`,
                //                 "Content-Type": "application/json",
                //             },
                //         }
                //     );
                //     const data = await response.json();
                //     setAssessments(data);
                // } catch (error) {
                //     console.error("Error fetching assessments:", error);
                // }
            }

            setAssessments(sampleAssessments);
        };

        fetchAssessments();
    }, []);

    const handleAssessmentClick = async (id) => {
        setSelectedAssessmentId(id);

        const isMaster = localStorage.getItem("userRole") === "ROLE_MASTER";
        if (isMaster) {
            // try {
            //     const response = await fetch(
            //         `http://${localStorage.getItem("apiUrl")}:8080/api/v1/assessment-process/${id}/results`,
            //         {
            //             method: "GET",
            //             headers: {
            //                 Authorization: `Bearer ${authToken}`,
            //                 "Content-Type": "application/json",
            //             },
            //         }
            //     );
            //     const data = await response.json();
            //     setSkills(data);

            // } catch (error) {
            //     console.error("Error fetching skills:", error);
            // }
            const updatedRatings = {};
            sampleMasterSkillsResponse.forEach((skill) => {
                updatedRatings[skill.skill.id] =
                    skill.level.numericValue.toString();
            });
            setSkills(sampleMasterSkillsResponse);
            setSkillRatings(updatedRatings);
            setAllSkillsRated(true);
        } else {
            // try {
            //     const response = await fetch(
            //         `http://${localStorage.getItem("apiUrl")}:8080/api/v1/assessment-process/${id}`,
            //         {
            //             method: "GET",
            //             headers: {
            //                 Authorization: `Bearer ${authToken}`,
            //                 "Content-Type": "application/json",
            //             },
            //         }
            //     );
            //     const data = await response.json();
            //     setSkills(data.content);
            // } catch (error) {
            //     console.error("Error fetching skills:", error);
            // }
            setSkills(sampleSkillsResponse.content);
            setSkillRatings({});
            setAllSkillsRated(false);
        }
    };

    const handleSelectChange = (skillId, rate) => {
        setSkillRatings((prevRatings) => {
            const updatedRatings = { ...prevRatings, [skillId]: rate };

            const allRated = skills.every(
                (skill) =>
                    updatedRatings[skill.skill.id] &&
                    updatedRatings[skill.skill.id] !== "Не выбрано"
            );
            setAllSkillsRated(allRated);

            return updatedRatings;
        });
    };

    const handleSubmitRatings = async () => {
        const assessorSkillRates = Object.entries(skillRatings).map(
            ([skillId, rateId]) => ({
                skillId: parseInt(skillId, 10),
                rateId: parseInt(rateId, 10),
                comment: "",
            })
        );
        return console.log(assessorSkillRates);

        try {
            const response = await fetch(
                `http://${localStorage.getItem("apiUrl")}:8080/api/v1/assessment-process/${selectedAssessmentId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ assessorSkillRates }),
                }
            );

            if (response.ok) {
                onPageChange("main");
            } else {
                console.error("Ошибка:", response.status);
            }
        } catch (error) {
            console.error("Ошибка отправки оценок:", error);
        }
    };

    return (
        <div className="assessment-workers-list-page">
            <div>
                <div className="assessment-workers-list">
                    <div>
                        <span>Список сотрудников на оценку</span>
                    </div>
                    <div className="assessment-workers-list-static">
                        <div>Сотрудник</div>
                    </div>
                    <div
                        className="assessment-workers-list-scrollable"
                        style={{ width: "100%" }}
                    >
                        <div className="assessment-workers-list-wrapper">
                            {assessments.map((assessment) => (
                                <div
                                    key={assessment.id}
                                    id={assessment.id}
                                    onClick={() =>
                                        handleAssessmentClick(assessment.id)
                                    }
                                    className="assessment-worker-elem"
                                >
                                    {assessment.specialist.name} <br />
                                    {assessment.specialist.surname}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedAssessmentId && (
                    <div className="assessment-skills-list">
                        <div>
                            <span>Оцениваемые навыки сотрудника</span>
                        </div>
                        <div className="assessment-skills-list-static">
                            <div style={{ width: dimensions.skill }}>
                                Категория
                                <br />
                                Навык
                            </div>
                            <div style={{ width: dimensions.score }}>
                                Оценка
                            </div>
                        </div>
                        <div
                            className="assessment-skills-list-scrollable"
                            style={{ width: "100%" }}
                        >
                            <div className="assessment-skills-list-wrapper">
                                <div>
                                    {skills.map((skillItem) => {
                                        const skillId = skillItem.skill.id;
                                        const selectedScore =
                                            skillRatings[skillId] ||
                                            "Не выбрано";
                                        const selectClass =
                                            getSelectClass(selectedScore);

                                        return (
                                            <div
                                                key={skillId}
                                                className="assessment-skill-elem"
                                            >
                                                <div
                                                    style={{
                                                        width: dimensions.skill,
                                                    }}
                                                >
                                                    {
                                                        skillItem.skill.category
                                                            .name
                                                    }{" "}
                                                    <br />
                                                    {skillItem.skill.name}
                                                </div>
                                                <select
                                                    value={selectedScore}
                                                    className={selectClass}
                                                    onChange={(e) =>
                                                        handleSelectChange(
                                                            skillId,
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        width: dimensions.score,
                                                    }}
                                                >
                                                    {!localStorage.getItem(
                                                        "userRole"
                                                    ) === "ROLE_MASTER" && (
                                                        <option value="Не выбрано">
                                                            Не выбрано
                                                        </option>
                                                    )}
                                                    <option value="-1">
                                                        -1
                                                    </option>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <div className="assessment-list-button-wrapper">
                    <button
                        className="blue-button"
                        onClick={() => onPageChange("main")}
                    >
                        На главную
                    </button>
                    <button
                        className="blue-button"
                        onClick={handleSubmitRatings}
                        disabled={!allSkillsRated}
                    >
                        Оценить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentWorkersList;

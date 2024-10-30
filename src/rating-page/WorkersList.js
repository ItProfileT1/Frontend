import "./WorkersList.css";
import { useState, useEffect } from "react";

const WorkersList = ({ workers, isAdmin, onWorkerSelect }) => {
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);
    const [workerScores, setWorkerScores] = useState([]);
    
    const dimensions = {
        name: "250px",
        skill: "330px",
        score: "180px",
        adminScore: "350px",
    };

    const getNearestWholeNumber = (score) => {
        if (score < -0.5) return -1;
        if (score < 0) return 0;
        return Math.round(score);
    };

    const handleWorkerClick = (workerId) => {
        if (selectedWorkerId !== workerId) {
            setSelectedWorkerId((prevSelectedId) => (prevSelectedId === workerId ? null : workerId));
            onWorkerSelect(workerId);
        }
    };

    const handleSelectChange = (workerId, score) => {
        setWorkerScores((prevScores) => {
            const updatedScores = prevScores.filter((item) => item.id !== workerId);

            if (score !== "Не выбрано") {
                updatedScores.push({ id: workerId, score: Number(score) });
            }

            return updatedScores;
        });
    };

    const getSelectClass = (selectedScore) => {
        switch (selectedScore) {
            case "-1":
                return "worker-score-negative";
            case "0":
                return "worker-score-zero";
            case "1":
            case "2":
            case "3":
                return `worker-score-positive-${selectedScore}`;
            default:
                return "worker-score-default";
        }
    };

    const handleConfirmRating = () => {
        console.log(isAdmin, workerScores);
    };

    useEffect(() => {
        if (isAdmin) {
            const initialScores = workers.map(worker => ({
                id: worker.id,
                score: getNearestWholeNumber(worker.averageScore)
            }));
            setWorkerScores(initialScores);
        }
    }, [isAdmin, workers]);

    return (
        <div className="workers-list" style={isAdmin ? { width: "970px" } : {}}>
            <div>Список оцениваемых сотрудников</div>
            
            <div className="workers-list-static" style={isAdmin ? { width: "930px" } : {}}>
                <div style={{ width: dimensions.name }}>Cотрудник</div>
                <div style={{ width: dimensions.skill }}>
                    Оцениваемый навык
                </div>
                {isAdmin ? (
                    <div style={{ width: dimensions.adminScore }}>
                        Средняя → Окончательная оценка
                    </div>
                ) : (
                    <div style={{ width: dimensions.score }}>Оценка</div>
                )}
            </div>

            <div className="workers-list-scrollable" style={{ width: "100%" }}>
                <div className="workers-list-wrapper" style={isAdmin ? { width: "950px" } : {}}>
                    {workers.map((worker) => {
                        const workerScore = workerScores.find((item) => item.id === worker.id);
                        const selectedScore = workerScore 
                            ? workerScore.score.toString() 
                            : (isAdmin ? getNearestWholeNumber(worker.averageScore).toString() : "Не выбрано");
                        
                        const selectClass = getSelectClass(selectedScore);

                        return (
                            <div
                                key={worker.id}
                                className={`worker-elem ${selectedWorkerId === worker.id ? "worker-elem-selected" : "worker-elem-hovering"}`}
                                style={isAdmin ? { width: "930px" } : {}}
                                onClick={() => handleWorkerClick(worker.id)}
                            >
                                <div style={{ width: dimensions.name }}>
                                    {worker.surname}
                                    <br />
                                    {worker.name}
                                </div>
                                <div style={{ width: dimensions.skill }}>
                                    {worker.skill}
                                </div>
                                <div className={isAdmin ? 'worker-elem-admin-score' : ''}>
                                    {isAdmin && (
                                        <>
                                            <span>{worker.averageScore}</span> <div>→</div>
                                        </>
                                    )}
                                    <select
                                        className={selectClass}
                                        style={{ width: dimensions.score }}
                                        onChange={(e) => handleSelectChange(worker.id, e.target.value)}
                                        value={selectedScore}
                                    >
                                        {!isAdmin && <option value="Не выбрано">Не выбрано</option>}
                                        <option value="-1">-1</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <button className="blue-button" onClick={handleConfirmRating}>
                    Завершить оценку
                </button>
            </div>
        </div>
    );
};

export default WorkersList;

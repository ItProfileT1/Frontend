import { useState, useEffect } from "react";
import Profile from "../profile/Profile";
import WorkersList from "./WorkersList";
import './RatingPage.css';

const RatingPage = ({ workersData, isAdmin }) => {
    const workers = workersData.map(
        ({ id, name, surname, skill, averageScore }) => ({
            id,
            name,
            surname,
            skill,
            averageScore,
        })
    );

    const [selectedWorker, setSelectedWorker] = useState(null);

    const handleWorkerSelect = (workerId) => {
        const selected = workersData.find((worker) => worker.id === workerId);
        setSelectedWorker(selected);
    };

    useEffect(() => {
        if (workersData.length > 0) {
            setSelectedWorker(workersData[0]);
        }
    }, [workersData]);

    return (
        <div className="rating-page">
            <Profile userData={selectedWorker} display_page={"rating-page"} />
            <WorkersList
                workers={workers}
                isAdmin={isAdmin}
                onWorkerSelect={handleWorkerSelect}
            />
        </div>
    );
};

export default RatingPage;

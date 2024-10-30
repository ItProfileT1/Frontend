import { useState, useEffect } from "react";
import Profile from "../profile/Profile";
import WorkersList from "./WorkersList";
import './RatingPage.css';

const RatingPage = ({ workers_data, isAdmin }) => {
    const workers = workers_data.map(
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
        const selected = workers_data.find((worker) => worker.id === workerId);
        setSelectedWorker(selected);
    };

    useEffect(() => {
        if (workers_data.length > 0) {
            setSelectedWorker(workers_data[0]);
        }
    }, [workers_data]);

    return (
        <div className="rating-page">
            <WorkersList
                workers={workers}
                isAdmin={isAdmin}
                onWorkerSelect={handleWorkerSelect}
            />
            <Profile user_data={selectedWorker} display_page={"rating-page"} />
        </div>
    );
};

export default RatingPage;

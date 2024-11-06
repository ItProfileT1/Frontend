import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/900.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RatingPage from "./rating-page/RatingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

const workersData = [
    {
        id: 1,
        name: "Иван",
        surname: "Федоров",
        position: "Дизайнер",
        photoPath: "/assets/photos/1.jpg",
        skill: "Выработка и принятие решений",
        skillDescription: "Опыт работы в команде и с Agile методологиями.",
        averageScore: 2.25,
    },
    {
        id: 2,
        name: "Максим",
        surname: "Васильев",
        position: "Менеджер",
        photoPath: "/assets/photos/2.jpg",
        skill: "JavaScript",
        skillDescription: "Умение анализировать и интерпретировать данные.",
        averageScore: 0.17,
    },
    {
        id: 3,
        name: "Дмитрий",
        surname: "Васильев",
        position: "Аналитик",
        photoPath: "/assets/photos/3.jpg",
        skill: "HTML",
        skillDescription: "Опыт работы в команде и с Agile методологиями.",
        averageScore: 2.82,
    },
    {
        id: 4,
        name: "Юрий",
        surname: "Сидоров",
        position: "Специалист по продажам",
        photoPath: "/assets/photos/4.jpg",
        skill: "Photoshop",
        skillDescription: "Умение анализировать и интерпретировать данные.",
        averageScore: 1.39,
    },
    {
        id: 5,
        name: "Максим",
        surname: "Морозов",
        position: "Продакт-менеджер",
        photoPath: "/assets/photos/5.jpg",
        skill: "Photoshop",
        skillDescription: "Опыт работы с RESTful API.",
        averageScore: 0.03,
    },
    {
        id: 6,
        name: "Павел",
        surname: "Петров",
        position: "Разработчик",
        photoPath: "/assets/photos/6.jpg",
        skill: "Python",
        skillDescription: "Умение анализировать и интерпретировать данные.",
        averageScore: -0.37,
    },
    {
        id: 7,
        name: "Дмитрий",
        surname: "Федоров",
        position: "Тестировщик",
        photoPath: "/assets/photos/7.jpg",
        skill: "C#",
        skillDescription:
            "Способность к быстрой адаптации к новым технологиям.",
        averageScore: 1.3,
    },
    {
        id: 8,
        name: "Николай",
        surname: "Федоров",
        position: "Аналитик",
        photoPath: "/assets/photos/8.jpg",
        skill: "Java",
        skillDescription: "Знание основ UX/UI дизайна.",
        averageScore: 2.5,
    },
    {
        id: 9,
        name: "Юрий",
        surname: "Кузнецов",
        position: "Разработчик",
        photoPath: "/assets/photos/9.jpg",
        skill: "Ruby",
        skillDescription: "Опыт работы с RESTful API.",
        averageScore: -0.49,
    },
    {
        id: 10,
        name: "Николай",
        surname: "Федоров",
        position: "Системный администратор",
        photoPath: "/assets/photos/10.jpg",
        skill: "UX/UI",
        skillDescription:
            "Способность к быстрой адаптации к новым технологиям.",
        averageScore: 1.51,
    },
    {
        id: 11,
        name: "Михаил",
        surname: "Федоров",
        position: "Системный администратор",
        photoPath: "/assets/photos/10.jpg",
        skill: "UX/UI",
        skillDescription:
            "Способность к быстрой адаптации к новым технологиям.",
        averageScore: 0.81,
    },
    {
        id: 12,
        name: "Михаил",
        surname: "Федоров",
        position: "Системный администратор",
        photoPath: "/assets/photos/10.jpg",
        skill: "UX/UI",
        skillDescription:
            "Способность к быстрой адаптации к новым технологиям.",
        averageScore: 0.37,
    },
    {
        id: 13,
        name: "Михаил",
        surname: "Федоров",
        position: "Системный администратор",
        photoPath: "/assets/photos/10.jpg",
        skill: "UX/UI",
        skillDescription:
            "Способность к быстрой адаптации к новым технологиям.",
        averageScore: 0.28,
    },
    {
        id: 14,
        name: "Михаил",
        surname: "Федоров",
        position: "Системный администратор",
        photoPath: "/assets/photos/10.jpg",
        skill: "UX/UI",
        skillDescription:
            "Способность к быстрой адаптации к новым технологиям.",
        averageScore: -0.53,
    },
];

root.render(
    <React.StrictMode>
        <App />
        {/* <RatingPage workersData={workersData}/> */}
    </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './auth/Login';
import MainPage from './main-page/MainPage';
import SkillPage from './skill-map/SkillPage';
import RatingPage from './rating-page/RatingPage';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
const skillsData = [
  {
      category: {id: 101, label:'Main Name 1'},
      skills: [
      { id: 1, label: 'Навык 1', progress: -1, description: 'test'},
      { id: 2, label: 'Навык 2', progress: 0, description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' },
      { id: 3, label: 'Выработка и принятие решений', progress: 1, description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. awe' },
      ],
  },
  {
      category: {id: 102, label:'Main Name 2'},
      skills: [
      { id: 4, label: 'Навык 4', progress: 2 },
      { id: 5, label: 'Навык 5', progress: 3 },
      { id: 6, label: 'Навык 6', progress: -1 },
      ],
  },
  {
      category: {id: 103, label:'Main Name 3'},
      skills: [
      { id: 7, label: 'Навык 7', progress: 0 },
      { id: 8, label: 'Навык 8', progress: 1 },
      { id: 9, label: 'Навык 9', progress: 2 },
      ],
  },
  {
      category: {id: 104, label:'Main Name 4'},
      skills: [
      { id: 10, label: 'Навык 10', progress: 3 },
      { id: 11, label: 'Навык 11', progress: 3 },
      { id: 12, label: 'Навык 12', progress: 3 },
      ],
  },
  {
      category: {id: 105, label:'Main Name 5'},
      skills: [
      { id: 13, label: 'Навык 1', progress: -1, description: 'test'},
      { id: 14, label: 'Навык 2', progress: 0, description: 'test2' },
      ],
  },
    {
      category: {id: 106, label:'Main Name 6'},
      skills: [
      { id: 15, label: 'Навык 1', progress: -1, description: 'test'},
      { id: 16, label: 'Навык 2', progress: null, description: 'test2' },
      { id: 17, label: 'Выработка и принятие решений', progress: 1 },
      { id: 18, label: 'Выработка и принятие решений', progress: 1 },
      ],
  }
];
const userData = {name:'Harley', surname:'Quinn', position:'SEO', softRank:1, hardRank:2, photoPath:null};
const workersData = [{"id":1,"name":"Иван","surname":"Федоров","position":"Дизайнер","photoPath":"/assets/photos/1.jpg","skill":"Выработка и принятие решений","skillDescription":"Опыт работы в команде и с Agile методологиями.","averageScore":2.25},{"id":2,"name":"Максим","surname":"Васильев","position":"Менеджер","photoPath":"/assets/photos/2.jpg","skill":"JavaScript","skillDescription":"Умение анализировать и интерпретировать данные.","averageScore":0.17},{"id":3,"name":"Дмитрий","surname":"Васильев","position":"Аналитик","photoPath":"/assets/photos/3.jpg","skill":"HTML","skillDescription":"Опыт работы в команде и с Agile методологиями.","averageScore":2.82},{"id":4,"name":"Юрий","surname":"Сидоров","position":"Специалист по продажам","photoPath":"/assets/photos/4.jpg","skill":"Photoshop","skillDescription":"Умение анализировать и интерпретировать данные.","averageScore":1.39},{"id":5,"name":"Максим","surname":"Морозов","position":"Продакт-менеджер","photoPath":"/assets/photos/5.jpg","skill":"Photoshop","skillDescription":"Опыт работы с RESTful API.","averageScore":0.03},{"id":6,"name":"Павел","surname":"Петров","position":"Разработчик","photoPath":"/assets/photos/6.jpg","skill":"Python","skillDescription":"Умение анализировать и интерпретировать данные.","averageScore":-0.37},{"id":7,"name":"Дмитрий","surname":"Федоров","position":"Тестировщик","photoPath":"/assets/photos/7.jpg","skill":"C#","skillDescription":"Способность к быстрой адаптации к новым технологиям.","averageScore":1.3},{"id":8,"name":"Николай","surname":"Федоров","position":"Аналитик","photoPath":"/assets/photos/8.jpg","skill":"Java","skillDescription":"Знание основ UX/UI дизайна.","averageScore":2.5},{"id":9,"name":"Юрий","surname":"Кузнецов","position":"Разработчик","photoPath":"/assets/photos/9.jpg","skill":"Ruby","skillDescription":"Опыт работы с RESTful API.","averageScore":-0.49},{"id":10,"name":"Николай","surname":"Федоров","position":"Системный администратор","photoPath":"/assets/photos/10.jpg","skill":"UX/UI","skillDescription":"Способность к быстрой адаптации к новым технологиям.","averageScore":1.51},{"id":11,"name":"Михаил","surname":"Федоров","position":"Системный администратор","photoPath":"/assets/photos/10.jpg","skill":"UX/UI","skillDescription":"Способность к быстрой адаптации к новым технологиям.","averageScore":0.81},{"id":12,"name":"Михаил","surname":"Федоров","position":"Системный администратор","photoPath":"/assets/photos/10.jpg","skill":"UX/UI","skillDescription":"Способность к быстрой адаптации к новым технологиям.","averageScore":0.37},{"id":13,"name":"Михаил","surname":"Федоров","position":"Системный администратор","photoPath":"/assets/photos/10.jpg","skill":"UX/UI","skillDescription":"Способность к быстрой адаптации к новым технологиям.","averageScore":0.28},{"id":14,"name":"Михаил","surname":"Федоров","position":"Системный администратор","photoPath":"/assets/photos/10.jpg","skill":"UX/UI","skillDescription":"Способность к быстрой адаптации к новым технологиям.","averageScore":-0.53}];

root.render(
  <React.StrictMode>
    {/* <Login /> */}
    {/* <SkillPage user_data={userData} skills_data={skillsData} isAdmin={false} isEdit={false}/> */}
    {/* <MainPage user_data={userData} isAdmin={false}/> */}
    <RatingPage workers_data={workersData} isAdmin={true}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

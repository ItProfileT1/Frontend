import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './auth/Login';
import MainPage from './main-page/MainPage';
import SkillPage from './skill-map/SkillPage';
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
const userData = ['Harley', 'Quinn', 'SEO', 1, 2, null];


root.render(
  <React.StrictMode>
    {/* <Login /> */}
    {/* <SkillPage user_data={userData} skills_data={skillsData} isAdmin={false} isEdit={false}/> */}
    <MainPage user_data={userData} isAdmin={false}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

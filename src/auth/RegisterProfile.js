import React, { useState, useEffect } from 'react';
import './Auth.css';
import InputBlock from './InputBlock';
import SkillPage from "../skill-map/SkillPage";

const RegisterProfile = ({onLogout, onPageChange}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [birthday, setBirthday] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [skillsData, setSkillsData] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const addSkillId = (skillId) => {
        setSelectedSkills((prevSelectedSkills) =>
            prevSelectedSkills.includes(skillId)
                ? prevSelectedSkills.filter(id => id !== skillId)
                : [...prevSelectedSkills, skillId]
        );
    };

    const handleClick = async () => {
        const data = { name: name, surname: surname, patronymic: patronymic, birthday: birthday, city: city, sex: gender, skillsIds: selectedSkills};
        const url = 'http://localhost:8080/api/v1/specialists/profile';
        const authToken = localStorage.getItem("authToken");
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                onPageChange('main');
            } else {
                console.error("Ошибка при создании профиля");
            }

        } catch (error) {
            console.error("Ошибка при создании профиля:", error);
        }
    };


    useEffect(() => {
        const fetchSkills = async () => {
            const url = 'http://localhost:8080/api/v1/skills';
            const authToken = localStorage.getItem("authToken");
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке навыков');
                }
                const data = await response.json();
                setSkillsData(data);
            } catch (error) {
                console.error("Ошибка при получении навыков:", error);
            }
        };

        fetchSkills();
    }, []);

    return (
        <div className="register-profile">
            
            {skillsData ? ( 
            <SkillPage pageToRender="profile" initialSkillsData={skillsData} selectedSkills={selectedSkills} addSkillId={addSkillId}>
                <div className="register-profile-data auth-panel-bg" style={{display: 'flex', flexDirection:'column'}}>
                    <InputBlock id="name" label="Имя" value={name} onChange={(e) => setName(e.target.value)} />
                    <InputBlock id="surname" label="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <InputBlock id="patronymic" label="Отчество" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
                    <InputBlock id="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    <InputBlock id="city" label="Город" value={city} onChange={(e) => setCity(e.target.value)} />
                    <InputBlock id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                    <button type="button" className="blue-button auth-button" onClick={handleClick}>Подтвердить</button>
                </div>
            </SkillPage>
            ) : (
                <></>
            )}
        </div>
    );

}
export default RegisterProfile;
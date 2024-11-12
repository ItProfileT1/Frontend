import React, { useState, useEffect } from 'react';
import './Auth.css';
import InputBlock from './InputBlock';
import SkillPage from "../skill-map/SkillPage";

const RegisterProfile = ({ onPageChange, fetchSkills }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        birthday: '',
        city: '',
        sex: '',
    });
    const [skillsData, setSkillsData] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillType, setSkillType] = useState("Hard");

    const addSkillId = (skillId) => {
        setSelectedSkills((prevSelectedSkills) =>
            prevSelectedSkills.includes(skillId)
                ? prevSelectedSkills.filter(id => id !== skillId)
                : [...prevSelectedSkills, skillId]
        );
    };

    const handleClick = async () => {
        const data = { ...formData, skillsIds: selectedSkills };
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
                console.log(data)
                console.error("Ошибка при создании профиля");
            }

        } catch (error) {
            console.error("Ошибка при создании профиля:", error);
        }
    };

    useEffect(() => {
        const loadSkillsData = async () => {
            const data = await fetchSkills(skillType);
            setSkillsData(data);
        };
        loadSkillsData();
    }, [skillType, fetchSkills]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    // onPageChange('login')
    return (
        <div className="register-profile">
            <div className="register-profile-data auth-panel-bg" style={{ display: 'flex', flexDirection: 'column' }}>
                <InputBlock id="name" label="Имя" value={formData.name} onChange={handleChange} />
                <InputBlock id="surname" label="Фамилия" value={formData.surname} onChange={handleChange} />
                <InputBlock id="patronymic" label="Отчество" value={formData.patronymic} onChange={handleChange} />
                <InputBlock id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} />
                <InputBlock id="city" label="Город" value={formData.city} onChange={handleChange} />
                <InputBlock id="sex" value={formData.sex} onChange={handleChange} />
                <InputBlock id="skills" value={skillType} onChange={(e) => setSkillType(e.target.value)} />
                <button type="button" className="blue-button auth-button" onClick={handleClick}>Подтвердить</button>
            </div>
            {skillsData ? (
                <SkillPage pageToRender="profile" initialSkillsData={skillsData} selectedSkills={selectedSkills} addSkillId={addSkillId} />
            ) : null}
        </div>
    );
};

export default RegisterProfile;

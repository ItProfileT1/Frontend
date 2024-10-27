import './SkillAdminPanel.css';
import React, { useState, useEffect } from 'react';

const AddSkill = ({ newSkill, setNewSkill, categories, handleAddSkill, resetMode }) => (
    <div>
        <input
            type="text"
            placeholder="Название навыка"
            value={newSkill.label}
            onChange={(e) => setNewSkill({ ...newSkill, label: e.target.value })}
        />
        <textarea
            placeholder="Описание"
            value={newSkill.description}
            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
        />
        <select onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}>
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
            ))}
        </select>
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>Назад</button>
            <button 
                className="blue-button" 
                onClick={handleAddSkill}
                disabled={!newSkill.label || !newSkill.category}
            >
                Добавить
            </button>
        </div>
    </div>
);

const RemoveSkill = ({ selectedSkill, setSelectedSkill, skillsData, handleRemoveSkill, resetMode }) => (
    <div>
        <select onChange={(e) => {
            const selectedCategory = skillsData.find(cat => cat.category.label === e.target.value);
            setSelectedSkill({ ...selectedSkill, category: selectedCategory?.category.label, label: '', confirmLabel: '' });
        }}>
            <option value="">Выберите категорию</option>
            {skillsData.map((cat) => (
                <option key={cat.category.id} value={cat.category.label}>{cat.category.label}</option>
            ))}
        </select>
        <select onChange={(e) => setSelectedSkill({ ...selectedSkill, label: e.target.value, confirmLabel: '' })}>
            <option value="">Выберите навык</option>
            {selectedSkill.category && skillsData.find(cat => cat.category.label === selectedSkill.category)?.skills.map(skill => (
                <option key={skill.id} value={skill.label}>{skill.label}</option>
            ))}
        </select>
        {selectedSkill.label && (
            <div>
                <input
                    type="text"
                    placeholder="Введите название для подтверждения"
                    onChange={(e) => setSelectedSkill({ ...selectedSkill, confirmLabel: e.target.value })}
                />
            </div>
        )}
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>Назад</button>
            {selectedSkill.label && (
                <button
                    className="blue-button"
                    onClick={handleRemoveSkill}
                    disabled={selectedSkill.label !== selectedSkill.confirmLabel || selectedSkill.confirmLabel === ''}
                >
                    Удалить
                </button>
            )}
        </div>
    </div>
);

const AddCategory = ({ newCategory, setNewCategory, handleAddCategory, resetMode }) => (
    <div>
        <input
            type="text"
            placeholder="Название категории"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
        />
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>Назад</button>
            <button className="blue-button" onClick={handleAddCategory}>Добавить</button>
        </div>
    </div>
);

const EditCategory = ({ selectedCategory, setSelectedCategory, categories, handleEditCategory, resetMode }) => (
    <div>
        <select onChange={(e) => {
            const selectedCategory = categories.find(cat => cat.label === e.target.value);
            setSelectedCategory({ label: selectedCategory?.label, confirmLabel: selectedCategory?.label });
        }}>
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
            ))}
        </select>
        {selectedCategory.label && (
            <div>
                <input
                    type="text"
                    placeholder="Редактировать название категории"
                    value={selectedCategory.confirmLabel}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, confirmLabel: e.target.value })}
                />
            </div>
        )}
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>Назад</button>
            {selectedCategory.label && (
                <button 
                    className="blue-button" 
                    onClick={handleEditCategory}
                    disabled={selectedCategory.label === selectedCategory.confirmLabel || selectedCategory.confirmLabel === ''}
                >
                    Подтвердить
                </button>
            )}
        </div>
    </div>
);


const RemoveCategory = ({ selectedCategory, setSelectedCategory, categories, handleRemoveCategory, resetMode }) => (
    <div>
        <select onChange={(e) => setSelectedCategory({ label: e.target.value, confirmLabel: '' })}>
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
            ))}
        </select>
        {selectedCategory.label && (
            <div>
                <input
                    type="text"
                    placeholder="Введите название для подтверждения"
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, confirmLabel: e.target.value })}
                />
            </div>
        )}
        <div class="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>Назад</button>
            {selectedCategory.label && (
                <button 
                    className="blue-button"
                    onClick={handleRemoveCategory}
                    disabled={selectedCategory.label !== selectedCategory.confirmLabel || selectedCategory.confirmLabel === ''}
                >
                    Удалить
                </button>
            )}
        </div>
    </div>
);

const SkillAdminPanel = ({ skills_data, setSkillsData, onClose }) => {
    const [mode, setMode] = useState(null); // 'addSkill', 'removeSkill', 'addCategory', 'EditCategoty', 'removeCategory'
    const [newSkill, setNewSkill] = useState({ label: '', description: '', category: '' });
    const [selectedSkill, setSelectedSkill] = useState({ label: '', category: '', confirmLabel: '' });
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState({ label: '', confirmLabel: '' });

    const categories = skills_data.map(cat => cat.category);

    const resetFields = () => {
        setNewSkill({ label: '', description: '', category: '' });
        setSelectedSkill({ label: '', category: '', confirmLabel: '' });
        setNewCategory('');
        setSelectedCategory({ label: '', confirmLabel: '' });
    };

    const resetMode = () => {
        setMode(null);
        resetFields();
    };

    useEffect(() => {
        if (mode === null) {
            resetFields();
        }
    }, [mode]);

    const updateSkillsData = (updatedData) => {
        setSkillsData(updatedData);
        setMode(null);
    };

    const sendToServer = async ({url, method, data}) => {
        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    const handleAddSkill = async () => {
        const updatedSkillsData = skills_data.map(cat => {
            if (cat.category.label === newSkill.category) {
                return {
                    ...cat,
                    skills: [...cat.skills, { id: Date.now(), label: newSkill.label, description: newSkill.description, progress: null }],
                };
            }
            return cat;
        });

        // sendToServer('...', '...', updatedSkillsData); 
        updateSkillsData(updatedSkillsData);
    };

    const handleRemoveSkill = async () => {
        const updatedSkillsData = skills_data.map(cat => {
            if (cat.category.label === selectedSkill.category) {
                return {
                    ...cat,
                    skills: cat.skills.filter(skill => skill.label !== selectedSkill.label),
                };
            }
            return cat;
        });
        
        // sendToServer('...', '...', updatedSkillsData); 
        updateSkillsData(updatedSkillsData);
    };
    
    const handleAddCategory = async () => {
        const updatedSkillsData = [...skills_data, { category: { id: Date.now(), label: newCategory }, skills: [] }];
        
        // sendToServer('...', '...', updatedSkillsData); 
        updateSkillsData(updatedSkillsData);
    };

    const handleEditCategory = async () => {
        const updatedSkillsData = skills_data.map(cat => {
            if (cat.category.label === selectedCategory.label) {
                return { ...cat, category: { ...cat.category, label: selectedCategory.confirmLabel } };
            }
            return cat;
        });

        // sendToServer('...', '...', updatedSkillsData);
        updateSkillsData(updatedSkillsData);
    };

    const handleRemoveCategory = async () => {
        const updatedSkillsData = skills_data.filter(cat => cat.category.label !== selectedCategory.label);
        
        // sendToServer('...', '...', updatedSkillsData); 
        updateSkillsData(updatedSkillsData);
    };

    const getHeaderText = () => {
        switch (mode) {
            case 'addSkill':
                return 'Добавить новый скилл';
            case 'removeSkill':
                return 'Удалить скилл';
            case 'addCategory':
                return 'Добавить новую категорию';
            case 'editCategory':
                return 'Редактировать категорию';
            case 'removeCategory':
                return 'Удалить категорию';
            default:
                return 'Управление навыками';
        }
    };

    const onMenuClick = (newMode) => {
        onClose();
        setMode(newMode);
    } 

    return (
        <div className="skill-admin-panel">
            <div style={{ textAlign: 'center'}}>
                <span>{getHeaderText()}</span>
            </div>
            {mode === null && (
                <div className="skill-admin-panel-menu">
                    <button className="blue-button" onClick={() => onMenuClick('addSkill')}>Добавить скилл</button>
                    <button className="blue-button" onClick={() => onMenuClick('removeSkill')}>Удалить скилл</button>
                    <div style={{ textAlign: 'center', margin: '10px 0'}}>
                        <span>Управление категориями</span>
                    </div>
                    <button className="blue-button" onClick={() => onMenuClick('addCategory')}>Добавить категорию</button>
                    <button className="blue-button" onClick={() => onMenuClick('editCategory')}>Редактировать категорию</button>
                    <button className="blue-button" onClick={() => onMenuClick('removeCategory')}>Удалить категорию</button>
                </div>
            )}

            {mode === 'addSkill' && (
                <AddSkill
                    newSkill={newSkill}
                    setNewSkill={setNewSkill}
                    categories={categories}
                    handleAddSkill={handleAddSkill}
                    resetMode={resetMode}
                />
            )}

            {mode === 'removeSkill' && (
                <RemoveSkill
                    selectedSkill={selectedSkill}
                    setSelectedSkill={setSelectedSkill}
                    skillsData={skills_data}
                    handleRemoveSkill={handleRemoveSkill}
                    resetMode={resetMode}
                />
            )}

            {mode === 'addCategory' && (
                <AddCategory
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    handleAddCategory={handleAddCategory}
                    resetMode={resetMode}
                />
            )}

            {mode === 'editCategory' && (
                <EditCategory
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    handleEditCategory={handleEditCategory}
                    resetMode={resetMode}
                />
            )}

            {mode === 'removeCategory' && (
                <RemoveCategory
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    handleRemoveCategory={handleRemoveCategory}
                    resetMode={resetMode}
                />
            )}
        </div>
    );
};

export default SkillAdminPanel;

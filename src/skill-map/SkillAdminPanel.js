import "./SkillAdminPanel.css";
import React, { useState, useEffect } from "react";

const AddSkill = ({
    newSkill,
    setNewSkill,
    categories,
    handleAddSkill,
    resetMode,
}) => (
    <div>
        <input
            type="text"
            placeholder="Название навыка"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
        />
        <textarea
            placeholder="Описание"
            value={newSkill.description}
            onChange={(e) =>
                setNewSkill({ ...newSkill, description: e.target.value })
            }
        />
        <select
            onChange={(e) =>
                setNewSkill({ ...newSkill, categoryId: e.target.value })
            }
        >
            <option value="null">Выберите категорию</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
            ))}
        </select>
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>
                Назад
            </button>
            <button
                className="blue-button"
                onClick={handleAddSkill}
                disabled={!newSkill.name}
            >
                Добавить
            </button>
        </div>
    </div>
);

const AddCategory = ({
    newCategory,
    setNewCategory,
    handleAddCategory,
    resetMode,
}) => (
    <div>
        <input
            type="text"
            placeholder="Название категории"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
        />
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>
                Назад
            </button>
            <button className="blue-button" onClick={handleAddCategory}>
                Добавить
            </button>
        </div>
    </div>
);

const SkillAdminPanel = ({
    onPageChange,
    setSkillsData,
    onClose,
    typeId,
    fetchSkills,
}) => {
    const [mode, setMode] = useState(null); // 'addSkill', 'removeSkill', 'addCategory', 'EditCategoty', 'removeCategory'
    const [newSkill, setNewSkill] = useState({
        name: "",
        description: "",
        categoryId: "",
    });
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const resetFields = () => {
        setNewSkill({ name: "", description: "", categoryId: "" });
        setNewCategory("");
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

    const fetchCategories = async () => {
        const authToken = localStorage.getItem("authToken");
        const url = "http://localhost:8080/api/v1/skill_categories";

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const filteredCategories = data.filter(
                    (category) => category.typeResponse.name === typeId
                );

                filteredCategories.sort((a, b) => a.id - b.id);

                setCategories(filteredCategories);
            } else {
                throw new Error("Ошибка при загрузке категорий");
            }
        } catch (error) {
            console.error("Произошла ошибка при запросе категорий:", error);
        }
    };

    const sendToServer = async (endpoint, data) => {
        const authToken = localStorage.getItem("authToken");
        const url = `http://localhost:8080/api/v1/${endpoint}`;
        console.log(data)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                if (endpoint === "skills") {
                    setSkillsData(await fetchSkills(typeId));
                } else if (endpoint === "skill_categories") {
                    await fetchCategories();
                }
            } else {
                throw new Error(`Ошибка запроса: ${response.statusText}`);
            }

            setMode(null);
        } catch (error) {
            console.error("Произошла ошибка при запросе:", error);
        }
    };

    const handleAddSkill = async () => {
        const newSkillObject = {
            name: newSkill.name,
            description: newSkill.description,
            question: "?",
            categoryId: newSkill.categoryId || null,
            typeId: typeId === "Hard" ? 1 : 2,
            scaleId: 2,
        };

        await sendToServer("skills", newSkillObject);
    };

    const handleAddCategory = async () => {
        const newCategoryObject = {
            name: newCategory,
            typeId: typeId === "Hard" ? 1 : 2,
        };

        await sendToServer("skill_categories", newCategoryObject);
    };

    const getHeaderText = () => {
        switch (mode) {
            case "addSkill":
                return "Добавить новый навык";
            case "addCategory":
                return "Добавить новую категорию";
            default:
                return "Управление навыками";
        }
    };

    const onMenuClick = (newMode) => {
        onClose();
        setMode(newMode);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="skill-admin-panel">
            <div style={{ textAlign: "center" }}>
                <span>{getHeaderText()}</span>
            </div>
            {mode === null && (
                <div className="skill-admin-panel-menu">
                    <button
                        className="blue-button"
                        onClick={() => onMenuClick("addSkill")}
                    >
                        Добавить навык
                    </button>
                    <div style={{ textAlign: "center", margin: "30px 0 10px" }}>
                        <span>Управление категориями</span>
                    </div>
                    <button
                        className="blue-button"
                        onClick={() => onMenuClick("addCategory")}
                    >
                        Добавить категорию
                    </button>
                    <button
                        className="blue-button"
                        onClick={() => onPageChange("main")}
                    >
                        На главную
                    </button>
                </div>
            )}

            {mode === "addSkill" && (
                <AddSkill
                    newSkill={newSkill}
                    setNewSkill={setNewSkill}
                    categories={categories}
                    handleAddSkill={handleAddSkill}
                    resetMode={resetMode}
                />
            )}

            {mode === "addCategory" && (
                <AddCategory
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    handleAddCategory={handleAddCategory}
                    resetMode={resetMode}
                />
            )}
        </div>
    );
};

export default SkillAdminPanel;

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
            <option value="">Выберите категорию</option>
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
                disabled={!newSkill.name || !newSkill.categoryId}
            >
                Добавить
            </button>
        </div>
    </div>
);

const RemoveSkill = ({
    selectedSkill,
    setSelectedSkill,
    skillsData,
    handleRemoveSkill,
    resetMode,
}) => (
    <div>
        <select
            onChange={(e) => {
                const selectedCategory = skillsData.find(
                    (cat) =>
                        cat.categoryResponse.id === parseInt(e.target.value)
                );
                setSelectedSkill({
                    ...selectedSkill,
                    categoryId: selectedCategory?.categoryResponse.id,
                    name: "",
                    confirmName: "",
                });
            }}
        >
            <option value="">Выберите категорию</option>
            {skillsData.map((cat) => (
                <option
                    key={cat.categoryResponse.id}
                    value={cat.categoryResponse.id}
                >
                    {cat.categoryResponse.name}
                </option>
            ))}
        </select>
        <select
            onChange={(e) =>
                setSelectedSkill({
                    ...selectedSkill,
                    name: e.target.value,
                    confirmName: "",
                })
            }
        >
            <option value="">Выберите навык</option>
            {selectedSkill.categoryId &&
                skillsData
                    .find(
                        (cat) =>
                            cat.categoryResponse.id === selectedSkill.categoryId
                    )
                    ?.skillResponses.map((skill) => (
                        <option key={skill.id} value={skill.name}>
                            {skill.name}
                        </option>
                    ))}
        </select>
        {selectedSkill.name && (
            <div>
                <input
                    type="text"
                    placeholder="Подтвердите название"
                    onChange={(e) =>
                        setSelectedSkill({
                            ...selectedSkill,
                            confirmName: e.target.value,
                        })
                    }
                />
            </div>
        )}
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>
                Назад
            </button>
            {selectedSkill.name && (
                <button
                    className="blue-button"
                    onClick={handleRemoveSkill}
                    disabled={
                        selectedSkill.name !== selectedSkill.confirmName ||
                        selectedSkill.confirmName === ""
                    }
                >
                    Удалить
                </button>
            )}
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

const EditCategory = ({
    selectedCategory,
    setSelectedCategory,
    categories,
    handleEditCategory,
    resetMode,
}) => (
    <div>
        <select
            onChange={(e) => {
                const selectedCategory = categories.find(
                    (cat) => cat.name === e.target.value
                );
                setSelectedCategory({
                    name: selectedCategory?.name,
                    confirmName: selectedCategory?.name,
                });
            }}
        >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                    {cat.name}
                </option>
            ))}
        </select>
        {selectedCategory.name && (
            <div>
                <input
                    type="text"
                    placeholder="Редактировать название категории"
                    value={selectedCategory.confirmName}
                    onChange={(e) =>
                        setSelectedCategory({
                            ...selectedCategory,
                            confirmName: e.target.value,
                        })
                    }
                />
            </div>
        )}
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>
                Назад
            </button>
            {selectedCategory.name && (
                <button
                    className="blue-button"
                    onClick={handleEditCategory}
                    disabled={
                        selectedCategory.name ===
                            selectedCategory.confirmName ||
                        selectedCategory.confirmName === ""
                    }
                >
                    Подтвердить
                </button>
            )}
        </div>
    </div>
);

const RemoveCategory = ({
    selectedCategory,
    setSelectedCategory,
    categories,
    handleRemoveCategory,
    resetMode,
}) => (
    <div>
        <select
            onChange={(e) =>
                setSelectedCategory({ name: e.target.value, confirmName: "" })
            }
        >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                    {cat.name}
                </option>
            ))}
        </select>
        {selectedCategory.name && (
            <div>
                <input
                    type="text"
                    placeholder="Подтвердите название"
                    onChange={(e) =>
                        setSelectedCategory({
                            ...selectedCategory,
                            confirmName: e.target.value,
                        })
                    }
                />
            </div>
        )}
        <div className="skill-admin-panel-buttons">
            <button className="blue-button" onClick={resetMode}>
                Назад
            </button>
            {selectedCategory.name && (
                <button
                    className="blue-button"
                    onClick={handleRemoveCategory}
                    disabled={
                        selectedCategory.name !==
                            selectedCategory.confirmName ||
                        selectedCategory.confirmName === ""
                    }
                >
                    Удалить
                </button>
            )}
        </div>
    </div>
);

const SkillAdminPanel = ({
    onPageChange,
    skillsData,
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
    const [selectedSkill, setSelectedSkill] = useState({
        name: "",
        categoryId: "",
        confirmName: "",
    });
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({
        name: "",
        confirmName: "",
    });

    const categories = skillsData.map((cat) => cat.categoryResponse);

    const resetFields = () => {
        setNewSkill({ name: "", description: "", category: "" });
        setSelectedSkill({ name: "", category: "", confirmName: "" });
        setNewCategory("");
        setSelectedCategory({ name: "", confirmName: "" });
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

    const sendToServer = async (endpoint, method, data) => {
        const url = `http://localhost:8080/api/v1/${endpoint}`;
        const authToken = localStorage.getItem("authToken");
        return console.log(url, method, data)

        try {
            const fetchOptions = {
                method: method,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            };

            if (method !== "DELETE" && data) {
                fetchOptions.body = JSON.stringify(data);
            }

            const response = await fetch(url, fetchOptions);

            if (response.ok) {
                const updatedSkillsData = await fetchSkills(typeId); 
                updateSkillsData(updatedSkillsData); 
            } else {
                throw new Error(`Ошибка запроса: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Произошла ошибка при запросе:", error); 
        }
    };

    const handleAddSkill = async () => {
        const newSkillObject = {
            name: newSkill.name,
            description: newSkill.description,
            categoryId: newSkill.categoryId,
            typeId: typeId === "Hard" ? 1 : 2,
        };

        sendToServer("skills", "POST", newSkillObject);
    };

    const handleRemoveSkill = async () => {
        const removeSkillId = skillsData
            .filter(
                (cat) => cat.categoryResponse.id === selectedSkill.categoryId
            )
            .flatMap((cat) => cat.skillResponses)
            .find((skill) => skill.name === selectedSkill.name).id;

        sendToServer(`delete-skill/${removeSkillId}`, "DELETE");
    };

    const handleAddCategory = async () => {
        const newCategoryObject = {
            name: newCategory,
            type: typeId,
        };

        sendToServer("add-category", "POST", newCategoryObject);
    };

    const handleEditCategory = async () => {
        const editedCategoryObject = {
            id: categories.find((cat) => cat.name === selectedCategory.name).id,
            name: selectedCategory.confirmName,
        };

        sendToServer("edit-category", "POST", editedCategoryObject);
    };

    const handleRemoveCategory = async () => {
        const removeCategoryId = categories.find(
            (cat) => cat.name === selectedCategory.name
        ).id;

        sendToServer(`delete-skill/${removeCategoryId}`, "DELETE");
    };

    const getHeaderText = () => {
        switch (mode) {
            case "addSkill":
                return "Добавить новый навык";
            case "removeSkill":
                return "Удалить навык";
            case "addCategory":
                return "Добавить новую категорию";
            case "editCategory":
                return "Редактировать категорию";
            case "removeCategory":
                return "Удалить категорию";
            default:
                return "Управление навыками";
        }
    };

    const onMenuClick = (newMode) => {
        onClose();
        setMode(newMode);
    };

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
                        Добавить скилл
                    </button>
                    <button
                        className="blue-button"
                        onClick={() => onMenuClick("removeSkill")}
                    >
                        Удалить скилл
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
                        onClick={() => onMenuClick("editCategory")}
                    >
                        Изменить категорию
                    </button>
                    <button
                        className="blue-button"
                        onClick={() => onMenuClick("removeCategory")}
                    >
                        Удалить категорию
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

            {mode === "removeSkill" && (
                <RemoveSkill
                    selectedSkill={selectedSkill}
                    setSelectedSkill={setSelectedSkill}
                    skillsData={skillsData}
                    handleRemoveSkill={handleRemoveSkill}
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

            {mode === "editCategory" && (
                <EditCategory
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    handleEditCategory={handleEditCategory}
                    resetMode={resetMode}
                />
            )}

            {mode === "removeCategory" && (
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

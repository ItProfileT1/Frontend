const Button = ({ label, onClick }) => (
    <button
        className="blue-button"
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: label }}
    ></button>
);

const ButtonRow = ({ buttons, handleClick }) => (
    <div className="main-menu-button-row">
        {buttons.map((button, index) => (
            <Button
                key={index}
                label={button.label}
                onClick={() => handleClick(button.action)}
            />
        ))}
    </div>
);

const MainPageMenu = ({ onPageChange, onLogout, fetchSkills }) => {
    const isAdmin = localStorage.getItem("userRole") === "ROLE_ADMIN";
    const isMaster = localStorage.getItem("userRole") === "ROLE_MASTER";

    const userButtons = [
        {
            label: "Посмотреть карту<br/>Хард скиллов",
            action: "viewHardSkills",
        },
        {
            label: "Посмотреть карту<br/>Софт скиллов",
            action: "viewSoftSkills",
        },
        { label: "Перейти к оценке", action: "goToRating" },
        { label: "Выйти", action: "logout" },
    ];

    const adminButtons = [
        { label: "Редактировать должности", action: "editPositions" },
        { label: "Создать пользователя", action: "createUser" },
        { label: "Изменить карту<br/>Хард скиллов", action: "editHardSkills" },
        { label: "Изменить карту<br/>Софт скиллов", action: "editSoftSkills" },
        { label: "Выйти", action: "logout" },
    ];

    const masterButtons = [
        { label: "Список сотрудников", action: "viewEmployees" },
        {
            label: "Список сотрудников<br/>на оценку",
            action: "viewEmployeesForRating",
        },
        { label: "Просмотр оценок", action: "viewRatings" },
        { label: "Выйти", action: "logout" },
    ];

    const buttonsToDisplay = isAdmin
        ? adminButtons
        : isMaster
        ? masterButtons
        : userButtons;

    const fetchUserProfile = async () => {
        const url = "http://localhost:8080/api/v1/specialists/profile";
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    };

    const actionHandlers = {
        logout: () => onLogout(),
        viewHardSkills: async () => {
            const data = {
                initialSkillsData: await fetchSkills("Hard"),
                pageToRender: "skills",
                typeId: "Hard",
                userData: await fetchUserProfile(),
            };
            onPageChange("skill", data);
        },
        viewSoftSkills: async () => {
            const data = {
                initialSkillsData: await fetchSkills("Soft"),
                pageToRender: "skills",
                typeId: "Soft",
                userData: await fetchUserProfile(),
            };
            onPageChange("skill", data);
        },
        editHardSkills: async () => {
            const data = {
                initialSkillsData: await fetchSkills("Hard"),
                pageToRender: "edit",
                typeId: "Hard",
                userData: null,
            };
            onPageChange("skill", data);
        },
        editSoftSkills: async () => {
            const data = {
                initialSkillsData: await fetchSkills("Soft"),
                pageToRender: "edit",
                typeId: "Soft",
                userData: null,
            };
            onPageChange("skill", data);
        },
        createUser: () => onPageChange("register"),
        editPositions: () => onPageChange("position"),
        viewEmployees: () => onPageChange("show-workers"),
        viewEmployeesForRating: () => onPageChange("show-workers"),
        viewRatings: () => onPageChange("rating"),
        default: (action) => console.log(`Unknown action: ${action}`),
    };

    const handleClick = (action) => {
        const handler = actionHandlers[action] || actionHandlers.default;
        handler();
    };

    // Разделяем кнопки на строки
    const buttonRows = [];
    for (let index = 0; index < buttonsToDisplay.length; index += 2) {
        buttonRows.push(
            <ButtonRow
                key={index}
                buttons={buttonsToDisplay.slice(index, index + 2)}
                handleClick={handleClick}
            />
        );
    }

    return (
        <div className="main-page-menu">
            <div>
                {isAdmin
                    ? "Меню администратора"
                    : isMaster
                    ? "Меню начальника"
                    : "Меню пользователя"}
            </div>
            {buttonRows}
        </div>
    );
};

export default MainPageMenu;

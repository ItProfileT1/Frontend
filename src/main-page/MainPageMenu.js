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
        { label: "Посмотреть карту<br/>Хард скиллов", action: 1 },
        { label: "Посмотреть карту<br/>Софт скиллов", action: 2 },
        { label: "Перейти к оценке", action: 3 },
        { label: "Выйти", action: 0 },
    ];

    const adminButtons = [
        { label: "Редактировать должности", action: 8 },
        { label: "Создать пользователя", action: 7 },
        { label: "Изменить карту<br/>Хард скиллов", action: 4 },
        { label: "Изменить карту<br/>Софт скиллов", action: 5 },
        { label: "Выйти", action: 0 },
    ];

    const masterButtons = [
        { label: "Список сотрудников", action: 10 },
        { label: "Список сотрудников<br/>на оценку", action: 6 },
        { label: "Просмотр оценок", action: 9 },
        { label: "Выйти", action: 0 },
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

    const handleClick = async (action) => {
        var data;
        switch (action) {
            case 0:
                onLogout();
                return;
            case 1:
                data = {
                    initialSkillsData: await fetchSkills("Hard"),
                    pageToRender: "skills",
                    typeId: "Hard",
                    userData: await fetchUserProfile(),
                };
                onPageChange("skill", data);
                return;
            case 2:
                data = {
                    initialSkillsData: await fetchSkills("Soft"),
                    pageToRender: "skills",
                    typeId: "Soft",
                    userData: await fetchUserProfile(),
                };
                onPageChange("skill", data);
                return;
            case 4:
                data = {
                    initialSkillsData: await fetchSkills("Hard"),
                    pageToRender: "edit",
                    typeId: "Hard",
                    userData: null,
                };
                console.log(data);
                onPageChange("skill", data);
                return;
            case 5:
                data = {
                    initialSkillsData: await fetchSkills("Soft"),
                    pageToRender: "edit",
                    typeId: "Soft",
                    userData: null,
                };
                onPageChange("skill", data);
                return;
            case 7:
                onPageChange("register");
                return;
            case 8:
                onPageChange("position");
                return;
            case 10:
                onPageChange("show-workers");
                return;
            default:
                console.log(action);
        }
    };

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

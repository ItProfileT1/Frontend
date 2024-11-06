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

const MainPageMenu = ({ onPageChange, onLogout }) => {
    const isAdmin = localStorage.getItem("userRole") === "ROLE_ADMIN";

    const userButtons = [
        { label: "Посмотреть карту<br/>Хард скиллов", action: 1 },
        { label: "Посмотреть карту<br/>Софт скиллов", action: 2 },
        { label: "Перейти к оценке", action: 3 },
        { label: "Выйти", action: 0}
    ];

    const adminButtons = [
        { label: "Редактировать должности", action: 8},
        { label: "Создать пользователя", action: 7 },
        { label: "Изменить карту<br/>Хард скиллов", action: 4 },
        { label: "Изменить карту<br/>Софт скиллов", action: 5 },
        { label: "Список сотрудников<br/>на оценку", action: 6 },
        { label: "Просмотр оценок", action: 9 },
        { label: "Выйти", action: 0}
    ];

    const buttonsToDisplay = isAdmin ? adminButtons : userButtons;

    const handleClick = (action) => {
        switch(action) {
            case 0:
                onLogout();
                return;
            case 7:
                onPageChange("register");
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
            <div>{isAdmin ? "Меню администратора" : "Меню пользователя"}</div>
            {buttonRows}
        </div>
    );
};

export default MainPageMenu;

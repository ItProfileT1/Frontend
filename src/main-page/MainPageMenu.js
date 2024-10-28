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

const MainPageMenu = ({ isAdmin }) => {
    const userButtons = [
        { label: "Посмотреть карту<br/>Хард скиллов", action: "0" },
        { label: "Посмотреть карту<br/>Софт скиллов", action: "1" },
        { label: "Перейти к оценке", action: "2" },
    ];

    const adminButtons = [
        { label: "Изменить карту<br/>Хард скиллов", action: "3" },
        { label: "Изменить карту<br/>Софт скиллов", action: "4" },
        { label: "Просмотр оценок", action: "5" },
        { label: "Создать пользователя", action: "6" },
    ];

    const buttonsToDisplay = isAdmin ? adminButtons : userButtons;

    const handleClick = (action) => {
        // console.log(action);
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
            <div>Меню</div>
            {buttonRows}
        </div>
    );
};

export default MainPageMenu;

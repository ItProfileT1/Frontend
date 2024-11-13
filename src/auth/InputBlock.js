import React from "react";

const InputBlock = ({ id, label, value, onChange, data }) => {
    const iconPaths = {
        name: "login",
        surname: "login",
        patronymic: "login",
        login: "login",
        password: "password",
        city: "city",
        birthday: "date",
        sex: "gender",
        job: "job",
        position: "job",
        skills: "skills",
    };

    const handleFocus = () =>
        (document.getElementById(`${id}-input-block`).style.opacity = 1);
    const handleBlur = () =>
        (document.getElementById(`${id}-input-block`).style.opacity = 0.7);

    const renderDateInput = () => (
        <input
            id={id}
            name={id}
            placeholder="дата рождения"
            type="date"
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );

    const renderSelectInput = (options) => (
        <select
            id={id}
            name={id}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );

    const renderTextInput = () => (
        <>
            <div className="auth-input-text">{label}</div>
            <input
                placeholder="Ввод..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
                spellCheck="off"
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                required
            />
        </>
    );

    const renderInputField = () => {
        if (id === "birthday") return renderDateInput();

        if (id === "sex")
            return renderSelectInput([
                { value: "Мужской", label: "Мужской" },
                { value: "Женский", label: "Женский" },
            ]);

        if (id === "job" || id === "position")
            return renderSelectInput(
                data.map((elem) => ({ value: elem.id, label: elem.name }))
            );

        if (id === "skills")
            return renderSelectInput([
                { value: "Hard", label: "Отобразить хард навыки" },
                { value: "Soft", label: "Отобразить софт навыки" },
            ]);

        return renderTextInput();
    };

    return (
        <div
            className="auth-input-block"
            id={`${id}-input-block`}
            style={{ opacity: 0.7 }}
        >
            <div className="auth-input-icon">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/auth/${iconPaths[id]}.svg`}
                    alt=""
                />
            </div>
            <div className="auth-input-static">
                {renderInputField()}
                {["birthday", "sex", "job", "position", "skills"].includes(
                    id
                ) || (
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/auth/${id}-static.svg`}
                        alt=""
                    />
                )}
            </div>
        </div>
    );
};

export default InputBlock;

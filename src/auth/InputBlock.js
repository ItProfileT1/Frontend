const InputBlock = ({ id, label, value, onChange, data }) => {
    const iconPaths = {
        name: "login",
        surname: "login",
        patronymic: "login",
        login: "login",
        password: "password",
        city: "city",
        date: "date",
        gender: "gender",
        job: "job",
    };

    const handleFocus = () =>
        (document.getElementById(`${id}-input-block`).style.opacity = 1);
    const handleBlur = () =>
        (document.getElementById(`${id}-input-block`).style.opacity = 0.7);

    const renderInputField = () => {
        if (id === "date") {
            return (
                <input
                    id={id}
                    placeholder="дата рождения"
                    type="date"
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            );
        }

        if (id === "gender") {
            return (
                <select
                    id={id}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                </select>
            );
        }

        if (id === "job") {
            return (
                <select 
                    id={id}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {data.map((elem) => (
                        <option key={elem.id} value={elem.id}>
                            {elem.name}
                        </option>
                    ))}
                </select>
            )
        }

        return (
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
    };

    return (
        <div
            className="auth-input-block"
            id={`${id}-input-block`}
            style={{ opacity: 0.7 }}
        >
            <div className="auth-input-icon">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/auth/${
                        iconPaths[id] || "default"
                    }.svg`}
                    alt=""
                />
            </div>
            <div className="auth-input-static">
                {renderInputField()}
                {id !== "date" && id !== "gender" && id !== "job" && (
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

import React, { useState } from "react";
import "./Auth.css";
import InputBlock from "./InputBlock";

const Login = ({ onLoginSuccess }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const url = "http://localhost:8080/api/v1/auth/sign-in";

    const handleClick = async () => {
        const data = { username: login, password: password };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Ошибка авторизации");
            }

            const result = await response.json();
            const token = result.token;

            onLoginSuccess(token);
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
        }
    };

    return (
        <div className="login-panel auth-panel-bg">
            <div className="auth-info-text">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                    alt=""
                    style={{ width: 100, height: 100 }}
                />
                <div style={{ marginBottom: 10 }}>Добро пожаловать!</div>
                <div>Войдите в Ваш аккаунт</div>
            </div>
            <InputBlock
                id="login"
                label="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <InputBlock
                id="password"
                label="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button
                type="button"
                className="blue-button auth-button"
                onClick={handleClick}
            >
                Войти
            </button>
        </div>
    );
};

export default Login;

import React, { useState, useEffect } from "react";
import "./Auth.css";
import InputBlock from "./InputBlock";

const Auth = ({ onLoginSuccess, onPageChange }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const isAdmin = localStorage.getItem("userRole") === "ROLE_ADMIN";

    useEffect(() => {
        const fetchRoles = async () => {
            if (isAdmin) {
                try {
                    const url = "http://localhost:8080/api/v1/auth/roles";
                    const authToken = localStorage.getItem("authToken");

                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const rolesData = await response.json();
                        setRoles(rolesData);
                        setSelectedRole(rolesData[0]?.id); 
                    }
                } catch (error) {
                    console.error("Ошибка при получении ролей:", error);
                }
            }
        };

        fetchRoles();
    }, [isAdmin]);

    const handleAdminRegistration = async () => {
        try {
            const url = "http://localhost:8080/api/v1/auth/sign-up";
            const data = { 
                username: login, 
                password: password, 
                roleId: selectedRole 
            };
            const authToken = localStorage.getItem("authToken");

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                onPageChange("main");
            }
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
        }
    };

    const handleUserLogin = async () => {
        try {
            const url = "http://localhost:8080/api/v1/auth/sign-in";
            const data = { username: login, password: password };

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Ошибка авторизации");

            const result = await response.json();
            onLoginSuccess(result.token, result.roleResponse.name);
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
        }
    };

    const handleClick = isAdmin ? handleAdminRegistration : handleUserLogin;

    return (
        <div className={`auth-panel auth-panel-bg ${isAdmin ? "auth-admin-panel" : ""}`}>
            {isAdmin && (
                <div className="auth-close">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/close.svg`}
                        alt="Close"
                        onClick={() => onPageChange("main")}
                    />
                </div>
            )}
            <div className="auth-info-text">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                    alt="Logo"
                    style={{ width: 100, height: 100 }}
                />
                <div style={{ marginBottom: 10 }}>Добро пожаловать!</div>
                <div>
                    {isAdmin
                        ? "Зарегистрируйте новый аккаунт"
                        : "Войдите в Ваш аккаунт"}
                </div>
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

            {isAdmin && (
                <InputBlock
                    id="job"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    data={roles}
                />
            )}

            <button
                type="button"
                className="blue-button auth-button"
                onClick={handleClick}
            >
                {isAdmin ? "Создать" : "Войти"}
            </button>
        </div>
    );
};

export default Auth;

import './Auth.css';
import InputBlock from './InputBlock';

const Login = () => {
    return (
        <div id="login-panel">
            <form>
                <div className="auth-info-text">
                    <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="" style={{width: 100, height: 100}}/>
                    <div style={{marginBottom: 10}}>Добро пожаловать!</div>
                    <div>Войдите в Ваш аккаунт</div>
                </div>
                <InputBlock id="login" label="Логин"/>
                <InputBlock id="password" label="Пароль"/>
                <button type="submit" className="blue-button auth-button">Войти</button>
            </form>
        </div>
        
    )
}

export default Login;

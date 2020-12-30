import React from 'react';
import './sing-in-form.css'
import Firebase from '../Firebase/firebase'

const fire = new Firebase();

const INITIAL_STATE = {
    login: '',
    password: '',
};

const authFalse = () => {
    const singIn = document.getElementById('sing_in');
    const height = +window.getComputedStyle(singIn).height.substr(0, 3) + 30;
    singIn.style.height = height + "px";

    const singInErrorText = document.getElementById('sing_in_error_text');
    singInErrorText.style.display = "flex";
}

export class SingInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { login, password } = this.state;
        fire.doSingIn(login, password, this.props.SetLoggedIn, authFalse);
    
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {
            login,
            password,
        } = this.state;

        const isInvalid = password === '' || login === '';

        return (
            <div className="SingIn" id="sing_in">
                <div className="SingInInner">
                    <span className="SingInHeaderText">Авторизация</span>
                    <span className="SingInErrorText" id="sing_in_error_text">Вы ввели неправильные данные</span>
                    <form className="SingInForm" onSubmit={this.onSubmit}>
                        <input className="InputSingIn" name="login" value={login} onChange={this.onChange} type="text" pattern="[A-Za-z]+" maxlength="15" placeholder="Логин*" />
                        <input className="InputSingIn" name="password" value={password} onChange={this.onChange} type="password" placeholder="Пароль*" />
                        <button className="SubmitButtonSingIn" disabled={isInvalid} type="submit">Войти</button>
                    </form>
                </div>
            </div>
        );
    }
}
import React from 'react';
import './sing-up-form.css'
import Firebase from '../Firebase/firebase'

const INITIAL_STATE = {
    surname: '',
    name: '',
    login: '',
    apple: '',
    passwordOne: '',
    passwordTwo: '',
};

const fire = new Firebase();

const authFalse = () => {
    const singUp = document.getElementById('sing_up');
    const height = +window.getComputedStyle(singUp).height.substr(0, 3) + 35;
    singUp.style.height = height + "px";

    const singUpErrorText = document.getElementById('sing_up_error_text');
    singUpErrorText.style.display = "flex";
}

export class SingUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { surname, name, login, apple, passwordOne } = this.state;
        const file = document.getElementById('file_input').files[0];
        fire.doSingUp(surname, name, login, apple, passwordOne, file, this.props.SetLoggedIn, authFalse);

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {
            surname,
            name,
            login,
            apple,
            passwordOne,
            passwordTwo,
        } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || login === '' || surname === '' || name === '';

        return (
            <div className="SingUp" id="sing_up">
                <div className="SingUpInner">
                    <span className="SingUpHeaderText">Регистрация</span>
                    <span className="SingUpErrorText" id="sing_up_error_text">Ошибка регистрации</span>
                    <form className="SingUpForm" onSubmit={this.onSubmit}>
                        <input className="InputSingUp" name="surname" value={surname} onChange={this.onChange} type="text" pattern="[А-Яа-я]+" maxlength="20" placeholder="Фамилия*" />
                        <input className="InputSingUp" name="name" value={name} onChange={this.onChange} type="text" pattern="[А-Яа-я]+" maxlength="20" placeholder="Имя*" />
                        <input className="InputSingUp" name="apple" value={apple} onChange={this.onChange} type="text" maxlength="30" placeholder="Ваша модель iPhone" />
                        <input className="InputSingUp" name="login" value={login} onChange={this.onChange} type="text" pattern="[A-Za-z]+" maxlength="15" placeholder="Логин*" />
                        <input className="InputSingUp" name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Пароль*" />
                        <input className="InputSingUp" name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Повторите пароль*" />
                        <input className="InputFile" id="file_input" required type="file" />
                        <label for="file_input">Выберите вашу фотографию*</label>
                        <button className="SubmitButtonSingUp" disabled={isInvalid} type="submit">Зарегистироваться</button>
                    </form>
                </div>
            </div>
        );
    }
}
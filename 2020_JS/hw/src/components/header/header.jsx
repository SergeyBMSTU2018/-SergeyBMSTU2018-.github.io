import React from 'react';
import './header.css'
import {
    Link
} from "react-router-dom";

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to=''>
            <div className="header">
                    <div className="headerInner">
                        <a href="https://kozievsk.ru/coffee/" class="headerIcon"><i class="fab fa-apple"></i></a>

                        <span className="headerText">iConverter</span>

                        {
                            !this.props.IsLoggedIn()
                                ?
                                <div className="headerButton">
                                    <Link to='singup'>
                                        <button className="headerSingUp">Зарегистрироваться</button>
                                    </Link>
                                    <Link to='singin'>
                                        <button className="headerSingIn">Войти</button>
                                    </Link>
                                </div>
                                :
                                <div className="headerButton">
                                    <Link to='converter'>
                                        <button className="headerSingUp">Конвертировать</button>
                                    </Link>
                                    <button className="headerSingIn" onClick={this.props.SetLoggedIn}>Выйти</button>
                                </div>
                        }
                    </div>
            </div>
            </Link>
        )
    }
}
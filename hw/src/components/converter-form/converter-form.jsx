import React, { Component } from 'react'
import './converter-form.css'
import { ConverterOption } from '../converter-option/converter-option';

const INITIAL_STATE = {
    left_select: '',
    right_select: '',
    left_input: '',
    right_input: '',
};

export class ConverterForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.state = { data: undefined };
    }

    componentDidMount() {
        fetch('https://api.exchangeratesapi.io/latest?base=CAD')
            .then(r => r.json())
            .then(d => this.setState({ data: d.rates }));
        this.setState({ left_select: "CAD", right_select: "CAD" });
    }

    onChangeLeftInput = event => {
        const value = event.target.value.trim().replace(/[-\.;":'a-zA-Zа-яА-Я]/, '');
        this.setState({ [event.target.name]: value })

        const { right_select } = this.state;
        Object.keys(this.state.data).map(key => key === right_select ? this.setState({ right_input: (this.state.data[key] * value) === 0 ? '' : (this.state.data[key] * value).toFixed(3) }) : null)
    }

    onChangeRightInput = event => {
        const value = event.target.value.trim().replace(/[-\.;":'a-zA-Zа-яА-Я]/, '');
        this.setState({ [event.target.name]: value });

        const { right_select } = this.state;
        Object.keys(this.state.data).map(key => key === right_select ? this.setState({ left_input: ((1 / this.state.data[key]) * value) === 0 ? '' : ((1 / this.state.data[key]) * value).toFixed(3) }) : null)
    }

    onChangeLeftSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { left_input, right_select } = this.state;
        fetch('https://api.exchangeratesapi.io/latest?base=' + event.target.value)
            .then(r => r.json())
            .then(d => {
                this.setState({ data: d.rates });
                Object.keys(d.rates).map(key => key === right_select ? this.setState({ right_input: (this.state.data[key] * left_input).toFixed(3) }) : null)
            });
    }

    onChangeRightSelect = event => {
        this.setState({ [event.target.name]: event.target.value });

        const { left_input } = this.state;
        Object.keys(this.state.data).map(key => key === event.target.value ? this.setState({ right_input: (this.state.data[key] * left_input).toFixed(3) }) : null)
    }

    render() {
        const {
            left_select,
            right_select,
            left_input,
            right_input,
        } = this.state;

        return (
            <div className="ConverterForm">
                <div className="ConverterFormInner">
                    <span className="ConverterHeaderText">Конвертер</span>
                    <div className="ConverterInputs">
                        <div className="ConvertOption Left">
                            <select name="left_select" value={left_select} onChange={this.onChangeLeftSelect}>
                                {
                                    !this.state.data
                                        ? <div>Данные не загружены</div>
                                        : Object.keys(this.state.data).map(key => <ConverterOption convertName={key} />)
                                }
                            </select>
                            <input className="InputConverter" name="left_input" value={left_input} onkeyup="this.value = this.value.replace(/[^\d]/g,'');" onChange={this.onChangeLeftInput} type="text" />
                        </div>

                        <div className="ConvertOption">
                            <select name="right_select" value={right_select} onChange={this.onChangeRightSelect} >
                                {
                                    !this.state.data
                                        ? <div>Данные не загружены</div>
                                        : Object.keys(this.state.data).map(key => <ConverterOption convertName={key} />)
                                }
                            </select>
                            <input className="InputConverter" name="right_input" value={right_input} onChange={this.onChangeRightInput} type="text" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
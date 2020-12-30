import React, { Component } from 'react';
import { ExchangeRow } from '../exchange-row/exchange-row'
import './exchange-table.css'

export class ExchangeTable extends Component {
    state = {
        data: undefined
    };

    componentDidMount() {
        fetch('https://api.exchangeratesapi.io/latest?base=RUB')
            .then(r => r.json())
            .then(d => this.setState({ data: d.rates }))
    }

    render() {
        console.log('render')
        return (
            <div className="exchangeTable">
                <div className="exchangeTableInner">
                    <tr>
                        <td className="headTd">
                            Валюта
                        </td>
                        <td className="headTd">
                             
                        </td>
                        <td className="headTd">
                            Курс
                        </td>
                    </tr>
                    {
                        !this.state.data
                            ? <div>Данные не загружены</div>
                            : Object.keys(this.state.data).map(key => <ExchangeRow exchangeKey={key} exchangeValue={this.state.data[key]} />)
                    }
                </div>
            </div>
        )
    }
}

import React from 'react';
import './exchange-row.css'

export const ExchangeRow = ({ exchangeKey, exchangeValue }) => {
    return (
        <tr>
            <td>
                1 RUB
            </td>
            <td>
                =
            </td>
            <td className="Exchange">
                {`${exchangeValue.toFixed(3)} ${exchangeKey}`}
            </td>
        </tr>
    );
}

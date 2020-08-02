import React from 'react';

export const ConverterOption = ({ convertName }) => {
    return (
        <option value={convertName}>{convertName}</option>
    );
}

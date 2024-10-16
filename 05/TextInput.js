/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TextInput({ label, inputState, onChange, signsType }) {
    /*     const [value, setValue] = useState(''); */
    const [inputID] = useState(uuidv4());

    return (
        <div>
            <label htmlFor={inputID}>{label}</label>
            <input id={inputID} value={inputState} onChange={onChange} />
        </div>
    );
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    signsType: PropTypes.oneOf(['string', 'number', 'any']),
};

TextInput.defaultProps = {
    signsType: 'any',
};

export default TextInput;

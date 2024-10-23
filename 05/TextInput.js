/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TextInput({ label, value, onChange, fieldID, signsType, errorObj }) {
    const [inputID] = useState(uuidv4());

    if (errorObj.error === false) {
        return (
            <div>
                <label htmlFor={inputID}>{label}</label>
                <input
                    type={signsType}
                    id={inputID}
                    value={value}
                    onChange={(evt) =>
                        onChange({ type: 'valueUpdate', value: evt.target.value, fieldID })
                    }
                    required
                />
            </div>
        );
    }

    return (
        <div>
            <label htmlFor={inputID}>{label}</label>
            <div style={{ color: 'red' }}>{errorObj.message}</div>
            <input
                id={inputID}
                value={value}
                onChange={(evt) =>
                    onChange({ type: 'valueUpdate', value: evt.target.value, fieldID })
                }
                required
            />
        </div>
    );
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    fieldID: PropTypes.string.isRequired,
    signsType: PropTypes.oneOf(['string', 'number', 'any']),
};

TextInput.defaultProps = {
    signsType: 'any',
};

export default TextInput;

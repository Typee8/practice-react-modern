import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import TextInput from './TextInput';

function Form({ fields }) {
    function updateState(state, action) {}

    function initInputsStates() {
        return fields.map((field) => {
            const { label } = field;
            const object = {};
            object[label] = '';
            return object;
        });
    }

    const [state, dispatch] = useReducer(updateState, null, initInputsStates);

    useEffect(() => console.log(state), []);

    const inputList = fields.map((field) => {
        const { label, signsType } = field;
        const [textInputState] = state.filter((obj) => {
            const result = Object.keys(obj).includes(label);
            return result === true;
        });
        console.log(textInputState);
        console.log(state);

        return (
            <TextInput
                inputState={textInputState[label]}
                onChange={dispatch}
                key={uuidv4()}
                label={label}
                signsType={signsType}
            />
        );
    });

    return (
        <form>
            {inputList}
            <input type="submit" />
        </form>
    );
}

Form.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired)
        .isRequired,
};

export default Form;

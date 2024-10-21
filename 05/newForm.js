import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import TextInput from './TextInput';

function Form({ fields }) {
    function updateState(state, action) {
        const newState = state.map((obj) => {
            const stateKeys = Object.keys(obj);
            const actionKeys = Object.keys(action);
            const result = actionKeys.some((actionKey) => stateKeys.includes(actionKey));

            if (result === true) {
                return action;
            }

            return obj;
        });

        return newState;
    }

    function initInputsStates() {
        return fields.map((field) => {
            const { label } = field;
            const object = {};
            object[label] = '';
            return object;
        });
    }

    const [state, dispatch] = useReducer(updateState, null, initInputsStates);

    const inputList = fields.map((field) => {
        const { label, signsType } = field;
        const [textInputState] = state.filter((obj) => {
            const result = Object.keys(obj).includes(label);
            return result === true;
        });
        const inputID = uuidv4();

        return (
            <div key={uuidv4()}>
                <label htmlFor={inputID}>{label}</label>
                <input
                    id={inputID}
                    value={textInputState[label]}
                    onChange={(evt) => dispatch({ [label]: evt.target.value })}
                />
            </div>
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

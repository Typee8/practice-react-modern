import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import TextInput from './TextInput';

function Form({ fields }) {
    function initInputsStates() {
        return fields.map((field) => {
            const { label, signsType } = field;
            const object = {};
            object.name = label;
            object.value = '';
            object.signsType = signsType;
            object.fieldID = uuidv4();
            return object;
        });
    }

    function updateState(state, action) {
        switch (action.type) {
        case 'clearForm': {
            const newState = initInputsStates();
            return newState;
        }
        case 'valueUpdate': {
            const stateCopy = JSON.parse(JSON.stringify(state));
            const currentObj = stateCopy.find((obj) => obj.fieldID === action.fieldID);
            const changedObj = action;

            Object.assign(currentObj, changedObj);

            const newState = stateCopy.map((obj) => {
                if (obj.fieldID === action.fieldID) {
                    return currentObj;
                }

                return obj;
            });
            return newState;
        }

        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(updateState, null, initInputsStates);

    function saveContact(evt) {
        evt.preventDefault();
        // place for fetch

        alert('Kontakt został zapisany.');
        // Tutaj skończyłem
        dispatch({ type: 'clearForm' });
    }

    const inputList = state.map((obj) => {
        const {
            name, value, fieldID, signsType,
        } = obj;

        return (
            <TextInput
                onChange={dispatch}
                value={value}
                key={fieldID}
                fieldID={fieldID}
                label={name}
                signsType={signsType}
            />
        );
    });

    return (
        <form onSubmit={saveContact}>
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

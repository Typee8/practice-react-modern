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
            object.errorObj = { error: false };
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
            case 'inputValidation': {
                return action.newState;
            }

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(updateState, null, initInputsStates);

    function saveContact() {
        // place for fetch

        alert('Kontakt został zapisany.');
        dispatch({ type: 'clearForm' });
    }

    function stringValidation(value) {
        const regex = /^[A-Za-z]+$/;
        return regex.test(value);
    }

    function numberValidation(value) {
        const regex = /^\d+$/;
        return regex.test(value);
    }

    function lengthValidation(value) {
        return value.length < 50;
    }

    function formValidation() {
        const errors = [];

        state.forEach((obj) => {
            const { value, signsType, fieldID } = obj;
            if (signsType === 'text') {
                const result = stringValidation(value);
                if (result === false) {
                    errors.push({ message: 'Input should contain letters only.', id: fieldID });
                }
            }
            if (signsType === 'number') {
                const result = numberValidation(value);
                if (result === false) {
                    errors.push({ message: 'Input should contain numbers only.', id: fieldID });
                }
            }

            const result = lengthValidation(value);
            if (result === false) {
                errors.push({
                    message: 'Input should be maximum 50 letters long.',
                    id: fieldID,
                });
            }
        });

        const copyState = JSON.parse(JSON.stringify(state));

        const newState = copyState.map((obj) => {
            const wantedObj = errors.find((error) => error.id === obj.fieldID);
            console.log(`Wanted object be like: ${wantedObj}`);
            if (!wantedObj) {
                return obj;
            }

            const errorObj = { error: true, message: wantedObj.message };
            Object.assign(obj, { errorObj });
            return obj;
        });

        dispatch({ type: 'inputValidation', newState });

        if (errors.length === 0) return true;
        return false;
    }

    function handleOnSubmit(evt) {
        evt.preventDefault();
        const result = formValidation();
        if (result === true) {
            saveContact();
        }
    }

    const inputList = state.map((obj) => {
        const { name, value, fieldID, signsType, errorObj } = obj;

        return (
            <TextInput
                onChange={dispatch}
                value={value}
                key={fieldID}
                fieldID={fieldID}
                label={name}
                signsType={signsType}
                errorObj={errorObj}
            />
        );
    });

    return (
        <form onSubmit={handleOnSubmit}>
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

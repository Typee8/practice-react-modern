import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import TextInput from './TextInput';

function Form({ fields }) {
    function updateState() {
        return console.log('Reducer will be written');
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

    useEffect(() => console.log(state), []);

    const inputList = fields.map((field) => {
        const { label, signsType } = field;
        return <TextInput key={uuidv4()} label={label} signsType={signsType} />;
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

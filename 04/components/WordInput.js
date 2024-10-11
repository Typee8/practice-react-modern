import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function WordInput({
    word, setSignsTotalLength, updateScores, StopwatchRef, regenerateWord,
}) {
    const [text, setText] = useState('');
    const inputRef = useRef();

    function resetStopwatch() {
        StopwatchRef.current.setTime(0);
    }

    function onInputChange(evt) {
        setText(evt.target.value);

        const { value: inputValue } = evt.target;
        if (word === inputValue) {
            inputRef.current.blur();
            setSignsTotalLength((prevLength) => prevLength + inputValue.length);
            updateScores(evt);
            resetStopwatch();
            setText('');
            alert('Correct!');
            regenerateWord();
        }
    }

    return (
        <div>
            <h1>{word}</h1>
            <input
                onFocus={() => StopwatchRef.current.setIsRunning(true)}
                onBlur={() => StopwatchRef.current.setIsRunning(false)}
                value={text}
                onChange={onInputChange}
                ref={inputRef}
            />
        </div>
    );
}

WordInput.propTypes = {
    word: PropTypes.string,
    setSignsTotalLength: PropTypes.func.isRequired,
    updateScores: PropTypes.func.isRequired,
    // eslint-disable-next-line
    StopwatchRef: PropTypes.object,
    regenerateWord: PropTypes.func.isRequired,
};

WordInput.defaultProps = {
    word: '',
};

export default WordInput;

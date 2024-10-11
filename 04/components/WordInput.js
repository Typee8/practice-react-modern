import PropTypes from 'prop-types';

function WordInput({
    word, text, WordInputRef, setIsStopWatchRunning, checkTypedWord,
}) {
    return (
        <div>
            <h1>{word}</h1>
            <input
                onFocus={() => setIsStopWatchRunning(true)}
                onBlur={() => setIsStopWatchRunning(false)}
                value={text}
                onChange={checkTypedWord}
                ref={WordInputRef}
            />
        </div>
    );
}

WordInput.propTypes = {
    word: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    WordInputRef: PropTypes.isRequired,
    setIsStopWatchRunning: PropTypes.func.isRequired,
    checkTypedWord: PropTypes.func.isRequired,
};

export default WordInput;

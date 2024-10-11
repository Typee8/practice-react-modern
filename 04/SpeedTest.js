/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { v4 as uuidv4 } from 'uuid';
import {
    useState, useEffect, useRef, useCallback,
} from 'react';
import useRandomItem from './hook';
import Stopwatch from './components/Stopwatch';
import WordInput from './components/WordInput';
import ScoreList from './components/ScoreList';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [text, setText] = useState('');
    const [isStopWatchRunning, setIsStopWatchRunning] = useState(false);
    const [signsTotalLength, setSignsTotalLength] = useState(0);
    const [scores, setScores] = useState([]);
    const WordInputRef = useRef();
    const StopwatchRef = useRef();

    useEffect(() => {
        regenerateWord();
    }, []);

    const convertTime = useCallback((centiseconds) => {
        const outputCentiseconds = centiseconds % 100;
        const seconds = Math.floor((centiseconds % 6000) / 100);
        const minutes = Math.floor((centiseconds % 360000) / 6000);
        const hours = Math.floor(centiseconds / 360000);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds,
        ).padStart(2, '0')}:${String(outputCentiseconds).padStart(2, '0')}`;
    }, []);

    function resetStopWatch() {
        StopwatchRef.current.setTime(0);
    }

    const checkTypedWord = useCallback((evt) => {
        setText(evt.target.value);

        if (word === evt.target.value) {
            WordInputRef.current.blur();
            setSignsTotalLength((prevLength) => prevLength + text.length);
            const scoresObj = {
                id: uuidv4(),
                word: evt.target.value,
                wordLength: evt.target.value.length,
                passedTime: convertTime(StopwatchRef.current.time),
            };

            if (scores.length === 0) {
                setScores([scoresObj]);
            } else {
                setScores([...scores, scoresObj]);
            }
            resetStopWatch();
            setText('');
            alert('Correct!');
            regenerateWord();
        }
    }, []);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '100px',
    };

    return (
        <div style={containerStyle}>
            <Stopwatch
                isStopWatchRunning={isStopWatchRunning}
                convertTime={convertTime}
                ref={StopwatchRef}
            />
            <WordInput
                word={word}
                text={text}
                WordInputRef={WordInputRef}
                setIsStopWatchRunning={setIsStopWatchRunning}
                checkTypedWord={checkTypedWord}
            />
            <ScoreList scores={scores} signsTotalLength={signsTotalLength} />
        </div>
    );
}

export default SpeedTest;

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef } from 'react';
import useRandomItem from './hook';
import Stopwatch from './Stopwatch';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [text, setText] = useState('');
    const [isStopWatchRunning, setIsStopWatchRunning] = useState(false);
    const [signsTotalLength, setSignsTotalLength] = useState(0);
    const [scores, setScores] = useState([]);
    const wordInputRef = useRef();
    const StopwatchRef = useRef();

    useEffect(() => {
        regenerateWord();
    }, []);

    function convertTime(centiseconds) {
        const outputCentiseconds = centiseconds % 100;
        const seconds = Math.floor((centiseconds % 6000) / 100);
        const minutes = Math.floor((centiseconds % 360000) / 6000);
        const hours = Math.floor(centiseconds / 360000);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds,
        ).padStart(2, '0')}:${String(outputCentiseconds).padStart(2, '0')}`;
    }

    function resetStopWatch() {
        StopwatchRef.current.setTime(0);
    }

    function checkTypedWord(evt) {
        setText(evt.target.value);

        if (word === evt.target.value) {
            wordInputRef.current.blur();
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
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '100px',
    };

    const scoreListStyle = {
        listStyle: 'none',
    };

    return (
        <div style={containerStyle}>
            <Stopwatch
                ref={StopwatchRef}
                isRunning={isStopWatchRunning}
                convertTime={convertTime}
            />
            <div>
                <h1>{word}</h1>
                <input
                    onFocus={() => setIsStopWatchRunning(true)}
                    onBlur={() => setIsStopWatchRunning(false)}
                    value={text}
                    onChange={checkTypedWord}
                    ref={wordInputRef}
                />
            </div>
            <ul style={scoreListStyle}>
                <li>
                    Signs Total Length:
                    {signsTotalLength}
                </li>
                {scores.map((ele) => (
                    <>
                        <li>
                            Word:
                            {ele.word}
                        </li>
                        <li>
                            Length:
                            {ele.wordLength}
                        </li>
                        <li>
                            Time:
                            {ele.passedTime}
                        </li>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default SpeedTest;

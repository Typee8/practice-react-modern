/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react';
import useRandomItem from './hook';
import Stopwatch from './Stopwatch';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [text, setText] = useState();
    const [isStopWatchRunning, setIsStopWatchRunning] = useState();
    /*     const [passedTime, setPassedTime] = useState(0); */
    /*     const passedTimeID = useRef(); */
    const [signsTotalLength, setSignsTotalLength] = useState();
    const [scores, setScores] = useState(null);

    useEffect(() => {
        regenerateWord();
    }, []);

    /*     function startCount() {
        passedTimeID.current = setInterval(() => {
            setPassedTime((prevTime) => prevTime + 1);
        }, 10);
    }

    function stopCount() {
        clearInterval(passedTimeID.current);
    } */

    function convertTime(centiseconds) {
        const outputCentiseconds = centiseconds % 60;
        const seconds = Math.floor(centiseconds / 100) % 60;
        const minutes = Math.floor(centiseconds / 6000) % 60;
        const hours = Math.floor(centiseconds / 360000) % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds,
        ).padStart(2, '0')}:${String(outputCentiseconds).padStart(2, '0')}`;
    }

    function checkTypedWord(evt) {
        setText(evt.target.value);
        console.log(text);
        if (word === evt.target.value) {
            /*             console.log(passedTimeID.current); */
            /*             clearInterval(passedTimeID.current); */
            /*             setSignsTotalLength((prevLength) => prevLength + text.length); */
            setScores({
                scores,
                word: evt.target.value,
                wordLength: evt.target.value.length,
                /*                 passedTime: convertTime(passedTime), */
            });
            alert('Correct!');
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
            <Stopwatch isRunning={isStopWatchRunning} convertTime={convertTime} />
            <div>
                <h1>{word}</h1>
                <input
                    onFocus={() => setIsStopWatchRunning(true)}
                    onBlur={() => setIsStopWatchRunning(false)}
                    value={text}
                    onChange={checkTypedWord}
                />
            </div>
            <ul style={scoreListStyle}>
                {scores !== null
                    ? Object.keys(scores).forEach(
                          (key) => console.log(scores[key]) /* (
                        <>
                            <li>
                                Word:
                                {key.word}
                            </li>
                            <li>
                                Length:
                                {key.wordLength}
                            </li>
                            <li>
                                Time:
                                {key.passedTime}
                            </li>
                        </>
                    ) */,
                      )
                    : null}
                {/* 
                <li>
                    Signs Total Length:
                    {signsTotalLength}
                </li> */}
                {/*                 <li>
                    Word:
                    {word}
                </li>
                <li>
                    Length:
                    {word.length}
                </li>
                <li>
                    Time:
                    {convertTime(passedTime)}
                </li> */}
            </ul>
        </div>
    );
}

export default SpeedTest;

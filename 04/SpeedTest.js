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
    const [signsTotalLength, setSignsTotalLength] = useState(0);
    const [scores, setScores] = useState([]);
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

    const updateScores = useCallback(
        (evt) => {
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
        },
        [scores],
    );

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '100px',
    };

    return (
        <div style={containerStyle}>
            <Stopwatch convertTime={convertTime} ref={StopwatchRef} />
            <WordInput
                word={word}
                setSignsTotalLength={setSignsTotalLength}
                updateScores={updateScores}
                regenerateWord={regenerateWord}
                StopwatchRef={StopwatchRef}
            />
            <ScoreList scores={scores} signsTotalLength={signsTotalLength} />
        </div>
    );
}

export default SpeedTest;

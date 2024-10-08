import { useState, useEffect, useRef } from 'react';

export default function Stopwatch({ isRunning, convertTime }) {
    const [time, setTime] = useState(0);
    const intervalID = useRef();

    function startCount() {
        intervalID.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 10);
    }

    function stopCount() {
        clearInterval(intervalID.current);
    }

    useEffect(() => {
        if (isRunning === true) {
            startCount();
        } else if (isRunning === false) {
            stopCount();
        }
    }, [isRunning]);

    return <div>{convertTime(time)}</div>;
}

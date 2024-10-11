import {
    useState, useEffect, useRef, forwardRef, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

const Stopwatch = forwardRef(({ isStopWatchRunning, convertTime }, ref) => {
    const [time, setTime] = useState(0);
    const intervalID = useRef();

    useImperativeHandle(ref, () => ({ time, setTime }), [time, setTime]);

    function startCount() {
        intervalID.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 10);
    }

    function stopCount() {
        clearInterval(intervalID.current);
    }

    useEffect(() => {
        if (isStopWatchRunning === true) startCount();
        if (isStopWatchRunning === false) stopCount();
    }, [isStopWatchRunning]);

    return <div>{convertTime(time)}</div>;
});

Stopwatch.propTypes = {
    isStopWatchRunning: PropTypes.bool.isRequired,
    convertTime: PropTypes.func.isRequired,
};

export default Stopwatch;

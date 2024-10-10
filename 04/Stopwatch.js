import {
    useState, useEffect, useRef, forwardRef, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

const Stopwatch = forwardRef(({ isRunning, convertTime }, ref) => {
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
        if (isRunning === true) startCount();
        if (isRunning === false) stopCount();
    }, [isRunning]);

    return <div>{convertTime(time)}</div>;
});

Stopwatch.propTypes = {
    isRunning: PropTypes.bool.isRequired,
    convertTime: PropTypes.func.isRequired,
};

export default Stopwatch;

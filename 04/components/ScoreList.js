import PropTypes from 'prop-types';

function ScoreList({ scores, signsTotalLength }) {
    const scoreListStyle = {
        listStyle: 'none',
    };

    return (
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
    );
}

ScoreList.propTypes = {
    scores: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.isRequired,
            word: PropTypes.string.isRequired,
            wordLength: PropTypes.number.isRequired,
            passedTime: PropTypes.isRequired,
        }),
    ).isRequired,
    signsTotalLength: PropTypes.number.isRequired,
};

export default ScoreList;

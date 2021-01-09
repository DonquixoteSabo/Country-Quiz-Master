import resultImg from '../../assets/result.svg';

import '../../styles/ResultPanel.css';

const ResulPanel = ( {handleResetButton, goodAnswers}) => {

    return (
        <div className='result-panel'>
            <img src={resultImg} alt="Nice"/>
            <div className='display-results'>
                <h1 className='result-title'>Results</h1>
                <p>You got <span>{goodAnswers}</span> correct answers</p>
            </div>
            <button className='quiz-button quiz-button-try' onClick={handleResetButton}>try again</button>
        </div>
    );
}
 
export default ResulPanel;
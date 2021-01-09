import {QUESTION_TYPES} from '../../utilities/constants';

import headerImg from '../../assets/header.svg';

const QuestionPanel = ({loading, correctAnswer, answers, chooseAnswer, handleNextButton, isAnswered, questionType}) => {
    return(
        <div className="quiz-panel-container">
                <img src={headerImg} alt="" className="quiz-img"/>
                <div className="quiz-question">
                {loading ? null :  (
                        questionType === QUESTION_TYPES.CAPITAL ? (
                            `${correctAnswer.capital} is a capital of`
                        ) : (
                            <div className='flag-cointainer'> 
                                <img className='flag' src={correctAnswer.flag} alt='something went wrong!'/>
                                Which country does this flag belong to? 
                            </div> 
                            ) 
                    //    <h1>{questionType}</h1>
                        )
                    }</div>
                <ul className="quiz-answers">
                    {loading ?
                     <div>Next question is loading...</div>
                     : (
                    // We can't use ID as key because numericCode is not unique. Its good when it comes about comparing values but using it as a key create some bugs
                    answers.map((answer, index) => <li className='quiz-answer'
                    onClick={()=>chooseAnswer(answer.id)}
                    id={'id' + answer.id}
                    key={index}>{answer.name}</li>)
                    )}
                      { isAnswered && 
                        (
                            <button 
                            className='quiz-button quiz-button-next' onClick={handleNextButton}>next</button>
                         )
                    }
                </ul>

        </div>
    )
}
 
export default QuestionPanel;
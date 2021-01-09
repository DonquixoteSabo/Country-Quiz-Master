import { useState, useEffect } from 'react';

import QuestionPanel from './Questionpanel';
import ResultPanel from './ResultPanel';

import { BASE_URL, QUESTION_TYPES } from '../../utilities/constants';
import { swap } from '../../utilities/swap';
import { doesArrayHaveDuplicates } from '../../utilities/doesArrayHaveDuplicates';

import '../../styles/QuizPanel.css';

const QuizPanel = () => {

  const [questionType,setQuestionType] = useState(QUESTION_TYPES.FLAG);

  const [gameStart, setGameStart] = useState(true);

  const [loading, setLoading] = useState(true);

  //All answers
  const [answers, setAnswers] = useState([]);

  const [correctAnswer, setCorrectAnswer] = useState('');

  //Check if user answered
  const [isAnswered, setIsAnswered] = useState(false);

  const [goodAnswers, setGoodAnswers] = useState(0);

  const getRandomFlagQuestion = () => {
    fetch(`${BASE_URL}?fields=name;flag;numericCode`)
      .then(response => response.json())
      .then(data => {
        let newAnswers = [];
        const item = data[Math.floor(Math.random() * data.length)];
        const newCorrectAnswer = {
          id: item.numericCode,
          flag: item.flag,
          name: item.name,
        };
        setCorrectAnswer({
          id: newCorrectAnswer.id,
          name: newCorrectAnswer.name,
          flag: newCorrectAnswer.flag,
        });

        //Generate 3 random answers
        for (let i = 0; i < 3; i++) {
          const random = Math.floor(Math.random() * data.length);
          newAnswers.push({
            id: data[random].numericCode,
            name: data[random].name,
          });
        }
        //concat random answers with correct answer
        newAnswers = newAnswers.concat(newCorrectAnswer);

        //this function change elements order
        swap(newAnswers, 3, Math.floor(Math.random() * 3));

        setAnswers(newAnswers);
      })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  };

  const getRandomCapitalQuestion = () => {
    fetch(`${BASE_URL}?fields=name;capital;numericCode`)
      .then(response => response.json())
      .then(data => {
        let newAnswers = [];
        const item = data[Math.floor(Math.random() * data.length)];
        const newCorrectAnswer = {
          id: item.numericCode,
          capital: item.capital,
          name: item.name,
        };
        setCorrectAnswer({
          id: newCorrectAnswer.id,
          name: newCorrectAnswer.name,
          capital: newCorrectAnswer.capital,
        });

        //Generate 3 random answers
        for (let i = 0; i < 3; i++) {
          const random = Math.floor(Math.random() * data.length);
          newAnswers.push({
            id: data[random].numericCode,
            name: data[random].name,
          });
        }
        //concat random answers with correct answer
        newAnswers = newAnswers.concat(newCorrectAnswer);

        //this function change elements order
        swap(newAnswers, 3, Math.floor(Math.random() * 3));

        setAnswers(newAnswers);
      })
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  };
  const handleErrors = () => {
    if (loading === false) {
      const testingArray = answers.filter(answer => answer.length > 0);

      //some elements in api don't have all properties so we must check

      // if array have 4 elements
      if (testingArray.length !== 4) {
        getRandomQuestionType()
      }
      //check if we got capital name;
      if (correctAnswer.name === '' || correctAnswer.name) {
        getRandomQuestionType()
      }
      //if array doesnt have duplicates
      if (doesArrayHaveDuplicates(testingArray)) {
        getRandomQuestionType()
      }
    }
  };
  const chooseAnswer = id => {
    if (!isAnswered) {
      document.getElementById(`id${correctAnswer.id}`).style.backgroundColor = '#60BF88';
      if (id === correctAnswer.id) {
        // setUserPositiveResult(true);
        setGoodAnswers(prevState => prevState + 1);
      } else {
        // setUserPositiveResult(false);
        setGameStart(false);
        document.getElementById(`id${id}`).style.backgroundColor = '#EA8282';
      }
    }
    setIsAnswered(true);
  };

  const getRandomQuestionType = () => {
      const random = Math.floor(Math.random() * 2);
      if(random === 0){
        setQuestionType(QUESTION_TYPES.CAPITAL);
        getRandomCapitalQuestion()
      }
      else{
        setQuestionType(QUESTION_TYPES.FLAG);
        getRandomFlagQuestion()
      }
  }

  const renderQuestion = () => {
    setLoading(true);
    getRandomQuestionType();
    handleErrors();
    setIsAnswered(false);
  };

  useEffect(() => {
    renderQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetButton = () =>{
    renderQuestion();
    setGameStart(true);
    setGoodAnswers(0);
  }

  return (
    <>
      <h1 className='quiz-title'>Country Quiz</h1>
      {isAnswered || gameStart ? (
        <QuestionPanel
        loading={loading}
        correctAnswer={correctAnswer}
        answers={answers}
        chooseAnswer={chooseAnswer}
        handleNextButton={renderQuestion}
        isAnswered={isAnswered}
        questionType={questionType}
        />
      ) : (
          <ResultPanel 
          handleResetButton={handleResetButton}
          goodAnswers={goodAnswers}
          />
      )}
    </>
  );
};

export default QuizPanel;

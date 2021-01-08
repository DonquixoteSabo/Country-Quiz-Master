import {useState, useEffect} from 'react';

import headerImg from '../../assets/header.svg';
import {BASE_URL} from '../../utilities/constants';
import {swap} from '../../utilities/swap';
import {doesArrayHaveDuplicates} from '../../utilities/doesArrayHaveDuplicates';
const QuizPanel = () => {

    const [loading, setLoading] = useState(true);
    
    //All answers
    const [answers, setAnswers] = useState([]);

    const [correctAnswer, setCorrectAnswer] = useState('');

    //Check if user answered 
    const [isAnswered, setIsAnswered] = useState(false);

    //Check if user answered properly or not
    const [userPositiveResult, setUserPositiveResult] = useState(false);

    const getRandomCapitalQuestion = () => {
        fetch(`${BASE_URL}?fields=name;capital;flag;numericCode`)
        .then(response => response.json())
        .then(data => {
            let newAnswers = []
            const item = data[Math.floor(Math.random() * data.length)];;
            const newCorrectAnswer = {
                id: item.numericCode,
                capital: item.capital,
                name: item.name,
            }
            setCorrectAnswer({
                id: newCorrectAnswer.id, 
                name: newCorrectAnswer.name,
                capital: newCorrectAnswer.capital,
            });

            //Generate 3 random answers
            for(let i = 0; i<3; i++){
                const random = Math.floor(Math.random() * data.length);
                newAnswers.push({
                    id: data[random].numericCode,
                    name: data[random].name,
                })
            }
            //concat random answers with correct answer
            newAnswers = newAnswers.concat(newCorrectAnswer)

            //this function change elements order
            swap(newAnswers, 3,  Math.floor(Math.random() * 3));

            setAnswers(newAnswers);

        })
        .then(()=> setLoading(false))
        .catch(err => console.log(err))
        
    }
    const handleErrors = () => {
        
        if(loading === false){
            const testingArray = answers.filter(answer => answer.length > 0)
        
            //some elements in api don't have all properties so we must check

            // if array have 4 elements
            if(testingArray.length !== 4){
                getRandomCapitalQuestion()
            } 
            //check if we got capital name; 
            if(correctAnswer.name === ''){
                getRandomCapitalQuestion();
            }
            //if array doesnt have duplicates
            if(doesArrayHaveDuplicates(testingArray)){
                getRandomCapitalQuestion();
            }
        }
    }
    const chooseAnswer = (id) =>{
        if(!isAnswered){
        if(id === correctAnswer.id){
            setUserPositiveResult(true);
        } else{
            setUserPositiveResult(false);
        }
    }
        setIsAnswered(true);
    }

    const renderQuestion = () => {
        setLoading(true)
        getRandomCapitalQuestion();
        handleErrors()
        setIsAnswered(false)
    }
    const handleSubmitButton = () =>{
        renderQuestion();
    }
    useEffect(()=>{
        renderQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="quiz-panel-container">
                <h1 className="quiz-title">Country Quiz</h1>
                <img src={headerImg} alt="" className="quiz-img"/>
                <h2 className="quiz-question">
                    {loading ? null :  `${correctAnswer.capital} is a capital of`}</h2>
                <ul className="quiz-answers">
                    {loading ? <div>Next question is loading...</div> : (
                    // <li>
                    answers.map(answer => <li onClick={()=>chooseAnswer(answer.id)} key={answer.id}>{answer.name}</li>)
                    // </li>
                    )}
                </ul>
                {isAnswered ? (
                    userPositiveResult ? (
                            <button onClick={handleSubmitButton}>next</button>
                    ) : (
                        <button onClick={handleSubmitButton}>try again</button>
                    )
                ) : null }
        </div>
    )
}
 
export default QuizPanel;
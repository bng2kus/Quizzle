import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'


const Questions = ({ set, id }) => {
  //values to generate quiz questions and answers
  const [quizQuestions] = useState(set.definitions);
  const [quizAnswers] = useState(set.terms);
  //array to hold users selected choices
  const [userAnswers, setUserAnswers] = useState(new Array(set.definitions.length).fill(null));

  //value to display final score
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [showWrongQuestions, setShowWrong] = useState([]);
  const [showRightQuestions, setShowRight] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState(false);
  const [rightQuestions, setRightQuestions] = useState(false);


  //shuffle the options for each question rendered
  const shuffleOptions = (options) => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j],
        shuffledOptions[i],
      ];
    }
    return shuffledOptions;
  };

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomAnswer =
        quizAnswers[Math.floor(Math.random() * quizAnswers.length)];
      if (!options.includes(randomAnswer)) {
        options.push(randomAnswer);
      }
    }
    return shuffleOptions(options);
  };

  //generates question option array
  const generateQuestionOptions = () => {
    const questionOptions = [];
    for (let i = 0; i < quizQuestions.length; i++) {
      const question = quizQuestions[i];
      const correctAnswer = quizAnswers[i];
      const options = generateOptions(correctAnswer);
      questionOptions.push({
        question,
        options,
        correctAnswerIndex: options.indexOf(correctAnswer),
      });
    }
    return shuffleOptions(questionOptions);
  };



  //array for question options
  const [questionOptions, setQuestionOptions] = useState([]);



  //upon loading page, the test question and options are generated
  useEffect(() => {
    const shuffledQuestionOptions = generateQuestionOptions();
    setQuestionOptions(shuffledQuestionOptions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  //handles users input based on selected option
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };



  //handles test submission
  const handleSubmit = () => {
    let result = 0;
    const rightQuestions = [];
    const wrongQuestions = [];

    for (let i = 0; i < questionOptions.length; i++) {
      if (userAnswers[i] === questionOptions[i].correctAnswerIndex) {
        result++;
        setRightQuestions(true);
        rightQuestions.push(i);
      } 
      else {
        setWrongQuestions(true);
        wrongQuestions.push(i);
      }
    }
    setScore(result);
    setShowRight(rightQuestions);
    setShowWrong(wrongQuestions);
    setFinish(true);
  };


  //reloads current page
  const reloadTest = () => {
    window.location.reload();
  }


  return (
    <div className="question-container">

    {/*div for questions and answers*/}
    {!finish && (
      <div className="question">
      {questionOptions.map((questionOption, questionIndex) => (
        <div className="questions" key={questionIndex}>
          <p>
            {questionIndex + 1}. {questionOption.question}
          </p>
          <div className="options">
            {questionOption.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  required
                  value={option}
                  checked={userAnswers[questionIndex] === optionIndex}
                  onChange={() =>
                    handleAnswerSelect(questionIndex, optionIndex)
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/*div for submit button*/}
      {!finish && (
        <div className="submit">
          <button className="submit-button" onClick={handleSubmit}>
            Submit Test
          </button>
        </div>
      )}
      </div>
    )}
      

      {/*div for test results*/}
      {finish && (
        <div className="results">
          <h1 className="your-score">Your Score: {score} / {quizQuestions.length}</h1>

          {rightQuestions && <h2 className="correct">Correct Answers</h2>}
          {showRightQuestions.map((questionIndex) => (
            <div className="show-correct" key={questionIndex}>
              <p className="term-preview-correct">
                {questionIndex + 1}.{" "}
                {questionOptions[questionIndex].question}
              </p>
            </div>
          ))}

          {wrongQuestions && <h2 className="incorrect">Incorrect Answers</h2>}
          {showWrongQuestions.map((questionIndex) => (
            <div className="show-incorrect" key={questionIndex}>
              <p className="term-preview-incorrect">
                {questionIndex + 1}.{" "}
                {questionOptions[questionIndex].question}
              </p>
            </div>
          ))}
          
          <button className="reset-button" onClick={reloadTest}>
              Try Again
          </button>

          <button className="study-button">
              <Link to={`/sets/${id}`}>
                  Back to Set
              </Link>
          </button>


        </div>
      )}
    </div>
  );
};

export default Questions;

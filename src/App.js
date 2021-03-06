import "./styles.css";
import React, { useState, useEffect, useContext, createContext } from "react";

const contextQuiz = createContext();

async function fetchQuestions() {
  const url = "https://jservice.io/api/random";
  let res = await fetch(url);
  res = await res.json();
  return res;
}

function QuizPage() {
  const [question, setQuestion] = useState({});
  const [questionNo, setQuestionNo] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  const [start, setStart] = useState(false);
  const [buttonState, setButtonState] = useState("Next");
  useEffect(async () => {
    const val = await fetchQuestions();
    setQuestion(...val);
  }, [, questionNo]);
  const startQuiz = () => {
    setStart(true);
  };
  const handleNext = () => {
    if (userAnswer.toLowerCase() == question.answer.toLowerCase()) {
      setShowAnswer("Correct Answer");
    } else {
      setShowAnswer(` '${userAnswer}' is an Incorrect Answer`);
    }
    setButtonState("Loading..");
    setTimeout(() => {
      setQuestionNo((prev) => prev + 1);
      setButtonState("Next");
      setShowAnswer("");
      setUserAnswer("");
    }, 2000);
  };
  const saveAnswer = (e) => {
    setUserAnswer(e.target.value);
  };

  return (
    <div className="App">
      {start == false ? (
        <div className="center">
          <h1>Start Quiz</h1>
          <button onClick={startQuiz} className="btn">
            Start
          </button>
        </div>
      ) : (
        <div className="app-inner">
          <div>
            <div className="center">
              <h1>Quiz</h1>
            </div>
            <div className="questions">
              <h3>
                <span>{questionNo})&nbsp;</span>
                {question.question}&nbsp;?
              </h3>
            </div>
            <input
              type="text"
              onChange={saveAnswer}
              value={userAnswer}
              className="input"
              placeholder="Enter your answer.."
            />
            <button onClick={handleNext} className="btn">
              {buttonState}
            </button>
            {showAnswer == "Correct Answer" ? (
              <h3 style={{ color: "green" }}>{showAnswer}</h3>
            ) : (
              <h3 style={{ color: "red" }}>{showAnswer}</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <QuizPage />
    </React.Fragment>
  );
}

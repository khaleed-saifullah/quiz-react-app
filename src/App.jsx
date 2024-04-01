import { useState } from "react";
import "./App.css";
import quizData from "./utils/quizData";

function App() {
  const [score, setScore] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [answerArray, setAnswerArray] = useState(
    Array(quizData.length).fill("")
  );

  const quizDataAnswer = [];

  quizData.map((data, index) => {
    quizDataAnswer.push(data.answer);
  });

  const nextQuiz = () => {
    setQuizIndex(quizIndex + 1);
  };

  const prevQuiz = () => {
    setQuizIndex(quizIndex - 1);
  };

  const submitQuiz = () => {
    setShowScoreBoard(true);
    setStartQuiz(false);
    for (let i = 0; i < quizDataAnswer.length; i++) {
      if (quizDataAnswer[i].toString() === answerArray[i]) {
        setScore((score) => score + 1);
      }
    }
  };

  const handleAnswer = (e) => {
    const newAnswerArray = [...answerArray];
    newAnswerArray[quizIndex] = e.target.value;
    setAnswerArray(newAnswerArray);
  };

  return (
    <>
      <section className="wrapper">
        <div className="container">
          <div className="row">
            <div className="offset-md-3 col-md-6">
              <div className="quiz-wrap-container">
                <div
                  className={
                    !startQuiz && !showScoreBoard
                      ? "start-quiz-container"
                      : "hidden"
                  }
                >
                  <div
                    className="btn btn-info"
                    id="start-btn"
                    onClick={() => setStartQuiz(true)}
                  >
                    Start Quiz
                  </div>
                </div>
                <h4
                  className={
                    startQuiz ? "text-center mb-5" : "text-center mb-5 hidden"
                  }
                >
                  Question {quizIndex + 1} of {quizData.length}
                </h4>
                <div
                  className={startQuiz ? "quiz-container" : "hidden"}
                  id="quiz-one"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="question">
                        {quizData[quizIndex].question}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="answers">
                        {quizData[quizIndex].data.map((quizAnsdata, index) => {
                          return (
                            <div className="btn btn-secondary" key={index}>
                              <input
                                type="radio"
                                name="answer"
                                id={`ques-${quizIndex + 1}-${index + 1}`}
                                className="answer"
                                checked={
                                  answerArray[quizIndex] === index.toString()
                                }
                                onChange={handleAnswer}
                                value={index}
                              />
                              <label
                                htmlFor={`ques-${quizIndex + 1}-${index + 1}`}
                              >
                                {quizAnsdata}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={startQuiz ? "next-btn" : "next-btn hidden"}>
                  <div
                    className={
                      quizIndex < 1 ? "hidden" : "btn btn-secondary me-2"
                    }
                    id="submit"
                    onClick={prevQuiz}
                  >
                    Prev
                  </div>
                  <div
                    className={
                      quizIndex + 1 === quizData.length
                        ? "hidden"
                        : "btn btn-success me-2"
                    }
                    id="submit"
                    onClick={nextQuiz}
                  >
                    Next
                  </div>
                  <div
                    className="btn btn-success"
                    id="submit"
                    onClick={submitQuiz}
                  >
                    Submit
                  </div>
                </div>
                <div className={showScoreBoard ? "scorebaord" : "hidden"}>
                  <div className="scoreborad-main">
                    <p>Score:</p>
                    <span id="score">{score}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

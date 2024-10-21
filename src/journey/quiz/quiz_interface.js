import React, { useContext, useState } from "react";
import "./quiz.css";
import he from "he";
import $ from "jquery";
import { MyContext } from "../use_context";

export default function QuizInterface(props) {
  const { Data } = props;
  const { reloadApi } = props;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [gotCorrect, setGotCorrect] = useState(0);
  const [displayCorrectAns, setDisplayCorrectAns] = useState(false);
  const { value } = useContext(MyContext);
  const totalQuestions = value?.noOfQuestions;
  function checkAnswer(value, correctAnswer) {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    // radioButtons.forEach((radio) => {
    //   radio.disabled = true
    // });
    $('input[type="radio"]').prop("disabled", true);
    setSelectedOption(he.decode(value));
    if (value === correctAnswer) {
      setGotCorrect(gotCorrect + 1);
    } else {
      setDisplayCorrectAns(true);
    }
    setTimeout(() => {
      setDisplayCorrectAns(false);
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setSelectedOption("");
      radioButtons.forEach((radio) => {
        radio.disabled = false;
        radio.checked = false;
      });
    }, 2000);
  }
  return (
    <>
      {currentQuestionNumber < Data.length ? (
        <div className="quiz_container">
          <div className="space"></div>
          <div className="question_display">
            {currentQuestionNumber +
              1 +
              ". " +
              Data[currentQuestionNumber]?.question}
          </div>

          <div className="options_list">
            <label>Please select the answer:</label>
            {Data[currentQuestionNumber]?.options.map((option, idx) => {
              const correctAnswer = Data[currentQuestionNumber]?.correctAnswer;
              return (
                <div key={idx} className="option">
                  <input
                    id={option}
                    type="radio"
                    onClick={() => {
                      checkAnswer(option, correctAnswer);
                    }}
                  />
                  <label
                    id={option}
                    style={{
                      color:
                        selectedOption === option &&
                        selectedOption === correctAnswer
                          ? "green"
                          : selectedOption === option &&
                            selectedOption !== correctAnswer
                          ? "red"
                          : "black",
                    }}
                  >
                    {he.decode(option)}
                  </label>
                </div>
              );
            })}
          </div>
          {displayCorrectAns && (
            <div>
              <label className="correct_answer">
                Correct answer is:&nbsp;
                <strong>
                  {he.decode(Data[currentQuestionNumber]?.correctAnswer)}
                </strong>
              </label>
            </div>
          )}
        </div>
      ) : (
        <div className="game_over">
          <label className="final_msg">You have completed the quiz</label>
          <label className="final_msg">
            You have got <strong>{gotCorrect}</strong> correct out of{" "}
            <strong>{totalQuestions}</strong> questiones.
          </label>
          <label className="continue">
            Do you want to continue for another {totalQuestions} questions ?
          </label>
          <span className="final_btns">
            <button
              className="yn_btns"
              onClick={() => {
                reloadApi(totalQuestions);
              }}
            >
              Yes
            </button>
            <button
              className="yn_btns"
              onClick={() => {
                window.location.reload();
              }}
            >
              No
            </button>
          </span>
        </div>
      )}
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import "./main.css";
import Quiz from "../quiz";
import { MyContext } from "../use_context";

export default function Main() {
  const [gameStarted, setGameStarted] = useState(false);
  const questionsOptions = [10, 20, 30, 40, 50];
  const { setValue } = useContext(MyContext);

  useEffect(() => {
    setValue({ noOfQuestions: 10 });
  }, []);

  return (
    <>
      {!gameStarted ? (
        <div className="start_container">
          <h1>Let's Start the quiz ⛄</h1>
          <div className="selection">
            <label>Please select how many question's quiz ?</label>
            <select
              onChange={(event) => {
                setValue({ noOfQuestions: event.target.value });
              }}
            >
              {questionsOptions.map((option, idx) => {
                return <option key={idx}>{option}</option>;
              })}
            </select>
          </div>
          <span className="start_btn_c">
            <button
              className="start_btn"
              onClick={() => {
                setGameStarted(true);
              }}
            >
              Start Quiz
            </button>
          </span>
        </div>
      ) : (
        <Quiz />
      )}
    </>
  );
}

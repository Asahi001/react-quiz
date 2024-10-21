import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import Loader from "../loader";
import QuizInterface from "./quiz_interface";
import { MyContext } from "../use_context";

export default function Quiz() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { value } = useContext(MyContext);
  useEffect(() => {
    fetch_questiones(value?.noOfQuestions);
  }, []);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function fetch_questiones(amount) {
    setLoading(true);
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amount,
      },
    });
    setLoading(false);
    const { data } = { ...response };
    if (data.response_code === 0) {
      const { results } = { ...data };
      setQuestions(
        results.map((ele) => {
          const temp = [...ele?.incorrect_answers, ele?.correct_answer];
          return {
            type: ele?.type,
            question: he.decode(ele?.question),
            correctAnswer: ele?.correct_answer,
            options: shuffle(temp),
          };
        })
      );
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <QuizInterface Data={questions} reloadApi={fetch_questiones} />
      )}
    </>
  );
}

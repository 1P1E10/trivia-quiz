import { useState, useEffect } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import styles from "../css/Quiz.module.css";
import { AiFillHome } from "react-icons/ai";

function Quiz() {
  const [searchParams] = useSearchParams();
  const difficulties = searchParams.get("difficulties");
  const apiUrl = `https://the-trivia-api.com/api/questions/?categories=food_and_drink&difficulties=${difficulties}&limit=1`;

  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [choiceOne, setChoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [choiceThree, setChoiceThree] = useState("");
  const [choiceFour, setChoiceFour] = useState("");

  useEffect(() => {
    setIsLoading(true);
    async function getQuestion() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        if (!response.ok) {
          throw new Error("Failed to request quiz question");
        }

        console.log(json);

        setCorrectAnswer(json[0].correctAnswer);

        // Randomize the choices' order
        let choices = [
          json[0].correctAnswer,
          json[0].incorrectAnswers[0],
          json[0].incorrectAnswers[1],
          json[0].incorrectAnswers[2],
        ];
        choices.sort(() => Math.random() - 0.5);
        setIsLoading(false);
        setQuestion(json[0].question);
        setChoiceOne(choices[0]);
        setChoiceTwo(choices[1]);
        setChoiceThree(choices[2]);
        setChoiceFour(choices[3]);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestion();
  }, []);

  return (
    <div className={styles.page}>
      <NavLink to="/" className={styles.homeBtn}>
        <AiFillHome />
      </NavLink>
      {isLoading ? (
        <h2 className={styles.Question}>Loading...</h2>
      ) : (
        <>
          <h2 className={styles.Question}>{question}</h2>
          <div className={styles.choices}>
            <button className={styles.btn1}>{choiceOne}</button>
            <button className={styles.btn2}>{choiceTwo}</button>
            <button className={styles.btn3}>{choiceThree}</button>
            <button className={styles.btn4}>{choiceFour}</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;

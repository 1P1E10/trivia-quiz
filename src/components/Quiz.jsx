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
  const [choiceOne, setChoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [choiceThree, setChoiceThree] = useState("");
  const [choiceFour, setChoiceFour] = useState("");
  const [choiceOneVal, setChoiceOneVal] = useState(false);
  const [choiceTwoVal, setChoiceTwoVal] = useState(false);
  const [choiceThreeVal, setChoiceThreeVal] = useState(false);
  const [choiceFourVal, setChoiceFourVal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getQuestion() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        if (!response.ok) {
          throw new Error("Failed to request quiz question");
        }

        // Randomize the choices' order
        let choices = [
          { choice: json[0].correctAnswer, isCorrect: true },
          { choice: json[0].incorrectAnswers[0], isCorrect: false },
          { choice: json[0].incorrectAnswers[1], isCorrect: false },
          { choice: json[0].incorrectAnswers[2], isCorrect: false },
        ];
        choices.sort(() => Math.random() - 0.5);
        setIsLoading(false);
        setQuestion(json[0].question);
        setChoiceOne(choices[0].choice);
        setChoiceTwo(choices[1].choice);
        setChoiceThree(choices[2].choice);
        setChoiceFour(choices[3].choice);
        setChoiceOneVal(choices[0].isCorrect);
        setChoiceTwoVal(choices[1].isCorrect);
        setChoiceThreeVal(choices[2].isCorrect);
        setChoiceFourVal(choices[3].isCorrect);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestion();
  }, []);

  function handleClick(e) {
    console.log(e.target.value);
  }

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
            <button
              className={styles.btn1}
              onClick={handleClick}
              value={choiceOneVal}
            >
              {choiceOne}
            </button>
            <button
              className={styles.btn2}
              onClick={handleClick}
              value={choiceTwoVal}
            >
              {choiceTwo}
            </button>
            <button
              className={styles.btn3}
              onClick={handleClick}
              value={choiceThreeVal}
            >
              {choiceThree}
            </button>
            <button
              className={styles.btn4}
              onClick={handleClick}
              value={choiceFourVal}
            >
              {choiceFour}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;

import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import styles from "../css/Quiz.module.css";
import { AiFillHome } from "react-icons/ai";
import JSConfetti from "js-confetti";

function Quiz() {
  const jsConfetti = new JSConfetti();

  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty");
  const apiUrl = `https://the-trivia-api.com/api/questions?difficulty=${difficulty}&categories=food_and_drink&limit=1&region=US`; // Why query param is difficulty not difficulties?

  console.log(apiUrl);

  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [choiceOne, setChoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [choiceThree, setChoiceThree] = useState("");
  const [choiceFour, setChoiceFour] = useState("");
  const [choiceOneVal, setChoiceOneVal] = useState("wrong");
  const [choiceTwoVal, setChoiceTwoVal] = useState("wrong");
  const [choiceThreeVal, setChoiceThreeVal] = useState("wrong");
  const [choiceFourVal, setChoiceFourVal] = useState("wrong");

  const [selected, setSelected] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    setSelected(false);
    setNext(false);
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
          { choice: json[0].correctAnswer, isCorrect: "correct" },
          { choice: json[0].incorrectAnswers[0], isCorrect: "wrong" },
          { choice: json[0].incorrectAnswers[1], isCorrect: "wrong" },
          { choice: json[0].incorrectAnswers[2], isCorrect: "wrong" },
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
        console.log(json[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestion();
  }, [next]);

  // Handle correct and incorrect answer
  async function handleClick(e) {
    setSelected(true);
    // When answer is correct
    if (e.target.value === "correct") {
      await jsConfetti.addConfetti({
        emojis: ["🎉"],
      });
      setNext(true);
    }
    // When answer is wrong
    else {
      setTimeout(() => setNext(true), 2000);
    }
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
            {/* Disable the buttons after first click */}
            <button
              className={styles.btn1}
              onClick={handleClick}
              value={choiceOneVal}
              disabled={selected}
            >
              {choiceOne}
            </button>
            <button
              className={styles.btn2}
              onClick={handleClick}
              value={choiceTwoVal}
              disabled={selected}
            >
              {choiceTwo}
            </button>
            <button
              className={styles.btn3}
              onClick={handleClick}
              value={choiceThreeVal}
              disabled={selected}
            >
              {choiceThree}
            </button>
            <button
              className={styles.btn4}
              onClick={handleClick}
              value={choiceFourVal}
              disabled={selected}
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

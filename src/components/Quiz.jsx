import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import styles from "../css/Quiz.module.css";
import { AiFillHome } from "react-icons/ai";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

function Quiz() {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty");
  const apiUrl = `https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}&categories=food_and_drink`; // Why query param is difficulty not difficulties?

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [next, setNext] = useState(false);

  useEffect(() => {
    setNext(false);
    setIsLoading(true);

    async function getQuestion() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        if (!response.ok) {
          throw new Error("Failed to get quiz data");
        }

        setQuestion(json[0].question);

        const choices = [
          { option: json[0].correctAnswer, isCorrect: "correct" },
          { option: json[0].incorrectAnswers[0], isCorrect: "wrong" },
          { option: json[0].incorrectAnswers[1], isCorrect: "wrong" },
          { option: json[0].incorrectAnswers[2], isCorrect: "wrong" },
        ];

        setChoices(
          choices
            .map((choice, index) => {
              return (
                // Assign different colors from CSS file to the buttons
                <button
                  className={`${styles.choice} ${
                    styles[`choice${index + 1}`]
                  } choice`}
                  onClick={handleClick}
                  value={choice.isCorrect}
                >
                  {choice.option}
                </button>
              );
            })
            .sort(() => Math.random() - 0.5) // Randomize the order of the choices
        );
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getQuestion();
  }, [next]);

  // Handle user's answer choice
  async function handleClick({ target }) {
    const choice = document.getElementsByClassName("choice");
    for (let i = 0; i < choice.length; i++) {
      choice[i].disabled = true; // Only allow the user to select a choice once
      // Highlight the correct choice after the user chooses one
      if (choice[i].value === "correct") {
        choice[i].style.backgroundColor = "green";
      }
    }

    if (target.value === "correct") {
      await jsConfetti.addConfetti({
        emojis: ["🎉", "🎊"],
      });
      setNext(true);
    } else {
      target.style.backgroundColor = "red";
      setTimeout(() => setNext(true), 1800);
    }
  }

  return (
    <div className={styles.page}>
      <NavLink to="/" className={styles.home}>
        <AiFillHome />
      </NavLink>
      {isLoading && <h2 className={styles.question}>Loading...</h2>}
      {!isLoading && !error && (
        <>
          <h2 className={styles.question}>{question}</h2>
          <div className={styles.choices}>{choices}</div>
        </>
      )}
      {error && <h2 className={styles.question}>{error}</h2>}
    </div>
  );
}

export default Quiz;

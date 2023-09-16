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
  const [next, setNext] = useState(false);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setNext(false);
    setIsLoading(true);
    setChoices([]);
    async function getQuestion() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        if (!response.ok) {
          throw new Error("Failed to request quiz question");
        }
        let choices = [
          { option: json[0].correctAnswer, isCorrect: "correct" },
          { option: json[0].incorrectAnswers[0], isCorrect: "wrong" },
          { option: json[0].incorrectAnswers[1], isCorrect: "wrong" },
          { option: json[0].incorrectAnswers[2], isCorrect: "wrong" },
        ];

        // Randomize the choices
        setChoices(
          choices
            .map((choice, index) => {
              return (
                // Assign different colors from CSS file to the buttons
                <button
                  className={`${styles.btn} ${
                    styles[`btn${index + 1}`]
                  } choiceBtns`}
                  onClick={handleClick}
                  value={choice.isCorrect}
                >
                  {choice.option}
                </button>
              );
            })
            .sort(() => Math.random() - 0.5)
        );

        setIsLoading(false);
        setQuestion(json[0].question);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestion();
  }, [next]);

  // Handle user's answer selection
  async function handleClick(e) {
    const choiceBtns = document.getElementsByClassName("choiceBtns");
    for (let i = 0; i < choiceBtns.length; i++) {
      choiceBtns[i].disabled = true; // Disable all choice buttons after the first click
      if (choiceBtns[i].value === "correct") {
        choiceBtns[i].style.backgroundColor = "green";
      }
    }

    // When answer is correct
    if (e.target.value === "correct") {
      await jsConfetti.addConfetti({
        emojis: ["🎉", "🎊"],
      });
      setNext(true);
    }
    // When answer is wrong
    else {
      e.target.style.backgroundColor = "red";
      setTimeout(() => setNext(true), 2000);
    }
  }

  return (
    <div className={styles.page}>
      <NavLink to="/" className={styles.homeBtn}>
        <AiFillHome />
      </NavLink>
      {isLoading ? (
        <h2 className={styles.question}>Loading...</h2>
      ) : (
        <>
          <h2 className={styles.question}>{question}</h2>
          <div className={styles.choices}>{choices}</div>
        </>
      )}
    </div>
  );
}

export default Quiz;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Home.module.css";
import { BiPlayCircle } from "react-icons/bi";

function Home() {
  const [level, setLevel] = useState("easy"); // Quiz difficulty level
  function handleChange(e) {
    setLevel(e.target.value);
  }

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/quiz?difficulty=${level}`);
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Trivia Quiz</h1>
      <h2 className={styles.difficultyLevelTitle}>Difficulty Level</h2>
      <br />

      <form onSubmit={handleSubmit}>
        <div className={styles.levelOptions}>
          <div className={styles.radioLabel}>
            <input
              id="easy"
              className={styles.radio}
              name="level"
              type="radio"
              value="easy"
              checked={level === "easy"}
              onChange={handleChange}
            />
            <label className={styles.levelLabel} htmlFor="easy">
              Easy
            </label>
          </div>
          <div className={styles.radioLabel}>
            <input
              id="medium"
              className={styles.radio}
              name="level"
              type="radio"
              value="medium"
              checked={level === "medium"}
              onChange={handleChange}
            />
            <label className={styles.levelLabel} htmlFor="medium">
              Medium
            </label>
          </div>
          <div className={styles.radioLabel}>
            <input
              id="hard"
              className={styles.radio}
              name="level"
              type="radio"
              value="hard"
              checked={level === "hard"}
              onChange={handleChange}
            />
            <label className={styles.levelLabel} htmlFor="hard">
              Hard
            </label>
          </div>
        </div>
        <button className={styles.playBtn}>
          <BiPlayCircle />
        </button>
      </form>
    </div>
  );
}

export default Home;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Home.module.css";
import { BiPlayCircle } from "react-icons/bi";

function Home() {
  const [level, setLevel] = useState("easy"); // Quiz difficulty level

  const navigate = useNavigate();

  function handleChange(e) {
    setLevel(e.target.value);
  }

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
        <input
          id="easy"
          className={styles.radioBtn}
          name="level"
          type="radio"
          value="easy"
          checked={level === "easy"}
          onChange={handleChange}
        />
        <input
          id="medium"
          className={styles.radioBtn}
          name="level"
          type="radio"
          value="medium"
          checked={level === "medium"}
          onChange={handleChange}
        />
        <input
          id="hard"
          className={styles.radioBtn}
          name="level"
          type="radio"
          value="hard"
          checked={level === "hard"}
          onChange={handleChange}
        />

        <div className={styles.levelLabels}>
          <label htmlFor="easy">Easy</label>
          <label htmlFor="medium">Medium</label>
          <label htmlFor="hard">Hard</label>
        </div>

        <button className={styles.playBtn}>
          <BiPlayCircle />
        </button>
      </form>
    </div>
  );
}

export default Home;

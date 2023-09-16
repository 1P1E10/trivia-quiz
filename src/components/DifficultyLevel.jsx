import styles from "../css/DifficultyLevel.module.css";
import { BiPlayCircle } from "react-icons/bi";

function DifficultyLevel() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <h2 className={styles.title}>Difficulty Level</h2>

      <br />

      <div className={styles.levelCheckboxes}>
        <input
          id="easy"
          className={styles.checkbox}
          name="level"
          type="checkbox"
          value="easy"
        />
        <input
          id="medium"
          className={styles.checkbox}
          name="level"
          type="checkbox"
          value="medium"
        />
        <input
          id="hard"
          className={styles.checkbox}
          name="level"
          type="checkbox"
          value="hard"
        />
      </div>

      <div className={styles.levelLabels}>
        <label htmlFor="easy">Easy</label>
        <label htmlFor="medium">Medium</label>
        <label htmlFor="hard">Hard</label>
      </div>

      <form onSubmit={handleSubmit}>
        <button className={styles.playBtn}>
          <BiPlayCircle />
        </button>
      </form>
    </>
  );
}

export default DifficultyLevel;

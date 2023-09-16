import { NavLink } from "react-router-dom";
import styles from "../css/Quiz.module.css";
import { AiFillHome } from "react-icons/ai";

function Quiz() {
  return (
    <div className={styles.page}>
      <NavLink to="/" className={styles.homeBtn}>
        <AiFillHome />
      </NavLink>

      <h2 className={styles.Question}>Who is McDonald's mascot?</h2>

      <div className={styles.choices}>
        <button className={styles.btn1}>The King</button>
        <button className={styles.btn2}>Ronald Mcdonald</button>
        <button className={styles.btn3}>Meato</button>
        <button className={styles.btn4}>Donald Burger</button>
      </div>
    </div>
  );
}

export default Quiz;

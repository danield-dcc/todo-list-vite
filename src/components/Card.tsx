import { useState } from "react";
import styles from "./Card.module.css";
import trashImg from "../assets/trash.svg";
import { Trash } from "phosphor-react";


type CardProps = {
  TaskDone: boolean;
  task: string;
  done: boolean;
  DoneTask123: () => void;
  RemoveTask: () => void;
};

export const Card = ({
  TaskDone,
  DoneTask123,
  RemoveTask,
  done,
  task,
}: CardProps) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    console.log("tarefa feita");
    setChecked(!checked);
    DoneTask123();
  };

  return (
    <section className={styles.container}>
        <label className={styles.checkbox__container}>
          <input
            type="checkbox"
            name="checked"
            className={styles.checkbox__input}
            onClick={handleChecked}
            checked={!!checked ? true : false}
            onChange={handleChecked}
          />
          <span className={styles.checkmark}></span>
        </label>
      <div className={styles.textArea}>
        <div className={TaskDone ? styles.textTaskDone : styles.text}>
          {task}
        </div>
      </div>

      <button className={styles.excludedButton} onClick={RemoveTask}>
        {/* <img src={trashImg} alt="excluir" height={25} /> */}
        <Trash size={24} />
      </button>
    </section>
  );
};

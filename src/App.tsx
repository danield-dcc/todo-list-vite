import { FormEvent, Fragment, useEffect, useState } from "react";
import { Header } from "./components/Header";
import PlusSvg from "./assets/plus.svg";
import styles from "./App.module.css";
import ClipboardSvg from "./assets/clipboard.svg";

import "./global.css";
import { Card } from "./components/Card";

type TaskProps = {
  id: Date;
  taskName: string;
  done: boolean;
};

function App() {
  const [newTask, setNewTask] = useState<TaskProps[]>([]);
  const [newInputText, setNewInputText] = useState("");
  const [tasksDone, setTasksDone] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newInputText == "") return;

    // setNewTask([...newTask, newInputText]);
    setNewTask((prevState) => [
      ...newTask,
      {
        id: new Date(),
        taskName: newInputText,
        done: false,
      },
    ]);

    setNewInputText("");

    console.log(newTask);
  };

  const handleRemoveTask = (id: number) => {
    setNewTask((prevState) => prevState.filter((task) => +task.id !== id));
  };

  const handleTaskDone = (id: number) => {
    const newTaskList = newTask.map((taskList) => ({ ...taskList }));

    const findTask = newTaskList.find((task) => Number(task.id) === id);

    if (!findTask) return;

    findTask.done = !findTask.done;

    setNewTask(newTaskList);
  };

  const totalTasks = newTask.length;

  useEffect(() => {
    if (totalTasks > 0) {
      const totalTasksDone = newTask
        .filter((t) => t.done === true)
        .reduce((acc, t) => acc + 1, 0);
      setTasksDone(totalTasksDone);
    }
  }, [newTask]);

  return (
    <Fragment>
      <Header />

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Adicione uma nova tarefa"
            name="task"
            onChange={(e) => setNewInputText(e.target.value)}
            value={newInputText}
          />

          <button className={styles.inputButton} type="submit">
            Criar
            <img
              className={styles.inputButtonImg}
              src={PlusSvg}
              alt="Logo todo"
              height={15}
            />
          </button>
        </form>

        <div className={styles.wrapper}>
          <section className={styles.menuItens}>
            <div className={styles.content}>
              <div className={styles.created}>Tarefas Criadas</div>
              <div className={styles.wrapperNumbers}>
                <div className={styles.counter}>{totalTasks}</div>
                {/* <div className={styles.conterNumber}>{totalTasks}</div> */}
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.concluded}>Concluídas</div>
              <div className={styles.wrapperConcludedNumbers}>
                <div className={styles.counter}></div>
                <div className={styles.conterNumber}>
                  {tasksDone} de {totalTasks}
                </div>
              </div>
            </div>
          </section>
        </div>

        {newTask.length === 0 ? (
          <section className={styles.emptyTask}>
            <div className={styles.emptyContent}>
              <img
                className={styles.emptyTaskImg}
                src={ClipboardSvg}
                alt="Clipboard"
              />
              <p className={styles.tittle}>
                Você ainda não tem tarefas cadastradas
              </p>
              <p className={styles.subTittle}>
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          </section>
        ) : (
          <div className={styles.card}>
            {newTask.map((task) => (
              <Card
                key={Number(task.id)}
                task={task.taskName}
                done={task.done}
                RemoveTask={() => handleRemoveTask(Number(+task.id))}
                DoneTask123={() => handleTaskDone(Number(+task.id))}
                TaskDone={task.done}
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default App;

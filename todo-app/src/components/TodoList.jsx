import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function TodoList() {
  const [input, setInput] = useState("");
  const [TodoList, setTodoList] = useState([
    { text: "react", completed: false, deadLine: "2026-12-25" },
    { text: "JS", completed: false, deadLine: "2026-12-25" },
  ]);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [deadLine, setDeadLine] = useState("");

  useEffect(() => {
    TodoList.forEach((task) => {
      const today = new Date();
      const deadLine = new Date(task.deadLine);

      if (!task.completed && deadLine < today) {
        toast.error(`${task.text} is overdue..`, {
          toastId: task.text,
        });
      }
    });
  }, [TodoList]);

  function addTask() {
    if (!input.trim()) return;
    if (!deadLine) return;

    if (updateIndex !== null) {
      const updatedTask = [...TodoList];
      updatedTask[updateIndex].text = input;
      updatedTask[updateIndex].deadLine = deadLine;

      setTodoList(updatedTask);
      setUpdateIndex(null);
    } else {
      setTodoList([
        ...TodoList,
        {
          text: input,
          completed: false,
          deadLine: deadLine,
        },
      ]);
    }
    setInput("");
    setDeadLine("");
  }

  function deleteTask(indexToDelete) {
    const updatedTask = TodoList.filter(
      (task, index) => index !== indexToDelete,
    );
    setTodoList(updatedTask);
  }

  function updateTask(index) {
    setInput(TodoList[index].text);
    setDeadLine(TodoList[index].deadLine);
    setUpdateIndex(index);
  }

  function toggleComplete(index) {
    const updatedTask = [...TodoList];
    updatedTask[index].completed = !updatedTask[index].completed;
    setTodoList(updatedTask);
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter the task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="date"
          value={deadLine}
          onChange={(e) => setDeadLine(e.target.value)}
        />
        <button onClick={addTask}>
          {updateIndex !== null ? "save" : "add"}
        </button>
        <ul>
          {TodoList.map((t, index) => (
            <li key={index}>
              <input
                type="checkBox"
                checked={t.completed}
                onChange={() => toggleComplete(index)}
              />
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.text}
              </span>
              <p>DeadLine: {t.deadLine}</p>
              <button onClick={() => deleteTask(index)}>delete</button>
              <button onClick={() => updateTask(index)}>update</button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </>
  );
}
export default TodoList;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [TodoList, setTodoList] = useState(() => {
    const savedTask = localStorage.getItem("tasks");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  const [updateIndex, setUpdateIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(TodoList));
  }, [TodoList]);

  useEffect(() => {
    TodoList.forEach((task) => {
      const today = new Date();
      const deadline = new Date(task.deadLine);

      if (!task.completed && deadline < today) {
        toast.error(`${task.text} is overdue!`, {
          toastId: task.text,
        });
      }
    });
  }, [TodoList]);

  function addTask() {
    if (!input.trim()) return;
    if (!deadLine) return;
    if (updateIndex !== null) {
      const updatedTasks = [...TodoList];
      updatedTasks[updateIndex].text = input;
      updatedTasks[updateIndex].deadLine = deadLine;
      setTodoList(updatedTasks);
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
      <div className="app-container">
        <h1>To-Do List</h1>
        <TaskForm
          input={input}
          setInput={setInput}
          deadLine={deadLine}
          setDeadLine={setDeadLine}
          addTask={addTask}
          updateIndex={updateIndex}
        />

        <TaskList
          TodoList={TodoList}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

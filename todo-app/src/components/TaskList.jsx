function TaskList({ TodoList, toggleComplete, deleteTask, updateTask }) {
  return (
    <ul>
      {TodoList.map((task, index) => (
        <li key={index} className="task-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(index)}
          />

          <div className="task-content">
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>

            <p>Deadline: {task.deadLine}</p>
          </div>

          <div className="task-actions">
            <button onClick={() => deleteTask(index)}>Delete</button>

            <button onClick={() => updateTask(index)}>Update</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

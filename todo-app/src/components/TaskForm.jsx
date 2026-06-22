function TaskForm({
  input,
  setInput,
  deadLine,
  setDeadLine,
  addTask,
  updateIndex,
}) {
  return (
    <>
      <div className="todo-form">
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
      </div>
    </>
  );
}

export default TaskForm;

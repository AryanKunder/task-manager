import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    setTasks((prevTasks) => [...prevTasks, trimmedInput]);
    setInput("");
  };

  const deleteTask = (indexToDelete) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    const confirmClear = window.confirm("Clear all tasks?");
    if (!confirmClear) return;

    setTasks([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        placeholder="Enter task"
        style={{ padding: "10px", width: "200px"}}
      />

      <button onClick={addTask} disabled={!input.trim()} 
      style={{ padding: "10px", marginLeft: "10px"}}>
        Add
      </button>

      <button onClick={clearAllTasks} 
      style={{
         padding: "10px", 
         marginLeft: "10px",
         backgroundColor: "red",
         color: "white",
         border: "none",
        }}>
        Clear All
      </button>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {tasks.length === 0 ? "No tasks yet" : `Tasks: ${tasks.length}` }
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li key={index}
          style={{
            margin: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between",
          }}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
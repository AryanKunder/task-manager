import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;
    
    setTasks([...tasks, input]);
    setInput("");
  };

  return (
    <div>
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
      />

      <button onClick={addTask} disabled={!input.trim()}>
        Add
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
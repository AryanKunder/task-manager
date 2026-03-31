import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newTask = {
      id: Date.now(),
      text: trimmedInput,
      completed: false,
    };
    
    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  const deleteTask = (idToDelete) => {
    if (!window.confirm("Delete this task?")) return;

    setTasks(tasks.filter((_, index) => index !== idToDelete));
  };

  const clearAllTasks = () => {
    if (!window.confirm("Clear all tasks?")) return;

    setTasks([]);
  };

  const toggleComplete = (idToToggle) => {
    const updatedTasks = tasks.map(task => 
      task.id === idToToggle
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Manager</h1>

      <p style={{marginBottom: "10px", textAlign: "center"}}>Total Tasks: {tasks.length}</p>

      <div>
        <button
          onClick={() => setFilter("all")}
          style={{fontWeight: filter === "all" ? "bold" : "normal",
            backgroundColor: filter === "all" ? "black" : "gray",
            padding: "5px", marginRight: "10px", marginBottom: "10px",
          }}>All
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{fontWeight: filter === "completed" ? "bold" : "normal",
            backgroundColor: filter === "completed" ? "black" : "gray",
            padding: "5px", marginRight: "10px", marginBottom: "10px",
          }}>Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{fontWeight: filter === "pending" ? "bold" : "normal",
            backgroundColor: filter === "pending" ? "black" : "gray",
            padding: "5px", marginRight: "10px", marginBottom: "10px",
          }}>Pending
        </button>
      </div>

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

      <p style={{ textAlign: "center", marginTop: "10px",}}>
        {filter === "all" && `All Tasks: ${filteredTasks.length}`}
        {filter === "completed" && `Completed Tasks: ${filteredTasks.length}`}
        {filter === "pending" && `Pending Tasks: ${filteredTasks.length}`}
      </p>

      {filteredTasks.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: 35 }}>
          {filter === "all" && "No tasks yet"}
          {filter === "completed" && "No completed tasks yet"}
          {filter === "pending" && "No pending tasks yet"}
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li key={task.id}
          style={{
            margin: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between",
          }}>
            <span
              onClick={() => toggleComplete(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}>
              {task.text}
            </span>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default App;
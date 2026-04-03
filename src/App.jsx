import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

    setTasks(tasks.filter(task => task.id !== idToDelete));
  };

  const clearAllTasks = () => {
    if (!window.confirm("Clear all tasks?")) return;

    setTasks([]);
    localStorage.removeItem("tasks");
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

      <FilterButtons filter={filter} setFilter={setFilter} />

      <TaskInput
        input={input}
        setInput={setInput}
        addTask={addTask}
        clearAllTasks={clearAllTasks}
      />

      <p>
        {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks: {filteredTasks.length}
      </p>

      <TaskList
        filteredTasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        filter={filter}
      />
    </div>
  );
}

export default App;
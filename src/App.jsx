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
  const [darkMode, setDarkMode] = useState(false);

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
      createdAt: new Date().toLocaleString(),
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
    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen flex flex-col items-center p-6`}>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-4x1 font-bold mb-6 text-gray-800">
          Task Manager

          <button
            className="ml-33 px-3 py-1 bg-gray-800 text-white rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </h1>

        <p className="text-gray-600 mb-2">Total Tasks: {tasks.length}</p>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <TaskInput
          input={input}
          setInput={setInput}
          addTask={addTask}
          clearAllTasks={clearAllTasks}
        />

        <p className="text-blue-600 font-semibold mb-4">
          {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks: {filteredTasks.length}
        </p>

        <TaskList
          filteredTasks={filteredTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default App;
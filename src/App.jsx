import { useState, useEffect, use } from "react";
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
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("medium");

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
      priority: priority,
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

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  }).filter((task) => 
    task.text.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen flex flex-col items-center p-6`}>
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-md w-full max-w-md`}>
        <h1 className={`${darkMode ? "text-gray-200" : "text-gray-800"} text-4x1 font-bold mb-6`}>
          Task Manager

          <button
            className={`${darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} ml-33 px-3 py-1 rounded`}
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </h1>

        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>Total Tasks: {tasks.length}</p>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <TaskInput
          input={input}
          setInput={setInput}
          addTask={addTask}
          clearAllTasks={clearAllTasks}
          priority={priority}
          setPriority={setPriority}
        />

        <select
          className={`${darkMode ? "text-gray-600" : "text-black"} p-2 border border-black bg-gray-100 font-semibold rounded mb-4`}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option className="font-semibold" value="low">Low</option>
          <option className="font-semibold" value="medium">Medium</option>
          <option className="font-semibold" value="high">High</option>
        </select>

        <p className="text-blue-600 font-semibold mb-4">
          {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks: {filteredTasks.length}
        </p>

        <input
          className="p-2 border border-black bg-gray-200 rounded w-full mb-4"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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
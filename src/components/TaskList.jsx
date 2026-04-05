function TaskList({ filteredTasks, toggleComplete, deleteTask, filter }) {
    if (filteredTasks.length === 0) {
        return (
            <p className="text-gray-500 text-3xl font-semibold mt-6">
                {filter === "all" && "No tasks yet"}
                {filter === "completed" && "No completed tasks yet"}
                {filter === "pending" && "No pending tasks yet"}
            </p>
        );
    }

    return (
        <ul className="w-full max-w-md">
            {filteredTasks.map((task) => (
                <li
                    className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    key={task.id}
                >
                    <span
                        className={`cursor-pointer ${
                            task.completed
                                ? "line-through text-gray-500 hover:text-gray-400"
                                : task.priority === "high"
                                ? "text-red-800 hover:text-red-600"
                                : task.priority === "low"
                                ? "text-green-800 hover:text-green-600"
                                : "text-yellow-800 hover:text-yellow-600"
                        }`}
                        onClick={() => toggleComplete(task.id)}
                    >
                        {task.text}
                    </span>

                    <p className="text-xs text-gray-400">
                        {task.createdAt}
                    </p>

                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default TaskList;
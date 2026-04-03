function TaskList({ filteredTasks, toggleComplete, deleteTask, filter }) {
    if (filteredTasks.length === 0) {
        return (
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: 35 }}>
                {filter === "all" && "No tasks yet"}
                {filter === "completed" && "No completed tasks yet"}
                {filter === "pending" && "No pending tasks yet"}
            </p>
        );
    }

    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredTasks.map((task) => (
                <li
                    key={task.id}
                    style={{
                        margin: "10px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span
                        onClick={() => toggleComplete(task.id)}
                        style={{
                            textDecoration: task.completed ? "line-through" : "none",
                            cursor: "pointer",
                        }}
                    >
                        {task.text}
                    </span>

                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default TaskList;
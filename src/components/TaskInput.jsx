function TaskInput({ input, setInput, addTask, clearAllTasks }) {
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") addTask();
                }}
                placeholder="Enter task"
                style={{ padding: "10px", width: "200px" }}
            />
            
            <button
                onClick={addTask}
                disabled={!input.trim()}
                style={{ padding: "10px", marginLeft: "10px" }}
            >
                Add
            </button>

            <button
                onClick={clearAllTasks}
                style={{
                    padding: "10px",
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                }}
            >
                Clear All
            </button>
        </div>
    );
}

export default TaskInput;
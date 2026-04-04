function TaskInput({ input, setInput, addTask, clearAllTasks }) {
    return (
        <div className="flex gap-2 mb-4">
            <input
                className="p-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") addTask();
                }}
                placeholder="Enter task"
            />
            
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={addTask}
                disabled={!input.trim()}
            >
                Add
            </button>

            <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={clearAllTasks}
            >
                Clear All
            </button>
        </div>
    );
}

export default TaskInput;
function FilterButtons({ filter, setFilter }) {
    return (
        <div className="mb-4 flex gap-2">
            <button
                className={`px-3 py-1 rounded ${
                    filter === "all"
                        ? "bg-black text-white"
                        : "bg-gray-300 hover:bg-gray-400"   
                }`}
                onClick={() => setFilter("all")}
            >
                All
            </button>

            <button
                className={`px-3 py-1 rounded ${
                    filter === "completed"
                        ? "bg-black text-white"
                        : "bg-gray-300 hover:bg-gray-400"   
                }`}
                onClick={() => setFilter("completed")}
            >
                Completed
            </button>

            <button
                className={`px-3 py-1 rounded ${
                    filter === "pending"
                        ? "bg-black text-white"
                        : "bg-gray-300 hover:bg-gray-400"   
                }`}
                onClick={() => setFilter("pending")}
            >
                Pending
            </button>
        </div>
    );
}

export default FilterButtons;
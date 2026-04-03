function FilterButtons({ filter, setFilter }) {
    return (
        <div>
            <button
                onClick={() => setFilter("all")}
                style={{
                    fontWeight: filter === "all" ? "bold" : "normal",
                    backgroundColor: filter === "all" ? "black" : "gray",
                    padding: "5px",
                    marginRight: "10px",
                    marginBottom: "10px",
                }}
            >
                All
            </button>

            <button
                onClick={() => setFilter("completed")}
                style={{
                    fontWeight: filter === "completed" ? "bold" : "normal",
                    backgroundColor: filter === "completed" ? "black" : "gray",
                    padding: "5px",
                    marginRight: "10px",
                    marginBottom: "10px",
                }}
            >
                Completed
            </button>

            <button
                onClick={() => setFilter("pending")}
                style={{
                    fontWeight: filter === "pending" ? "bold" : "normal",
                    backgroundColor: filter === "pending" ? "black" : "gray",
                    padding: "5px",
                    marginRight: "10px",
                    marginBottom: "10px",
                }}
            >
                Pending
            </button>
        </div>
    );
}

export default FilterButtons;
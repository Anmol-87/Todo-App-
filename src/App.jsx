import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const isInitialMount = useRef(true);

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  // Save todos to localStorage (skip first render)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem("todos", JSON.stringify(Todos));
    }
  }, [Todos]);

  // Add or update todo
  const handleAdd = () => {
    if (!Todo.trim()) return;

    if (editId) {
      setTodos(
        Todos.map((item) => (item.id === editId ? { ...item, Todo } : item)),
      );
      setEditId(null);
    } else {
      setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    }

    setTodo("");
  };

  const handleEdit = (id) => {
    const todoToEdit = Todos.find((item) => item.id === id);
    setTodo(todoToEdit.Todo);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTodos(Todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (id) => {
    setTodos(
      Todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  // Filter todos
  const filteredTodos = Todos.filter((item) => {
    if (filter === "completed") return item.isCompleted;
    if (filter === "pending") return !item.isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-black py-1">
      <Navbar />

      <div className="container mx-auto max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 mt-20 relative z-10 border border-white/20">
        {/* Add Todo */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">➕ Add a Todo</h2>
          <div className="flex gap-3">
            <input
              value={Todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              placeholder="Enter your task..."
              className="flex-1 border border-white/20 rounded-lg px-4 py-2 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={handleAdd}
              className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition-transform duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* Filters & Clear All */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {["all", "completed", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded transition-transform duration-200 transform hover:scale-105 hover:shadow-lg ${
                  filter === f
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white hover:bg-red-500/50"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-1 rounded-md transition-transform duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            Clear All
          </button>
        </div>

        {/* Todo List */}
        <h2 className="text-2xl font-bold text-white mb-4">📋 Your Todos</h2>
        <div className="space-y-3">
          {filteredTodos.length === 0 && (
            <p className="text-gray-400 text-center">No todos to show</p>
          )}

          <AnimatePresence>
            {filteredTodos.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                layout
                className="flex justify-between items-center bg-white/10 p-4 rounded-xl shadow-sm border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckbox(item.id)}
                    className="accent-red-500"
                  />
                  <span
                    className={`text-white ${
                      item.isCompleted ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.Todo}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md transition-transform duration-200 transform hover:scale-105 hover:shadow-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md transition-transform duration-200 transform hover:scale-105 hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;

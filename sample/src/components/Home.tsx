import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodosItem";

// Define the Todo interface
interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // Fix: Use Todo[] instead of object
  const [todos, setTodos] = useState<Todo[]>((): [] => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      console.log("Error retrieving todos from localstorage ");
      return [];
    }
  });
  const [todoValue, setTodoValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodoBtn = (): void => {
    // Only add if input is not empty
    if (todoValue.trim() === "") return;

    const newTodo: Todo = {
      id: uuidv4(),
      text: todoValue, // Changed from 'value' to 'text'
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);

    setTodoValue(""); // Clear input after adding
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodoValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addTodoBtn();
  };

  // Edit todo
  const handleEdit = (id: string, newText: string): void => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // Delete todo
  const handleDelete = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completion
  const handleToggleComplete = (id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleClearAll = (): void => {
    setTodos([]);
  };

  const handleClearCompleted = (): void => {
    const completed = todos.filter((t) => {
      return !t.isCompleted;
    });
    setTodos(completed);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Simple Todo List
          </h1>
          <p className="text-gray-600">Keep track of your tasks</p>
        </div>

        {/* Add Todo Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex gap-3">
            <div className="flex-1">
              <label
                htmlFor="todoValue"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                New Task
              </label>
              <input
                type="text"
                id="todoValue"
                onChange={handleOnChange}
                value={todoValue}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>

        {/* Todo Stats */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{todos.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="border-l border-gray-300"></div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {todos.filter((todo) => todo.isCompleted).length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="border-l border-gray-300"></div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {todos.filter((todo) => !todo.isCompleted).length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        {/* Clear all button */}
        {todos.length > 0 && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleClearCompleted}
              disabled={todos.filter((todo) => todo.isCompleted).length === 0}
              className="flex-1 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Clear Completed
            </button>
            <button
              onClick={handleClearAll}
              className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        )}
        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <p className="text-gray-500 text-lg">No tasks yet!</p>
              <p className="text-gray-400 text-sm mt-2">
                Add a task to get started
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                isCompleted={todo.isCompleted}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

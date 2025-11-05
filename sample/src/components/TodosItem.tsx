import { useState, type ChangeEvent } from "react";

interface TodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  isCompleted,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(text);

  const handleEdit = (): void => {
    if (isEditing) {
      onEdit(id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = (): void => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditText(e.target.value);
  };

  return (
    <div
      className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border-l-4 ${
        isCompleted ? "border-green-500" : "border-blue-500"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(id)}
          className={`shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
            isCompleted
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-green-500"
          }`}
          aria-label="Toggle complete"
        >
          {isCompleted && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>

        {/* Text / Input */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              autoFocus
              placeholder="Type your wish"
            />
          ) : (
            <p
              className={`text-lg transition-all duration-200 ${
                isCompleted ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {text}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <>
              {" "}
              {/** Save button  */}
              <button
                onClick={handleEdit}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                aria-label="Save"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
              {/* Cancel button */}
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Cancel"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                aria-label="Edit"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onDelete(id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                aria-label="Delete"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

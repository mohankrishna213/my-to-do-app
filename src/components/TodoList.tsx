import { useState } from 'react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { TodoFilter, type FilterType } from './TodoFilter';
import { useTodoStorage } from '../hooks/useTodoStorage';

export function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompletedTodos } = useTodoStorage();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const handleClearCompleted = () => {
    setShowConfirmDialog(true);
  };

  const confirmClearCompleted = () => {
    clearCompletedTodos();
    setShowConfirmDialog(false);
  };

  const cancelClearCompleted = () => {
    setShowConfirmDialog(false);
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="todo-list-container">
      <h1 className="todo-title-heading">My Todo App</h1>
      
      <TodoInput onAdd={addTodo} />

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      {filteredTodos.length === 0 ? (
        <p className="todo-empty-state">
          {todos.length === 0 
            ? "No todos yet. Add one to get started."
            : filter === 'active' 
              ? "No active tasks. Great job!"
              : filter === 'completed'
                ? "No completed tasks yet."
                : "No todos match the current filter."
          }
        </p>
      ) : (
        <div className="todo-items-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}

      {todos.length > 0 && (
        <p className="todo-count">
          {filter === 'all' 
            ? `${activeCount} of ${todos.length} tasks remaining`
            : filter === 'active'
              ? `${filteredTodos.length} active tasks`
              : `${filteredTodos.length} completed tasks`
          }
        </p>
      )}

      {completedCount > 0 && (
        <button
          onClick={handleClearCompleted}
          className="clear-completed-button"
          aria-label={`Clear ${completedCount} completed task${completedCount === 1 ? '' : 's'}`}
        >
          Clear Completed ({completedCount})
        </button>
      )}

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <p className="confirm-dialog-message">
              Delete all completed tasks? This action cannot be undone.
            </p>
            <div className="confirm-dialog-buttons">
              <button
                onClick={cancelClearCompleted}
                className="confirm-dialog-cancel"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearCompleted}
                className="confirm-dialog-confirm"
              >
                Delete Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

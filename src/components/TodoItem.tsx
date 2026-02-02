import { useState } from 'react';
import type { Todo } from '../types/todo';
import { Priority } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePriority: (id: string, priority: Priority) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdatePriority }: TodoItemProps) {
  const [ariaMessage, setAriaMessage] = useState('');

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case Priority.HIGH:
        return '🔴'; // Red circle for high priority
      case Priority.MEDIUM:
        return '🟡'; // Yellow circle for medium priority
      case Priority.LOW:
        return '🟢'; // Green circle for low priority
      default:
        return '🟡'; // Default to medium
    }
  };

  const handlePriorityChange = (value: Priority) => {
    onUpdatePriority(todo.id, value);
    setAriaMessage(`Priority set to ${value} for ${todo.title}`);
    // clear message after it's been announced
    setTimeout(() => setAriaMessage(''), 1000);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span className="todo-priority-indicator" title={`Priority: ${todo.priority}`}>
        {getPriorityIndicator(todo.priority)}
      </span>

      <label className="priority-select-label">
        <select
          className="priority-select"
          aria-label={`Change priority for "${todo.title}"`}
          value={todo.priority}
          onChange={(e) => handlePriorityChange(e.target.value as Priority)}
        >
          <option value={Priority.LOW}>Low</option>
          <option value={Priority.MEDIUM}>Medium</option>
          <option value={Priority.HIGH}>High</option>
        </select>
      </label>

      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="todo-delete"
        aria-label={`Delete "${todo.title}"`}
      >
        Delete
      </button>

      <span className="visually-hidden" aria-live="polite">{ariaMessage}</span>
    </div>
  );
} 

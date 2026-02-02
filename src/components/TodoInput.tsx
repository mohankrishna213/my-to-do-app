import { useState } from 'react';
import { Priority } from '../types/todo';

interface TodoInputProps {
  onAdd: (title: string, priority?: Priority) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input, priority);
      setInput('');
      setPriority(Priority.MEDIUM);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
        aria-label="New task input"
      />

      <label className="priority-select-label">
        <select
          className="priority-select"
          aria-label="New task priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value={Priority.LOW}>Low</option>
          <option value={Priority.MEDIUM}>Medium</option>
          <option value={Priority.HIGH}>High</option>
        </select>
      </label>

      <button type="submit" className="todo-add-button">
        Add
      </button>
    </form>
  );
}

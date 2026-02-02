import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { useTodoStorage } from '../hooks/useTodoStorage';
import { Priority } from '../types/todo';

function TestComponent() {
  const { todos, addTodo, updateTodo } = useTodoStorage();

  React.useEffect(() => {
    // on mount, add a todo
    addTodo('from test', Priority.HIGH);
  }, [addTodo]);

  return (
    <div>
      {todos.map((t) => (
        <div key={t.id} data-testid="todo-item">
          {t.title} - {t.priority}
        </div>
      ))}
    </div>
  );
}

test('migration and persistence: add with priority and saved to localStorage', async () => {
  localStorage.clear();

  render(<TestComponent />);

  await waitFor(() => expect(localStorage.getItem('todos-app-data')).not.toBeNull());

  const stored = JSON.parse(localStorage.getItem('todos-app-data') as string);
  expect(Array.isArray(stored)).toBe(true);
  expect(stored[0].priority).toBe(Priority.HIGH);
});
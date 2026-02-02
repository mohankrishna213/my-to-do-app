import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { TodoItem } from '../components/TodoItem';
import { Priority } from '../types/todo';

const todo = {
  id: '1',
  title: 'Sample',
  completed: false,
  createdAt: Date.now(),
  priority: Priority.MEDIUM
};

test('changing priority calls onUpdatePriority and announces change', async () => {
  const user = userEvent.setup();
  const onUpdatePriority = vi.fn();
  const onToggle = vi.fn();
  const onDelete = vi.fn();

  render(
    <TodoItem
      todo={todo}
      onToggle={onToggle}
      onDelete={onDelete}
      onUpdatePriority={onUpdatePriority}
    />
  );

  const select = screen.getByRole('combobox', { name: /change priority for/i });
  await user.selectOptions(select, Priority.HIGH);

  expect(onUpdatePriority).toHaveBeenCalledTimes(1);
  expect(onUpdatePriority).toHaveBeenCalledWith('1', Priority.HIGH);

  // ARIA live message should appear
  const live = screen.getByText(/Priority set to high/i);
  expect(live).toBeInTheDocument();
});
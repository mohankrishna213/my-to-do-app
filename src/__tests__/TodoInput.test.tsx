import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { TodoInput } from '../components/TodoInput';
import { Priority } from '../types/todo';

test('TodoInput calls onAdd with selected priority', async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<TodoInput onAdd={onAdd} />);

  const input = screen.getByRole('textbox', { name: /new task input/i });
  const select = screen.getByRole('combobox', { name: /new task priority/i });
  const button = screen.getByRole('button', { name: /add/i });

  await user.type(input, 'Test priority');
  await user.selectOptions(select, Priority.HIGH);
  await user.click(button);

  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onAdd).toHaveBeenCalledWith('Test priority', Priority.HIGH);
});
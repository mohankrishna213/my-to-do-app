import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todos-app-data';

export function useTodoStorage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadTodos = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Todo[];
          // Validate structure
          if (Array.isArray(parsed) && parsed.every(isValidTodo)) {
            setTodos(parsed);
          } else {
            console.warn('Invalid todo data in storage, starting fresh');
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Failed to load todos from storage:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadTodos();
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to storage:', error);
      if (error instanceof DOMException && error.code === 22) {
        console.warn('Local storage quota exceeded');
      }
    }
  }, [todos]);

  const addTodo = (title: string): void => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearTodos = (): void => {
    setTodos([]);
  };

  const clearCompletedTodos = (): void => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearTodos,
    clearCompletedTodos,
  };
}

function isValidTodo(item: unknown): item is Todo {
  if (typeof item !== 'object' || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.completed === 'boolean' &&
    typeof obj.createdAt === 'number'
  );
}

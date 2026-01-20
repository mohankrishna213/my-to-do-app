# Technical Design: add-todo-functionality

## Architecture Overview

```
App.tsx (main entry point)
├── TodoList (container component)
│   ├── TodoInput (add new task)
│   └── TodoItem[] (display tasks)
└── useTodoStorage (hook for persistence)
```

## Data Model

### Todo Interface
```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}
```

## Component Structure

### TodoInput Component
- **Props**: `onAdd: (title: string) => void`
- **State**: Local input field value
- **Behavior**: 
  - Text input field with placeholder
  - Add button or enter key to submit
  - Clear input after adding
  - Prevent empty task submission

### TodoItem Component
- **Props**: `todo: Todo`, `onToggle: (id: string) => void`, `onDelete: (id: string) => void`
- **Behavior**:
  - Display todo title
  - Checkbox for completion toggle
  - Delete button with confirmation
  - Strike-through text when completed

### TodoList Component
- **State**: Array of todos
- **Effects**: Load from localStorage on mount, save on change
- **Behavior**:
  - Display all todos
  - Manage add/update/delete operations
  - Pass handlers to child components

## Storage Strategy

### Local Storage Key
- **Key**: `todos-app-data`
- **Format**: JSON stringified array of Todo objects

### Operations
- **Save**: Triggered after any add/update/delete operation
- **Load**: On component mount and on storage events
- **Clear**: User can clear all todos (optional for v1)

### Validation
- Validate loaded data structure
- Handle missing or corrupted data gracefully
- Provide sensible defaults

## Hook: useTodoStorage

```typescript
interface UseTodoStorageReturn {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearTodos: () => void;
}

function useTodoStorage(storageKey: string): UseTodoStorageReturn
```

**Features:**
- Loads todos from localStorage on initialization
- Automatically persists changes to localStorage
- Generates unique IDs for new todos
- Returns all CRUD operations

## Error Handling

- Invalid localStorage data: Reset to empty array
- Storage quota exceeded: Console warning, UI message
- Missing todo ID: Skip operation
- Empty title submission: Reject silently

## Styling Approach

Use CSS for:
- Todo list container (flex/grid layout)
- Todo items (horizontal layout with checkbox, title, delete button)
- Input area (flex layout)
- Completed todo styling (opacity, strikethrough)
- Responsive design for different screen sizes
- Hover states for interactivity

## Performance Considerations

- Keep todos array in memory, sync to localStorage
- Don't re-render entire list when single todo changes
- Use React keys efficiently
- Debounce localStorage writes if list grows large (future optimization)

## Testing Strategy

1. **Add Todo**: Submit form, verify todo appears in list
2. **Toggle Completion**: Click checkbox, verify visual change and persistence
3. **Delete Todo**: Click delete, verify removal from list
4. **Local Storage Persistence**: Add todos, reload page, verify todos remain
5. **Input Validation**: Try adding empty string, verify rejection
6. **Multiple Operations**: Add, toggle, delete multiple todos in sequence

# Technical Design: add-clear-completed-button

## Context

This feature extends the existing todo application with bulk task management capabilities. Users need an efficient way to clean up completed tasks without individual deletions.

## Goals / Non-Goals

- Goals: Provide one-click bulk deletion of completed tasks with confirmation
- Non-Goals: Undo functionality, selective bulk operations, auto-cleanup settings

## Decisions

### Button Placement
**Decision:** Position the "Clear Completed" button below the task list, near the task counter for logical grouping.

**Rationale:**
- Groups bulk operations with summary information
- Keeps individual task actions (checkboxes, delete buttons) separate
- Follows common UI patterns in task management apps

### Confirmation Strategy
**Decision:** Use browser's native confirm() dialog for simplicity and accessibility.

**Rationale:**
- Native dialogs are accessible and familiar to users
- Reduces implementation complexity
- Consistent with web standards
- No additional UI dependencies needed

### Hook Extension Pattern
**Decision:** Add clearCompletedTodos function to existing useTodoStorage hook.

**Rationale:**
- Maintains single source of truth for todo operations
- Consistent with existing addTodo, toggleTodo, deleteTodo pattern
- Automatic localStorage persistence included
- Easy to test and maintain

## Risks / Trade-offs

### Confirmation Dialog Trade-offs
- **Native confirm()**: Simple but less customizable vs custom modal
- **No undo**: Reduces complexity but removes safety net
- **Blocking UI**: Pauses interaction during confirmation

### Performance Considerations
- **O(n) filter operation**: Acceptable for typical todo list sizes (<100 items)
- **Single localStorage write**: Efficient for bulk operations
- **No debouncing needed**: Bulk operations are infrequent

## Migration Plan

No migration needed - this is an additive feature that doesn't change existing behavior.

## Open Questions

- Should the button show a count of completed tasks? (e.g., "Clear 3 Completed")
- Should there be a keyboard shortcut for the action?
- Should the confirmation message be customizable?
# Proposal: Add Todo Priority Field

**Change ID:** `add-todo-priority-field`  
**Status:** Pending  
**Created:** 2026-01-22

## Summary

Add a priority field to todo items with LOW, MEDIUM, HIGH enum values, defaulting to MEDIUM, and enable sorting todos by priority in the display list.

## Problem Statement

Users currently cannot prioritize their tasks, making it difficult to focus on high-priority items. All todos are treated equally, which doesn't reflect real-world task management where some tasks are more urgent or important than others.

## Solution Overview

Extend the Todo interface with a priority field that:
- Uses an enum with LOW, MEDIUM, HIGH values
- Defaults to MEDIUM for new todos
- Allows sorting the todo list by priority (HIGH → MEDIUM → LOW)
- Maintains backward compatibility with existing todos
- Updates the UI to display priority information
- Allows users to change a todo's priority from the UI (inline control and edit view), with immediate persistence and accessible keyboard/screen-reader support

## Scope

### In Scope
- Add priority enum type (LOW, MEDIUM, HIGH)
- Extend Todo interface with priority field
- Default new todos to MEDIUM priority
- Add priority sorting functionality to todo list
- Update todo display to show priority indicators
- Allow users to change todo priority from the UI (inline control and edit view)
- Ensure priority controls are accessible (keyboard + screen reader)
- Migrate existing todos to have MEDIUM priority
- Update local storage schema safely

### Out of Scope
- Priority-based filtering (separate from sorting)
- Custom priority levels beyond LOW/MEDIUM/HIGH
- Priority-based notifications or reminders
- Advanced sorting options (date + priority combinations)
- Priority statistics or analytics

## Success Criteria

1. New todos default to MEDIUM priority
2. Existing todos are migrated to MEDIUM priority on first load
3. Todo list can be sorted by priority (HIGH first, then MEDIUM, then LOW)
4. Priority is displayed visually in the todo list
5. Users can change a todo's priority from the UI and the change is persisted
6. Priority controls are accessible via keyboard and screen readers
7. TypeScript compilation passes without errors
8. ESLint validation passes
9. Backward compatibility maintained

## Files Modified/Created

- `src/types/todo.ts` - Add Priority enum and extend Todo interface (MODIFIED)
- `src/hooks/useTodoStorage.ts` - Add priority sorting and migration logic (MODIFIED)
- `src/components/TodoList.tsx` - Add priority display and sorting controls (MODIFIED)
- `src/components/TodoItem.tsx` - Add priority indicator and inline priority control in todo display (MODIFIED)
- `src/components/TodoEdit.tsx` - Add priority selector to the edit form (MODIFIED) (or `TodoInput` if edit view is same component)
- `src/hooks/useTodoStorage.ts` - Add APIs to update todo priority and migration logic (MODIFIED)
- `src/App.css` - Add styling for priority indicators and controls (MODIFIED)
- `tests/` - Add unit/integration/accessibility tests for priority changes (ADDED)

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Breaking existing local storage | Safe migration: default existing todos to MEDIUM |
| UI complexity | Simple priority indicators, minimal visual changes |
| Performance impact | Sorting is O(n log n), acceptable for typical todo counts |
| User confusion | Clear priority labels and intuitive HIGH→MEDIUM→LOW ordering |

## Technical Approach

1. Define Priority enum with LOW, MEDIUM, HIGH values
2. Extend Todo interface with required `priority: Priority` field and ensure migration at load-time to set MEDIUM for missing values
3. Add migration logic in `useTodoStorage` to set MEDIUM for existing todos and persist the migration
4. Implement priority-based sorting in `TodoList` component
5. Add priority indicators to `TodoItem` display
6. Add an inline priority control to `TodoItem` and a priority selector in the todo edit form (`TodoEdit`/`TodoInput`) that updates priority and persists immediately
7. Ensure priority controls are keyboard-accessible and announce changes to screen readers
8. Update CSS for priority styling and control states
9. Add unit, integration, UI, and accessibility tests to cover priority changes and reordering behavior
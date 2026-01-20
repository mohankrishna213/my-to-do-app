# Proposal: Add Clear Completed Button

**Change ID:** `add-clear-completed-button`  
**Status:** Pending  
**Created:** 2026-01-19

## Summary

Add a "Clear Completed" button that allows users to delete all completed tasks at once, improving bulk task management efficiency.

## Problem Statement

Users currently must delete completed tasks one by one, which is inefficient when they have multiple completed items. A bulk delete feature would significantly improve the user experience for task cleanup.

## Solution Overview

Add a "Clear Completed" button that:
- Appears when there are completed tasks
- Deletes all tasks marked as completed in one action
- Provides visual feedback and confirmation
- Maintains data persistence through local storage

## Scope

### In Scope
- "Clear Completed" button in the TodoList component
- Logic to filter and delete all completed todos
- Button visibility based on completed task count
- User confirmation dialog before bulk deletion
- Updated task counter to reflect changes
- Local storage persistence of the operation

### Out of Scope
- Undo functionality for bulk operations
- Selective bulk operations (e.g., select specific tasks)
- Archive functionality for completed tasks
- Settings to auto-clear completed tasks
- Animation effects for the bulk operation

## Success Criteria

1. "Clear Completed" button appears when there are completed tasks
2. Button is hidden when no tasks are completed
3. Clicking button shows confirmation dialog
4. Confirming deletes all completed tasks at once
5. Task counter updates immediately after deletion
6. Changes persist across browser sessions
7. No console errors or warnings
8. Button is accessible with proper ARIA labels

## Files Modified/Created

- `src/hooks/useTodoStorage.ts` - Add clearCompletedTodos function (MODIFIED)
- `src/components/TodoList.tsx` - Add Clear Completed button and confirmation (MODIFIED)
- `src/App.css` - Add styling for clear button (MODIFIED)

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Accidental bulk deletion | Confirmation dialog required |
| Performance with many todos | Filter operation is O(n), acceptable for typical usage |
| State inconsistency | Use existing hook pattern for atomic operations |

## Technical Approach

1. Extend useTodoStorage hook with clearCompletedTodos function
2. Add confirmation dialog to TodoList component
3. Position button near task counter for logical grouping
4. Style button to match existing design language
5. Test with various completed/incomplete task combinations
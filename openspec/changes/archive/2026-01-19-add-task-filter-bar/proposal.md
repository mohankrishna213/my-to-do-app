# Proposal: Add Task Filter Bar

**Change ID:** `add-task-filter-bar`  
**Status:** Pending  
**Created:** 2026-01-19

## Summary

Add a filter bar component that allows users to view All, Active (incomplete), or Completed tasks, improving task management and focus.

## Problem Statement

Currently, users see all tasks mixed together, making it difficult to focus on specific task states. Users need the ability to filter their view to see only active tasks when working, or only completed tasks when reviewing accomplishments.

## Solution Overview

Add a filter bar with three buttons (All, Active, Completed) that allows users to filter the displayed todo list. The filter state will be maintained in component state and will not persist across sessions (by design, as it's a UI preference).

## Scope

### In Scope
- Filter bar component with All/Active/Completed buttons
- Filter state management in TodoList component
- Filtered rendering of todo items based on selected filter
- Visual indication of active filter button
- Task counter updates to reflect filtered view
- Responsive design for filter buttons

### Out of Scope
- Persisting filter preference across sessions
- Advanced filtering (by date, priority, etc.)
- Search functionality
- Sorting options (alphabetical, date, etc.)
- Filter animations or transitions

## Success Criteria

1. Filter bar appears above the todo list when there are tasks
2. Clicking "All" shows all tasks (default state)
3. Clicking "Active" shows only incomplete tasks
4. Clicking "Completed" shows only completed tasks
5. Active filter button is visually highlighted
6. Task counter reflects the current filter view
7. Filter state resets to "All" when page refreshes
8. Filter works correctly with empty states
9. Responsive design works on mobile devices

## Files Modified/Created

- `src/components/TodoFilter.tsx` - New filter bar component (NEW)
- `src/components/TodoList.tsx` - Add filter state and logic (MODIFIED)
- `src/App.css` - Add styling for filter bar (MODIFIED)

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Performance with large todo lists | Filtering is O(n), acceptable for typical usage |
| State management complexity | Keep filter state simple and local to component |
| UI confusion with multiple views | Clear visual indicators and consistent behavior |

## Technical Approach

1. Create TodoFilter component with three filter buttons
2. Add filter state to TodoList component (useState with 'all' | 'active' | 'completed')
3. Implement filter logic to show appropriate todos
4. Update task counter to reflect filtered counts
5. Style filter buttons with active state indication
6. Ensure responsive design for mobile devices
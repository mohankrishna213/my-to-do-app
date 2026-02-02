# Implementation Tasks: add-todo-priority-field

## Checklist

- [x] 1. Define Priority enum with LOW, MEDIUM, HIGH values
- [x] 2. Extend Todo interface with priority field (optional for migration)
- [x] 3. Add migration logic to set MEDIUM priority for existing todos
- [x] 4. Implement priority-based sorting in TodoList component
- [x] 5. Add priority display indicators to TodoItem component
- [x] 5a. Add inline priority control (dropdown/segmented control) to `TodoItem` to change priority from the list
- [x] 5b. Add a priority selector to the todo edit form (`TodoEdit`/`TodoInput`) to change priority during edits
- [x] 6. Update CSS styling for priority indicators and controls
- [x] 7. Add priority sorting toggle to TodoList UI
- [x] 7a. Ensure list reorders when a todo's priority changes while priority sorting is active
- [x] 8. Test priority enum values and default behavior
- [x] 9. Test migration of existing todos to MEDIUM priority
- [x] 10. Test priority sorting (HIGH → MEDIUM → LOW)
- [x] 11. Test priority display in todo list
- [x] 12. Test changing a todo's priority updates UI and persists to localStorage
- [x] 12a. Add accessibility tests: keyboard interaction and screen reader announcements for priority controls
- [x] 13. Verify TypeScript compilation and ESLint checks

## Implementation Order

Complete tasks in sequence to ensure dependencies are met:

1. **Type Definitions** (Tasks 1-2) - Define enum and extend interface ✅
2. **Data Migration** (Task 3) - Handle existing todos safely ✅
3. **Sorting Logic** (Task 4) - Implement priority-based sorting ✅
4. **UI Components** (Tasks 5-7) - Add priority display and controls ✅
5. **Styling** (Task 6) - Add CSS for priority indicators ✅
6. **Testing & Validation** (Tasks 8-13) - Quality assurance ✅

## Dependencies

- Requires existing `core.todo-management` capability to be implemented ✅
- Uses existing Todo interface and component patterns ✅
- Follows existing component and styling conventions ✅
- Maintains backward compatibility with local storage ✅
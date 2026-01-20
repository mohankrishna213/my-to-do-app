# Todo Capability Specification Delta

**Change ID:** `add-task-filter-bar`
**Affected Capability:** `core.todo-management` (MODIFIED)

## MODIFIED Requirements

### Requirement: Display Todos

Todos SHALL be displayed in a readable list format with title and completion status.

#### Scenario: Show todo with checkbox
Given a list with 2 todos
When the user views the TodoList
Then each todo displays:
  - Checkbox (unchecked for incomplete, checked for complete)
  - Todo title text
  - Delete button

#### Scenario: Show empty state
Given the user has no todos
When they open the application
Then a message appears like "No todos yet. Add one to get started."

#### Scenario: Show clear completed button
Given a list with at least one completed todo
When the user views the TodoList
Then a "Clear Completed" button is visible below the task list

#### Scenario: Hide clear completed button
Given a list with no completed todos
When the user views the TodoList
Then no "Clear Completed" button is visible

#### Scenario: Show filter bar
Given a list with at least one todo
When the user views the TodoList
Then a filter bar with "All", "Active", and "Completed" buttons is visible above the task list

#### Scenario: Hide filter bar when no tasks
Given the user has no todos
When they open the application
Then no filter bar is visible

---

## ADDED Requirements

### Requirement: Filter Todo Display

Users SHALL be able to filter the displayed todo list by completion status.

#### Scenario: Filter shows all tasks by default
Given a list with mixed completed and incomplete todos
When the user opens the application
Then all tasks are displayed
And the "All" filter button is highlighted as active

#### Scenario: Filter to show only active tasks
Given a list with mixed completed and incomplete todos
When the user clicks the "Active" filter button
Then only incomplete tasks are displayed
And the "Active" button is highlighted
And completed tasks are hidden

#### Scenario: Filter to show only completed tasks
Given a list with mixed completed and incomplete todos
When the user clicks the "Completed" filter button
Then only completed tasks are displayed
And the "Completed" button is highlighted
And incomplete tasks are hidden

#### Scenario: Switch between filters
Given the user has filtered to "Active" tasks
When they click "All" filter button
Then all tasks are displayed again
And the "All" button is highlighted

#### Scenario: Task counter reflects current filter
Given a list with 2 completed and 3 incomplete todos
When the user clicks "Active" filter
Then the counter shows "3 of 5 tasks remaining"
And only the 3 incomplete tasks are visible

#### Scenario: Filter works with empty filtered results
Given a list with only completed todos
When the user clicks "Active" filter
Then no tasks are displayed
And "No todos yet. Add one to get started." message could appear (optional)

---

## Notes

- Filter state should not persist across browser sessions
- Default filter should be "All" on page load
- Filter buttons should have clear active/inactive visual states
- Task counter should reflect the current filter view, not total counts
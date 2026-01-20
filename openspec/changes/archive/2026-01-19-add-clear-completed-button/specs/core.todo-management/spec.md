# Todo Capability Specification Delta

**Change ID:** `add-clear-completed-button`
**Affected Capability:** `core.todo-management` (MODIFIED)

## MODIFIED Requirements

### Requirement: Delete Todos

Users SHALL be able to remove todos from their list.

#### Scenario: User deletes a todo
Given a list with todos "Buy milk" and "Walk dog"
When user clicks the delete button on "Buy milk"
Then "Buy milk" is removed from the list
And "Walk dog" remains
And the change is persisted

#### Scenario: User deletes all todos
Given a list with 3 todos
When user deletes each todo one by one
Then the list becomes empty
And "No todos yet" message displays

#### Scenario: User bulk deletes completed todos
Given a list with todos: "Buy milk" (completed), "Walk dog" (incomplete), "Code review" (completed)
When user clicks "Clear Completed" button and confirms
Then "Buy milk" and "Code review" are removed from the list
And "Walk dog" remains incomplete
And the change is persisted

---

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

---

## ADDED Requirements

### Requirement: Bulk Delete Completed Todos

Users SHALL be able to delete all completed tasks at once with confirmation.

#### Scenario: Bulk delete with confirmation
Given a list with 2 completed and 1 incomplete todo
When user clicks "Clear Completed" button
Then a confirmation dialog appears asking "Delete all completed tasks?"

#### Scenario: Confirm bulk deletion
Given the confirmation dialog is shown
When user clicks "OK" or "Confirm"
Then all completed todos are deleted
And incomplete todos remain
And the dialog closes

#### Scenario: Cancel bulk deletion
Given the confirmation dialog is shown
When user clicks "Cancel"
Then no todos are deleted
And the dialog closes
And the list remains unchanged

#### Scenario: Bulk delete persistence
Given completed todos are bulk deleted
When the browser is refreshed
Then the completed todos remain deleted
And only incomplete todos are shown

---

## Notes

- "Clear Completed" button should only appear when there are completed tasks
- Confirmation dialog should use browser's native confirm() for accessibility
- Button should be styled consistently with existing UI elements
- Operation should be atomic - either all completed tasks are deleted or none
- Task counter should update immediately after bulk deletion
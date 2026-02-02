# Core Todo Management Specification - Delta

**Change ID:** `add-todo-priority-field`  
**Capability:** `core.todo-management`  
**Status:** Modified  

## ADDED Requirements

### Requirement: Todo Priority Levels

Todos SHALL support priority levels to help users organize tasks by importance.

#### Scenario: Priority enum values
Given the Todo type definition
When reviewing the code
Then priority SHALL be an enum with values: LOW, MEDIUM, HIGH
And MEDIUM SHALL be the default value for new todos

#### Scenario: New todo default priority
Given a user creates a new todo "Buy groceries"
When the todo is added to the list
Then the todo SHALL have MEDIUM priority by default

#### Scenario: Existing todos migration
Given existing todos without priority in local storage
When the application loads
Then all existing todos SHALL be assigned MEDIUM priority
And the updated data SHALL be saved to local storage

---

### Requirement: Priority-Based Sorting

Users SHALL be able to sort their todo list by priority level.

#### Scenario: Sort by priority order
Given todos with different priorities: HIGH "Urgent bug fix", MEDIUM "Code review", LOW "Update docs"
When user sorts by priority
Then todos SHALL appear in order: HIGH, MEDIUM, LOW
And completed status SHALL not affect priority sorting

#### Scenario: Priority sorting toggle
Given a todo list with mixed priorities
When user clicks "Sort by Priority" button
Then the list SHALL reorder by priority (HIGH first)
And the button SHALL indicate active sorting mode

#### Scenario: Default sorting behavior
Given no explicit sorting is selected
When todos are displayed
Then todos SHALL maintain their creation order
And priority sorting SHALL be optional

---

### Requirement: Priority Display

Priority levels SHALL be visually indicated in the todo list.

#### Scenario: Priority indicators
Given a todo with HIGH priority
When displayed in the list
Then a visual indicator SHALL show the priority level
And the indicator SHALL be color-coded (HIGH=red, MEDIUM=yellow, LOW=green)

#### Scenario: Priority persistence
Given a todo with LOW priority
When the browser is refreshed
Then the priority SHALL remain LOW
And the visual indicator SHALL persist

---

### Requirement: Change Todo Priority

Users SHALL be able to change the priority level of an existing todo from the UI.

#### Scenario: Change single todo priority via inline control
Given a todo "Fix bug" with MEDIUM priority is displayed in the list
When the user selects a different priority (LOW or HIGH) using the todo's priority control (e.g. a dropdown or segmented control)
Then the todo's `priority` field SHALL update to the selected value
And the visual indicator SHALL update to reflect the new priority color
And the change SHALL be saved to local storage immediately
And if priority sorting is active, the list SHALL reorder according to the new priority

#### Scenario: Change priority via edit flow
Given a user opens a todo edit view for "Write docs"
When the user selects HIGH priority and saves
Then the todo's `priority` SHALL be updated and persisted
And the UI SHALL reflect the updated priority

#### Scenario: Accessibility and keyboard support for priority changes
Given a todo is focusable in the list
When the user focuses the priority control and uses keyboard controls to change the value
Then the priority SHALL change and the screen reader SHALL announce the new priority
And the control SHALL have appropriate accessible labels and roles

#### Scenario: Priority change does not affect other properties
Given a todo with MEDIUM priority and createdAt timestamp
When the user changes priority to LOW
Then `createdAt` and `completed` values SHALL remain unchanged

---

## MODIFIED Requirements

### Requirement: TypeScript Type Safety

All todo-related code SHALL use TypeScript interfaces to ensure type safety.

#### Scenario: Todo data structure
Given the application code
When reviewing todo-related files
Then all todos SHALL conform to a Todo interface with:
  - `id: string` (unique identifier)
  - `title: string` (task description)
  - `completed: boolean` (completion status)
  - `createdAt: number` (timestamp)
  - `priority: Priority` (priority level: LOW, MEDIUM, HIGH)

---

### Requirement: Local Storage Management

The application SHALL safely manage local storage for todo persistence.

#### Scenario: Migration handling
Given corrupted or invalid data in localStorage with missing priority fields
When the application loads
Then it SHALL migrate todos to MEDIUM priority
And continue working normally without data loss

#### Scenario: Priority data persistence
Given todos with various priority levels
When the browser is closed and reopened
Then all priority information SHALL be preserved
And sorting preferences SHALL be maintained
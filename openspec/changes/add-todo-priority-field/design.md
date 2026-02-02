# Design: Add Todo Priority Field

## Architectural Overview

This change extends the existing Todo data model with a priority field while maintaining backward compatibility. The implementation follows the existing patterns in the codebase:

- **Data Layer**: Extend Todo interface with optional priority field
- **Storage Layer**: Safe migration of existing todos to MEDIUM priority
- **UI Layer**: Priority indicators and sorting controls
- **Styling**: Consistent with existing design language

## Data Model Changes

### Priority Enum
```typescript
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}
```

### Extended Todo Interface
```typescript
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  priority: Priority; // Required; migration ensures existing todos receive MEDIUM
}
```

## Migration Strategy

**Safe Migration Approach:**
1. Make priority field optional in interface
2. On first load, check existing todos for priority field
3. Set priority to MEDIUM for todos without priority
4. Save migrated data back to localStorage

**Benefits:**
- Zero data loss
- Backward compatibility
- Graceful handling of existing data

## Sorting Implementation

**Priority Order:** HIGH → MEDIUM → LOW (most urgent first)

**Sorting Logic:**
```typescript
const priorityOrder = { high: 3, medium: 2, low: 1 };

todos.sort((a, b) => {
  const aPriority = priorityOrder[a.priority || 'medium'];
  const bPriority = priorityOrder[b.priority || 'medium'];
  return bPriority - aPriority; // Descending order
});
```

## UI Design

### Priority Indicators
- **HIGH**: Red indicator (⚠️ or colored dot)
- **MEDIUM**: Yellow/orange indicator (⚡ or colored dot)
- **LOW**: Green indicator (✓ or colored dot)

### Sorting Control
- Toggle button: "Sort by Priority" / "Sort by Date"
- Visual indicator when priority sorting is active

### Change Priority Controls
- **Inline control:** Provide a small dropdown or segmented control on each todo to change priority quickly without opening an edit view
- **Edit-flow control:** Include a priority selector in the todo edit dialog/form for full edit operations
- **Behavior:** Changing priority SHALL update the todo's `priority` field immediately, persist the change to local storage, and trigger reordering if "Sort by Priority" is active
- **Accessibility:** Controls SHALL be keyboard-focusable, have descriptive `aria-label`s, and announce changes to assistive technologies (e.g., via ARIA live regions or accessible status text)

## Trade-offs Considered

### Option 1: Required Priority Field
- **Pros**: Cleaner data model, no optional fields
- **Cons**: Breaking change, requires forced migration
- **Decision**: Rejected - too disruptive for existing users

### Option 2: Priority as String Union
- **Pros**: Simple, no enum needed
- **Cons**: Runtime errors possible, less type safety
- **Decision**: Rejected - enum provides better type safety

### Option 3: Priority as Number (1-3)
- **Pros**: Easy sorting, compact storage
- **Cons**: Less readable, magic numbers
- **Decision**: Rejected - enum values are more maintainable

### Chosen Approach: Optional Enum Field
- **Pros**: Type safe, backward compatible, readable
- **Cons**: Slightly more complex migration logic
- **Decision**: Accepted - balances safety and functionality

## Performance Considerations

- **Sorting**: O(n log n) for typical todo counts (< 100 items) - acceptable
- **Migration**: One-time operation on first load - negligible impact
- **Storage**: Minimal additional data per todo
- **Rendering**: Simple priority indicators - no performance impact

## Testing Strategy

- **Unit Tests**: Priority enum values, sorting logic, migration logic, and functions that update a todo's priority
- **Integration Tests**: Full workflow including changing priority inline and via edit view, persisting changes, and reordering when sorting by priority
- **UI Tests**: Priority display, sorting toggle, priority controls (dropdown/segmented), keyboard navigation and ARIA behavior
- **Migration Tests**: Backward compatibility with existing data
- **Accessibility Tests**: Screen reader announcements for priority changes and keyboard control coverage
# Technical Design: add-task-filter-bar

## Context

This feature extends the todo application with filtering capabilities to help users focus on specific task states. Users need to be able to view all tasks, only active tasks, or only completed tasks.

## Goals / Non-Goals

- Goals: Provide intuitive filtering with clear visual feedback
- Non-Goals: Persist filter preferences, advanced filtering options

## Decisions

### Filter Types
**Decision:** Three filter options - All, Active, Completed

**Rationale:**
- Covers the three main task states users care about
- Simple and intuitive for users
- Matches common patterns in todo applications

### Component Structure
**Decision:** Separate TodoFilter component for reusability

**Rationale:**
- Keeps TodoList component focused on list management
- Allows filter component to be reused or extended
- Follows existing component separation patterns

### Filter State Management
**Decision:** Local component state in TodoList, not persisted

**Rationale:**
- Filter preference is a UI choice, not data
- Keeps implementation simple
- Defaulting to "All" on refresh is intuitive

### Button Styling
**Decision:** Pill-style buttons with active state highlighting

**Rationale:**
- Modern, clean appearance
- Clear visual indication of active filter
- Consistent with existing app design language
- Good touch targets for mobile

## Risks / Trade-offs

### Filter State Reset
- **Pro**: Simple, no persistence complexity
- **Con**: Users need to re-select filter after refresh
- **Mitigation**: Default to "All" which shows everything

### Performance
- **Filter operation**: O(n) but acceptable for typical todo list sizes
- **Re-renders**: Only when filter changes, minimal impact

## Migration Plan

No migration needed - this is an additive feature that doesn't change existing behavior.

## Open Questions

- Should the filter bar be hidden when there are no tasks?
- Should we add keyboard shortcuts for filters?
- Should the filter persist within a session (localStorage but not across sessions)?
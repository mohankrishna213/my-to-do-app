export const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

export type Priority = typeof Priority[keyof typeof Priority];

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  priority: Priority; // Required; migration ensures existing todos receive MEDIUM
}

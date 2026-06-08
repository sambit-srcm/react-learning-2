export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  description?: string; // optional, not used in UI yet
}

export interface FormState {
  title: string;
  editId: string | null; // null = add mode, string = edit mode
}
export interface AppState {
  todos: Todo[];
  form: FormState; // persisted alongside todos so the draft survives refresh
}

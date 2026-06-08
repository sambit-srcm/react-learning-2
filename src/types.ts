export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export interface FormState {
  title: string;
  editId: string | null;
}
export interface AppState {
  todos: Todo[];
  form: FormState;
}

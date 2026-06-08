import { useState } from 'react';
import type { AppState, Todo } from './types';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { generateId } from './utils/id';

const STORAGE_KEY = 'state';

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { todos: [], form: { title: '', editId: null } };
    }
    return JSON.parse(raw) as AppState;
  } catch (err) {
    console.error('Failed to load from localStorage', err);
    return { todos: [], form: { title: '', editId: null } };
  }
}

function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save into localStorage', err);
  }
}

export default function App() {
  // () => syntax: lazy init — runs once on mount, not on every re-render
  const [todos, setTodos] = useState<Todo[]>(() => loadState().todos);
  const [editId, setEditId] = useState<string | null>(() => loadState().form.editId);
  const [title, setTitle] = useState<string>(() => loadState().form.title);

  const persistState = (newTodos: Todo[], newEditId: string | null, newTitle: string) => {
    saveState({
      todos: newTodos,
      form: { title: newTitle, editId: newEditId }
    });
  };

  const handleSubmit = (inputTitle: string) => {
    const trimmed = inputTitle.trim();
    if (!trimmed) return;
    let newTodos: Todo[];
    if (editId) {
      newTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, title: trimmed } : todo // spread keeps other fields intact
      );
      setTodos(newTodos);
      setEditId(null); // exit edit mode
      setTitle('');
      persistState(newTodos, null, '');
    } else {
      const newTodo: Todo = {
        id: generateId(),
        title: trimmed,
        completed: false
      };
      newTodos = [...todos, newTodo]; // spread instead of push — never mutate state directly
      setTodos(newTodos);
      setTitle('');
      persistState(newTodos, null, '');
    }
  };

  const handleEdit = (todo: Todo) => {
    console.log('edit clicked', todo.id);
    setEditId(todo.id);   // switches form to edit mode
    setTitle(todo.title); // pre-fills the input with current title
  };

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    persistState(newTodos, editId, title);
  };

  const handleToggle = (id: string) => {
    const newTodos = todos.map((todo) =>
      // eslint-disable-next-line eqeqeq
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    persistState(newTodos, editId, title);
  };

  return (
    <div className="app">
      <TodoForm
        title={title}
        editId={editId}
        onTitleChange={setTitle}
        onSubmit={handleSubmit}
      />
      <TodoList
        todos={todos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}

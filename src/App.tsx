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

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadState().todos);
  const [editId, setEditId] = useState<string | null>(() => loadState().form.editId);
  const [title, setTitle] = useState<string>(() => loadState().form.title);

  const handleSubmit = (inputTitle: string) => {
    const trimmed = inputTitle.trim();
    if (!trimmed) return;
    let newTodos: Todo[];
    if (editId) {
      newTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, title: trimmed } : todo
      );
      setTodos(newTodos);
      setEditId(null);
      setTitle('');
    } else {
      const newTodo: Todo = {
        id: generateId(),
        title: trimmed,
        completed: false
      };
      newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setTitle('');
    }
  };

  const handleEdit = (todo: Todo) => {
    console.log('edit clicked', todo.id);
    setEditId(todo.id);
    setTitle(todo.title);
  };

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleToggle = (id: string) => {
    const newTodos = todos.map((todo) =>
      // eslint-disable-next-line eqeqeq
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
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

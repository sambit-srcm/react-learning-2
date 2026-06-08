import { useState } from 'react';
import type { Todo } from './types';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { generateId } from './utils/id';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');

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

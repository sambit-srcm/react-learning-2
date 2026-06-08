import type { Todo } from '../types';

interface Props {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TodoList({ todos, onEdit: _onEdit, onDelete: _onDelete, onToggle: _onToggle }: Props) {
  if (todos.length === 0) {
    return (
      <div className="card">No todos available, get started by adding some!!!!!</div>
    );
  }

  return (
    <div className="card">
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </div>
  );
}

import type { Todo } from '../types';

interface Props {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TodoList({ todos, onEdit, onDelete, onToggle }: Props) {
  if (todos.length === 0) {
    return (
      <div className="card">No todos available, get started by adding some!!!!!</div>
    );
  }

  return (
    <div className="card">
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-row">
            <div className="todo-left">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={todo.completed ? 'todo-title completed' : 'todo-title'}
              >
                {todo.title}
              </label>
            </div>
              <div className="todo-actions">
                <button
                  className="btn btn--primary"
                  aria-label={`Edit task: "${todo.title}"`}
                  disabled={todo.completed}
                  onClick={() => onEdit(todo)}
                >
                  Edit task
                </button>
                <button
                  className="btn btn--danger"
                  aria-label={`Delete task: "${todo.title}"`}
                  disabled={todo.completed === true}
                  onClick={() => onDelete(todo.id)}
                >
                  Delete task
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

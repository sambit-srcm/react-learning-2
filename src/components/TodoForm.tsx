import type { SubmitEvent } from 'react';

interface Props {
  title: string;
  editId: string | null;
  onTitleChange: (value: string) => void;
  onSubmit: (title: string) => void;
}
export function TodoForm({ title, editId, onTitleChange, onSubmit }: Props) {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      alert('Title of the todo is required');
      return;
    }
    onSubmit(title);
  }
  return (
    <form className="card" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Enter todo"
        value={title}
        onChange={(e: any) => onTitleChange(e.target.value)}
      />
      <button className="btn btn--primary" type="submit">
        {editId ? 'Update' : 'Add'}
      </button>
    </form>
  );
}

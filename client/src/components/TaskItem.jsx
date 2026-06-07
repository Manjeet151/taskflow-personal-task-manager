import { useState } from "react";

function TaskItem({
  task,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
  isDraggable,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!editData.title.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    await onUpdateTask(task.id, editData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      await onDeleteTask(task.id);
    }
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        <div className="edit-form">
          <input
            name="title"
            type="text"
            value={editData.title}
            onChange={handleEditChange}
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            rows="3"
          />

          <input
            name="dueDate"
            type="date"
            value={editData.dueDate}
            onChange={handleEditChange}
          />

          <div className="task-actions">
            <button className="primary-button small" onClick={handleSave}>
              Save
            </button>

            <button
              className="secondary-button small"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`task-item ${task.completed ? "completed" : ""} ${
        isDragging ? "dragging" : ""
      }`}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <div className="task-main">
        {isDraggable && (
          <span className="drag-handle" title="Drag to reorder">
            ⋮⋮
          </span>
        )}

        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task)}
          />
          <span className="custom-checkbox"></span>
        </label>

        <div className="task-content">
          <div className="task-title-row">
            <h3>{task.title}</h3>
            {isOverdue && <span className="overdue-badge">Overdue</span>}
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          {task.dueDate && <p className="task-date">Due: {task.dueDate}</p>}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="secondary-button small"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <button className="danger-button small" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
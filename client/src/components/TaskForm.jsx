import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setError("");
      await onAddTask(formData);

      setFormData({
        title: "",
        description: "",
        dueDate: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Task title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Complete assignment"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Optional task details..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="primary-button">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
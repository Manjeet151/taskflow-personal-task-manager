import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleTask, onUpdateTask, onDeleteTask, filter }) {
  if (tasks.length === 0) {
    let message = "No tasks yet. Add your first task to get started.";

    if (filter === "active") {
      message = "No active tasks found.";
    }

    if (filter === "completed") {
      message = "No completed tasks found.";
    }

    return <div className="empty-state">{message}</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
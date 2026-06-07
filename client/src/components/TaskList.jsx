import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
  onReorderTasks,
  canReorder,
  filter,
}) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

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

  const handleDragStart = (taskId) => {
    if (!canReorder) return;
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (event) => {
    if (!canReorder) return;
    event.preventDefault();
  };

  const handleDrop = (targetTaskId) => {
    if (!canReorder || !draggedTaskId || draggedTaskId === targetTaskId) {
      setDraggedTaskId(null);
      return;
    }

    const draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId);
    const targetIndex = tasks.findIndex((task) => task.id === targetTaskId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedTaskId(null);
      return;
    }

    const reorderedTasks = [...tasks];
    const [draggedTask] = reorderedTasks.splice(draggedIndex, 1);
    reorderedTasks.splice(targetIndex, 0, draggedTask);

    onReorderTasks(reorderedTasks);
    setDraggedTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isDraggable={canReorder}
          isDragging={draggedTaskId === task.id}
          onDragStart={() => handleDragStart(task.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(task.id)}
          onDragEnd={handleDragEnd}
          onToggleTask={onToggleTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
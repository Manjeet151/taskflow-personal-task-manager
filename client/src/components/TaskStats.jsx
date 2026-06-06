function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="task-stats">
      <div className="stat-card">
        <span className="stat-number">{totalTasks}</span>
        <span className="stat-label">Total</span>
      </div>

      <div className="stat-card">
        <span className="stat-number">{activeTasks}</span>
        <span className="stat-label">Active</span>
      </div>

      <div className="stat-card">
        <span className="stat-number">{completedTasks}</span>
        <span className="stat-label">Completed</span>
      </div>
    </div>
  );
}

export default TaskStats;
import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  reorderTasks,
  deleteTask,
} from "./api/tasksApi";

import TaskForm from "./components/TaskForm";
import TaskStats from "./components/TaskStats";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleTask = async (task) => {
    const updatedTask = await updateTask(task.id, {
      completed: !task.completed,
    });

    setTasks((prevTasks) =>
      prevTasks.map((currentTask) =>
        currentTask.id === task.id ? updatedTask : currentTask
      )
    );
  };

  const handleUpdateTask = async (id, taskData) => {
    const updatedTask = await updateTask(id, taskData);

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const handleReorderTasks = async (reorderedVisibleTasks) => {
    const previousTasks = tasks;

    try {
      setError("");

      const visibleIds = filteredTasks.map((task) => task.id);
      let visibleIndex = 0;

      const mergedTasks = tasks.map((task) => {
        if (visibleIds.includes(task.id)) {
          const replacementTask = reorderedVisibleTasks[visibleIndex];
          visibleIndex++;
          return replacementTask;
        }

        return task;
      });

      setTasks(mergedTasks);

      const orderedIds = mergedTasks.map((task) => task.id);
      const updatedTasks = await reorderTasks(orderedIds);

      setTasks(updatedTasks);
    } catch (error) {
      setTasks(previousTasks);
      setError(error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const canReorder = filteredTasks.length > 1;

  return (
    <div className="app">
      <header className="app-header">
        <p className="eyebrow">Personal Task Manager</p>
        <h1>TaskFlow</h1>
        <p className="subtitle">
          Organise your tasks, track progress, and stay focused.
        </p>
      </header>

      <main className="app-layout">
        <section className="panel">
          <h2>Add New Task</h2>
          <TaskForm onAddTask={handleAddTask} />
        </section>

        <section className="panel">
          <div className="tasks-header">
            <div>
              <h2>Your Tasks</h2>
              <p className="muted-text">
                Drag and drop tasks to reorder them.
              </p>
            </div>
          </div>

          <TaskStats tasks={tasks} />

          <div className="toolbar">
            <TaskFilters currentFilter={filter} onFilterChange={setFilter} />

            <input
              className="search-input"
              type="text"
              placeholder="Search tasks by title..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          {loading && <div className="empty-state">Loading tasks...</div>}

          {error && <div className="error-box">{error}</div>}

          {!loading && !error && (
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              canReorder={canReorder}
              onReorderTasks={handleReorderTasks}
              onToggleTask={handleToggleTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
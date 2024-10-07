import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 0, title: "task 1", status: 0 },
    { id: 1, title: "task 2", status: 1 },
  ]);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [newTask, setNewTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask) {
      const task = {
        id: Date.now(),
        title: newTask,
        status: 0,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };
  const setTaskStatus = (taskID, status) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskID) {
          return { ...task, status: status ? 1 : 0 };
        } else {
          return task;
        }
      })
    );
  };

  const removeTask = (taskID) => {
    setTasks(tasks.filter((task) => task.id !== taskID));
  };

  return (
    <div className="container">
      <h1>Todo list</h1>
      <hr></hr>
      <ul className="task_list">
        {tasks
          .filter((taskItem) => (showIncomplete ? taskItem.status !== 1 : true))
          .map((taskItem) => (
            <li key={taskItem.id} className={taskItem.status ? "done" : ""}>
              <span className="label">{taskItem.title}</span>
              <div>
                <input
                  className="btn_action btn_done"
                  type="checkbox"
                  checked={Boolean(taskItem.status)}
                  onChange={(e) =>
                    setTaskStatus(taskItem.id, e.target.checked)
                  }></input>
                <button
                  onClick={(e) => removeTask(taskItem.id)}
                  className="btn_action btn_delete">
                  ✖️
                </button>
              </div>
            </li>
          ))}
      </ul>

      <div className="filter_wrapper">
        <label htmlFor="filter" className="filter_label">
          Show incomplete tasks
        </label>
        <input
          type="checkbox"
          id="filter"
          checked={showIncomplete}
          onChange={(e) => setShowIncomplete(e.target.checked)}></input>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          id="new_item"
          value={newTask}
          onChange={handleInputChange}></input>
        <button type="submit">Add item</button>
      </form>
    </div>
  );
}

export default App;

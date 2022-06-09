import React from "react";

const Task = function Task({ task, handler }) {
  return (
    <div className={`tasks-row cursor`} onClick={(e) => handler(task.id)}>
      <div className="title">{task.name}</div>
      <div className="title">{task.description}</div>
      <div className="title">{task.due_date}</div>
      <div className="title">
        {task.state === -1 && <div className="not-completed" />}
        {task.state === 0 && <div className="partially-completed" />}
        {task.state === 1 && <div className="completed" />}
      </div>
    </div>
  );
};

export default Task;

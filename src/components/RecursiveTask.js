import React from "react";
import Task from "./Task";

const RecursiveTask = ({ task, handler }) => {
  if (!task) return null;

  const recur = !!task.children?.length;

  return (
    <div className="task-container" id={`task-${task.id}`} key={task.id}>
      <Task task={task} handler={handler} />
      {recur && (
        <div id={`children-${task.id}`} className="task-children">
          {task.children.map((item) => (
            <RecursiveTask
              key={`recursive-inner-${item.id}`}
              task={item}
              handler={handler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveTask;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import fetchTasks from "./api/fetchTasks";
import Tasks from "./components/Tasks";
import { updateTasks } from "./store/actions/tasksActions";

function App() {
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  function createTree(data) {
    const tree = data
      .reduce((acc, item) => {
        acc.set(item.id, item);

        const parent =
          item.parent === null
            ? acc.get("root")
            : (acc.get(item.parent).children ??= []);

        parent.push(item);

        return acc;
      }, new Map([["root", []]]))
      .get("root");

    return tree;
  }

  function handleFetchResponse(data) {
    const tree = createTree(data);
    setTasks(tree);
    dispatch(updateTasks(data));
  }

  useEffect(() => {
    fetchTasks(handleFetchResponse);
  }, []);

  return (
    <>
      <header></header>
      <main className="main">
        <h1>Tasks: {tasks.length}</h1>
        <div className="tasks-container">
          {tasks.length === 0 && <p>There are currently no tasks</p>}

          <Tasks tasks={tasks} />
        </div>
      </main>
    </>
  );
}

export default App;

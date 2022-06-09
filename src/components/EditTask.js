import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import getResource from "../api/getResource";
import patchResource from "../api/patchResource";
import putResource from "../api/putResource";

const EditTask = function EditTask() {
  const [task, setTask] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [state, setState] = useState(0);
  const [parent, setParent] = useState(0);
  const [error, setError] = useState("");

  const { taskSlug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.tasks.tasks);

  function handleGetResponse(data) {
    if (!data?.resource) return;

    const _task = data.resource.data;

    setTask(_task);
    setName(_task.name || "");
    setDescription(_task.description || "");
    // Add five days from today
    var myDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
    setDueDate(_task.due_date || myDate.toString());
    setState(_task.state);
    setParent(_task.parent || "");
  }

  function getTask() {
    const url = `https://mobal-challenge.herokuapp.com/tasks/${taskSlug}`;
    getResource(url, handleGetResponse);
  }

  useEffect(() => {
    if (taskSlug) getTask();
  }, [taskSlug]);

  function handleUpdateAll(response) {
    setError("");
  }

  function handleUpdateResponse(data) {
    if (data.recource) {
      navigate(`${pathname}`, { replace: true });
      setError("");
    } else {
      console.log("Error:", data);
      setError(data.message);
    }
  }

  const handleUpdateTask = (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Name is required");
      return;
    }

    const url = `https://mobal-challenge.herokuapp.com/tasks/${taskSlug}`;
    const params = {
      name: name,
      parent: parent || null,
      description: description || null,
      // due_date: dueDate,
      state,
    };
    putResource(url, params, handleUpdateResponse);
  };

  return (
    <div className="task-show">
      <form>
        <div className="form-item">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="due_date">Due Date</label>
          <input
            name="due_date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled
          />
        </div>
        <div>
          <label htmlFor="parent">Parent</label>
          <select
            value={parent}
            label="Parent"
            onChange={(e) => setParent(e.target.value)}
          >
            <option value={null}>{null}</option>
            {tasks.map((ts) => (
              <>
                {ts.id !== task.id && (
                  <option key={ts.id} value={ts.id}>
                    {ts.id}
                  </option>
                )}
              </>
            ))}
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="">Task State</label>
          <div className="buttons">
            <button
              className={`not-comp${state === -1 ? " active" : ""}`}
              type="button"
              onClick={(e) => setState(-1)}
            >
              Not Completed
            </button>
            <button
              className={`partially-comp${state === 0 ? " active" : ""}`}
              type="button"
              onClick={(e) => setState(0)}
            >
              Partially Completed
            </button>
            <button
              className={`comp${state === 1 ? " active" : ""}`}
              type="button"
              onClick={(e) => setState(1)}
            >
              Completed
            </button>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-item">
          <button className="submit" type="submit" onClick={handleUpdateTask}>
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

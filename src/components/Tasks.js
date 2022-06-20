import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditTask from "./EditTask";
import RecursiveTask from "./RecursiveTask";

const Tasks = function Tasks({ tasks }) {
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  function handlePagination(items) {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }

  useEffect(() => {
    handlePagination(tasks);
  }, [tasks]);

  // Invoke when user click to request another page.
  const handlePaginateClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tasks.length;
    setItemOffset(newOffset);
  };

  const showChildrenHandler = (id) => {
    const element = document.getElementById(`children-${id}`);

    if (element) {
      if (element.className === "") {
        element.className = "task-children";
      } else {
        element.className = "";
      }
    }

    navigate(`/${id}`, { replace: true });
  };

  return (
    <>
      {!currentItems && <p>No tasks in dive catalog</p>}
      {currentItems && (
        <>
          <div className="tasks-body">
            {currentItems.map((task) => (
              <RecursiveTask
                key={`recursive-${task.id}`}
                task={task}
                handler={showChildrenHandler}
              />
            ))}

            <ReactPaginate
              breakLabel="..."
              nextLabel={<button type="button">Next</button>}
              onPageChange={handlePaginateClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<button type="button">Prevous</button>}
              renderOnZeroPageCount={null}
            />
          </div>

          <Routes>
            <Route path="/" element={null} />
            <Route path="/:taskSlug" element={<EditTask />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default Tasks;

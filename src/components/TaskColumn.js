import React from "react";
import Taskitem from "./Taskitem";
import { useDrop } from "react-dnd";
const TaskColumn = ({ status, tasks, setTasks, todos, progress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToColumn(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // console.log(tasks)
  // let tasksByStatus = (tasks || []).filter((task) => task.status === status);
  const tasksByStatus = (tasks || []).filter((task) => task.status === status);
  // let tasksByStatus = todos;
  // if (status == "inprogress") {
  //   tasksByStatus = progress;
  // }
  // if (status == "closed") {
  //   tasksByStatus = closed;
  // }
  const addItemToColumn = (id) => {
    // console.log("dropped ", id, status)

    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id == id) {
          return { ...t, status: status };
        }

        return t;
      });

      return mTasks;
    });
  };

  // console.log(status, tasksByStatus);

  return (
    <div className="col" ref={drop}>
      <h1>{status.toUpperCase()}</h1>
      <div className="tasklist">
        {tasksByStatus.length > 0 &&
          tasksByStatus.map((task) => (
            <Taskitem key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
      </div>
    </div>
  );
};

export default TaskColumn;

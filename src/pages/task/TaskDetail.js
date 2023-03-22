import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../components/api";

function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    api.get(`tasks/${taskId}`)
    .then((response) => {
      setTask(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [taskId]);

  if (!task) {
    return <div><h3>Task not found.</h3></div>;
  }

  return (
    <div className="container">
      <h1>{task.name}</h1>
      <table className="task-details-table">
        <tbody>
          <tr>
            <td>Description:</td>
            <td>{task.description}</td>
          </tr>
          <tr>
            <td>Start Date:</td>
            <td>{new Date(task.start_date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Due Date:</td>
            <td>{new Date(task.due_date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Assignee:</td>
            <td>{task.team.assigner.username}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{task.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TaskDetail;
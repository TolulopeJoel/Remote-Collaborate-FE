import React, { useState, useEffect } from "react";
import TaskService from "../services/TaskService";
import '../Task.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TaskService.getAllTasks().then((response) => {
      setTasks(response.data);
    }).catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <h1>All Tasks</h1>
      <table className="table table-bordered table-hover my-5">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Assignee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="task-title"><a href={`/tasks/${task.id}`}>{task.name}</a></td>
              <td>{task.description.substring(0, 20)}...</td>
              <td>{new Date(task.due_date).toDateString()}</td>
              <td className="task-assignee">{task.assignee.username}</td>
              <td className={`status ${task.status}`}>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/tasks/new" className="create-button">Create New Task</a>

      {/* calendar view of tasks */}
      {/* Include the contents of the "calendar.html" template directly in this component */}
      {/* Replace any Django template variables with JavaScript variables or props */}
      {/* Example: {% url 'task_detail' task.id %} becomes `/tasks/${task.id}` */}
    </div>
  );
}

export default TaskList;

import React from 'react'
import { Task, TaskFunction } from '../../interfaces/appInterfaces';

interface TasksProps {
  input: string;  
  tasks: Task[];
  handleGetText:  TaskFunction;
  handleEditTask:  TaskFunction;
  handleDeleteTask: (id: string) => void;
}
const Tasks = (props: TasksProps) => {
    const {input, tasks, handleDeleteTask, handleEditTask, handleGetText } = props;
  return (
    <div className="tasks">
    {tasks.map((el, idx) => (

      <div id={el.id} className="task" style={{ display:  el.hidden ? 'none' : 'flex' }} key={el.id}>
        <span>{+(idx + 1)}</span>
        <div
          className="task-text"
          onClick={() => handleGetText(el.text, el.id)}
        >
          {<div dangerouslySetInnerHTML={{ __html: el.text }}></div>}
        </div>
        <div className="btns">
          {el.update && (
            <button onClick={() => handleEditTask(input, el.id)}>
              update
            </button>
          )}
          <button onClick={() => handleDeleteTask(el.id)}>delete</button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Tasks;
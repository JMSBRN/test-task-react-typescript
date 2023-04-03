import React, { useState } from "react";
import "./App.scss";
import { v4 as uuid } from "uuid";

function App() {
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<{ id?: string; text?: string, update?: boolean }[]>([]);
  const id: string = uuid();
  const handlAddTask = () => {
    (input && tasks.length <= 10)  &&
    setTasks(
      [...tasks, { id: id, text: input }]);
    setInput("");
  };
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((el) => el.id !== id));
  };
  const handelEditTask = (text: string, id: string) => {
    if(input) {
    const newtasks = tasks.map((el) => {
      if (el.id === id) {
        el.text = text;
        if(input) {
          el.update = false;
        }
      }
      return el;
    });
    setTasks(newtasks);
    setInput('');
  }
  };
  const handleGetText = (text: string, id: string) => {    
    const newtasks = tasks.map((el) => {
      if (el.id === id) {
        el.update = true;        
      }
      return el;
    });
    setTasks(newtasks);
    setInput(text);
  };

  return (
    <div className="app-container">
      <h3>Text editor for notes with tags.</h3>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handlAddTask}>New Task</button>
      <div className="tasks">
        {
        tasks.map((el, idx) => 
          <div id={el.id} className="task" key={el.id}>
            <span>{+(idx + 1)}</span>
            <div className="task-text" onClick={() => handleGetText(el.text || '', el.id  || "" )}><p>{el.text}</p></div>
            <div className="btns">
              { el.update &&
              <button onClick={() => handelEditTask(input || "", el.id || "")}>
                update
              </button>
              }
              <button onClick={() => handleDeleteTask(el.id || "")}>
                delete
              </button>
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
}

export default App;

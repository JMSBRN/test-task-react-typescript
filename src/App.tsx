import React, { useEffect, useState } from "react";
import "./App.scss";
import { v4 as uuid } from "uuid";
import { Task } from "./interfaces/appInterfaces";

function App() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<string[]>();
  const [highlightText, setHighlightText] = useState();
  const id: string = uuid();
  const rgx = /#(\w+)/g;

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const updateTags = (tasksArr: Task[]) => {
    const tagsArr: string[] = [];
    tasksArr.forEach((task) => {
      const matchedArr = task.text?.match(rgx) as string[];
      if (matchedArr) {
        matchedArr.forEach((tag) => {
          const formattedTag = tag.slice(1);
          if (!tagsArr.includes(formattedTag)) {
            tagsArr.push(formattedTag);
          }
        });
      }
    });
    setTags(tagsArr);
  };
  useEffect(() => {
    updateTags(tasks);
  }, [tasks]);

  const handlAddTask = () => {
    input &&
      tasks.length <= 10 &&
      setTasks([...tasks, { id: id, text: input, update: false }]);
    setInput("");
  };
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((el) => el.id !== id));
    setTags((prevTags) => {
      const tagsToRemove = tasks
        .filter((el) => el.id === id)
        .flatMap((el) => el.text?.match(rgx) || [])
        .map((tag) => tag.slice(1));
      return prevTags?.filter((tag) => !tagsToRemove.includes(tag));
    });
  };
  const handleEditTask = (text: string, id: string) => {
    if (input) {
      const newtasks = tasks.map((el) => {
        if (el.id === id) {
          el.text = text;
          if (input) {
            el.update = false;
          }
        }
        return el;
      });
      setTasks(newtasks);
      setInput("");
    }
  };
  const replaceTag = (text: string) => {
    const matchedArr = text?.match(rgx) as string[];
    if (matchedArr) {
      matchedArr
        .map((el) => {
          return el.slice(1);
        })
        .forEach((el) => {
          text = text.replaceAll(el, `<span>${el}</span>`);
        });
      return text;
    }
  };
  const handleGetText = (text: string, id: string) => {
    const newTasks = tasks.map((el) => {
      if (el.id === id) {
        el.update = true;
        const newText = replaceTag(el.text);
        if (newText) {
          el.text = newText;
        }
      }
      return el;
    });
    setTasks(newTasks);
    setInput(text);
  };

  return (
    <div className="app-container">
      <h3>Text editor for notes with tags.</h3>
      <textarea value={input} onChange={(e) => handleChangeTextArea(e)} />
      <button onClick={handlAddTask}>New Task</button>
      <div className="tags">
        {tags &&
          tags.map((el, idx) => (
            <div key={idx.toString()} className="tag">
              {el}
            </div>
          ))}
      </div>
      <div className="tasks">
        {tasks.map((el, idx) => (
          <div id={el.id} className="task" key={el.id}>
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
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.scss";
import { v4 as uuid } from "uuid";
import { Task } from "./interfaces/appInterfaces";
import AddTaskForm from "./components/add-tsk-form/AddTaskForm";
import Tags from "./components/tags/Tags";
import Tasks from "./components/tasks/Tasks";

function App() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<string[]>();
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

  const handleDeleteTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    console.log(id);
  };

  return (
    <div className="app-container">
      <h2>Text editor for notes with tags.</h2>
      <AddTaskForm
        handlAddTask={handlAddTask}
        input={input}
        handleChangeTextArea={handleChangeTextArea}
        textButton={"New Task"}
      />
      <Tags handleDeleteTag={handleDeleteTag} tags={tags!} />
      <Tasks
        input={input}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        handleGetText={handleGetText}
        tasks={tasks}
      />
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.scss";
import { Task } from "./interfaces/appInterfaces";
import AddTaskForm from "./components/add-tsk-form/AddTaskForm";
import Tags from "./components/tags/Tags";
import Tasks from "./components/tasks/Tasks";
import { useInput } from "./hooks/useInput";
import { useTags } from "./hooks/useTags";
import { useTasks } from "./hooks/useTasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { input, handleChangeTextArea, setTextInput, clearInput } = useInput();
  const useTagsProps = { tasks, setTasks };
  const { tags, replaceTag, setTags, onClickTag } = useTags(useTagsProps);
  const useTasksProps = {
    input,
    tasks,
    setTasks,
    clearInput,
    setTags,
    setTextInput,
    replaceTag,
  };
  const { handlAddTask, handleDeleteTask, handleEditTask, handleGetText } =
    useTasks(useTasksProps);

  return (
    <div className="app-container">
      <h2>Text editor for notes with tags.</h2>
      <AddTaskForm
        input={input}
        handlAddTask={handlAddTask}
        handleChangeTextArea={handleChangeTextArea}
        textButton={"New Task"}
      />
      <Tags tasks={tasks} setTasks={setTasks} onClick={onClickTag} tags={tags} />
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

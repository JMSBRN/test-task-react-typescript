import { useEffect, useState } from "react";
import { Task } from "../interfaces/appInterfaces";

interface UseTagsProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
export const useTags = (props: UseTagsProps) => {
  const { tasks, setTasks } = props;
  const [tags, setTags] = useState<string[]>([]);
  const rgx = /#(\w+)/g;

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

  const onClickTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    const updatedTasks = tasks.map(task => {
      if (task.text.includes(id)) {
        const updatedTask = { ...task, hidden: !task.hidden };
        if (updatedTask.hidden) {
          e.currentTarget.classList.add("active");
        } else {
          e.currentTarget.classList.remove("active");
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  return { tags, replaceTag, setTags, onClickTag };
}
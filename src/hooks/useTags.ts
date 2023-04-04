import { useEffect, useState } from "react";
import { Task } from "../interfaces/appInterfaces";

export const useTags = (tasks: Task[]) => {
    const [tags, setTags] = useState<string[]>();
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
      
  const handleDeleteTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    console.log(id);
  };
      return { tags, replaceTag, setTags, handleDeleteTag };
}
import React, { useState }  from "react";
import { Task } from "../../interfaces/appInterfaces";

interface TagsProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  tags: string[];
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Tags = (props: TagsProps) => {
  const { tags, onClick, setTasks, tasks } = props;
  const [isActive, setIsActive] = useState(false);
  const handleSetAllTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.parentNode) {
      const childElements = e.currentTarget.parentNode.querySelectorAll(".tag");
      if (childElements) {
        childElements.forEach((child) => {
          if (isActive) {
            child.classList.add("active");
          } else {
            child.classList.remove("active");
          }
        });
        setIsActive(!isActive);
      }
    }
    
    setTasks(tasks.map( el => {
      return { ...el, hidden: !el.hidden }
    }))
  };
  
  return (
    <>
      <div className="tags">
        <button onClick={(e) => handleSetAllTasks(e)}>all tasks</button>
        {
          tags.map((el, idx) => (
            <div
              id={el}
              key={idx.toString()}
              className="tag"
              onClick={(e) => onClick(e)}
            >
              {el}
            </div>
          ))}
      </div>
    </>
  );
};

export default Tags;

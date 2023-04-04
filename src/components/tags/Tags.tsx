import React from "react";
import { Task } from "../../interfaces/appInterfaces";

interface TagsProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tags: string[];
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Tags = (props: TagsProps) => {
  const { tags, onClick, setTasks, tasks } = props;
  const handleSetAllTasks = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.parentNode) {
      const childElements = e.currentTarget.parentNode.querySelectorAll(".tag");
      if (childElements) {
        childElements.forEach((child) => {
          child.className = 'tag';
        });
      }
    }

    setTasks(
      tasks.map((el) => {
        return { ...el, hidden: false };
      })
    );
  };

  return (
    <div className="tags-container">
      <div className="tags">
        {tags.map((el, idx) => (
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
         <button onClick={(e) => handleSetAllTasks(e)}>reset tag filter</button>
    </div>
  );
};

export default Tags;

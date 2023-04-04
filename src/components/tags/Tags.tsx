import React from "react";

interface TagsProps {
  tags: string[];
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Tags = (props: TagsProps) => {
  const { tags, onClick } = props;
  return (
    <div className="tags">
      {tags &&
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
  );
};

export default Tags;

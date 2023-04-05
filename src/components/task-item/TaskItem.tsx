import { Task } from '../../interfaces/appInterfaces';

interface TaskProps {
  idx: number;
  el: Task;
  input: string;
  handleGetText: (text: string, id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleEditTask: (text: string, id: string) => void;
}
const TaskItem = (props: TaskProps) => {
  const { idx, el, input, handleDeleteTask, handleEditTask, handleGetText } =
    props;
  return (
    <div
      id={el.id}
      className="task"
      style={{ display: el.hidden ? 'none' : 'flex' }}
      key={el.id}
    >
      <span>{+(idx + 1)}</span>
      <div className="task-text">
        {<p dangerouslySetInnerHTML={{ __html: el.text }}></p>}
      </div>
      <div className="btns">
        {el.update && (
          <button
            className="btn-update"
            onClick={() => handleEditTask(input, el.id)}
          >
            update
          </button>
        )}
        <button onClick={() => handleDeleteTask(el.id)}>delete</button>
      </div>
      <div className="edit" onClick={() => handleGetText(el.text, el.id)}>
        edit
      </div>
    </div>
  );
};

export default TaskItem;

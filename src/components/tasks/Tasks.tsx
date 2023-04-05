import React from 'react';
import { Task, TaskFunction } from '../../interfaces/appInterfaces';
import TaskItem from '../task-item/TaskItem';
import { Reorder } from 'framer-motion';

interface TasksProps {
  input: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleGetText: TaskFunction;
  handleEditTask: TaskFunction;
  handleDeleteTask: (id: string) => void;
}
const Tasks = (props: TasksProps) => {
  const {
    input,
    tasks,
    setTasks,
    handleDeleteTask,
    handleEditTask,
    handleGetText,
  } = props;
  return (
    <Reorder.Group
      as="div"
      axis="y"
      onReorder={(tasks) => {
        setTasks(tasks);
      }}
      values={tasks}
    >
      <div className="tasks">
        {tasks.map((el, idx) => (
          <Reorder.Item
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={el.id}
            value={el}
          >
            <TaskItem
              idx={idx}
              input={input}
              el={el}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
              handleGetText={handleGetText}
            />
          </Reorder.Item>
        ))}
        {!tasks.length && (
          <div className="start-note">
            <h4>Start Note!</h4>
            <p>
              To create a tag while editing a note, type "#" followed by the tag
              name within the note text field. For example, "I want to go to
              #home". When you finish typing the tag name and click the New task
              button, the corresponding tag will be automatically created and
              displayed in the tag list below the text field.
            </p>

            <p>
              To edit a tag, click on the task in the edit field in the list and
              make the desired changes. Then click the update button.
            </p>

            <p>
              While editing a note, all words that match the tags in the tag
              list will be automatically highlighted for easy identification.
            </p>

            <p>
              To sort tasks by drag and drop, click and hold on a task, and drag
              it to a new position in the list. The updated order will be
              automatically saved and reflected in the task list.
            </p>

            <p>
              <h4>Note!</h4>
              That you can add multiple tags to a note by using "#"
              followed by the tag name, separated by spaces. For example, "#shop
              #groceries #errands".
            </p>
          </div>
        )}
      </div>
    </Reorder.Group>
  );
};

export default Tasks;

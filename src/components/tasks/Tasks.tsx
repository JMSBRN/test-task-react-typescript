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
      </div>
    </Reorder.Group>
  );
};

export default Tasks;

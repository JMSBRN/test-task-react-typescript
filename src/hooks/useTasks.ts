import { Task } from '../interfaces/appInterfaces';
import { v4 as uuid } from 'uuid';

interface UseTasksProps {
    input: string;
    tasks: Task[];
    clearInput: () => void;
    setTasks: (value: React.SetStateAction<Task[]>) => void;
    setTags:  React.Dispatch<React.SetStateAction<string[]>>;
    setTextInput: (text: string) => void;
    replaceTag: (text: string) => string | undefined;
}
export const useTasks = (props: UseTasksProps) => {
    const id: string = uuid();
    const rgx = /#(\w+)/g;

 const {input, tasks, setTasks, clearInput, setTags, setTextInput, replaceTag } = props;
    const handlAddTask = () => {
        input &&
          tasks.length <= 10 &&
          setTasks([...tasks, { id: id, text: input, update: false }]);
        clearInput();
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
        clearInput();
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
          clearInput();
        }
      };
      const handleGetText = (text: string, id: string) => {
        if(!input) {
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
            setTextInput(text);
        }
      };


   return { handlAddTask, handleDeleteTask, handleEditTask, handleGetText };
};
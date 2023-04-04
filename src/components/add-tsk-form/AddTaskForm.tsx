import React from 'react'

 interface AddTaskFormProps {
    input: string;
    handleChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handlAddTask: () => void;
    textButton: string;
 }
const AddTaskForm = (props: AddTaskFormProps ) => {
    const { handlAddTask, handleChangeTextArea, input, textButton } = props;
  return (
    <div className="add-task-from">
      <textarea value={input} onChange={(e) => handleChangeTextArea(e)} />
      <button onClick={handlAddTask}>{textButton}</button>
    </div>
  )
}

export default AddTaskForm;
import { useState } from 'react';
import { createTagsArrFromInput } from '../utils/hookUtils';

export const useInput = (setTags:  React.Dispatch<React.SetStateAction<string[]>>) => {
  const [input , setInput] = useState('');

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    const tagsFromInput = createTagsArrFromInput(e.target.value);
    setTags(tagsFromInput);
  };
  const clearInput = () => setInput('');
  const setTextInput = (text: string) => setInput(text);

  return { input, setTextInput, clearInput, handleChangeTextArea } ;
};
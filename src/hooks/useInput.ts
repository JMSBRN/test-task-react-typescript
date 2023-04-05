import { useState } from 'react';

export const useInput = () => {
  const [input , setInput] = useState('');

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const clearInput = () => setInput('');
  const setTextInput = (text: string) => setInput(text);

  return { input, setTextInput, clearInput, handleChangeTextArea } ;
};
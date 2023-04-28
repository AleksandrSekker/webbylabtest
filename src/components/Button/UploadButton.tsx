import React, {useRef} from 'react';
import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/Message/Message";
import {removeError, setError} from "../../../store/movie";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";

interface UploadButtonProps {
    onFileSelect: (fileContent: string) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { error } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.name.endsWith('.txt')) {
      return dispatch(setError('Please select a text file'));
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      onFileSelect(fileContent);
    };

    reader.readAsText(file);
  };
  if(error) {
    return (<ErrorMessage show={!!error.length} message={error} removeError={() => dispatch(removeError())} />)
  }

  return (
    <>
      <Button title="Upload Text File" onClick={handleFileSelect} color={'blue'} />
      <input type="file" ref={fileInputRef} onChange={handleFileLoad} style={{ display: 'none' }} />
    </>
  );
};

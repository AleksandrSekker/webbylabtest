import React, { useRef } from 'react';
import Button from "@/components/Button/Button";

interface UploadButtonProps {
    onFileSelect: (fileContent: string) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.name.endsWith('.txt')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      onFileSelect(fileContent);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <Button title="Upload Text File" onClick={handleFileSelect} color={'blue'} />
      <input type="file" ref={fileInputRef} onChange={handleFileLoad} style={{ display: 'none' }} />
    </>
  );
};

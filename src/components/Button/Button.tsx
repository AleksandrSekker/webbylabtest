import React from 'react';

interface ButtonProps {
    color: string;
    title: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ color, title, onClick }) => {
  const buttonClasses = `py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-${color}-500 hover:bg-${color}-700`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;

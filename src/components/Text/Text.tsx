import React from 'react';
interface TextProps {
    title: string;
}
const Text = ({title}: TextProps) => (
  <h3 className={'text-2xl font-bold dark:text-white text-blue-300 my-2'} >{title}</h3>
);

export default Text;

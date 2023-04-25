import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  const mockOnClick = jest.fn();
  const buttonProps = {
    color: 'blue',
    title: 'Submit',
    onClick: mockOnClick,
  };

  afterEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with the correct color and title', () => {
    const { getByText } = render(<Button {...buttonProps} />);
    const button = getByText(buttonProps.title);

    expect(button).toHaveClass(`bg-${buttonProps.color}-500`);
    expect(button).toHaveTextContent(buttonProps.title);
  });

  it('calls the onClick function when clicked', () => {
    const { getByText } = render(<Button {...buttonProps} />);
    const button = getByText(buttonProps.title);

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});


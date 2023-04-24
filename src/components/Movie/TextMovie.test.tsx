import React from 'react';
import { render, screen } from '@testing-library/react';
import TextMovie from './TextMovie';

describe('TextMovie', () => {
  it('renders with provided text prop', () => {
    const movieTitle = 'Some Movie Title';
    render(<TextMovie text={movieTitle} />);
    expect(screen.getByText(movieTitle)).toBeInTheDocument();
  });
});

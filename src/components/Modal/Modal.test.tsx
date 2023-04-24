import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const title = 'Example Modal';
  const closeModal = jest.fn();

  beforeEach(() => {
    closeModal.mockClear();
  });


  it('does not render the modal when isOpen is false', () => {
    render(
      <Modal title={title} isOpen={false} closeModal={closeModal} >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

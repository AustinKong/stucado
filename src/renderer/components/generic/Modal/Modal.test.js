import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalSubtitle } from '../Modal';

jest.mock('@phosphor-icons/react', () => {
  return {
    Warning: () => <span>Warning Icon</span>,
    WarningDiamond: () => <span>Warning Diamond Icon</span>,
  };
});

describe('Modal Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    document.body.innerHTML = '<div id="portal"></div>';
  });

  afterEach(() => {
    onCloseMock.mockClear();
  });

  test('renders correctly with default size', () => {
    const { getByText } = render(
      <Modal onClose={onCloseMock}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>
    );

    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Body')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
  });

  test('renders correctly with medium size', () => {
    const { getByTestId } = render(
      <Modal onClose={onCloseMock} size="medium">
        <ModalBody>Body</ModalBody>
      </Modal>
    );

    expect(getByTestId('modal')).toHaveStyle('width: 40vw');
  });

  test('renders correctly with large size', () => {
    const { getByTestId } = render(
      <Modal onClose={onCloseMock} size="large">
        <ModalBody>Body</ModalBody>
      </Modal>
    );

    expect(getByTestId('modal')).toHaveStyle('width: 50vw');
  });

  test('calls onClose when clicking outside the modal', () => {
    const { getByTestId } = render(
      <Modal onClose={onCloseMock}>
        <ModalBody>Body</ModalBody>
      </Modal>
    );

    fireEvent.mouseDown(getByTestId('blanket'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal', () => {
    const { getByText } = render(
      <Modal onClose={onCloseMock}>
        <ModalBody>Body</ModalBody>
      </Modal>
    );

    fireEvent.mouseDown(getByText('Body'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('renders modal title with warn appearance', () => {
    const { getByText } = render(
      <Modal onClose={onCloseMock}>
        <ModalHeader>
          <ModalTitle appearance="warn">Warning Title</ModalTitle>
        </ModalHeader>
      </Modal>
    );

    expect(getByText('Warning Title')).toBeInTheDocument();
    expect(getByText('Warning Icon')).toBeInTheDocument();
  });

  test('renders modal title with danger appearance', () => {
    const { getByText } = render(
      <Modal onClose={onCloseMock}>
        <ModalHeader>
          <ModalTitle appearance="danger">Danger Title</ModalTitle>
        </ModalHeader>
      </Modal>
    );

    expect(getByText('Danger Title')).toBeInTheDocument();
    expect(getByText('Warning Diamond Icon')).toBeInTheDocument();
  });

  test('renders modal subtitle', () => {
    const { getByText } = render(
      <Modal onClose={onCloseMock}>
        <ModalHeader>
          <ModalSubtitle>Subtitle</ModalSubtitle>
        </ModalHeader>
      </Modal>
    );

    expect(getByText('Subtitle')).toBeInTheDocument();
  });
});

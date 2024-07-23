import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalSubtitle } from './index';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock('@phosphor-icons/react', () => {
  return {
    Warning: () => <span>Warning Icon</span>,
    WarningDiamond: () => <span>Warning Diamond Icon</span>,
  };
});

const mockStore = configureStore([]);

describe('Modal Component', () => {
  const onCloseMock = jest.fn();
  let store;

  beforeEach(() => {
    document.body.innerHTML = '<div id="portal"></div>';
    store = mockStore({
      settings: {
        colorTheme: 'blue',
      },
    });
  });

  afterEach(() => {
    onCloseMock.mockClear();
  });

  test('renders correctly with default size', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </Modal>
      </Provider>
    );

    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Body')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
  });

  test('renders correctly with medium size', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock} size="medium">
          <ModalBody>Body</ModalBody>
        </Modal>
      </Provider>
    );

    expect(getByTestId('modal')).toHaveStyle('width: 40vw');
  });

  test('renders correctly with large size', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock} size="large">
          <ModalBody>Body</ModalBody>
        </Modal>
      </Provider>
    );

    expect(getByTestId('modal')).toHaveStyle('width: 50vw');
  });

  test('calls onClose when clicking outside the modal', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock}>
          <ModalBody>Body</ModalBody>
        </Modal>
      </Provider>
    );

    fireEvent.mouseDown(getByTestId('blanket'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock}>
          <ModalBody>Body</ModalBody>
        </Modal>
      </Provider>
    );

    fireEvent.mouseDown(getByText('Body'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('renders modal title with warn appearance', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock}>
          <ModalHeader>
            <ModalTitle appearance="warn">Warning Title</ModalTitle>
          </ModalHeader>
        </Modal>
      </Provider>
    );

    expect(getByText('Warning Title')).toBeInTheDocument();
    expect(getByText('Warning Icon')).toBeInTheDocument();
  });

  test('renders modal title with danger appearance', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock}>
          <ModalHeader>
            <ModalTitle appearance="danger">Danger Title</ModalTitle>
          </ModalHeader>
        </Modal>
      </Provider>
    );

    expect(getByText('Danger Title')).toBeInTheDocument();
    expect(getByText('Warning Diamond Icon')).toBeInTheDocument();
  });

  test('renders modal subtitle', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Modal onClose={onCloseMock}>
          <ModalHeader>
            <ModalSubtitle>Subtitle</ModalSubtitle>
          </ModalHeader>
        </Modal>
      </Provider>
    );

    expect(getByText('Subtitle')).toBeInTheDocument();
  });
});

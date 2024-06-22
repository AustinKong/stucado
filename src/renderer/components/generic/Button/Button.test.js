import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index.jsx';
import styles from './styles.module.css';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the default button', () => {
    render(<Button onClick={mockOnClick}>Default</Button>);

    const button = screen.getByText('Default');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`${styles.button}`);
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders the warn button', () => {
    render(
      <Button onClick={mockOnClick} appearance="warn">
        Warn
      </Button>
    );

    const button = screen.getByText('Warn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`${styles.button} ${styles.buttonWarn}`);
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders the danger button', () => {
    render(
      <Button onClick={mockOnClick} appearance="danger">
        Danger
      </Button>
    );

    const button = screen.getByText('Danger');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`${styles.button} ${styles.buttonDanger}`);
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders the secondary button', () => {
    render(
      <Button onClick={mockOnClick} appearance="secondary">
        Secondary
      </Button>
    );

    const button = screen.getByText('Secondary');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`${styles.button} ${styles.buttonSecondary}`);
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders with additional className', () => {
    render(
      <Button onClick={mockOnClick} appearance="warn" className="additionalClass">
        Warn with Class
      </Button>
    );

    const button = screen.getByText('Warn with Class');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`${styles.button} ${styles.buttonWarn} additionalClass`);
  });

  test('passes additional props to the button element', () => {
    render(
      <Button onClick={mockOnClick} appearance="warn" id="testButton">
        Warn with Props
      </Button>
    );

    const button = screen.getByText('Warn with Props');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'testButton');
  });
});

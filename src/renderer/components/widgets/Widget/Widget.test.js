import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Widget, { InteractionButton } from './index.jsx';

describe('Widget Component', () => {
  test('renders without crashing', () => {
    render(<Widget className="test-class" title="Test Title" interaction={<div>Test Interaction</div>}>Test Content</Widget>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Interaction')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Test Title');
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders correctly without title and interaction', () => {
    render(<Widget className="test-class">Test Content</Widget>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 4 })).not.toBeInTheDocument();
  });
});

describe('InteractionButton Component', () => {
  test('renders with icon and text', () => {
    const TestIcon = () => <svg data-testid="test-icon"></svg>;
    render(<InteractionButton icon={<TestIcon />} text="Test Text" onClick={() => {}} />);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const TestIcon = () => <svg data-testid="test-icon"></svg>;
    render(<InteractionButton icon={<TestIcon />} text="Test Text" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

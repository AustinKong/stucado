import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Construction from './index.jsx';

describe('Construction Component', () => {
  test('renders the construction icon', () => {
    render(
      <MemoryRouter>
        <Construction />
      </MemoryRouter>
    );

    const icon = screen.getByTestId('barricade-icon');
    expect(icon).toBeInTheDocument();
  });

  test('renders the construction message', () => {
    render(
      <MemoryRouter>
        <Construction />
      </MemoryRouter>
    );

    const message = screen.getByText(/Hello fellow tester\/developer!/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(
      'Hello fellow tester/developer! This feature is under construction, please wait for it to be updated!'
    );
  });

  test('renders the return to home link', () => {
    render(
      <MemoryRouter>
        <Construction />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Return to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});

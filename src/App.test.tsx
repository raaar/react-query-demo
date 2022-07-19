import { render, screen } from '@testing-library/react';
import App from './App';

const MOCK_PROVIDER = 'MOCK_PROVIDER';

jest.mock('react-query', () => {
  const MockProvider = () => <button>{MOCK_PROVIDER}</button>
  return {
    ...jest.requireActual('react-query'),
    QueryClientProvider: MockProvider
  }
})

test('renders app with react-query provider', () => {
  render(<App />);

  expect(screen.getByText(MOCK_PROVIDER)).toBeInTheDocument()
});

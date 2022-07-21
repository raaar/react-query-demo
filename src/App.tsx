import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundry';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </ QueryClientProvider >
    </ErrorBoundary>
  );
}

export default App;

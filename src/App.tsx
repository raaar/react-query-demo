import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Gallery } from './components/Gallery';
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
        <Gallery />
      </ QueryClientProvider >
    </ErrorBoundary>
  );
}

export default App;

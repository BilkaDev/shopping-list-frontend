import { InfoModal } from '@/shared/ui/Page/Modal/InfoModal';
import Router from '@/Router';
import { useInitialData } from './common/hooks/initial-data-hook';

function App() {
  const { error, clearError } = useInitialData();

  return (
    <>
      {error && (
        <InfoModal
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      <Router />
    </>
  );
}

export default App;

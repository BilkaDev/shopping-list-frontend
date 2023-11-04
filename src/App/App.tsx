import { InfoModal } from '@/App/shared/ui/Page/Modal/InfoModal';
import Router from '@/App/Router';
import { useInitialData } from '@/Redux/initial-data-hook';

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

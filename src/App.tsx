import { InfoModal } from './common/components/UiElements/modals/InfoModal';
import Views from './common/Views/Views';
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
      <Views />
    </>
  );
}

export default App;

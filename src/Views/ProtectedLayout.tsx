import { Auth } from '../auth/pages/Auth';
import { Footer } from '../common/components/Footer/Footer';

export function ProtectedLayout() {
  return (
    <>
      <main>
        <Auth />
      </main>
      <Footer />
    </>
  );
}

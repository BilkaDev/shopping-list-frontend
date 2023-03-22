import { Auth } from '../../auth/pages/Auth';
import { Footer } from '../components/Footer/Footer';

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

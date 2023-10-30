import { Footer } from '@/common/components/Footer/Footer';
import { Outlet } from 'react-router';

export function UnauthorizedLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

import { Footer } from '@/App/layouts/common/Footer';
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

import { Outlet } from 'react-router';

import { Footer } from '@/App/layouts/common/Footer';
import { MainHeader } from '@/App/layouts/DeafultLayout/components';

export function DefaultLayout() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

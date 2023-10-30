import { Footer } from '@/common/components/Footer/Footer';
import { MainHeader } from '@/common/components/Header/MainHeader';
import { Outlet } from 'react-router';

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

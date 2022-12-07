import { Footer } from '../common/components/Footer/Footer';
import { MainHeader } from '../common/components/Header/MainHeader';
import { Outlet } from 'react-router';

export function Layout() {
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

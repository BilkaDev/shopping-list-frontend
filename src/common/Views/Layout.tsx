import { Footer } from '../components/Footer/Footer';
import { MainHeader } from '../components/Header/MainHeader';
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

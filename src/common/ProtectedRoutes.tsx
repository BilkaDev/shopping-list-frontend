import { useAuthSelector } from '@/common/hooks/auth-hook';

import { useNavigate } from 'react-router-dom';
import { AppRouter } from '@/AppRouter';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

export function ProtectedRoutes() {
  const { isLoggedIn } = useAuthSelector();
  const nav = useNavigate();


  useEffect(() => {
    if (!isLoggedIn) {
      nav(AppRouter.auth);
    }
  }, [isLoggedIn]);

  return <Outlet />;
}

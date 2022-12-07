import { useAuthSelector } from '../common/hooks/auth-hook';
import { Layout } from './Layout';
import { ProtectedLayout } from './ProtectedLayout';

export function ProtectedRoutes() {
  const { isLoggedIn } = useAuthSelector();

  return isLoggedIn ? <Layout /> : <ProtectedLayout />;
}

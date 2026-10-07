import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: IPrivateRouteProps) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

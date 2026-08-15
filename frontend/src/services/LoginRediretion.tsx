import { Navigate } from "react-router-dom";


interface ILoginRediretion {
  error: unknown;
}


export function LoginRediretion({ error }: ILoginRediretion) {
  if (error) {
    localStorage.clear()
    return <Navigate to={"/login"} replace />
  }
  return null;
}
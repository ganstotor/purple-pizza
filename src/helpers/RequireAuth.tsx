import type {ReactNode} from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RooState } from "../store/store";

export const RequireAuth = ({children}: {children: ReactNode}) => {
  const jwt = useSelector((s: RooState) => s.user.jwt);

  if(!jwt){
    return <Navigate to="/auth/login" replace />
  }
  return children;
}
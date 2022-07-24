import React, { createContext, useContext, useState } from "react";
import { getCurrentUser, getUser, login, logout } from "../services/auth";
import { useLocation, Navigate, Outlet} from "react-router-dom";

interface AuthContextType {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

function useProvideAuth() {
  const [user, setUser] = useState(getUser());

  const signIn = (email, password) => {
    return login(email, password)
      .then(() => getCurrentUser())
      .then(user => setUser(user));
  }

  const signOut = () => {
    logout();
    setUser(null);
    return;
  }

  return {
    user,
    signIn,
    signOut
  }
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return <Outlet />;
}

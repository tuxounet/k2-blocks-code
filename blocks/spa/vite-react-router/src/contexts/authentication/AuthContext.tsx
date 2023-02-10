import React from "react";
import { getLoginUrl, getLogoutUrl, needLogin, getToken } from "./AuthProvider";
import { useConfig } from "../config/ConfigContext";
export interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  login: () => void;
  logout: (callback: VoidFunction) => void;
  getToken: () => string;
  needLogin: () => boolean;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);
  const config = useConfig();

  let login = () => {
    setUser(null);
    const url = getLoginUrl(config);
    window.location.href = url;
  };

  let logout = () => {
    setUser(undefined);
    const url = getLogoutUrl(config);
    window.location.href = url;
  };

  let value = { user, setUser, login, logout, needLogin, getToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

import React from "react";
import { useAuth } from "./AuthContext";

export function AuthPrivate({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  
  const auth = useAuth();
  React.useEffect(() => {
    setError("");
    try {
      if (auth.needLogin()) {
        auth.login();
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!loaded && error === "" && <>Chargement...</>}
      {loaded && error !== "" && <>Erreur {error}</>}
      {loaded && error === "" && <div className="Page">{children}</div>}
    </>
  );
}

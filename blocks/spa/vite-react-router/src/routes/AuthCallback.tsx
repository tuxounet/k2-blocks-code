import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication/AuthContext";
import { exchange_token } from "../contexts/authentication/AuthHandler";
import { useConfig } from "../contexts/config/ConfigContext";

function AuthCallback() {
  const [error, setError] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);

  const { state, code } = useParams();
  const config = useConfig();
  const navigate = useNavigate();

  const auth = useAuth();

  React.useEffect(() => {
    const load = async () => {
      setLoaded(false);

      try {
        await exchange_token(config, code, state);
        if (auth.needLogin()) {
          throw new Error("Failed to identify");
        }
        navigate("/");
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    };

    load();
  }, []);

  return (
    <div className="App">
      {!loaded && error === "" && <>Chargement...</>}
      {loaded && error !== "" && <>Erreur {error}</>}
      {loaded && error === "" && <h1>Bienvenue</h1>}
    </div>
  );
}

export default AuthCallback;

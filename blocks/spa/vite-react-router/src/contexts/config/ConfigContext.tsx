import React from "react";
import axios from "axios";
export interface ConfigContextType {
  current: Record<string, string>;
  apiUrl: string;
  isDev: boolean;
  getOrDefault: (key: string, defaultValue: string) => string;
}

export let ConfigContext = React.createContext<ConfigContextType>(null!);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const [apiUrl, setApiUrl] = React.useState<string>("/");
  const [isDev, setIsDev] = React.useState(false);

  let [current, setCurrent] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const fetchConfig = async () => {
      setLoaded(false);
      let apiUrl = "http://localhost:8000";
      try {
        if (!window.location.hostname.includes(".")) {
          setIsDev(true);
        } else {
          setIsDev(false);
          const hostSegments = window.location.hostname.split(".");

          const firstSegment = hostSegments[0];
          let prefix = firstSegment;
          if (prefix.includes("-")) {
            prefix = prefix.split("-")[0] + "-";
          }

          hostSegments.splice(0, 1);
          const otherSegments = hostSegments.join(".");

          apiUrl = `https://${prefix}api.${otherSegments}`;
        }
        setApiUrl(apiUrl);
        const configUrl = `${apiUrl}/config`;

        const configResult = await axios.get<Record<string, string>>(configUrl);
        console.info("config", configResult.data.CONFIG);
        setCurrent(configResult.data);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    };

    fetchConfig();
  }, []);

  const getOrDefault = (key: string, defaultValue: string): string => {
    if (current == null) return defaultValue;
    const value = current[key];
    if (value == null) return defaultValue;
    return value;
  };
  let value = { current, getOrDefault, apiUrl, isDev };

  return (
    <ConfigContext.Provider value={value}>
      {!loaded && error === "" && <>Chargement...</>}
      {loaded && error !== "" && <>Erreur {error}</>}
      {loaded && error === "" && children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return React.useContext(ConfigContext);
}

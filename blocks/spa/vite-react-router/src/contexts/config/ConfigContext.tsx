import React from "react";
import axios from "axios";
import localConfig from "../../<%=  devConfigFile %>";
export interface ConfigContextType {
  current: Record<string, string>;
  getOrDefault: (key: string, defaultValue: string) => string;
}

export let ConfigContext = React.createContext<ConfigContextType>(null!);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);

  let [current, setCurrent] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const fetchConfig = async () => {
      setLoaded(false);

      try {
        if (!window.location.hostname.includes(".")) {
          setCurrent(localConfig as any);
          return;
        }

        const hostSegments = window.location.hostname.split(".");

        const firstSegment = hostSegments[0];
        let prefix = firstSegment;
        if (prefix.includes("-")) {
          prefix = prefix.split("-")[0] + "-";
        }

        hostSegments.splice(0, 1);
        const otherSegments = hostSegments.join(".");

        const apiBaseUrl = `https://${prefix}api.${otherSegments}`;
        const configUrl = `${apiBaseUrl}/config`;

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
  let value = { current, getOrDefault };

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

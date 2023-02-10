import { ConfigContextType } from "../config/ConfigContext";

export async function callApi(
  config: ConfigContextType,
  token: string,
  method: string,
  route: string
) {
  const result = await fetch(config.apiUrl + "/" + route, {
    method: method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (result.status !== 200) {
    throw new Error("echec de l'appel d'api");
  }
  const body = await result.json();

  return {
    status: result.status,
    body,
  };
}

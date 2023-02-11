/**
 * This represents some generic auth provider API, like Firebase.
 */

import { ConfigContextType } from "../config/ConfigContext";

export function getLoginUrl(config: ConfigContextType) {
  const state = crypto.randomUUID();
  sessionStorage.setItem(`codeVerifier-${state}`, state);

  const redirect_uri =
    window.location.protocol === "http:"
      ? `http://${window.location.host}/callback`
      : `https://${window.location.hostname}/callback`;


  const login_url =
    config.current.APP_OIDC_URL +
    "/login?" +
    "response_type=code&" +
    `client_id=${config.current.APP_OIDC_CLIENT_ID}&` +
    `redirect_uri=${encodeURI(redirect_uri)}&` +
    `state=${state}&` +
    "scope=openid+profile";
  return login_url;
}

export function getLogoutUrl(config: ConfigContextType) {
  const state = crypto.randomUUID();
  sessionStorage.setItem(`codeVerifier-${state}`, state);

  const redirect_uri =
    window.location.protocol === "http:"
      ? `http://${window.location.host}/callback`
      : `https://${window.location.hostname}/callback`;

  const login_url =
    config.current.APP_OIDC_URL +
    "/login?" +
    "response_type=code&" +
    `client_id=${config.current.APP_OIDC_CLIENT_ID}&` +
    `redirect_uri=${encodeURI(redirect_uri)}&` +
    `state=${state}&` +
    "scope=openid+profile";
  return login_url;
}
export async function exchange_token(
  config: ConfigContextType,
  code?: string,
  state?: string
) {
  const codeVerifier = sessionStorage.getItem(`codeVerifier-${state}`);

  if (codeVerifier === null) {
    throw new Error("406");
  }
  sessionStorage.removeItem(`codeVerifier-${state}`);

  const result = await fetch(
    config.current.APP_OIDC_URL +
      "/oauth2/token?" +
      "grant_type=authorization_code" +
      "&client_id=" +
      config.current.APP_OIDC_CLIENT_ID +
      "&code=" +
      code +
      "&redirect_uri=" +
      window.location.origin +
      "/auth/callback.html",
    {
      // Adding method type
      method: "POST",

      // Adding headers to the request
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (result.status === 200) {
    const data = await result.json();
    localStorage.setItem("authorization", JSON.stringify(data));
    localStorage.setItem("authorization-date", new Date().toISOString());
  } else {
    throw new Error("417");
  }
}

export function getToken() {
  const token = localStorage.getItem("authorization");

  if (!token || token == null) {
    throw new Error("missing token");
  }

  const tokenValue = JSON.parse(token);

  return tokenValue.id_token;
}
export function needLogin() {
  const token = localStorage.getItem("authorization");
  if (!token) {
    return true;
  }
  const issuedAt = localStorage.get("authorization-date");
  if (!issuedAt) {
    return true;
  }

  const current = JSON.parse(token);
  console.dir(current);

  return false;
}

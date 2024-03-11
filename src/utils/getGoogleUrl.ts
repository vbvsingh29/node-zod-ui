import { config } from "./constants";

const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URL,
    client_id: config.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",  
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };
  console.log({ options });
  const qs = new URLSearchParams(options);
  console.log({ qs });
  return `${rootUrl}?${qs.toString()}`;
};
export default getGoogleOAuthURL;

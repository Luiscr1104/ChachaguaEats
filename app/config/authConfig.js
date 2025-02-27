import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";

const CLIENT_ID_WEB =
  "478442088086 - i9gdspna02b71gnkecg0q526od9p0s4o.apps.googleusercontent.com";
const CLIENT_ID_IOS =
  "478442088086 - ldqhuv98ucuu3v42jseb2ah4cuv4ksl7.apps.googleusercontent.com";

const REDIRECT_URI_WEB = "https://adad-190-211-120-191.ngrok-free.app";

const CLIENT_SECRET = "$$$$$";

const ADMIN_EMAILS = ["admin@local.com", "otroadmin@local.com"];

export const authConfig = {
  clientId: Platform.OS === "ios" ? CLIENT_ID_IOS : CLIENT_ID_WEB,
  redirectUri:
    Platform.OS === "web"
      ? REDIRECT_URI_WEB
      : AuthSession.makeRedirectUri({ useProxy: true }),
  responseType: "code",
  scopes: ["openid", "profile", "email"],
};

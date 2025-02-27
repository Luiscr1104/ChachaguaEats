import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { authConfig } from "../config/authConfig";

WebBrowser.maybeCompleteAuthSession();

const { clientId, redirectUri, scopes, responseType, CLIENT_SECRET } =
  authConfig;

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

// Lista de correos de administradores
const ADMIN_EMAILS_LIST = authConfig.ADMIN_EMAILS;

const LoginScreen = () => {
  const router = useRouter();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      scopes,
      responseType,
      usePKCE: false, // 🔥 Evita el error de "code_challenge_method"
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      // Intercambiar el código por un token de acceso
      const getAccessToken = async () => {
        const tokenResponse = await fetch(
          "https://oauth2.googleapis.com/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `code=${code}&client_id=${clientId}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
          }
        );

        const tokenData = await tokenResponse.json();
        if (tokenResponse.ok) {
          return tokenData.access_token;
        } else {
          console.error("Error al obtener el token de acceso:", tokenData);
          throw new Error("Error al obtener el token de acceso");
        }
      };

      // Obtener la información del usuario
      const getUserInfo = async (accessToken) => {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (userInfoResponse.ok) {
          return userInfoResponse.json();
        } else {
          console.error(
            "Error al obtener la información del usuario:",
            await userInfoResponse.json()
          );
          throw new Error("Error al obtener la información del usuario");
        }
      };

      getAccessToken()
        .then(getUserInfo)
        .then((userInfo) => {
          // Verificar si el usuario es administrador
          if (ADMIN_EMAILS_LIST.includes(userInfo.email)) {
            // Redirigir al panel de administración
            router.push({
              pathname: "/AdminPanel",
              params: { user: JSON.stringify(userInfo) },
            });
          } else {
            // Redirigir a la pantalla de perfil normal
            router.push({
              pathname: "/ProfileScreen",
              params: { user: JSON.stringify(userInfo) },
            });
          }
        })
        .catch((error) => {
          console.error("Error durante el proceso de autenticación:", error);
        });
    } else if (response?.type === "error") {
      console.error("❌ Error de autenticación:", response.error);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sesión con Google</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.buttonText}>Continuar con Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#DB4437", padding: 12, borderRadius: 8 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default LoginScreen;

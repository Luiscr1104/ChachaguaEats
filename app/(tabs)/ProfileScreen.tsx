// app/(tabs)/ProfileScreen.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ProfileScreen = () => {
  const { user } = useLocalSearchParams();

  // Asegúrate de que user sea un string antes de parsearlo
  const userData = typeof user === "string" ? JSON.parse(user) : null;

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <Image
            source={{ uri: userData.picture }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <Text style={styles.message}>
            ¡Has iniciado sesión correctamente!
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3F4",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#594E4E",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: "#594E4E",
  },
});

export default ProfileScreen;

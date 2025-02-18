import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const CartScreen = () => {
  const router = useRouter();
  const { cartItems } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Carrito</Text>
      {cartItems ? (
        <Text>{JSON.stringify(cartItems)}</Text>
      ) : (
        <Text>No hay productos en el carrito</Text>
      )}

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.checkoutButtonText}>Seguir comprando</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F3F4" },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  checkoutButton: {
    backgroundColor: "#2D6A4F",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default CartScreen;

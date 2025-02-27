import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ImageSourcePropType } from "react-native";

interface Local {
  id: number;
  name: string;
  rating: number;
  schedule: string;
  phone: string;
  whatsapp: string;
  category: string;
  image: string | ImageSourcePropType;
}

const LocalCard: React.FC<{ local: Local }> = ({ local }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/local/${local.id}`);
  };

  const handleCall = () => Linking.openURL(`tel:${local.phone}`);
  const handleWhatsApp = () =>
    Linking.openURL(`https://wa.me/${local.whatsapp}`);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image
        source={
          typeof local.image === "string" ? { uri: local.image } : local.image
        }
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{local.name}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{local.rating}</Text>
        </View>
        <Text style={styles.category}>{local.category}</Text>
        <Text style={styles.deliveryTime}>{local.schedule}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCall}>
            <FontAwesome name="phone" size={18} color="#2D6A4F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
            <FontAwesome name="whatsapp" size={18} color="#2D6A4F" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    margin: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    marginRight: 8,
  },
  category: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#E8F5E9",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});

export default LocalCard;

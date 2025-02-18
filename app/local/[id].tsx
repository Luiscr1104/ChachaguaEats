import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { featuredLocals } from "../data/locals"; // Importa los datos de los locales

const { width } = Dimensions.get("window");

type MenuItem = {
  name: string;
  price: string;
  image: string;
};

type Local = {
  id: number;
  name: string;
  rating: number;
  schedule: string;
  description: string;
  tags: string[];
  image: any;
  specialDishes?: MenuItem[];
};

type MenuSectionProps = {
  title: string;
  items: MenuItem[];
};

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => (
  <View style={styles.menuSection}>
    <Text style={styles.menuSectionTitle}>{title}</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.menuItemsScroll}
    >
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <Image source={{ uri: item.image }} style={styles.menuItemImage} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.menuItemGradient}
          >
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>₡{item.price}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const LocalDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams(); // 🔥 Obtiene el id de la URL
  const router = useRouter();
  const local: Local | undefined = featuredLocals.find(
    (item) => item.id.toString() === id
  );

  if (!local) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>El local no fue encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* 🔥 Botón de Atrás */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={
            typeof local.image === "string" ? { uri: local.image } : local.image
          }
          style={styles.headerImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>{local.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{local.rating}</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        {/* Horario */}
        <View style={styles.scheduleContainer}>
          <Ionicons name="time-outline" size={20} color="#2D6A4F" />
          <Text style={styles.scheduleText}>{local.schedule}</Text>
        </View>

        {/* Descripción */}
        <Text style={styles.description}>{local.description}</Text>

        {/* Etiquetas */}
        <View style={styles.tagsContainer}>
          {local.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Platillos Especiales */}
        {local.specialDishes && (
          <MenuSection
            title="Platillos Destacados"
            items={local.specialDishes}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F3F4" },
  header: { height: 250, position: "relative" },
  headerImage: { width: "100%", height: "100%" },
  headerGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    padding: 20,
    justifyContent: "flex-end",
  },
  backButton: {
    position: "absolute",
    top: 40, // Ajusta según la barra de estado
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  rating: { color: "white", marginLeft: 4, fontWeight: "600" },
  content: { padding: 16 },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scheduleText: { marginLeft: 6, fontSize: 16, color: "#2D6A4F" },
  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 12,
    lineHeight: 22,
  },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  tag: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 6,
  },
  tagText: { color: "#2D6A4F", fontSize: 14, fontWeight: "600" },
  menuSection: { marginBottom: 24 },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D6A4F",
    marginBottom: 12,
  },
  menuItemsScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  menuItem: {
    width: width * 0.35,
    height: width * 0.35,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemImage: { width: "100%", height: "100%" },
  menuItemGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    padding: 8,
    justifyContent: "flex-end",
  },
  menuItemName: { color: "white", fontSize: 14, fontWeight: "bold" },
  menuItemPrice: { color: "#B7E4C7", fontSize: 12, marginTop: 2 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "#594E4E" },
});

export default LocalDetailScreen;

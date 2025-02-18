import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type SpecialDish = {
  name: string;
  price: string;
  image: string;
};

type Local = {
  id: number;
  name: string;
  rating: number;
  schedule: string;
  phone: string;
  whatsapp: string;
  description: string;
  tags: string[];
  image: any;
  specialDishes?: SpecialDish[];
};

const FoodSlider: React.FC<{ dishes: SpecialDish[] }> = ({ dishes }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.dishesScroll}
  >
    {dishes.map((dish, index) => (
      <TouchableOpacity key={index} style={styles.dishCard}>
        <Image source={{ uri: dish.image }} style={styles.dishImage} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.dishGradient}
        >
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.dishPrice}>₡{dish.price}</Text>
        </LinearGradient>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const LocalCard: React.FC<{ local: Local }> = ({ local }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/local/${local.id}`); // 🔥 Redirige a la pantalla del local
  };

  const handleCall = () => Linking.openURL(`tel:${local.phone}`);
  const handleWhatsApp = () =>
    Linking.openURL(`https://wa.me/${local.whatsapp}`);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.localCard}>
      {/* Imagen del local */}
      <Image
        source={
          typeof local.image === "string" ? { uri: local.image } : local.image
        }
        style={styles.localImage}
      />

      <View style={styles.localInfo}>
        {/* Nombre y Rating */}
        <View style={styles.headerRow}>
          <Text style={styles.localName}>{local.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={18} color="#FFD700" />
            <Text style={styles.rating}>{local.rating}</Text>
          </View>
        </View>

        {/* Horario */}
        <View style={styles.scheduleContainer}>
          <Ionicons name="time-outline" size={16} color="#2D6A4F" />
          <Text style={styles.scheduleText}>{local.schedule}</Text>
        </View>

        {/* Descripción */}
        <Text style={styles.description} numberOfLines={2}>
          {local.description}
        </Text>

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
          <View style={styles.foodSliderContainer}>
            <Text style={styles.sectionTitle}>Platillos Destacados</Text>
            <FoodSlider dishes={local.specialDishes} />
          </View>
        )}

        {/* Botones de Acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <FontAwesome name="phone" size={20} color="#2D6A4F" />
            <Text style={styles.actionButtonText}>Llamar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleWhatsApp}
          >
            <FontAwesome name="whatsapp" size={20} color="#2D6A4F" />
            <Text style={styles.actionButtonText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  localCard: {
    backgroundColor: "white",
    borderRadius: 12, // 🔹 Más compacto
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    paddingBottom: 12,
    width: "100%", // 🔹 Ocupar todo el ancho disponible
  },
  localImage: {
    width: "100%",
    height: 140, // 🔹 Reducido de 200px a 140px para más compacidad
  },
  localInfo: {
    padding: 12, // 🔹 Reducido de 16px a 12px
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // 🔹 Menos espacio entre elementos
  },
  localName: {
    fontSize: 18, // 🔹 Ligeramente más pequeño
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 4, // 🔹 Más compacto
    borderRadius: 10,
  },
  rating: {
    marginLeft: 4,
    fontWeight: "600",
    fontSize: 14, // 🔹 Más pequeño
    color: "#594E4E",
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  scheduleText: {
    marginLeft: 6,
    fontSize: 14, // 🔹 Más compacto
    color: "#2D6A4F",
  },
  description: {
    fontSize: 14, // 🔹 Reducido para mayor compacidad
    color: "#666",
    marginVertical: 6,
    lineHeight: 18, // 🔹 Más compacto
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8, // 🔹 Reducido de 12px a 8px
  },
  tag: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10, // 🔹 Más compacto
    paddingVertical: 4, // 🔹 Más compacto
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: "#2D6A4F",
    fontSize: 12, // 🔹 Más pequeño
    fontWeight: "600",
  },
  foodSliderContainer: {
    marginTop: 12, // 🔹 Más compacto
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16, // 🔹 Reducido de 18px a 16px
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 10,
  },
  dishesScroll: {
    marginVertical: 6,
  },
  dishCard: {
    width: 100, // 🔹 Más pequeño para que entren más en la fila
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  dishGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    padding: 6,
    justifyContent: "flex-end",
  },
  dishName: {
    color: "white",
    fontSize: 12, // 🔹 Más compacto
    fontWeight: "bold",
  },
  dishPrice: {
    color: "#B7E4C7",
    fontSize: 10, // 🔹 Más pequeño
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12, // 🔹 Más compacto
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10, // 🔹 Más compacto
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    elevation: 2,
  },
  actionButtonText: {
    marginLeft: 6, // 🔹 Más compacto
    color: "#2D6A4F",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default LocalCard;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

type MenuItem = {
  name: string;
  price: string;
  image: string;
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

const OasisDetailScreen: React.FC = () => {
  const cafeItems: MenuItem[] = [
    {
      name: "Café Helado",
      price: "3500",
      image:
        "https://api.a0.dev/assets/image?text=iced%20coffee%20with%20cream%20premium&aspect=1:1",
    },
    {
      name: "Cappuccino",
      price: "2800",
      image:
        "https://api.a0.dev/assets/image?text=cappuccino%20with%20latte%20art&aspect=1:1",
    },
    {
      name: "Mocaccino",
      price: "3200",
      image:
        "https://api.a0.dev/assets/image?text=mocha%20coffee%20with%20chocolate&aspect=1:1",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://api.a0.dev/assets/image?text=modern%20food%20court%20tropical%20oasis%20design%20beautiful&aspect=16:9",
          }}
          style={styles.headerImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Centro Gastronómico Oasis</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>4.8</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <Text style={styles.menuTitle}>Nuestro Menú</Text>
        <MenuSection title="Café & Bebidas" items={cafeItems} />
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
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 16,
  },
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
});

export default OasisDetailScreen;

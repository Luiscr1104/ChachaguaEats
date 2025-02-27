import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { ImageSourcePropType } from "react-native";
import { promoImages } from "../data/locals";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import CategoryList from "../components/categories/CategoryList";
import LocalCard from "../components/locals/LocalCard";
import { categories } from "../data/categories";
import { featuredLocals } from "../data/locals";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chachagua Food</Text>
        <Text style={styles.headerSubtitle}>¿Qué te provoca hoy?</Text>
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="#594E4E"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes o platillos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#594E4E"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.carouselContainerContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
          >
            {promoImages.map((image: ImageSourcePropType, index: number) => (
              <TouchableOpacity key={index} style={styles.promoCard}>
                <ImageBackground
                  source={image}
                  style={styles.promoImage}
                  imageStyle={styles.promoImageStyle}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButton,
                ]}
                onPress={() => handleCategorySelect(category.id)}
              >
                <View
                  style={[
                    styles.categoryIconContainer,
                    selectedCategory === category.id &&
                      styles.categoryIconContainer,
                  ]}
                >
                  <Ionicons
                    name={category.icon ? category.icon : "restaurant"}
                    size={22}
                    color={
                      selectedCategory === category.id ? "#FFFFFF" : "#2D6A4F"
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Lugares Destacados</Text>
          {featuredLocals.map((local) => (
            <LocalCard key={local.id} local={local} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3F4",
  },
  header: {
    backgroundColor: "#1B4332",
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#B7E4C7",
    fontSize: 16,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 16,
    padding: 12,
    borderRadius: 15,
    elevation: 2,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#594E4E",
  },
  carouselContainerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  carousel: {
    marginTop: 10,
    marginBottom: 10,
  },
  promoCard: {
    width: 250, // 🔹 Se ajusta el ancho para que se vea mejor
    height: 140,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3, // ✅ Ligera sombra para destacar las imágenes
  },
  promoImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  promoImageStyle: {
    borderRadius: 16,
  },
  promoOverlay: {
    padding: 16,
  },
  promoTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  promoSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  categoriesSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212121",
    marginLeft: 16,
    marginBottom: 12,
  },
  categoryButton: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EFFFFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categoryText: {
    fontSize: 12,
    color: "#757575",
    textAlign: "center",
  },
  carouselContent: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
});

export default HomeScreen;

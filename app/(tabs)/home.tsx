import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CategoryList from "../components/categories/CategoryList";
import LocalCard from "../components/locals/LocalCard";
import { categories } from "../data/categories";
import { featuredLocals } from "../data/locals";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategorySelect = (category: { id: number; name: string }) => {
    console.log(`Seleccionaste ${category.name}`);
  };

  return (
    <View style={styles.container}>
      {/* ✅ HEADER VERDE CON BARRA DE BÚSQUEDA */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chachagua Food</Text>
        <Text style={styles.headerSubtitle}>¿Qué te provoca hoy?</Text>

        {/* 🔍 Barra de Búsqueda */}
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

      {/* ScrollView para todo el contenido */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Lista de Categorías con desplazamiento horizontal */}
        <Text style={styles.sectionTitle}>Categorías</Text>
        <CategoryList
          categories={categories}
          onSelectCategory={handleCategorySelect}
        />

        {/* Lugares Destacados */}
        <View style={styles.localsSection}>
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
    backgroundColor: "#1B4332", // ✅ Color verde oscuro
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
  /* 🔍 Barra de búsqueda */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 16,
    padding: 12,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#594E4E",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  localsSection: {
    paddingHorizontal: 16, // 📌 Agrega padding a los lados
    paddingTop: 16, // 📌 Espacio antes de "Lugares Destacados"
    paddingBottom: 30, // 📌 Espacio debajo de la sección
  },
});

export default HomeScreen;

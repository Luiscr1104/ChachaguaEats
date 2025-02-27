import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const AdminPanel = () => {
  const { user } = useLocalSearchParams();
  const userData = typeof user === "string" ? JSON.parse(user) : null;

  const [activeTab, setActiveTab] = useState("categories"); // categories | products
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // Simulación de datos (en una app real, estos vendrían de una base de datos)
  const [categories, setCategories] = useState([
    { id: 1, name: "Comida Rápida", description: "Hamburguesas, pizzas, etc." },
    { id: 2, name: "Bebidas", description: "Refrescos, jugos naturales" },
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hamburguesa Clásica",
      description: "Carne, lechuga, tomate",
      price: "5.99",
      category: "Comida Rápida",
    },
  ]);

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      Alert.alert("Error", "El nombre de la categoría es requerido");
      return;
    }

    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        ...newCategory,
      },
    ]);
    setNewCategory({ name: "", description: "" });
    Alert.alert("Éxito", "Categoría agregada correctamente");
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price.trim()) {
      Alert.alert("Error", "El nombre y precio del producto son requeridos");
      return;
    }

    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...newProduct,
      },
    ]);
    setNewProduct({ name: "", description: "", price: "", category: "" });
    Alert.alert("Éxito", "Producto agregado correctamente");
  };

  const handleDeleteCategory = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar esta categoría?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setCategories(categories.filter((cat) => cat.id !== id));
          },
        },
      ]
    );
  };

  const handleDeleteProduct = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setProducts(products.filter((prod) => prod.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header con información del admin */}
      <View style={styles.header}>
        <View style={styles.adminInfo}>
          {userData?.picture && (
            <Image
              source={{ uri: userData.picture }}
              style={styles.adminImage}
            />
          )}
          <View>
            <Text style={styles.adminName}>{userData?.name}</Text>
            <Text style={styles.adminEmail}>{userData?.email}</Text>
          </View>
        </View>
      </View>

      {/* Tabs de navegación */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "categories" && styles.activeTab]}
          onPress={() => setActiveTab("categories")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "categories" && styles.activeTabText,
            ]}
          >
            Categorías
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "products" && styles.activeTab]}
          onPress={() => setActiveTab("products")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "products" && styles.activeTabText,
            ]}
          >
            Productos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === "categories" ? (
          // Sección de Categorías
          <View>
            <Text style={styles.sectionTitle}>Agregar Nueva Categoría</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nombre de la categoría"
                value={newCategory.name}
                onChangeText={(text) =>
                  setNewCategory({ ...newCategory, name: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={newCategory.description}
                onChangeText={(text) =>
                  setNewCategory({ ...newCategory, description: text })
                }
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddCategory}
              >
                <Text style={styles.buttonText}>Agregar Categoría</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Categorías Existentes</Text>
            {categories.map((category) => (
              <View key={category.id} style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>{category.name}</Text>
                  <Text style={styles.listItemDescription}>
                    {category.description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteCategory(category.id)}
                >
                  <MaterialIcons name="delete" size={24} color="#FF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          // Sección de Productos
          <View>
            <Text style={styles.sectionTitle}>Agregar Nuevo Producto</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                value={newProduct.name}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, name: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={newProduct.description}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, description: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Precio"
                value={newProduct.price}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, price: text })
                }
                keyboardType="decimal-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Categoría"
                value={newProduct.category}
                onChangeText={(text) =>
                  setNewProduct({ ...newProduct, category: text })
                }
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddProduct}
              >
                <Text style={styles.buttonText}>Agregar Producto</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Productos Existentes</Text>
            {products.map((product) => (
              <View key={product.id} style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>{product.name}</Text>
                  <Text style={styles.listItemDescription}>
                    {product.description}
                  </Text>
                  <Text style={styles.listItemPrice}>
                    ${product.price} - {product.category}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteProduct(product.id)}
                >
                  <MaterialIcons name="delete" size={24} color="#FF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
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
  },
  adminInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  adminImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  adminName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  adminEmail: {
    color: "#B7E4C7",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 4,
    margin: 16,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#2D6A4F",
  },
  tabText: {
    color: "#594E4E",
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 12,
    marginTop: 20,
  },
  form: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F5F3F4",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#2D6A4F",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  listItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D6A4F",
  },
  listItemDescription: {
    fontSize: 14,
    color: "#594E4E",
    marginTop: 4,
  },
  listItemPrice: {
    fontSize: 14,
    color: "#2D6A4F",
    fontWeight: "500",
    marginTop: 4,
  },
});

export default AdminPanel;

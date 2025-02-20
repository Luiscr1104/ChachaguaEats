import { useState } from "react";
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
import { Local, MenuItem } from "../types";
import { Linking } from "react-native";
import { Switch } from "react-native";
const { width } = Dimensions.get("window");

type MenuSectionProps = {
  title: string;
  items: MenuItem[];
  addToCart: (item: MenuItem) => void;
  cart?: { item: MenuItem; quantity: number }[];
};

const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  items,
  addToCart,
  cart = [],
}) => (
  <View style={styles.menuSection}>
    <Text style={styles.menuSectionTitle}>{title}</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.menuItemsScroll}
    >
      {items.map((item) => {
        const cartItem = cart.find((cartItem) => cartItem.item.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0; // 🔥 Obtener cantidad de ese item

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => addToCart(item)}
          >
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.menuItemImage}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.menuItemGradient}
            >
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemPrice}>₡{item.price}</Text>
            </LinearGradient>

            {/* 🔥 Badge con la cantidad en el carrito */}
            {quantity > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{quantity}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

const LocalDetailScreen: React.FC = () => {
  const [isExpress, setIsExpress] = useState(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const local: Local | undefined = featuredLocals.find(
    (item) => item.id.toString() === id
  );

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  // 🔥 Disminuir cantidad o eliminar si es 1
  const decreaseQuantity = (itemId: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((cartItem) =>
            cartItem.item.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0) // 🔥 Si llega a 0, lo eliminamos
    );
  };

  // 🔥 Eliminar item directamente
  const removeFromCart = (itemId: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item.id !== itemId)
    );
  };

  const calculateTotal = () =>
    cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );

  if (!local) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>El local no fue encontrado</Text>
      </View>
    );
  }
  const handleOrderNow = () => {
    if (!local || cart.length === 0) return;

    const orderMessage = cart
      .map(
        ({ item, quantity }) =>
          `- ${quantity}x ${item.name} - ₡${item.price * quantity}`
      )
      .join("\n");

    const total = calculateTotal();
    const expressMessage = isExpress
      ? "\n🚀 *Entrega Express* (Confirmar costo con el local)"
      : "";

    const message = `Hola, quiero realizar un pedido en *${local.name}*:\n\n${orderMessage}\n\nTotal: *₡${total}*${expressMessage}\n\nMi dirección es: `;

    const whatsappUrl = `https://wa.me/${
      local.whatsapp
    }?text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl).catch((err) =>
      console.error("Error al abrir WhatsApp", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
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
        <View style={styles.scheduleContainer}>
          <Ionicons name="time-outline" size={20} color="#2D6A4F" />
          <Text style={styles.scheduleText}>{local.schedule}</Text>
        </View>

        <Text style={styles.description}>{local.description}</Text>

        <View style={styles.tagsContainer}>
          {local.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Secciones del Menú */}
        {local.menu.map((section) => (
          <MenuSection
            key={section.title}
            title={section.title}
            items={section.items}
            addToCart={addToCart}
            cart={cart} // 🔥 Pasar carrito para mostrar cantidades
          />
        ))}

        {cart.length > 0 && (
          <View style={styles.cartContainer}>
            <Text style={styles.cartTitle}>Tu Pedido</Text>
            <View style={styles.cartItemsContainer}>
              {cart.map(({ item, quantity }) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                    }
                    style={styles.cartItemImage}
                  />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemText}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>
                      ₡{item.price * quantity}
                    </Text>
                  </View>
                  <View style={styles.cartActions}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item.id)}
                      style={styles.cartActionButton}
                    >
                      <MaterialIcons name="remove" size={20} color="#2D6A4F" />
                    </TouchableOpacity>
                    <Text style={styles.cartQuantity}>{quantity}</Text>
                    <TouchableOpacity
                      onPress={() => addToCart(item)}
                      style={styles.cartActionButton}
                    >
                      <MaterialIcons name="add" size={20} color="#2D6A4F" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.cartRemoveButton}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={22}
                      color="#FF6B6B"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.cartFooter}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>₡{calculateTotal()}</Text>
              </View>
              <View style={styles.expressContainer}>
                <Text style={styles.expressLabel}>
                  ¿Necesitas entrega express?
                </Text>
                <Switch
                  value={isExpress}
                  onValueChange={setIsExpress}
                  trackColor={{ false: "#ccc", true: "#2D6A4F" }}
                  thumbColor={isExpress ? "#ffffff" : "#f4f3f4"}
                />
              </View>

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleOrderNow}
              >
                <Text style={styles.checkoutButtonText}>Ordenar ahora</Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
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
  cartContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 4,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  cartItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  cartItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cartFooter: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingTop: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  checkoutButton: {
    backgroundColor: "#2D6A4F",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
    position: "relative", // 🔥 Para que el badge se posicione correctamente
  },
  menuItemImage: {
    width: "100%",
    height: "100%",
  },
  menuItemGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    padding: 8,
    justifyContent: "flex-end",
  },
  cartBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  cartBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  cartActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cartActionButton: {
    backgroundColor: "#E8F5E9",
    padding: 6,
    borderRadius: 6,
  },
  cartQuantity: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D6A4F",
    minWidth: 24,
    textAlign: "center",
  },
  cartRemoveButton: {
    padding: 6,
    marginLeft: 10,
  },
  cartItemsContainer: {
    gap: 12, // Espaciado entre elementos
  },
  cartItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  expressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  expressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D6A4F",
  },
  menuItemName: { color: "white", fontSize: 14, fontWeight: "bold" },
  menuItemPrice: { color: "#B7E4C7", fontSize: 12, marginTop: 2 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "#594E4E" },
});

export default LocalDetailScreen;

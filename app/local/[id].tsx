import { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { featuredLocals } from "../data/locals"; // Importa los datos de los locales
import { Local, MenuItem } from "../types";
import { Switch } from "react-native";
const { width, height } = Dimensions.get("window");

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
        const quantity = cartItem ? cartItem.quantity : 0;

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
  const [currentStep, setCurrentStep] = useState(1); // 1: Armar pedido, 2: Sinpe, 3: Ordenar
  const [showCartSummary, setShowCartSummary] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const local: Local | undefined = featuredLocals.find(
    (item) => item.id.toString() === id
  );

  // Función para alternar la visibilidad del resumen con animación
  const toggleCartSummary = () => {
    if (showCartSummary) {
      // Contraer el resumen
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setShowCartSummary(false));
    } else {
      // Desplegar el resumen
      setShowCartSummary(true);
      Animated.timing(animatedHeight, {
        toValue: height * 0.8, // 70% de la altura de la pantalla
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

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

  const decreaseQuantity = (itemId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

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

  const handleSinpePayment = () => {
    if (!local) return;

    const amount = calculateTotal();
    const phoneNumber = local.sinpe;
    const detail = `Pago por pedido en ${local.name}`;

    const message = `PASE ${amount} ${phoneNumber} ${detail}`;
    const smsUrl = `sms:2677?body=${encodeURIComponent(message)}`;

    Linking.openURL(smsUrl).catch((err) =>
      console.error("Error al abrir la aplicación de mensajes", err)
    );
  };

  const renderStepContent = () => {
    return (
      <View style={styles.stepContainer}>
        {/* Indicador de Progreso */}
        <View style={styles.progressIndicator}>
          <View
            style={[styles.progressStep, currentStep >= 1 && styles.activeStep]}
          >
            <Text style={styles.progressText}>1</Text>
          </View>
          <View
            style={[styles.progressLine, currentStep >= 2 && styles.activeLine]}
          />
          <View
            style={[styles.progressStep, currentStep >= 2 && styles.activeStep]}
          >
            <Text style={styles.progressText}>2</Text>
          </View>
          <View
            style={[styles.progressLine, currentStep >= 3 && styles.activeLine]}
          />
          <View
            style={[
              styles.progressStep,
              currentStep === 3 && styles.activeStep,
            ]}
          >
            <Text style={styles.progressText}>3</Text>
          </View>
        </View>

        {currentStep === 1 && (
          <View>
            {/* 🔹 Paso 1: Armar el pedido */}
            <Text style={styles.bigStepTitle}>Paso 1: Armá tu pedido</Text>
            <Text style={styles.bigStepDescription}>
              Seleccioná los productos que deseas agregar al carrito. ¡No te
              olvides de revisar las opciones disponibles!
            </Text>

            {local?.menu.map((section) => (
              <MenuSection
                key={section.title}
                title={section.title}
                items={section.items}
                addToCart={addToCart}
                cart={cart}
              />
            ))}

            <TouchableOpacity
              style={styles.nextStepButton}
              onPress={() => setCurrentStep(2)}
            >
              <Text style={styles.nextStepButtonText}>
                Ir al Paso 2: Pagar con Sinpe
              </Text>
              <MaterialIcons name="arrow-forward" size={22} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {currentStep === 2 && (
          <View>
            {/* 🔹 Paso 2: Pago con Sinpe */}
            <Text style={styles.bigStepTitle}>
              Paso 2: Pagar con Sinpe Móvil
            </Text>
            <Text style={styles.bigStepDescription}>
              Realizá el pago usando Sinpe Móvil y adjuntá el comprobante para
              continuar.
            </Text>

            {/* Lista de artículos */}
            <View style={styles.paymentDetails}>
              {cart.map(({ item, quantity }) => (
                <View key={item.id} style={styles.paymentItem}>
                  <Text style={styles.paymentItemName}>
                    {quantity}x {item.name}
                  </Text>
                  <Text style={styles.paymentItemPrice}>
                    ₡{item.price * quantity}
                  </Text>
                </View>
              ))}
              <View style={styles.paymentTotal}>
                <Text style={styles.paymentTotalLabel}>Total a pagar:</Text>
                <Text style={styles.paymentTotalAmount}>
                  ₡{calculateTotal()}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.sinpeButton}
              onPress={handleSinpePayment}
            >
              <Text style={styles.sinpeButtonText}>
                Realizar Pago con Sinpe
              </Text>
              <MaterialIcons name="payment" size={22} color="white" />
            </TouchableOpacity>

            {/* Botones de Navegación */}
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => setCurrentStep(1)}
              >
                <MaterialIcons name="arrow-back" size={20} color="white" />
                <Text style={styles.navigationButtonText}>Volver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => setCurrentStep(3)}
              >
                <Text style={styles.navigationButtonText}>
                  Paso 3: Confirmar Pedido
                </Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentStep === 3 && (
          <View>
            {/* 🔹 Paso 3: Confirmar Pedido */}
            <Text style={styles.bigStepTitle}>Paso 3: Confirmar tu pedido</Text>
            <Text style={styles.bigStepDescription}>
              Revisá tu pedido y confirmá la orden. ¡Estás a un paso de
              disfrutar de tu comida!
            </Text>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleOrderNow}
            >
              <Text style={styles.checkoutButtonText}>
                Confirmar y Ordenar Ahora
              </Text>
              <MaterialIcons name="check-circle" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToHomeButton}
              onPress={() => setCurrentStep(1)}
            >
              <Text style={styles.backToHomeText}>Volver al Inicio</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (!local) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>El local no fue encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Image
            source={
              typeof local.image === "string"
                ? { uri: local.image }
                : local.image
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

          {/* Contenido del paso actual */}
          {renderStepContent()}
        </View>
      </ScrollView>

      {/* Resumen del pedido (fijo en la parte inferior) */}
      <View style={styles.cartSummaryContainer}>
        <TouchableOpacity
          style={styles.cartSummaryHeader}
          onPress={toggleCartSummary}
        >
          <Text style={styles.cartSummaryTitle}>Resumen del Pedido</Text>
          <MaterialIcons
            name={showCartSummary ? "keyboard-arrow-down" : "keyboard-arrow-up"}
            size={24}
            color="#2D6A4F"
          />
        </TouchableOpacity>

        <Animated.View
          style={[styles.cartSummaryContent, { height: animatedHeight }]}
        >
          <View style={styles.cartItemsContainer}>
            {cart.map(({ item, quantity }) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>
                    ₡{item.price * quantity}
                  </Text>
                </View>
                <View style={styles.cartItemActions}>
                  <TouchableOpacity
                    style={styles.cartItemButton}
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <MaterialIcons name="remove" size={20} color="#2D6A4F" />
                  </TouchableOpacity>
                  <Text style={styles.cartItemQuantity}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.cartItemButton}
                    onPress={() => addToCart(item)}
                  >
                    <MaterialIcons name="add" size={20} color="#2D6A4F" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cartItemRemove}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <MaterialIcons name="delete" size={20} color="#FF0000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.cartTotal}>
            <Text style={styles.cartTotalLabel}>Total:</Text>
            <Text style={styles.cartTotalAmount}>₡{calculateTotal()}</Text>
          </View>
          <View style={styles.expressSwitchContainer}>
            <Text style={styles.expressSwitchLabel}>Entrega Express</Text>
            <Switch
              value={isExpress}
              onValueChange={(value) => setIsExpress(value)}
              trackColor={{ false: "#767577", true: "#2D6A4F" }}
              thumbColor={isExpress ? "#FFF" : "#FFF"}
            />
          </View>
        </Animated.View>
      </View>
    </View>
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
  cartItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D6A4F",
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
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: "#594E4E",
    marginBottom: 16,
  },
  paymentDetails: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  paymentItemName: {
    fontSize: 14,
    color: "#594E4E",
  },
  paymentItemPrice: {
    fontSize: 14,
    color: "#2D6A4F",
    fontWeight: "500",
  },
  paymentTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  paymentTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  paymentTotalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  cartSummary: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  scrollContent: {
    paddingBottom: height * 0.3,
  },
  cartSummaryContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 4,
    maxHeight: 600,
  },
  cartSummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFA726", // Color llamativo (naranja)
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cartSummaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  cartSummaryContent: {
    padding: 16,
    backgroundColor: "#FFF3E0", // Fondo claro para el contenido del resumen
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    color: "#2D6A4F",
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  cartItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemButton: {
    padding: 8,
  },
  cartItemQuantity: {
    fontSize: 16,
    marginHorizontal: 8,
    color: "#2D6A4F",
  },
  cartItemRemove: {
    marginLeft: 8,
  },
  cartTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  cartTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  cartTotalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D6A4F",
  },
  expressSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  expressSwitchLabel: {
    fontSize: 16,
    color: "#2D6A4F",
  },
  stepContainer: {
    padding: 20,
  },
  progressIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#2D6A4F",
  },
  progressText: {
    color: "white",
    fontWeight: "bold",
  },
  progressLine: {
    height: 4,
    width: 40,
    backgroundColor: "#E0E0E0",
  },
  activeLine: {
    backgroundColor: "#2D6A4F",
  },
  bigStepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 10,
    textAlign: "center",
  },
  bigStepDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  nextStepButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D6A4F",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  nextStepButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  sinpeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7E1D",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  sinpeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navigationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D6A4F",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  navigationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  checkoutButton: {
    backgroundColor: "#FF7E1D",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  backToHomeButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  backToHomeText: {
    color: "#2D6A4F",
    fontSize: 16,
    fontWeight: "bold",
  },

  menuItemName: { color: "white", fontSize: 14, fontWeight: "bold" },
  menuItemPrice: { color: "#B7E4C7", fontSize: 12, marginTop: 2 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "#594E4E" },
});

export default LocalDetailScreen;

import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

type Dish = {
  name: string;
  price: string;
  image: string;
};

type FoodSliderProps = {
  dishes: Dish[];
};

const FoodSlider: React.FC<FoodSliderProps> = ({ dishes }) => {
  return (
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
};

const styles = StyleSheet.create({
  dishesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  dishCard: {
    width: width * 0.28,
    height: width * 0.28,
    marginRight: 10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    padding: 8,
    justifyContent: "flex-end",
  },
  dishName: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  dishPrice: {
    color: "#B7E4C7",
    fontSize: 12,
    marginTop: 2,
  },
});

export default FoodSlider;

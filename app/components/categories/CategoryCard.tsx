import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

export type Category = {
  id: number;
  name: string;
  places: number;
  image: ImageSourcePropType;
};

type CategoryCardProps = {
  category: Category;
  onPress?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Image source={category.image} style={styles.categoryImage} />
    <View style={styles.categoryOverlay}>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      <Text style={styles.categoryCount}>{category.places} lugares</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryCard: {
    width: 140,
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  categoryTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryCount: {
    color: "#B7E4C7",
    fontSize: 14,
  },
});

export default CategoryCard;

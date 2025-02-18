import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import CategoryCard, { Category } from "./CategoryCard";

type CategoryListProps = {
  categories: Category[];
  onSelectCategory?: (category: Category) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelectCategory,
}) => (
  <View style={styles.container}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onPress={() => onSelectCategory && onSelectCategory(category)}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scroll: {
    paddingHorizontal: 16,
  },
});

export default CategoryList;

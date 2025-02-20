import { Category } from "../types";

export const categoryImages = {
  pizzeria: require("../assets/images/pizza.jpg"),
  pollo: require("../assets/images/pollo.png"),
  cafe: require("../assets/images/cafe.jpeg"),
  helado: require("../assets/images/helado.jpeg"),
  fastfood: require("../assets/images/fastfood.jpg"),
};

export const categories: Category[] = [
  { id: 1, name: "Pizzería", places: 2, image: categoryImages.pizzeria },
  { id: 2, name: "Pollo a la Leña", places: 1, image: categoryImages.pollo },
  { id: 3, name: "Cafetería", places: 2, image: categoryImages.cafe },
  { id: 4, name: "Heladería", places: 1, image: categoryImages.helado },
  { id: 5, name: "Comidas Rápidas", places: 3, image: categoryImages.fastfood },
];

export default categories;

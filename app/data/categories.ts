import { Category } from "../types";

export const categoryImages = {
  pizzeria: require("../assets/images/pizza.jpg"),
  pollo: require("../assets/images/pollo.png"),
  cafe: require("../assets/images/cafe.jpeg"),
  helado: require("../assets/images/helado.jpeg"),
  fastfood: require("../assets/images/fastfood.jpg"),
};

export const categories: Category[] = [
  {
    id: 1,
    name: "Pizzería",
    places: 2,
    image: categoryImages.pizzeria,
    icon: "pizza-outline",
  },
  {
    id: 2,
    name: "Pollo a la Leña",
    places: 1,
    image: categoryImages.pollo,
    icon: "flame-outline",
  },
  {
    id: 3,
    name: "Cafetería",
    places: 2,
    image: categoryImages.cafe,
    icon: "cafe-outline",
  },
  {
    id: 4,
    name: "Heladería",
    places: 1,
    image: categoryImages.helado,
    icon: "ice-cream-outline",
  },
  {
    id: 5,
    name: "Comidas Rápidas",
    places: 3,
    image: categoryImages.fastfood,
    icon: "fast-food-outline",
  },
];

export default categories;

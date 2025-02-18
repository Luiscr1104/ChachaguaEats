import { Local } from "../types";

export const featuredLocals: Local[] = [
  {
    id: 1,
    name: "Centro Gastronómico Oasis",
    rating: 4.8,
    schedule: "11:00 AM - 10:00 PM",
    phone: "+50688888888",
    whatsapp: "50688888888",
    sinpe: "88888888",
    defaultAmount: "5000",
    description: "El mejor centro gastronómico de Chachagua...",
    tags: ["Café", "Helados", "Pizza", "Comida Rápida"],
    image: require("../assets/images/oasis.jpg"),
    specialDishes: [
      {
        name: "Pizza Suprema",
        price: "12000",
        image: "https://api.a0.dev/assets/image?text=pizza&aspect=1:1",
      },
    ],
  },
  {
    id: 2,
    name: "Pollera Chachagua",
    rating: 4.7,
    schedule: "11:00 AM - 9:00 PM",
    phone: "+50688888888",
    whatsapp: "50688888888",
    sinpe: "88888888",
    defaultAmount: "3000",
    description:
      "El mejor pollo a la leña de la zona, con un sabor inigualable...",
    tags: ["Café", "Desayunos", "Almuerzos"],
    image: require("../assets/images/pollera.jpg"),
    specialDishes: [
      {
        name: "Café Helado",
        price: "3500",
        image:
          "https://api.a0.dev/assets/image?text=iced%20coffee%20with%20cream%20premium&aspect=1:1",
      },
    ],
  },
  {
    id: 3,
    name: "Heladería Chachagua",
    rating: 4.6,
    schedule: "11:00 AM - 9:00 PM",
    phone: "+50688888888",
    whatsapp: "50688888888",
    sinpe: "88888888",
    defaultAmount: "2000",
    description: "La mejor heladería de la zona, con sabores únicos...",
    tags: ["Helados", "Postres", "Café"],
    image: require("../assets/images/helado.jpeg"),
    specialDishes: [
      {
        name: "Helado de Vainilla",
        price: "1000",
        image:
          "https://api.a0.dev/assets/image?text=vanilla%20ice%20cream&aspect=1:1",
      },
      {
        name: "Helado de Vainilla",
        price: "1000",
        image:
          "https://api.a0.dev/assets/image?text=fresa%20ice%20cream&aspect=1:1",
      },
      {
        name: "Helado de Vainilla",
        price: "1000",
        image:
          "https://api.a0.dev/assets/image?text=chocolate%20ice%20cream&aspect=1:1",
      },
    ],
  },
];

import { Local } from "../types";
export const promoImages = [
  require("../assets/images/promo1.png"),
  require("../assets/images/promo2.png"),
  require("../assets/images/promo3.png"),
];

export const featuredLocals: Local[] = [
  {
    id: 1,
    name: "Quinchos Pizza",
    category: "Pizzería", // ✅ Agregado
    rating: 4.5,
    schedule: "10:00 AM - 9:00 PM",
    phone: "+50688887777",
    whatsapp: "50688887777",
    sinpe: "88887777",
    defaultAmount: "4500",
    description: "Las mejores pizzas de Chachagua...",
    tags: ["Pizza", "Calzone", "Palitos de queso"],
    image: require("../assets/images/quinchos.jpeg"),
    menu: [
      {
        title: "Carnes",
        items: [
          {
            id: 6,
            name: "Churrasco Especial",
            price: 15000,
            image: require("../assets/images/churrasco.jpg"),
          },
          {
            id: 7,
            name: "Costillas BBQ",
            price: 14000,
            image: require("../assets/images/costillas-bbq.jpg"),
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Laras Food",
    category: "Comida Rapida", // ✅ Agregado
    rating: 4.8,
    schedule: "10:00 AM - 9:00 PM",
    phone: "83330664",
    whatsapp: "+50683330664",
    sinpe: "83330664",
    defaultAmount: "4500",
    description: "El secreto del sabor está en el amor...",
    tags: ["Pizza", "Calzone", "Palitos de queso"],
    image: require("../assets/images/larasFood.jpg"),
    menu: [
      {
        title: "Carnes",
        items: [
          {
            id: 6,
            name: "Churrasco Especial",
            price: 15000,
            image: require("../assets/images/churrasco.jpg"),
          },
          {
            id: 7,
            name: "Costillas BBQ",
            price: 14000,
            image: require("../assets/images/costillas-bbq.jpg"),
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Centro Gastronómico Oasis",
    category: "Cafetería", // ✅ Agregado
    rating: 4.8,
    schedule: "11:00 AM - 10:00 PM",
    phone: "+50688888888",
    whatsapp: "50688888888",
    sinpe: "88888888",
    defaultAmount: "5000",
    description: "El mejor centro gastronómico de Chachagua...",
    tags: ["Café", "Helados", "Pizza", "Comida Rápida"],
    image: require("../assets/images/oasis.jpg"),
    menu: [
      // ✅ Aquí debe haber un array de secciones del menú
      {
        title: "Pizzas",
        items: [
          {
            id: 1,
            name: "Pizza Suprema",
            price: 12000,
            image: require("../assets/images/pizza1.jpg"),
          },
          {
            id: 2,
            name: "Pizza Hawaiana",
            price: 10000,
            image: require("../assets/images/pizza2.jpg"),
          },
        ],
      },
      {
        title: "Bebidas",
        items: [
          {
            id: 3,
            name: "Coca-Cola",
            price: 2000,
            image: require("../assets/images/coca.jpg"),
          },
          {
            id: 4,
            name: "Jugo Natural",
            price: 2500,
            image: require("../assets/images/coca.jpg"),
          },
          {
            id: 5,
            name: "Café",
            price: 1500,
            image: require("../assets/images/coca.jpg"),
          },
          {
            id: 6,
            name: "Churrasco Especial",
            price: 15000,
            image: require("../assets/images/churrasco.jpg"),
          },
          {
            id: 7,
            name: "Costillas BBQ",
            price: 14000,
            image: require("../assets/images/coca.jpg"),
          },
        ],
      },
    ],
  },
];

export default featuredLocals;

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
    preparationTime: "15-20 min",
    lessBusy: "14:00 - 17:00",
    moreBusy: "12:00 - 14:00, 19:00 - 21:00",
    menu: [
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
            image: require("../assets/images/coca.jpg"), // ✅ Cambio de .webp a .jpg
          },
          {
            id: 4,
            name: "Jugo Natural",
            price: 2500,
            image: require("../assets/images/coca.jpg"), // ✅ Imagen corregida
          },
        ],
      },
      {
        title: "Combos",
        items: [
          {
            id: 5,
            name: "Combo Familiar",
            price: 25000,
            image: require("../assets/images/fastfood.jpg"), // ✅ Imagen corregida
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Quinchos Pizza",
    rating: 4.5,
    schedule: "10:00 AM - 9:00 PM",
    phone: "+50688887777",
    whatsapp: "50688887777",
    sinpe: "88887777",
    defaultAmount: "4500",
    description: "Las mejores pizzas de Chachagua...",
    tags: ["Pizza", "Calzone", "Palitos de queso"],
    image: require("../assets/images/quinchos.jpeg"),
    preparationTime: "15-20 min",
    lessBusy: "14:00 - 17:00",
    moreBusy: "12:00 - 14:00, 19:00 - 21:00",
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
      {
        title: "Bebidas",
        items: [
          {
            id: 8,
            name: "Cerveza Artesanal",
            price: 3500,
            image: require("../assets/images/cerveza-artesanal.jpg"), // ✅ Cambio de .webp a .jpg
          },
          {
            id: 9,
            name: "Refresco Natural",
            price: 2500,
            image: require("../assets/images/coca.jpg"), // ✅ Imagen corregida
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Laras Food",
    rating: 4.8,
    schedule: "11:00 AM - 8:00 PM",
    phone: "+50686946036",
    whatsapp: "50686946036",
    sinpe: "86946036",
    defaultAmount: "3000",
    description: "El secreto del amor está en el sabor...",
    tags: ["FastFood", "Pollo", "Hamburguesas"],
    image: require("../assets/images/larasFood.jpg"),
    preparationTime: "15-20 min",
    lessBusy: "14:00 - 17:00",
    moreBusy: "12:00 - 14:00, 19:00 - 21:00",
    menu: [
      {
        title: "Comidas",
        items: [
          {
            id: 10,
            name: "Fajitas",
            price: 1000,
            image: require("../assets/images/polloFrito.jpg"),
          },
          {
            id: 11,
            name: "Patacones",
            price: 800,
            image: require("../assets/images/patacon.jpg"),
          },
          {
            id: 12,
            name: "Nachos",
            price: 1500,
            image: require("../assets/images/polloFrito.jpg"),
          },
          {
            id: 13,
            name: "Pollo Frito",
            price: 1800,
            image: require("../assets/images/polloFrito.jpg"),
          },
          {
            id: 14,
            name: "Ceviche",
            price: 1200,
            image: require("../assets/images/ceviche.jpg"),
          },
        ],
      },
      {
        title: "Bebidas",
        items: [
          {
            id: 15,
            name: "Batido de Chocolate",
            price: 2000,
            image: require("../assets/images/coca.jpg"), // ✅ Cambio de .webp a .jpg
          },
          {
            id: 16,
            name: "Café Helado",
            price: 2500,
            image: require("../assets/images/cafe.jpeg"), // ✅ Imagen corregida
          },
        ],
      },
    ],
  },
];

export default featuredLocals;

import { ImageSourcePropType } from "react-native";

export type Category = {
  id: number;
  name: string;
  places: number;
  image: ImageSourcePropType;
};

export type Local = {
  id: number;
  name: string;
  rating: number;
  schedule: string;
  phone: string;
  whatsapp: string;
  sinpe: string;
  defaultAmount: string;
  description: string;
  tags: string[];
  image: ImageSourcePropType;
  specialDishes?: { name: string; price: string; image: string }[];
};

import { ImageSourcePropType } from "react-native";

export type Category = {
  id: number;
  name: string;
  places: number;
  image: ImageSourcePropType;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
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
  menu: MenuSection[];
};

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

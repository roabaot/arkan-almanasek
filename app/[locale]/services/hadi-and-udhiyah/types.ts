import type { IconType } from "react-icons";

export type Classification = "sheep" | "cow" | "camel";

export type Item = {
  id: string;
  label: string;
  classification?: Classification;
  price: number;
};

export type Section = {
  id: string | number;
  label: string;
  Icon: IconType;
  items: Item[];
};

export type TabKey = "description" | "specs" | "reviews";

export type PageParams = { locale: string; productId: string };

export type GalleryImage = {
  src: string;
  alt: string;
  dataAlt?: string;
};

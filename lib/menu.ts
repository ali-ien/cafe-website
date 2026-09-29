export interface MenuItem {
  name: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
  image: {
    src: string;
    alt: string;
  };
  layout: "image-left" | "image-right";
}

export const dessertsMenu = {
  eyebrow: "Our Menu",
  title: "Desserts Menu",
  subtitle: "A sweeter side of AlArak",
  heroImage: {
    src: "/media/menu/menu-hero-pistachio.jpg",
    alt: "Pistachio vanilla cake on a ceramic plate",
  },
  ctaImage: {
    src: "/media/menu/menu-cta-lemon-cheesecake.jpg",
    alt: "Lemon cheesecake slice",
  },
  categories: [
    {
      id: "cakes-pastries",
      label: "Cakes & Pastries",
      layout: "image-left" as const,
      image: {
        src: "/media/menu/menu-cakes-chocolate.jpg",
        alt: "Chocolate mousse cake slice",
      },
      items: [
        { name: "Chocolate Mousse Cake" },
        { name: "Carrot Cake" },
        { name: "Tiramisu" },
        { name: "Opera Cake" },
        { name: "Sacher Cake" },
        { name: "Pistachio Vanilla Cake" },
        { name: "Rocher Cake" },
        { name: "Almond Cake" },
        { name: "Lemon Cheesecake" },
        { name: "Profiteroles" },
      ],
    },
    {
      id: "trompe-loeil",
      label: "Trompe L'\u0152il Desserts",
      layout: "image-right" as const,
      image: {
        src: "/media/menu/menu-trompe-loeil.jpg",
        alt: "Coffee bean, mango, and strawberry trompe l'\u0153il desserts",
      },
      items: [
        { name: "Coffee Bean Trompe L'\u0152il" },
        { name: "Mango Trompe L'\u0152il" },
        { name: "Strawberry Trompe L'\u0152il" },
      ],
    },
    {
      id: "cookies",
      label: "Cookies",
      layout: "image-left" as const,
      image: {
        src: "/media/menu/menu-cookies.jpg",
        alt: "Artisan chocolate chip cookies",
      },
      items: [
        { name: "Chocolate Chip Cookie" },
        { name: "Oat Cookies" },
        { name: "Coconut Cookies" },
        { name: "Cantucci" },
        { name: "Matcha Cookies" },
        { name: "Dark Chocolate Cookies" },
      ],
    },
  ],
};

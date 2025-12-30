import {
  Home,
  LucideChartSpline,
  UsersRound,
  Receipt,
  Store,
  Medal,
  Copy,
  Boxes,
  type LucideIcon,
} from "lucide-react";
export const dataSlider: { name: string; href: string; Icon: LucideIcon }[] = [
  {
    name: "Home",
    href: "/",
    Icon: Home,
  },
  {
    name: "Impacto social",
    href: "/social-impact",
    Icon: LucideChartSpline,
  },
  {
    name: "Comunidad",
    href: "/community",
    Icon: UsersRound,
  },
  {
    name: "Sponsors",
    href: "/sponsors",
    Icon: Receipt,
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    Icon: Store,
  },
  {
    name: "Bakanes",
    href: "/champions",
    Icon: Medal,
  },
  {
    name: "Contenido",
    href: "/content",
    Icon: Copy,
  },
  {
    name: "Categorias de acciones",
    href: "/action-categories",
    Icon: Boxes,
  },
];

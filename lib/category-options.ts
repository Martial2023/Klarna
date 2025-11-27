import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Car,
  Coins,
  CreditCard,
  Dumbbell,
  Heart,
  Home,
  Laptop,
  MenuSquare,
  Music4,
  Package,
  PiggyBank,
  Pizza,
  Plane,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Wallet,
  Wine,
} from "lucide-react";

export type IconOption = {
  label: string;
  value: string;
  Icon: LucideIcon;
};

export const CATEGORY_ICONS: IconOption[] = [
  { label: "Épargne", value: "PiggyBank", Icon: PiggyBank },
  { label: "Courses", value: "ShoppingCart", Icon: ShoppingCart },
  { label: "Shopping", value: "ShoppingBag", Icon: ShoppingBag },
  { label: "Restauration", value: "Pizza", Icon: Pizza },
  { label: "Voyage", value: "Plane", Icon: Plane },
  { label: "Logement", value: "Home", Icon: Home },
  { label: "Technologie", value: "Laptop", Icon: Laptop },
  { label: "Santé", value: "Heart", Icon: Heart },
  { label: "Sport", value: "Dumbbell", Icon: Dumbbell },
  { label: "Divertissement", value: "Music4", Icon: Music4 },
  { label: "Professionnel", value: "BriefcaseBusiness", Icon: BriefcaseBusiness },
  { label: "Automobile", value: "Car", Icon: Car },
  { label: "Abonnements", value: "MenuSquare", Icon: MenuSquare },
  { label: "Investissements", value: "Coins", Icon: Coins },
  { label: "Finances", value: "Wallet", Icon: Wallet },
  { label: "Carte de crédit", value: "CreditCard", Icon: CreditCard },
  { label: "Évènements", value: "Sparkles", Icon: Sparkles },
  { label: "Cadeaux", value: "Package", Icon: Package },
  { label: "Loisirs", value: "Wine", Icon: Wine },
];

export const ICON_MAP: Record<string, LucideIcon> = CATEGORY_ICONS.reduce(
  (acc, option) => {
    acc[option.value] = option.Icon;
    return acc;
  },
  {} as Record<string, LucideIcon>,
);

export const CATEGORY_COLORS: string[] = [
  "#6366F1",
  "#EC4899",
  "#F97316",
  "#10B981",
  "#14B8A6",
  "#0EA5E9",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#22C55E",
  "#6EE7B7",
  "#38BDF8",
];

export const DEFAULT_ICON = CATEGORY_ICONS[0];
export const DEFAULT_COLOR = CATEGORY_COLORS[0];

export const getCategoryIcon = (value?: string): LucideIcon => {
  if (!value) {
    return DEFAULT_ICON.Icon;
  }
  return ICON_MAP[value] ?? DEFAULT_ICON.Icon;
};

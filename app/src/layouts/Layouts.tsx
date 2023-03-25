import AffiliatesLayout from "./AffiliatesLayout";
import NoLayout from "./NoLayout";

export const Layouts = {
  Affiliates: AffiliatesLayout,
  NoLayout: NoLayout,
};

export type LayoutKeys = keyof typeof Layouts; // "Main" | "Admin"

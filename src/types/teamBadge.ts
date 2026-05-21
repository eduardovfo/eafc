export type TeamBadgeVariant =
  | "shield"
  | "crown-circle"
  | "striped-shield"
  | "psg-circle";

export interface TeamBadgeStyle {
  initials: string;
  primary: string;
  secondary?: string;
  accent?: string;
  textColor: string;
  variant?: TeamBadgeVariant;
}

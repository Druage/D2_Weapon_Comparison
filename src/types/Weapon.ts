import { WeaponKind } from "./WeaponKind";

export interface Weapon {
  name: string;
  type?: WeaponKind;
  low: number;
  high: number;
  deadlyStrike: number;
  undeadED?: number;
  demonED?: number;
  otherED?: number;
}

import { WeaponKind } from "../utils/calcDamage";

export interface Weapon {
  name: string;
  kind: WeaponKind;
  low: number;
  high: number;
  deadlyStrike: number;
  undeadED?: number;
  demonED?: number;
  otherED?: number;
}

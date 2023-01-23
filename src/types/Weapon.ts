export interface Weapon {
  name: string;
  type: "melee" | "ranged";
  low: number;
  high: number;
  deadlyStrike: number;
  undeadED?: number;
  demonED?: number;
  otherED?: number;
}

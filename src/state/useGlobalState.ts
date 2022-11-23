import create from "zustand";
import { Weapon } from "../types/Weapon";
import { FAKE_WEAPONS_TO_TEST } from "../data/data";

interface State {
  weapons: Weapon[];
  criticalStrikeChance: string | undefined;
}

interface Actions {
  addWeapon: (weapon: Weapon) => any;
  setCriticalStrikeChance: (chance: string) => void;
}

export const useGlobalState = create<State & Actions>((set) => ({
  weapons: [...FAKE_WEAPONS_TO_TEST],
  addWeapon: (weapon: Weapon) =>
    set((state) => ({ weapons: [...state.weapons, weapon] })),
  criticalStrikeChance: undefined,
  setCriticalStrikeChance: (chance: string) =>
    set((state) => ({ criticalStrikeChance: chance })),
}));

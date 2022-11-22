import create from "zustand";
import { Weapon } from "../types/Weapon";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";

interface UseGlobalState {
  weapons: Weapon[];
}

interface Actions {
  addWeapon: (weapon: Weapon) => any;
}

export const useGlobalState = create<UseGlobalState & Actions>((set) => ({
  weapons: [...FAKE_WEAPONS_TO_TEST],
  addWeapon: (weapon: Weapon) =>
    set((state) => ({ weapons: [...state.weapons, weapon] })),
}));

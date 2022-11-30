import create from "zustand";
import { Weapon } from "../types/Weapon";
import { FAKE_WEAPONS_TO_TEST } from "../data/data";
import { Character } from "../types/Character";

interface State {
  character: Character;
  characterStrength: number | undefined;
  characterDexterity: number | undefined;

  weapons: Weapon[];
  criticalStrikeChance: string | undefined;
}

interface Actions {
  setCharacter: (character: Character) => void;
  setCharacterStrength: (strength: number) => void;
  setCharacterDexterity: (dexterity: number) => void;

  addWeapon: (weapon: Weapon) => any;
  setCriticalStrikeChance: (chance: string) => void;
}

export const useGlobalState = create<State & Actions>((set) => ({
  weapons: [...FAKE_WEAPONS_TO_TEST],
  addWeapon: (weapon: Weapon) =>
    set((state) => ({ weapons: [...state.weapons, weapon] })),
  criticalStrikeChance: undefined,

  character: Character.UNKNOWN,
  characterStrength: undefined,
  characterDexterity: undefined,

  setCharacter: (character: Character) => set(() => ({ character: character })),
  setCharacterStrength: (strength: number) =>
    set(() => ({ characterStrength: strength })),
  setCharacterDexterity: (dexterity: number) =>
    set(() => ({ characterDexterity: dexterity })),

  setCriticalStrikeChance: (chance: string) =>
    set(() => ({ criticalStrikeChance: chance })),
}));

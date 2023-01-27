import create from "zustand";
import { Weapon } from "../types/Weapon";
import { FAKE_WEAPONS_TO_TEST } from "../data/data";
import { Character } from "../types/Character";
import { SortBy } from "../types/SortBy";

interface State {
  character: Character;
  characterStrength: number | undefined;
  characterDexterity: number | undefined;
  characterSkillWeaponDamagePercentage: number | undefined;
  characterOtherEnhancedDamageSources: number[];

  characterDeadlyStrikeChange: number | undefined;

  weapons: Weapon[];
  characterCriticalStrikeChance: number | undefined;

  sortBy: SortBy;
}

interface Actions {
  setCharacter: (character: Character) => void;
  setCharacterStrength: (strength: number) => void;
  setCharacterDexterity: (dexterity: number) => void;
  setCharacterSkillWeaponDamagePercentage: (percentage: number) => void;
  setCharacterOtherEnhancedDamageSources: (sources: number[]) => void;

  addWeapon: (weapon: Weapon) => any;
  setCharacterCriticalStrikeChance: (chance: number) => void;
  setDeadlyStrikeChance: (chance: number) => void;

  setSortBy: (sortBy: SortBy) => void;
}

export const useGlobalState = create<State & Actions>((set) => ({
  weapons: [...FAKE_WEAPONS_TO_TEST],
  addWeapon: (weapon: Weapon) =>
    set((state) => ({ weapons: [...state.weapons, weapon] })),
  characterCriticalStrikeChance: undefined,

  character: Character.UNKNOWN,
  characterStrength: undefined,
  characterDexterity: undefined,
  characterSkillWeaponDamagePercentage: undefined,
  characterOtherEnhancedDamageSources: [],
  characterDeadlyStrikeChange: undefined,

  sortBy: SortBy.Normal,

  setCharacter: (character: Character) => set(() => ({ character: character })),
  setCharacterStrength: (strength: number) =>
    set(() => ({ characterStrength: strength })),
  setCharacterDexterity: (dexterity: number) =>
    set(() => ({ characterDexterity: dexterity })),

  setCharacterCriticalStrikeChance: (chance: number) =>
    set(() => ({ characterCriticalStrikeChance: chance })),

  setDeadlyStrikeChance: (chance: number) =>
    set(() => ({ characterDeadlyStrikeChange: chance })),

  setCharacterSkillWeaponDamagePercentage: (percentage: number) =>
    set(() => ({ characterSkillWeaponDamagePercentage: percentage })),

  setCharacterOtherEnhancedDamageSources: (sources: number[]) =>
    set(() => ({ characterOtherEnhancedDamageSources: sources })),

  setSortBy: (sortBy: SortBy) => set(() => ({ sortBy: sortBy })),
}));

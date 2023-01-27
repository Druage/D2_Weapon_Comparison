import WeaponItem from "./WeaponItem";
import { useGlobalState } from "../state/useGlobalState";
import { AddWeaponButton } from "./AddWeaponButton";
import { CharacterInfo } from "./CharacterInfo";
import { useMemo } from "react";
import {
  sortWeaponsHighToLowDamage,
  sortWeaponsHighToLowDamageForDemons,
  sortWeaponsHighToLowDamageForUndead,
} from "../utils/calcDamage";
import clsx from "clsx";
import { SortBy } from "../types/SortBy";

const CompareHeader = () => (
  <div
    className={
      "flex flex-row items-center justify-between border-y-4 border-[#4B4B4B] bg-[#2C2C2C] px-6 py-8"
    }
  >
    <CharacterInfo />
  </div>
);

export default function ComparisonList() {
  const [
    weapons,
    character,
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
    characterStrength,
    characterDexterity,
  ] = useGlobalState((state) => [
    state.weapons,
    state.character,
    state.characterCriticalStrikeChance,
    state.characterDeadlyStrikeChange,
    state.characterSkillWeaponDamagePercentage,
    state.characterOtherEnhancedDamageSources,
    state.characterStrength,
    state.characterDexterity,
  ]);

  const [sortBy, setSortBy] = useGlobalState((state) => [
    state.sortBy,
    state.setSortBy,
  ]);

  const sortedWeapons = useMemo(() => {
    if (
      characterCriticalStrikeChance &&
      characterDeadlyStrikeChance &&
      characterSkillWeaponDamagePercentage &&
      characterOtherEnhancedDamageSources
    ) {
      if (sortBy === SortBy.Normal) {
        return weapons.sort((weaponA, weaponB) =>
          sortWeaponsHighToLowDamage(
            character,
            characterCriticalStrikeChance,
            characterDeadlyStrikeChance,
            weaponA,
            weaponB,
            characterSkillWeaponDamagePercentage,
            characterOtherEnhancedDamageSources,
            characterStrength ?? 0,
            characterDexterity ?? 0
          )
        );
      } else if (sortBy === SortBy.Demons) {
        return weapons.sort((weaponA, weaponB) =>
          sortWeaponsHighToLowDamageForDemons(
            character,
            characterCriticalStrikeChance,
            characterDeadlyStrikeChance,
            weaponA,
            weaponB,
            characterSkillWeaponDamagePercentage,
            characterOtherEnhancedDamageSources,
            characterStrength ?? 0,
            characterDexterity ?? 0
          )
        );
      } else if (sortBy === SortBy.Undead) {
        return weapons.sort((weaponA, weaponB) =>
          sortWeaponsHighToLowDamageForUndead(
            character,
            characterCriticalStrikeChance,
            characterDeadlyStrikeChance,
            weaponA,
            weaponB,
            characterSkillWeaponDamagePercentage,
            characterOtherEnhancedDamageSources,
            characterStrength ?? 0,
            characterDexterity ?? 0
          )
        );
      }
    } else {
      return weapons;
    }
  }, [
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
    sortBy,
  ]);

  const SortButton = ({ text, selected, onClick }: any) => {
    return (
      <button
        className={clsx(
          "flex h-8 w-36 items-center justify-center bg-white",
          selected ? "border-4 border-violet-600 bg-red-400" : ""
        )}
        onClick={() => onClick()}
      >
        <span>{text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    );
  };

  return (
    <div
      className={
        "absolute top-0 bottom-0 right-0 left-0 overflow-y-auto bg-[#252525]"
      }
    >
      <CompareHeader />

      <div className={"flex flex-col items-center gap-4 py-8 px-10"}>
        <div
          className={"relative mb-4 flex w-full items-center justify-between"}
        >
          <AddWeaponButton />

          <h1 className={"text-center text-3xl font-bold text-white"}>
            Results
          </h1>

          <div className={"flex flex-row items-center gap-2"}>
            <SortButton
              text={"vs. Normal"}
              selected={sortBy === SortBy.Normal}
              onClick={() => setSortBy(SortBy.Normal)}
            />
            <SortButton
              text={"vs. Demons"}
              selected={sortBy === SortBy.Demons}
              onClick={() => setSortBy(SortBy.Demons)}
            />
            <SortButton
              text={"vs. Undead"}
              selected={sortBy === SortBy.Undead}
              onClick={() => setSortBy(SortBy.Undead)}
            />
          </div>
        </div>

        {sortedWeapons?.map((it, index) => (
          <WeaponItem key={it.name} simplified={false} weapon={it} />
        ))}
      </div>
    </div>
  );
}

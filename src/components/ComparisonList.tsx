import WeaponItem from "./WeaponItem";
import { useGlobalState } from "../state/useGlobalState";
import { AddWeaponButton } from "./AddWeaponButton";
import { CharacterInfo } from "./CharacterInfo";
import { useMemo } from "react";
import { sortWeaponsHighToLowDamage } from "../utils/calcDamage";

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
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
  ] = useGlobalState((state) => [
    state.weapons,
    state.characterCriticalStrikeChance,
    state.characterDeadlyStrikeChange,
    state.characterSkillWeaponDamagePercentage,
    state.characterOtherEnhancedDamageSources,
  ]);

  const sortedWeapons = useMemo(() => {
    if (
      characterCriticalStrikeChance &&
      characterDeadlyStrikeChance &&
      characterSkillWeaponDamagePercentage
    ) {
      return weapons.sort((weaponA, weaponB) =>
        sortWeaponsHighToLowDamage(
          characterCriticalStrikeChance,
          characterDeadlyStrikeChance,
          weaponA,
          weaponB
        )
      );
    } else {
      return weapons;
    }
  }, [
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
  ]);

  const SortButton = ({ text }: any) => {
    return (
      <button
        className={"flex h-8 w-36 items-center justify-center bg-white"}
        onClick={() => {}}
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
            <SortButton text={"vs. Normal"} />
            <SortButton text={"vs. Demons"} />
            <SortButton text={"vs. Undead"} />
          </div>
        </div>

        {sortedWeapons?.map((it, index) => (
          <WeaponItem key={index} simplified={false} weapon={it} />
        ))}
      </div>
    </div>
  );
}

import WeaponItem from "./WeaponItem";
import _ from "lodash";
import { useGlobalState } from "../state/useGlobalState";
import { AddWeaponButton } from "./AddWeaponButton";
import { CharacterInfo } from "./CharacterInfo";
import { useEffect, useMemo } from "react";
import { calcDmgStats, sortWeapons } from "../utils/calcDamage";

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
      const sortedWeapons = weapons.sort((weaponA, weaponB) =>
        sortWeapons(
          characterCriticalStrikeChance,
          characterDeadlyStrikeChance,
          weaponA,
          weaponB
        )
      );

      const first = sortedWeapons.shift()!;

      calcDmgStats(
        first,
        characterOtherEnhancedDamageSources,
        characterSkillWeaponDamagePercentage,
        characterCriticalStrikeChance,
        characterDeadlyStrikeChance
      );

      sortedWeapons.forEach((weapon) =>
        calcDmgStats(
          weapon,
          characterOtherEnhancedDamageSources,
          characterSkillWeaponDamagePercentage,
          characterCriticalStrikeChance,
          characterDeadlyStrikeChance,
          first
        )
      );

      return sortedWeapons;
    } else {
      return weapons;
    }
  }, [
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
  ]);

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
            {_.range(3).map((it) => (
              <div key={it} className={"h-8 w-16 bg-white"} />
            ))}
          </div>
        </div>

        {sortedWeapons?.map((it, index) => (
          <WeaponItem
            key={index}
            simplified={false}
            name={it.name}
            low={it.low}
            high={it.high}
            deadlyStrike={it.deadlyStrike}
            undeadED={it.undeadED}
            demonED={it.demonED}
          />
        ))}
      </div>
    </div>
  );
}

import { Weapon } from "../types/Weapon";
import clsx from "clsx";
import {
  calcAvgDmg,
  calcDoubleDamageChance,
  calcEnhancedDamage,
  calculateTotalDamage,
} from "../utils/calcDamage";
import { useGlobalState } from "../state/useGlobalState";
import { useMemo } from "react";
import { useCalcDamage } from "../utils/useCalcDamage";

interface Props {
  simplified: boolean;
  weapon: Weapon;
}

export default function WeaponItem({ simplified, weapon }: Props) {
  const [
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
  ] = useGlobalState((state) => [
    state.characterCriticalStrikeChance,
    state.characterDeadlyStrikeChange,
    state.characterSkillWeaponDamagePercentage,
    state.characterOtherEnhancedDamageSources,
  ]);

  const SimplifiedVersion = () => (
    <div className={"w-full bg-[#B0B0B0] p-1 text-center"}>
      <div>{weapon.name}</div>

      <div className={"m-2"}>
        {weapon.low} to {weapon.high}
      </div>
      <ul className={"mt-2 text-xs"}>
        {weapon.undeadED && <li>+ {weapon.undeadED}% Undead Damage</li>}
        {weapon.demonED && <li>+ {weapon.demonED}% Demon Damage</li>}
      </ul>
    </div>
  );

  const FullDamageResult = ({
    className,
    heading,
    totalAvgDamage,
    totalEnhancedDamage,
    doubleDamageChance,
  }: any) => (
    <div
      className={clsx(
        "flex h-full flex-1 flex-col items-center justify-start gap-4 p-4",
        className
      )}
    >
      <h1 className={"text-xl font-bold"}>{heading}</h1>

      <div className={"flex flex-col items-center justify-center"}>
        <div>Total Average</div>
        <div className={"text-3xl font-bold"}>{totalAvgDamage}</div>
      </div>

      <ul className={"mt-2 text-xs"}>
        <li>+ {doubleDamageChance}% 2x Damage</li>
        <li>+ {totalEnhancedDamage}% Enhanced Damage</li>
      </ul>
    </div>
  );

  const [
    totalAvgDamage,
    totalAvgDmgWithDemonsED,
    totalAvgDamageForUndead,
    realChanceForDoubleDmg,
  ] = useCalcDamage(
    weapon,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance
  );

  const ExpandedVersion = () => (
    <div
      className={
        "flex h-72 w-full items-center justify-center gap-8 bg-blue-800 p-4"
      }
    >
      <div
        className={
          "flex h-5/6 w-40 flex-col items-center justify-start gap-4 bg-yellow-200 px-2 py-4 text-center"
        }
      >
        <div className={"text-base"}>{weapon.name}</div>

        <div>
          {weapon.low} to {weapon.high}
        </div>
        <ul className={"text-xs"}>
          {weapon.undeadED && <li>+ {weapon.undeadED}% Undead Damage</li>}
          {weapon.demonED && <li>+ {weapon.demonED}% Demon Damage</li>}
        </ul>
      </div>

      <div className={"flex h-full flex-1"}>
        <FullDamageResult
          className={"bg-red-900 text-white"}
          heading={"vs. Demons"}
          totalAvgDamage={totalAvgDmgWithDemonsED?.toFixed(2)}
          totalEnhancedDamage={"600"}
          doubleDamageChance={realChanceForDoubleDmg}
        />
        <FullDamageResult
          className={"bg-black text-white"}
          heading={"vs. Undead"}
          totalAvgDamage={totalAvgDamageForUndead?.toFixed(2)}
          totalEnhancedDamage={"600"}
          doubleDamageChance={realChanceForDoubleDmg}
        />
        <FullDamageResult
          className={"bg-white"}
          heading={"vs. Normal"}
          totalAvgDamage={totalAvgDamage?.toFixed(2)}
          totalEnhancedDamage={"400"}
          doubleDamageChance={realChanceForDoubleDmg}
        />
      </div>
    </div>
  );

  return <>{simplified ? <SimplifiedVersion /> : <ExpandedVersion />}</>;
}

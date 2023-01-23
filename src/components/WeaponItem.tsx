import { Weapon } from "../types/Weapon";
import { useGlobalState } from "../state/useGlobalState";
import { useCalcDamage } from "../utils/useCalcDamage";
import { FullDamageResult } from "./FullWeaponDamageResult";

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
        {weapon.deadlyStrike > 0 && (
          <li>+ {weapon.deadlyStrike}% Deadly Strike</li>
        )}
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
          {weapon.deadlyStrike > 0 && (
            <li>+ {weapon.deadlyStrike}% Deadly Strike</li>
          )}
        </ul>
      </div>

      <div className={"flex h-full flex-1"}>
        <FullDamageResult
          className={"bg-white"}
          heading={"vs. Normal"}
          totalAvgDamage={totalAvgDamage?.toFixed(2)}
          enhancedDamageValues={[...characterOtherEnhancedDamageSources]}
          chanceForDoubleDamage={realChanceForDoubleDmg}
        />
        <FullDamageResult
          className={"bg-red-900 text-white"}
          heading={"vs. Demons"}
          totalAvgDamage={totalAvgDmgWithDemonsED?.toFixed(2)}
          enhancedDamageValues={[
            ...characterOtherEnhancedDamageSources,
            weapon.demonED ?? 0,
          ]}
          chanceForDoubleDamage={realChanceForDoubleDmg}
        />
        <FullDamageResult
          className={"bg-black text-white"}
          heading={"vs. Undead"}
          totalAvgDamage={totalAvgDamageForUndead?.toFixed(2)}
          enhancedDamageValues={[
            ...characterOtherEnhancedDamageSources,
            weapon.undeadED ?? 0,
          ]}
          chanceForDoubleDamage={realChanceForDoubleDmg}
        />
      </div>
    </div>
  );

  return <>{simplified ? <SimplifiedVersion /> : <ExpandedVersion />}</>;
}

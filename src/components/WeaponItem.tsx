import { Weapon } from "../types/Weapon";
import { useGlobalState } from "../state/useGlobalState";
import { useCalcDamage } from "../utils/useCalcDamage";
import { FullDamageResult } from "./FullWeaponDamageResult";
import { SortBy } from "../types/SortBy";

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
    characterStrength,
    characterDexterity,
  ] = useGlobalState((state) => [
    state.characterCriticalStrikeChance,
    state.characterDeadlyStrikeChange,
    state.characterSkillWeaponDamagePercentage,
    state.characterOtherEnhancedDamageSources,
    state.characterStrength,
    state.characterDexterity,
  ]);

  const sortBy = useGlobalState((state) => state.sortBy);

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
    enhancedDamageFromStrength,
    enhancedDamageFromDexterity,
  ] = useCalcDamage(
    weapon,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
    characterStrength,
    characterDexterity
  );

  const ExpandedVersion = () => (
    <div
      className={
        "flex h-80 w-full items-center justify-center gap-8 bg-gray-900 p-4"
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
          highlight={sortBy === SortBy.Normal}
          heading={"vs. Normal"}
          totalAvgDamage={totalAvgDamage}
          enhancedDamageValues={[...characterOtherEnhancedDamageSources]}
          chanceForDoubleDamage={realChanceForDoubleDmg}
          enhancedDamageFromStrength={enhancedDamageFromStrength}
          enhancedDamageFromDexterity={enhancedDamageFromDexterity}
        />
        <FullDamageResult
          className={"bg-red-900 text-white"}
          highlight={sortBy === SortBy.Demons}
          heading={"vs. Demons"}
          totalAvgDamage={totalAvgDmgWithDemonsED}
          enhancedDamageValues={[
            ...characterOtherEnhancedDamageSources,
            weapon.demonED ?? 0,
          ]}
          chanceForDoubleDamage={realChanceForDoubleDmg}
          enhancedDamageFromStrength={enhancedDamageFromStrength}
          enhancedDamageFromDexterity={enhancedDamageFromDexterity}
        />
        <FullDamageResult
          className={"bg-black text-white"}
          highlight={sortBy === SortBy.Undead}
          heading={"vs. Undead"}
          totalAvgDamage={totalAvgDamageForUndead}
          enhancedDamageValues={[
            ...characterOtherEnhancedDamageSources,
            weapon.undeadED ?? 0,
          ]}
          chanceForDoubleDamage={realChanceForDoubleDmg}
          enhancedDamageFromStrength={enhancedDamageFromStrength}
          enhancedDamageFromDexterity={enhancedDamageFromDexterity}
        />
      </div>
    </div>
  );

  return <>{simplified ? <SimplifiedVersion /> : <ExpandedVersion />}</>;
}

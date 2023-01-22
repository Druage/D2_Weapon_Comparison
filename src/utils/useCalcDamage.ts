import { Weapon } from "../types/Weapon";
import { useMemo } from "react";
import {
  calcAvgDamageWithDoubleDamageChance,
  calcDoubleDamageChance,
  calculateTotalDamage,
} from "./calcDamage";

export function useCalcDamage(
  weapon: Weapon,
  characterSkillWeaponDamagePercentage: number | undefined,
  characterOtherEnhancedDamageSources: number[] | undefined,
  characterCriticalStrikeChance: number | undefined,
  characterDeadlyStrikeChance: number | undefined
) {
  return useMemo(() => {
    if (
      weapon &&
      characterSkillWeaponDamagePercentage &&
      characterOtherEnhancedDamageSources &&
      characterCriticalStrikeChance &&
      characterDeadlyStrikeChance
    ) {
      const realChanceForDoubleDmg = calcDoubleDamageChance(
        characterCriticalStrikeChance,
        characterDeadlyStrikeChance + weapon.deadlyStrike
      );

      let weaponDemonED = weapon.demonED ?? 0;
      let weaponUndeadED = weapon.undeadED ?? 0;

      let totalLowDamage = calculateTotalDamage(
        weapon.low,
        characterSkillWeaponDamagePercentage,
        [...characterOtherEnhancedDamageSources]
      );
      let totalHighDamage = calculateTotalDamage(
        weapon.high,
        characterSkillWeaponDamagePercentage,
        [...characterOtherEnhancedDamageSources]
      );

      let totalLowDmgWithDemonED = calculateTotalDamage(
        weapon.low,
        characterSkillWeaponDamagePercentage,
        [...characterOtherEnhancedDamageSources, weaponDemonED]
      );
      let totalHighDmgWithDemonED = calculateTotalDamage(
        weapon.high,
        characterSkillWeaponDamagePercentage,
        [...characterOtherEnhancedDamageSources, weaponDemonED]
      );

      let totalLowDmgWithUndeadED = calculateTotalDamage(
        weapon.low,
        characterSkillWeaponDamagePercentage,
        [...characterOtherEnhancedDamageSources, weaponUndeadED]
      );
      let totalHighDmgWithUndeadED = calculateTotalDamage(
        weapon.high,
        characterSkillWeaponDamagePercentage,
        [...characterOtherEnhancedDamageSources, weaponUndeadED]
      );

      return [
        calcAvgDamageWithDoubleDamageChance(
          totalLowDamage,
          totalHighDamage,
          realChanceForDoubleDmg
        ),
        calcAvgDamageWithDoubleDamageChance(
          totalLowDmgWithDemonED,
          totalHighDmgWithDemonED,
          realChanceForDoubleDmg
        ),
        calcAvgDamageWithDoubleDamageChance(
          totalLowDmgWithUndeadED,
          totalHighDmgWithUndeadED,
          realChanceForDoubleDmg
        ),
        realChanceForDoubleDmg,
      ];
    }

    return [];
  }, [
    weapon,
    characterSkillWeaponDamagePercentage,
    characterOtherEnhancedDamageSources,
    characterCriticalStrikeChance,
    characterDeadlyStrikeChance,
  ]);
}

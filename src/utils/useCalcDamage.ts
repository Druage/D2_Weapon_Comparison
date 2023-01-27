import { Weapon } from "../types/Weapon";
import { useMemo } from "react";
import {
  calcAvgDamageWithDoubleDamageChance,
  calcDoubleDamageChance,
  calcStrAndDexEnhancedDamageRatio,
  calcTotalWeaponDamage,
} from "./calcDamage";

export function useSortWeapons(
  weapon: Weapon,
  characterSkillWeaponDamagePercentage: number | undefined,
  characterOtherEnhancedDamageSources: number[] | undefined,
  characterCriticalStrikeChance: number | undefined,
  characterDeadlyStrikeChance: number | undefined,
  characterStrength: number | undefined,
  characterDexterity: number | undefined
) {
  return useMemo(() => {
    if (
      weapon &&
      characterSkillWeaponDamagePercentage &&
      characterOtherEnhancedDamageSources &&
      characterCriticalStrikeChance &&
      characterDeadlyStrikeChance
    ) {
      let [strength, dexterity] = [
        characterStrength ?? 0,
        characterDexterity ?? 0,
      ];

      const [strRatio, dexRatio] = calcStrAndDexEnhancedDamageRatio(
        weapon.kind
      );

      const enhancedDamageFromStrength = strength * strRatio;
      const enhancedDamageFromDexterity = dexterity * dexRatio;

      const realChanceForDoubleDmg = calcDoubleDamageChance(
        characterCriticalStrikeChance,
        characterDeadlyStrikeChance + weapon.deadlyStrike
      );

      const [totalLowDamage, totalHighDamage] = calcTotalWeaponDamage(
        weapon.low,
        weapon.high,
        characterSkillWeaponDamagePercentage,
        [
          ...characterOtherEnhancedDamageSources,
          enhancedDamageFromStrength,
          enhancedDamageFromDexterity,
        ]
      );

      const [totalLowDmgWithDemonED, totalHighDmgWithDemonED] =
        calcTotalWeaponDamage(
          weapon.low,
          weapon.high,
          characterSkillWeaponDamagePercentage,
          [
            ...characterOtherEnhancedDamageSources,
            weapon.demonED ?? 0,
            enhancedDamageFromStrength,
            enhancedDamageFromDexterity,
          ]
        );

      const [totalLowDmgWithUndeadED, totalHighDmgWithUndeadED] =
        calcTotalWeaponDamage(
          weapon.low,
          weapon.high,
          characterSkillWeaponDamagePercentage,
          [
            ...characterOtherEnhancedDamageSources,
            weapon.undeadED ?? 0,
            enhancedDamageFromStrength,
            enhancedDamageFromDexterity,
          ]
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
        enhancedDamageFromStrength,
        enhancedDamageFromDexterity,
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

export function useCalcDamage(
  weapon: Weapon,
  characterSkillWeaponDamagePercentage: number | undefined,
  characterOtherEnhancedDamageSources: number[] | undefined,
  characterCriticalStrikeChance: number | undefined,
  characterDeadlyStrikeChance: number | undefined,
  characterStrength: number | undefined,
  characterDexterity: number | undefined
) {
  return useMemo(() => {
    if (
      weapon &&
      characterSkillWeaponDamagePercentage &&
      characterOtherEnhancedDamageSources &&
      characterCriticalStrikeChance &&
      characterDeadlyStrikeChance
    ) {
      let [strength, dexterity] = [
        characterStrength ?? 0,
        characterDexterity ?? 0,
      ];

      const [strRatio, dexRatio] = calcStrAndDexEnhancedDamageRatio(
        weapon.kind
      );

      const enhancedDamageFromStrength = strength * strRatio;
      const enhancedDamageFromDexterity = dexterity * dexRatio;

      const realChanceForDoubleDmg = calcDoubleDamageChance(
        characterCriticalStrikeChance,
        characterDeadlyStrikeChance + weapon.deadlyStrike
      );

      const [totalLowDamage, totalHighDamage] = calcTotalWeaponDamage(
        weapon.low,
        weapon.high,
        characterSkillWeaponDamagePercentage,
        [
          ...characterOtherEnhancedDamageSources,
          enhancedDamageFromStrength,
          enhancedDamageFromDexterity,
        ]
      );

      const [totalLowDmgWithDemonED, totalHighDmgWithDemonED] =
        calcTotalWeaponDamage(
          weapon.low,
          weapon.high,
          characterSkillWeaponDamagePercentage,
          [
            ...characterOtherEnhancedDamageSources,
            weapon.demonED ?? 0,
            enhancedDamageFromStrength,
            enhancedDamageFromDexterity,
          ]
        );

      const [totalLowDmgWithUndeadED, totalHighDmgWithUndeadED] =
        calcTotalWeaponDamage(
          weapon.low,
          weapon.high,
          characterSkillWeaponDamagePercentage,
          [
            ...characterOtherEnhancedDamageSources,
            weapon.undeadED ?? 0,
            enhancedDamageFromStrength,
            enhancedDamageFromDexterity,
          ]
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
        enhancedDamageFromStrength,
        enhancedDamageFromDexterity,
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

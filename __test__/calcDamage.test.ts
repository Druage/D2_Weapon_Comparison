import { expect, test } from "vitest";
import {
  calcAvgDamageWithDoubleDamageChance,
  calcAvgDmg,
  calcDoubleDamageChance,
  calcStrAndDexEnhancedDamageRatio,
  calcTotalWeaponDamage,
} from "../src/utils/calcDamage";
import { WeaponKind } from "../src/types/WeaponKind";

test("calcAvgDamage", () => {
  expect(calcAvgDmg(50, 100)).toEqual(75);
});

test("calcDoubleDamageChance", () => {
  expect(calcDoubleDamageChance(30, 60)).toEqual(72);
});

test("calcAvgDamageWithDoubleDamageChance", () => {
  expect(calcAvgDamageWithDoubleDamageChance(50, 100, 50)).toEqual(112.5);
});

test("calculateTotalDamage with a weapon damage percentage of 1.0", () => {
  const offWeaponED = [155, 298, 106];
  expect(calcTotalWeaponDamage(350, 383, 1.0, offWeaponED)).toEqual([
    2306.5, 2523.97,
  ]);
});

test("calculateTotalDamage with a weapon damage percentage of 1.15", () => {
  const offWeaponED = [155, 298, 106];
  expect(calcTotalWeaponDamage(350, 383, 1.15, offWeaponED)).toEqual([
    2652.4749999999995, 2902.5654999999997,
  ]);
});

test("calculateTotalDamage with no Enhanced Damage values", () => {
  const offWeaponED: number[] = [];
  expect(calcTotalWeaponDamage(350, 383, 1.0, offWeaponED)).toEqual([350, 383]);
});

test("calculateTotalDamage with 1 Enhanced Damage value", () => {
  const offWeaponED: number[] = [200];
  expect(calcTotalWeaponDamage(350, 383, 1.0, offWeaponED)).toEqual([
    1050, 1149,
  ]);
});

test("calculateTotalDamage with 2 Enhanced Damage value", () => {
  const offWeaponED: number[] = [200, 100];
  expect(calcTotalWeaponDamage(350, 383, 1.0, offWeaponED)).toEqual([
    1400, 1532,
  ]);
});

test("calculateTotalDamage with CUSTOM Enhanced Damage value", () => {
  const offWeaponED: number[] = [138, 125, 140];
  expect(calcTotalWeaponDamage(31, 35, 1.0, offWeaponED)).toEqual([
    155.93, 176.05,
  ]);
});

test("calcStrAndDexEnhancedDamageRatio for normal melee weapons", () => {
  [
    WeaponKind.Sword,
    WeaponKind.Axe,
    WeaponKind.Mace,
    WeaponKind.Polearm,
    WeaponKind.Spear,
    WeaponKind.Scepter,
    WeaponKind.Stave,
    WeaponKind.Wand,
    WeaponKind.Orb,
  ].forEach((kind) => {
    expect(calcStrAndDexEnhancedDamageRatio(kind)).toEqual([1.0, 0.0]);
  });
});

test("calcStrAndDexEnhancedDamageRatio for Daggers, Claws, and Throwing Weapons", () => {
  [WeaponKind.Dagger, WeaponKind.Claw, WeaponKind.Throwing].forEach((kind) => {
    expect(calcStrAndDexEnhancedDamageRatio(kind)).toEqual([0.75, 0.75]);
  });
});

test("calcStrAndDexEnhancedDamageRatio for Hammers and Clubs", () => {
  [WeaponKind.Hammer, WeaponKind.Club].forEach((kind) => {
    expect(calcStrAndDexEnhancedDamageRatio(kind)).toEqual([0.0, 0.0]);
  });
});

test("calcStrAndDexEnhancedDamageRatio for ThunderStumps (Great Maul, Martel De Fer, Thunder Maul)", () => {
  [WeaponKind.ThunderStump].forEach((kind) => {
    expect(calcStrAndDexEnhancedDamageRatio(kind)).toEqual([1.1, 0.0]);
  });
});

test("calcStrAndDexEnhancedDamageRatio for Amazon Weapons (class specific Spear and Javelin)", () => {
  [WeaponKind.AmazonSpear, WeaponKind.AmazonJavelin].forEach((kind) => {
    expect(calcStrAndDexEnhancedDamageRatio(kind)).toEqual([0.8, 0.5]);
  });
});

test("calcStrAndDexEnhancedDamageRatio for Bows and Crossbows", () => {
  [WeaponKind.Bow, WeaponKind.Crossbow].forEach((kind) => {
    expect(calcStrAndDexEnhancedDamageRatio(kind)).toEqual([0, 1.0]);
  });
});

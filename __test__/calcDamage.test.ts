import { expect, test } from "vitest";
import {
  calcAvgDamageWithDoubleDamageChance,
  calcAvgDmg,
  calcDoubleDamageChance,
  calculateTotalDamage,
} from "../src/utils/calcDamage";

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
  expect(calculateTotalDamage(383, 1.0, offWeaponED)).toEqual(2523.97);
});

test("calculateTotalDamage with a weapon damage percentage of 1.15", () => {
  const offWeaponED = [155, 298, 106];
  expect(calculateTotalDamage(383, 1.15, offWeaponED)).toEqual(
    2902.5654999999997
  );
});

test("calculateTotalDamage with no Enhanced Damage values", () => {
  const offWeaponED: number[] = [];
  expect(calculateTotalDamage(383, 1.0, offWeaponED)).toEqual(383);
});

test("calculateTotalDamage with 1 Enhanced Damage value", () => {
  const offWeaponED: number[] = [200];
  expect(calculateTotalDamage(383, 1.0, offWeaponED)).toEqual(1149);
});

test("calculateTotalDamage with 2 Enhanced Damage value", () => {
  const offWeaponED: number[] = [200, 100];
  expect(calculateTotalDamage(383, 1.0, offWeaponED)).toEqual(1532);
});

test("calculateTotalDamage with CUSTOM Enhanced Damage value", () => {
  const offWeaponED: number[] = [138, 125, 140];
  expect(calculateTotalDamage(35, 1.0, offWeaponED)).toEqual(176.05);
});

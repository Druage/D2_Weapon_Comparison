import { Weapon } from "../types/Weapon";

export function calcDoubleDamageChance(
  critChance: number,
  deadlyStrikeChance: number
) {
  return critChance + (1 - critChance / 100) * deadlyStrikeChance;
}

export function calcAvgDmg(low: number, high: number) {
  return (low + high) / 2;
}

export function calcAvgDamageWithDoubleDamageChance(
  low: number,
  high: number,
  chanceForDoubleDamage: number
): number {
  const avg = calcAvgDmg(low, high);
  return avg + avg * (chanceForDoubleDamage / 100);
}

// Str, Dex, Weapon Type "melee" | "ranged"
export enum WeaponKind {
  Sword,
  Axe,
  Dagger,
  Mace,
  Hammer,
  Club,
  ThunderStump,
  Claw,
  AmazonSpear,
  Bow,
  Crossbow,
  AmazonJavelin,
  Throwing,
  Polearm,
  Spear,
  Scepter,
  Stave,
  Wand,
  Orb,
}

export function calcStrAndDexEnhancedDamageRatio(
  weaponKind: WeaponKind
): number[] {
  let strengthEnhancedDamageRatio = 0;
  let dexterityEnhancedDamageRatio = 0;

  switch (weaponKind) {
    case WeaponKind.Sword:
    case WeaponKind.Axe:
    case WeaponKind.Mace:
    case WeaponKind.Polearm:
    case WeaponKind.Spear:
    case WeaponKind.Scepter:
    case WeaponKind.Stave:
    case WeaponKind.Wand:
    case WeaponKind.Orb:
      strengthEnhancedDamageRatio = 1.0;
      dexterityEnhancedDamageRatio = 0;
      break;
    case WeaponKind.Dagger:
    case WeaponKind.Claw:
    case WeaponKind.Throwing:
      strengthEnhancedDamageRatio = 0.75;
      dexterityEnhancedDamageRatio = 0.75;
      break;
    case WeaponKind.Hammer:
    case WeaponKind.Club:
      strengthEnhancedDamageRatio = 0;
      dexterityEnhancedDamageRatio = 0;
      break;
    case WeaponKind.ThunderStump:
      strengthEnhancedDamageRatio = 1.1;
      dexterityEnhancedDamageRatio = 0;
      break;
    case WeaponKind.AmazonSpear:
    case WeaponKind.AmazonJavelin:
      strengthEnhancedDamageRatio = 0.8;
      dexterityEnhancedDamageRatio = 0.5;
      break;
    case WeaponKind.Bow:
    case WeaponKind.Crossbow:
      strengthEnhancedDamageRatio = 0;
      dexterityEnhancedDamageRatio = 1.0;
      break;
    default:
      break;
  }

  return [strengthEnhancedDamageRatio, dexterityEnhancedDamageRatio];
}

//383 + ((383 * 1.00 ) * ( ( 0 + 155 + 298 + 106) / 100))
export function calcTotalWeaponDamage(
  low: number,
  high: number,
  skillWeaponDamagePercentage: number,
  offWeaponEDList: number[]
): number[] {
  let totalOffWeaponED = 0;

  if (offWeaponEDList.length >= 2) {
    totalOffWeaponED = offWeaponEDList.reduce(
      (partialSum, ed) => partialSum + ed
    );
  } else if (offWeaponEDList.length == 1) {
    totalOffWeaponED = offWeaponEDList[0];
  }

  if (totalOffWeaponED == 0) {
    return [
      low * skillWeaponDamagePercentage,
      high * skillWeaponDamagePercentage,
    ];
  } else {
    return [
      low * skillWeaponDamagePercentage * (totalOffWeaponED / 100) +
        low * skillWeaponDamagePercentage,
      high * skillWeaponDamagePercentage * (totalOffWeaponED / 100) +
        high * skillWeaponDamagePercentage,
    ];
  }
}

export function calcEnhancedDamage(
  weapon: Weapon,
  skillWeaponDamagePercentage: number,
  enhancedDamageSources: number[],
  baseCriticalStrikeChance: number,
  baseDeadlyStrikeChance: number
) {
  const realChanceForDoubleDmg = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weapon.deadlyStrike
  );

  const [lowWithED, highWithED] = calcTotalWeaponDamage(
    weapon.low,
    weapon.high,
    skillWeaponDamagePercentage,
    enhancedDamageSources
  );

  const avgWithED = calcAvgDmg(lowWithED, highWithED);
  const avgWithDoubleDamageChanceWithED =
    avgWithED + avgWithED * (realChanceForDoubleDmg / 100);
  return { lowWithED, highWithED, avgWithED, avgWithDoubleDamageChanceWithED };
}

export function calcDmgStats(
  weapon: Weapon,
  enhancedDamageSources: number[],
  skillWeaponDamagePercentage: number,
  baseCriticalStrikeChance: number,
  baseDeadlyStrikeChance: number,
  highestDmgWeapon?: Weapon
) {
  const realChanceForDoubleDmg = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weapon.deadlyStrike
  );

  const enhancedDamageValues = calcEnhancedDamage(
    weapon,
    skillWeaponDamagePercentage,
    enhancedDamageSources,
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance
  );

  let [totalLowDmgWithUndeadED, totalHighDmgWithUndeadED] = [
    enhancedDamageValues.lowWithED,
    enhancedDamageValues.highWithED,
  ];
  let totalAvgDmgWithUndeadED = enhancedDamageValues.avgWithED;

  let [totalLowDmgWithDemonED, totalHighDmgWithDemonED] = [
    enhancedDamageValues.lowWithED,
    enhancedDamageValues.highWithED,
  ];
  let totalAvgDmgWithDemonsED = enhancedDamageValues.avgWithED;

  if (weapon.undeadED !== undefined) {
    [totalLowDmgWithUndeadED, totalHighDmgWithUndeadED] = calcTotalWeaponDamage(
      weapon.low,
      weapon.high,
      skillWeaponDamagePercentage,
      [...enhancedDamageSources, weapon.undeadED]
    );

    const avg = calcAvgDmg(totalLowDmgWithUndeadED, totalHighDmgWithUndeadED);
    totalAvgDmgWithUndeadED = avg + avg * (realChanceForDoubleDmg / 100);
  }

  if (weapon.demonED !== undefined) {
    [totalLowDmgWithDemonED, totalHighDmgWithDemonED] = calcTotalWeaponDamage(
      weapon.low,
      weapon.high,
      skillWeaponDamagePercentage,
      [...enhancedDamageSources, weapon.demonED]
    );

    const avg = calcAvgDmg(totalLowDmgWithDemonED, totalHighDmgWithDemonED);
    totalAvgDmgWithDemonsED = avg + avg * (realChanceForDoubleDmg / 100);
  }

  if (highestDmgWeapon !== undefined) {
    const firstWeaponEnhancedDamageValues = calcEnhancedDamage(
      highestDmgWeapon,
      skillWeaponDamagePercentage,
      enhancedDamageSources,
      baseCriticalStrikeChance,
      baseDeadlyStrikeChance
    );

    console.log(`
        ------------------------------
        ${weapon.name}
        ------------------------------
        Weapon Damage: ${weapon.low} - ${weapon.high}
        2x Damage Chance % (CS + DS): ${realChanceForDoubleDmg.toFixed(2)}%
        
        /w Enhanced Damage: ${enhancedDamageValues.lowWithED.toFixed(
          2
        )} - ${enhancedDamageValues.highWithED.toFixed(2)}
        /w Enhanced Damage (Average): ${enhancedDamageValues.avgWithED.toFixed(
          2
        )}
                
        Vs Undead: ${totalLowDmgWithUndeadED.toFixed(
          2
        )} - ${totalHighDmgWithUndeadED.toFixed(2)}

        Vs Demons (/w DS): ${totalLowDmgWithDemonED.toFixed(
          2
        )} - ${totalHighDmgWithDemonED.toFixed(2)}
        
        
        Total (Average, /w DS):
            Base: ${enhancedDamageValues.avgWithDoubleDamageChanceWithED.toFixed(
              2
            )}
            Vs Undead: ${totalAvgDmgWithUndeadED.toFixed(2)}
            Vs Demons: ${totalAvgDmgWithDemonsED.toFixed(2)}
            
            % Weaker than Best: ${(
              (1 -
                enhancedDamageValues.avgWithDoubleDamageChanceWithED /
                  firstWeaponEnhancedDamageValues.avgWithDoubleDamageChanceWithED) *
              100
            ).toFixed(2)}%
            Vs Undead (% Weaker than Best): ${(
              (1 -
                totalAvgDmgWithUndeadED /
                  firstWeaponEnhancedDamageValues.avgWithDoubleDamageChanceWithED) *
              100
            ).toFixed(2)}%
            Vs Demons (% Weaker than Best): ${(
              (1 -
                totalAvgDmgWithDemonsED /
                  firstWeaponEnhancedDamageValues.avgWithDoubleDamageChanceWithED) *
              100
            ).toFixed(2)}%

        ##########################################################
        `);
  } else {
    console.log(`
        ------------------------------
        ${weapon.name}
        ------------------------------
        Weapon Damage: ${weapon.low} - ${weapon.high}
        2x Damage Chance % (CS + DS): ${realChanceForDoubleDmg.toFixed(2)}%
        
        /w Enhanced Damage: ${enhancedDamageValues.lowWithED.toFixed(
          2
        )} - ${enhancedDamageValues.highWithED.toFixed(2)}
        /w Enhanced Damage (Average): ${enhancedDamageValues.avgWithED.toFixed(
          2
        )}
                
        Vs Undead: ${totalLowDmgWithUndeadED.toFixed(
          2
        )} - ${totalHighDmgWithUndeadED.toFixed(2)}

        Vs Demons (/w DS): ${totalLowDmgWithDemonED.toFixed(
          2
        )} - ${totalHighDmgWithDemonED.toFixed(2)}
        
        Total (Average, /w DS):
            Base: ${enhancedDamageValues.avgWithDoubleDamageChanceWithED.toFixed(
              2
            )}
            Vs Undead: ${totalAvgDmgWithUndeadED.toFixed(2)}
            Vs Demons: ${totalAvgDmgWithDemonsED.toFixed(2)}
        ##########################################################
        `);
  }
}

export function sortWeaponsHighToLowDamageForDemons(
  character: string,
  baseCriticalStrikeChance: number,
  baseDeadlyStrikeChance: number,
  weaponA: Weapon,
  weaponB: Weapon,
  characterSkillWeaponDamagePercentage: number,
  characterOtherEnhancedDamageSources: number[],
  characterStrength: number,
  characterDexterity: number
) {
  const [strRatioA, dexRatioA] = calcStrAndDexEnhancedDamageRatio(weaponA.kind);

  const [strRatioB, dexRatioB] = calcStrAndDexEnhancedDamageRatio(weaponB.kind);

  const [totalLowDmgA, totalHighDmgA] = calcTotalWeaponDamage(
    weaponA.low,
    weaponA.high,
    characterSkillWeaponDamagePercentage,
    [
      ...characterOtherEnhancedDamageSources,
      weaponA.demonED ?? 0,
      characterStrength * strRatioA,
      characterDexterity * dexRatioA,
    ]
  );

  const [totalLowDmgB, totalHighDmgB] = calcTotalWeaponDamage(
    weaponB.low,
    weaponB.high,
    characterSkillWeaponDamagePercentage,
    [
      ...characterOtherEnhancedDamageSources,
      weaponB.demonED ?? 0,
      characterStrength * strRatioB,
      characterDexterity * dexRatioB,
    ]
  );

  const realChanceForDoubleDmgA = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weaponA.deadlyStrike
  );

  const realChanceForDoubleDmgB = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weaponB.deadlyStrike
  );

  console.log(
    weaponB.name,
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgB,
      totalHighDmgB,
      realChanceForDoubleDmgB
    ),
    weaponB.demonED,
    [
      ...characterOtherEnhancedDamageSources,
      weaponB.demonED ?? 0,
      characterStrength * strRatioB,
      characterDexterity * dexRatioB,
    ]
  );

  return (
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgB,
      totalHighDmgB,
      realChanceForDoubleDmgB
    ) -
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgA,
      totalHighDmgA,
      realChanceForDoubleDmgA
    )
  );
}

export function sortWeaponsHighToLowDamageForUndead(
  character: string,
  baseCriticalStrikeChance: number,
  baseDeadlyStrikeChance: number,
  weaponA: Weapon,
  weaponB: Weapon,
  characterSkillWeaponDamagePercentage: number,
  characterOtherEnhancedDamageSources: number[],
  characterStrength: number,
  characterDexterity: number
) {
  const [strRatioA, dexRatioA] = calcStrAndDexEnhancedDamageRatio(weaponA.kind);

  const [strRatioB, dexRatioB] = calcStrAndDexEnhancedDamageRatio(weaponB.kind);

  const [totalLowDmgA, totalHighDmgA] = calcTotalWeaponDamage(
    weaponA.low,
    weaponA.high,
    characterSkillWeaponDamagePercentage,
    [
      ...characterOtherEnhancedDamageSources,
      weaponA.undeadED ?? 0,
      characterStrength * strRatioA,
      characterDexterity * dexRatioA,
    ]
  );

  const [totalLowDmgB, totalHighDmgB] = calcTotalWeaponDamage(
    weaponB.low,
    weaponB.high,
    characterSkillWeaponDamagePercentage,
    [
      ...characterOtherEnhancedDamageSources,
      weaponB.undeadED ?? 0,
      characterStrength * strRatioB,
      characterDexterity * dexRatioB,
    ]
  );

  const realChanceForDoubleDmgA = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weaponA.deadlyStrike
  );

  const realChanceForDoubleDmgB = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weaponB.deadlyStrike
  );

  console.log(
    weaponB.name,
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgB,
      totalHighDmgB,
      realChanceForDoubleDmgB
    ),
    weaponB.demonED,
    [
      ...characterOtherEnhancedDamageSources,
      weaponB.demonED ?? 0,
      characterStrength * strRatioB,
      characterDexterity * dexRatioB,
    ]
  );

  return (
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgB,
      totalHighDmgB,
      realChanceForDoubleDmgB
    ) -
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgA,
      totalHighDmgA,
      realChanceForDoubleDmgA
    )
  );
}

export function sortWeaponsHighToLowDamage(
  character: string,
  baseCriticalStrikeChance: number,
  baseDeadlyStrikeChance: number,
  weaponA: Weapon,
  weaponB: Weapon,
  characterSkillWeaponDamagePercentage: number,
  characterOtherEnhancedDamageSources: number[],
  characterStrength: number,
  characterDexterity: number
) {
  const [strRatioA, dexRatioA] = calcStrAndDexEnhancedDamageRatio(weaponA.kind);

  const [strRatioB, dexRatioB] = calcStrAndDexEnhancedDamageRatio(weaponA.kind);

  const [totalLowDmgA, totalHighDmgA] = calcTotalWeaponDamage(
    weaponA.low,
    weaponA.high,
    characterSkillWeaponDamagePercentage,
    [
      ...characterOtherEnhancedDamageSources,
      characterStrength * strRatioA,
      characterDexterity * dexRatioA,
    ]
  );

  const [totalLowDmgB, totalHighDmgB] = calcTotalWeaponDamage(
    weaponB.low,
    weaponB.high,
    characterSkillWeaponDamagePercentage,
    [
      ...characterOtherEnhancedDamageSources,
      characterStrength * strRatioB,
      characterDexterity * dexRatioB,
    ]
  );

  const realChanceForDoubleDmgA = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weaponA.deadlyStrike
  );

  const realChanceForDoubleDmgB = calcDoubleDamageChance(
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance + weaponB.deadlyStrike
  );

  return (
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgB,
      totalHighDmgB,
      realChanceForDoubleDmgB
    ) -
    calcAvgDamageWithDoubleDamageChance(
      totalLowDmgA,
      totalHighDmgA,
      realChanceForDoubleDmgA
    )
  );
}

export function test_dmg() {
  const weaponsToTest: Weapon[] = [
    {
      name: "Nats Claw (Max Dmg + Skull)",
      kind: WeaponKind.Claw,
      low: 120,
      high: 249,
      deadlyStrike: 0,
      undeadED: 200,
      demonED: 200,
    },
    {
      name: "Nats Claw (Max Dmg + Lo)",
      kind: WeaponKind.Claw,
      low: 120,
      high: 249,
      deadlyStrike: 20,
      undeadED: 200,
      demonED: 200,
    },
    {
      name: "Nats Claw (Max Dmg + Ohm)",
      kind: WeaponKind.Claw,
      low: 140,
      high: 274.5,
      deadlyStrike: 0,
      undeadED: 200,
      demonED: 200,
    },
    {
      name: "Nats Claw (Lo, Lo, Ohm)",
      kind: WeaponKind.Claw,
      low: 140,
      high: 178.5,
      deadlyStrike: 40,
      undeadED: 200,
      demonED: 200,
    },
    {
      name: "Nats Claw (Lo, Ohm, Ohm)",
      kind: WeaponKind.Claw,
      low: 160,
      high: 204,
      deadlyStrike: 20,
      undeadED: 200,
      demonED: 200,
    },

    {
      name: "Bartucs (Lo, Lo, Jah)",
      kind: WeaponKind.Claw,
      low: 97,
      high: 182,
      deadlyStrike: 40,
    },
    {
      name: "Bartucs (Max Dmg + Jah)",
      kind: WeaponKind.Claw,
      low: 97,
      high: 278,
      deadlyStrike: 0,
    },
    {
      name: "Bartucs (Lo, Ohm, Jah)",
      kind: WeaponKind.Claw,
      low: 109,
      high: 204,
      deadlyStrike: 20,
    },
    {
      name: "Bartucs (Ohm, Ohm, Jah)",
      kind: WeaponKind.Claw,
      low: 121,
      high: 226,
      deadlyStrike: 0,
    },
    {
      name: "Bartucs (Shael, Shael, Jah)",
      kind: WeaponKind.Claw,
      low: 97,
      high: 182,
      deadlyStrike: 0,
    },

    {
      name: "Jade Talon (Shael, Shael, Jah)",
      kind: WeaponKind.Claw,
      low: 114,
      high: 152,
      deadlyStrike: 0,
    },
    {
      name: "Jade Talon (Ohm, Lo, Jah)",
      kind: WeaponKind.Claw,
      low: 131.92,
      high: 174.6,
      deadlyStrike: 20,
    },
    {
      name: "Jade Talon (Ohm, Ohm, Jah)",
      kind: WeaponKind.Claw,
      low: 148.92,
      high: 197.1,
      deadlyStrike: 0,
    },
    {
      name: "Jade Talon (Lo, Lo, Jah)",
      kind: WeaponKind.Claw,
      low: 114,
      high: 152,
      deadlyStrike: 40,
    },
    {
      name: "Jade Talon (Max Dmg + Jah, [Perfect])",
      kind: WeaponKind.Claw,
      low: 114,
      high: 248,
      deadlyStrike: 0,
    },
    {
      name: "Jade Talon (Max Dmg + Jah, [Mine])",
      kind: WeaponKind.Claw,
      low: 104,
      high: 234.6,
      deadlyStrike: 0,
    },

    {
      name: "Fury Claw",
      kind: WeaponKind.Claw,
      low: 120,
      high: 160,
      deadlyStrike: 33,
    },
  ];

  // Sins increase ED from Dex & Str
  // Barbs increase ED from Str

  const baseCriticalStrikeChance = 31;
  const baseDeadlyStrikeChance = 15 + 15 + 36;
  let enhancedDamageSources = [145, 173, 258, 131, 200];
  const skillWeaponDamagePercentage = 1.0;

  const sortedWeapons = weaponsToTest.sort((weaponA, weaponB) => {
    const weaponDmgRange = calcAvgDmg(weaponA.low, weaponA.high);
    const realChanceForDoubleDmg = calcDoubleDamageChance(
      baseCriticalStrikeChance,
      baseDeadlyStrikeChance + weaponA.deadlyStrike
    );
    const effectiveDmgA =
      weaponDmgRange + weaponDmgRange * (realChanceForDoubleDmg / 100);

    const weaponDmgRangeB = calcAvgDmg(weaponB.low, weaponB.high);
    const realChanceForDoubleDmgB = calcDoubleDamageChance(
      baseCriticalStrikeChance,
      baseDeadlyStrikeChance + weaponB.deadlyStrike
    );
    const effectiveDmgB =
      weaponDmgRangeB + weaponDmgRangeB * (realChanceForDoubleDmgB / 100);

    return effectiveDmgB - effectiveDmgA;
  });

  const first = sortedWeapons.shift()!;
  calcDmgStats(
    first,
    enhancedDamageSources,
    skillWeaponDamagePercentage,
    baseCriticalStrikeChance,
    baseDeadlyStrikeChance
  );

  sortedWeapons.forEach((weapon) =>
    calcDmgStats(
      weapon,
      enhancedDamageSources,
      skillWeaponDamagePercentage,
      baseCriticalStrikeChance,
      baseDeadlyStrikeChance,
      first
    )
  );
}

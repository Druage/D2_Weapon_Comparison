interface WPN {
    name: string;
    low: number;
    high: number;
    ds: number;
    undeadED?: number;
    demonED?: number;
}

function calcDoubleDamageChance(critChance: number, deadlyStrikeChance: number) {
    return critChance + ((1 - critChance / 100) * deadlyStrikeChance)
}

function calcAvgDmg(low: number, high: number) {
    return (low + high) / 2
}

//383 + ((383 * 1.00 ) *( ( 0 + 155 + 298 + 106) / 100))
function calculateTotalDamage(weaponDamage: number, skillWeaponDamagePercentage: number, offWeaponEDList: number[]) {
    const totalOffWeaponED = offWeaponEDList.reduce((partialSum, ed) => partialSum + ed);
    return weaponDamage + ((weaponDamage * skillWeaponDamagePercentage) * (totalOffWeaponED / 100))
}


function calcEnhancedDamage(weapon: WPN, skillWeaponDamagePercentage: number, enhancedDamageSources: number[], baseCriticalStrikeChance: number, baseDeadlyStrikeChance: number) {
    const realChanceForDoubleDmg = calcDoubleDamageChance(baseCriticalStrikeChance, baseDeadlyStrikeChance + weapon.ds)

    const lowWithED = calculateTotalDamage(weapon.low, skillWeaponDamagePercentage, enhancedDamageSources);
    const highWithED = calculateTotalDamage(weapon.high, skillWeaponDamagePercentage, enhancedDamageSources)
    const avgWithED = calcAvgDmg(lowWithED, highWithED)
    const avgWithDoubleDamageChanceWithED = avgWithED + (avgWithED * (realChanceForDoubleDmg / 100))
    return {lowWithED, highWithED, avgWithED, avgWithDoubleDamageChanceWithED};
}

export function calcDmgStats(weapon: WPN, enhancedDamageSources: number[], skillWeaponDamagePercentage: number, baseCriticalStrikeChance: number, baseDeadlyStrikeChance: number, highestDmgWeapon?: WPN) {
    const realChanceForDoubleDmg = calcDoubleDamageChance(baseCriticalStrikeChance, baseDeadlyStrikeChance + weapon.ds)

    const enhancedDamageValues = calcEnhancedDamage(weapon, skillWeaponDamagePercentage, enhancedDamageSources, baseCriticalStrikeChance, baseDeadlyStrikeChance);

    let [totalLowDmgWithUndeadED, totalHighDmgWithUndeadED] = [enhancedDamageValues.lowWithED, enhancedDamageValues.highWithED]
    let totalAvgDmgWithUndeadED = enhancedDamageValues.avgWithED;

    let [totalLowDmgWithDemonED, totalHighDmgWithDemonED] = [enhancedDamageValues.lowWithED, enhancedDamageValues.highWithED]
    let totalAvgDmgWithDemonsED = enhancedDamageValues.avgWithED;

    if (weapon.undeadED !== undefined) {
        totalLowDmgWithUndeadED = calculateTotalDamage(weapon.low, skillWeaponDamagePercentage, [...enhancedDamageSources, weapon.undeadED])
        totalHighDmgWithUndeadED = calculateTotalDamage(weapon.high, skillWeaponDamagePercentage, [...enhancedDamageSources, weapon.undeadED])
        const avg = calcAvgDmg(totalLowDmgWithUndeadED, totalHighDmgWithUndeadED)
        totalAvgDmgWithUndeadED = avg + (avg * (realChanceForDoubleDmg / 100))
    }

    if (weapon.demonED !== undefined) {
        totalLowDmgWithDemonED = calculateTotalDamage(weapon.low, skillWeaponDamagePercentage, [...enhancedDamageSources, weapon.demonED])
        totalHighDmgWithDemonED = calculateTotalDamage(weapon.high, skillWeaponDamagePercentage, [...enhancedDamageSources, weapon.demonED])
        const avg = calcAvgDmg(totalLowDmgWithDemonED, totalHighDmgWithDemonED)
        totalAvgDmgWithDemonsED = avg + (avg * (realChanceForDoubleDmg / 100))
    }

    if (highestDmgWeapon !== undefined) {

        const firstWeaponEnhancedDamageValues = calcEnhancedDamage(highestDmgWeapon, skillWeaponDamagePercentage, enhancedDamageSources, baseCriticalStrikeChance, baseDeadlyStrikeChance);

        console.log(`
        ------------------------------
        ${weapon.name}
        ------------------------------
        Weapon Damage: ${weapon.low} - ${weapon.high}
        2x Damage Chance % (CS + DS): ${realChanceForDoubleDmg.toFixed(2)}%
        
        /w Enhanced Damage: ${enhancedDamageValues.lowWithED.toFixed(2)} - ${enhancedDamageValues.highWithED.toFixed(2)}
        /w Enhanced Damage (Average): ${enhancedDamageValues.avgWithED.toFixed(2)}
                
        Vs Undead: ${totalLowDmgWithUndeadED.toFixed(2)} - ${totalHighDmgWithUndeadED.toFixed(2)}

        Vs Demons (/w DS): ${totalLowDmgWithDemonED.toFixed(2)} - ${totalHighDmgWithDemonED.toFixed(2)}
        
        
        Total (Average, /w DS):
            Base: ${enhancedDamageValues.avgWithDoubleDamageChanceWithED.toFixed(2)}
            Vs Undead: ${totalAvgDmgWithUndeadED.toFixed(2)}
            Vs Demons: ${totalAvgDmgWithDemonsED.toFixed(2)}
            
            % Weaker than Best: ${((1 - (enhancedDamageValues.avgWithDoubleDamageChanceWithED / firstWeaponEnhancedDamageValues.avgWithDoubleDamageChanceWithED)) * 100).toFixed(2)}%
            Vs Undead (% Weaker than Best): ${((1 - (totalAvgDmgWithUndeadED / firstWeaponEnhancedDamageValues.avgWithDoubleDamageChanceWithED)) * 100).toFixed(2)}%
            Vs Demons (% Weaker than Best): ${((1 - (totalAvgDmgWithDemonsED / firstWeaponEnhancedDamageValues.avgWithDoubleDamageChanceWithED)) * 100).toFixed(2)}%

        ##########################################################
        `)
    } else {
        console.log(`
        ------------------------------
        ${weapon.name}
        ------------------------------
        Weapon Damage: ${weapon.low} - ${weapon.high}
        2x Damage Chance % (CS + DS): ${realChanceForDoubleDmg.toFixed(2)}%
        
        /w Enhanced Damage: ${enhancedDamageValues.lowWithED.toFixed(2)} - ${enhancedDamageValues.highWithED.toFixed(2)}
        /w Enhanced Damage (Average): ${enhancedDamageValues.avgWithED.toFixed(2)}
                
        Vs Undead: ${totalLowDmgWithUndeadED.toFixed(2)} - ${totalHighDmgWithUndeadED.toFixed(2)}

        Vs Demons (/w DS): ${totalLowDmgWithDemonED.toFixed(2)} - ${totalHighDmgWithDemonED.toFixed(2)}
        
        Total (Average, /w DS):
            Base: ${enhancedDamageValues.avgWithDoubleDamageChanceWithED.toFixed(2)}
            Vs Undead: ${totalAvgDmgWithUndeadED.toFixed(2)}
            Vs Demons: ${totalAvgDmgWithDemonsED.toFixed(2)}
        ##########################################################
        `)
    }

}

export function test_dmg() {

    const weaponsToTest = [
        {name: "Nats Claw (Max Dmg + Skull)", low: 120, high: 249, ds: 0, undeadED: 200, demonED: 200},
        {name: "Nats Claw (Max Dmg + Lo)", low: 120, high: 249, ds: 20, undeadED: 200, demonED: 200},
        {name: "Nats Claw (Max Dmg + Ohm)", low: 140, high: 274.5, ds: 0, undeadED: 200, demonED: 200},
        {name: "Nats Claw (Lo, Lo, Ohm)", low: 140, high: 178.5, ds: 40, undeadED: 200, demonED: 200},
        {name: "Nats Claw (Lo, Ohm, Ohm)", low: 160, high: 204, ds: 20, undeadED: 200, demonED: 200},

        {name: "Bartucs (Lo, Lo, Jah)", low: 97, high: 182, ds: 40},
        {name: "Bartucs (Max Dmg + Jah)", low: 97, high: 278, ds: 0},
        {name: "Bartucs (Lo, Ohm, Jah)", low: 109, high: 204, ds: 20},
        {name: "Bartucs (Ohm, Ohm, Jah)", low: 121, high: 226, ds: 0},
        {name: "Bartucs (Shael, Shael, Jah)", low: 97, high: 182, ds: 0},

        {name: "Jade Talon (Shael, Shael, Jah)", low: 114, high: 152, ds: 0},
        {name: "Jade Talon (Ohm, Lo, Jah)", low: 131.92, high: 174.6, ds: 20},
        {name: "Jade Talon (Ohm, Ohm, Jah)", low: 148.92, high: 197.1, ds: 0},
        {name: "Jade Talon (Lo, Lo, Jah)", low: 114, high: 152, ds: 40},
        {name: "Jade Talon (Max Dmg + Jah, [Perfect])", low: 114, high: 248, ds: 0},
        {name: "Jade Talon (Max Dmg + Jah, [Mine])", low: 104, high: 234.6, ds: 0},

        {name: "Fury Claw", low: 120, high: 160, ds: 33},
    ]

    // Sins increase ED from Dex & Str
    // Barbs increase ED from Str
    //

    const baseCriticalStrikeChance = 31;
    const baseDeadlyStrikeChance = 15 + 15 + 36;
    let enhancedDamageSources = [145, 173, 258, 131, 200]
    const skillWeaponDamagePercentage = 1.00;

    const sortedWeapons = weaponsToTest.sort((weaponA, weaponB) => {
        const weaponDmgRange = calcAvgDmg(weaponA.low, weaponA.high)
        const realChanceForDoubleDmg = calcDoubleDamageChance(baseCriticalStrikeChance, baseDeadlyStrikeChance + weaponA.ds)
        const effectiveDmgA = weaponDmgRange + (weaponDmgRange * (realChanceForDoubleDmg / 100))

        const weaponDmgRangeB = calcAvgDmg(weaponB.low, weaponB.high)
        const realChanceForDoubleDmgB = calcDoubleDamageChance(baseCriticalStrikeChance, baseDeadlyStrikeChance + weaponB.ds)
        const effectiveDmgB = weaponDmgRangeB + (weaponDmgRangeB * (realChanceForDoubleDmgB / 100))

        return effectiveDmgB - effectiveDmgA;
    });

    const first = sortedWeapons.shift()!;
    calcDmgStats(first, enhancedDamageSources, skillWeaponDamagePercentage, baseCriticalStrikeChance, baseDeadlyStrikeChance)

    sortedWeapons.forEach(weapon => calcDmgStats(weapon, enhancedDamageSources, skillWeaponDamagePercentage, baseCriticalStrikeChance, baseDeadlyStrikeChance, first));

}
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

export function weaponKindToString(weaponKindStr: string | WeaponKind): string {
  const weaponKind = WeaponKind[weaponKindStr as keyof typeof WeaponKind];

  switch (weaponKind) {
    case WeaponKind.Sword:
      return "Sword";
    case WeaponKind.Axe:
      return "Axe";
    case WeaponKind.Dagger:
      return "Dagger";
    case WeaponKind.Mace:
      return "Mace";
    case WeaponKind.Hammer:
      return "Hammer";
    case WeaponKind.Club:
      return "Club";
    case WeaponKind.ThunderStump:
      return "Great Maul, Martel De Fer, or Thunder Maul";
    case WeaponKind.Claw:
      return "Claw";
    case WeaponKind.AmazonSpear:
      return "Amazon Spear";
    case WeaponKind.Bow:
      return "Bow";
    case WeaponKind.Crossbow:
      return "Crossbow";
    case WeaponKind.AmazonJavelin:
      return "Amazon Javelin";
    case WeaponKind.Throwing:
      return "Throwing Weapon";
    case WeaponKind.Polearm:
      return "Polearm";
    case WeaponKind.Spear:
      return "Spear";
    case WeaponKind.Scepter:
      return "Scepter";
    case WeaponKind.Stave:
      return "Stave";
    case WeaponKind.Wand:
      return "Wand";
    case WeaponKind.Orb:
      return "Orb";
    default:
      return "UNHANDLED WEAPON KIND";
  }
}

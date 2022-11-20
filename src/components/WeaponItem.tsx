import { Weapon } from "../types/Weapon";

interface Props {
  simplified: boolean;
}

export default function WeaponItem({
  simplified,
  name,
  low,
  high,
  ds,
  undeadED,
  demonED,
}: Props & Weapon) {
  const SimplifiedVersion = () => (
    <div className={"w-full bg-[#B0B0B0] p-1 text-center"}>
      <div>{name}</div>

      <div className={"m-2"}>
        {low} to {high}
      </div>
      <ul className={"mt-2 text-xs"}>
        {undeadED && <li>+ {undeadED}% Undead Damage</li>}
        {demonED && <li>+ {demonED}% Demon Damage</li>}
      </ul>
    </div>
  );

  const ExpandedVersion = () => (
    <div className={"h-44 w-full bg-blue-800"}>
      <div>{name}</div>
      <span>DAMAGE: {low}</span>-<span>{high}</span>
      <div>DS: {ds}</div>
    </div>
  );

  return <>{simplified ? <SimplifiedVersion /> : <ExpandedVersion />}</>;
}

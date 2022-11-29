import { Weapon } from "../types/Weapon";
import clsx from "clsx";

interface Props {
  simplified: boolean;
}

export default function WeaponItem({
  simplified,
  name,
  low,
  high,
  deadlyStrike,
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

  const FullDamageResult = ({
    className,
    heading,
    totalAvgDamage,
    totalEnhancedDamage,
    doubleDamageChance,
  }: any) => (
    <div
      className={clsx(
        "flex h-full flex-1 flex-col items-center justify-start gap-4 p-4",
        className
      )}
    >
      <h1 className={"text-xl font-bold"}>{heading}</h1>

      <div className={"flex flex-col items-center justify-center"}>
        <div>Total Average</div>
        <div className={"text-3xl font-bold"}>{totalAvgDamage}</div>
      </div>

      <ul className={"mt-2 text-xs"}>
        <li>+ {doubleDamageChance}% 2x Damage</li>
        <li>+ {totalEnhancedDamage}% Enhanced Damage</li>
      </ul>
    </div>
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
        <div className={"text-base"}>{name}</div>

        <div>
          {low} to {high}
        </div>
        <ul className={"text-xs"}>
          {undeadED && <li>+ {undeadED}% Undead Damage</li>}
          {demonED && <li>+ {demonED}% Demon Damage</li>}
        </ul>
      </div>

      <div className={"flex h-full flex-1"}>
        <FullDamageResult
          className={"bg-red-900 text-white"}
          heading={"vs. Demons"}
          totalAvgDamage={"6664"}
          totalEnhancedDamage={"600"}
          doubleDamageChance={"20"}
        />
        <FullDamageResult
          className={"bg-black text-white"}
          heading={"vs. Undead"}
          totalAvgDamage={"6664"}
          totalEnhancedDamage={"600"}
          doubleDamageChance={"20"}
        />
        <FullDamageResult
          className={"bg-white"}
          heading={"vs. Normal"}
          totalAvgDamage={"5843"}
          totalEnhancedDamage={"400"}
          doubleDamageChance={"20"}
        />
      </div>
    </div>
  );

  return <>{simplified ? <SimplifiedVersion /> : <ExpandedVersion />}</>;
}

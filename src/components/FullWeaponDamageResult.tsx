import clsx from "clsx";
import { useMemo } from "react";

interface Props {
  className: string;
  heading: string;
  totalAvgDamage: string;
  enhancedDamageValues: number[];

  chanceForDoubleDamage: number | undefined;
}

export function FullDamageResult({
  className,
  heading,
  totalAvgDamage,
  enhancedDamageValues,
  chanceForDoubleDamage,
}: Props) {
  const totalEnhancedDamage = useMemo(() => {
    let sum = 0;
    for (let edVals of enhancedDamageValues) {
      sum += edVals;
    }
    return sum;
  }, [enhancedDamageValues]);

  return (
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
        {chanceForDoubleDamage && (
          <li>+ {chanceForDoubleDamage.toFixed(0)}% 2x Damage</li>
        )}
        {totalEnhancedDamage > 0 && (
          <li>+ {totalEnhancedDamage}% Enhanced Damage</li>
        )}
      </ul>
    </div>
  );
}

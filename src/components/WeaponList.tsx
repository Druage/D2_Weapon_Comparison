import WeaponItem from "./WeaponItem";
import { Trigger } from "@radix-ui/react-dialog";
import { useGlobalState } from "../state/useGlobalState";
import { AddWeaponButton } from "./AddWeaponButton";

export default function WeaponList() {
  const weapons = useGlobalState((state) => state.weapons);

  return (
    <div className={"absolute left-0 top-0 bottom-0 z-10 w-96 bg-[#616161]"}>
      <div
        className={
          "_scroll-area absolute top-0 right-0 left-0 bottom-20 overflow-y-auto p-4"
        }
      >
        <div className={"grid grid-cols-2 gap-4"}>
          {weapons.map((it, index) => (
            <WeaponItem key={index} simplified={true} weapon={it} />
          ))}
        </div>
      </div>

      <AddWeaponButton />
    </div>
  );
}

import { Trigger } from "@radix-ui/react-dialog";

export function AddWeaponButton() {
  return (
    <Trigger
      className={
        "flex h-12 w-fit items-center justify-center border-4 border-[#383838] bg-purple-400 bg-[#B4B4B4] px-8 text-xl font-bold text-black"
      }
    >
      Add Weapon
    </Trigger>
  );
}

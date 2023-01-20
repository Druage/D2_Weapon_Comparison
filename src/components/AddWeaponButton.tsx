import { Trigger } from "@radix-ui/react-dialog";

export function AddWeaponButton() {
  return (
    <Trigger
      className={
        "flex h-20 w-fit items-center justify-center border-8 border-[#383838] bg-purple-400 bg-[#B4B4B4] px-16 text-2xl font-bold text-black"
      }
    >
      Add Weapon
    </Trigger>
  );
}

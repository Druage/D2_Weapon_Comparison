import { Close, Content, DialogPortal, Overlay } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { Weapon } from "../types/Weapon";
import { useGlobalState } from "../state/useGlobalState";
import { useRef } from "react";
import { WeaponKind, weaponKindToString } from "../types/WeaponKind";

export default function AddWeaponDialog() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Weapon>();

  const addWeapon = useGlobalState((state) => state.addWeapon);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (data: Weapon) => {
    data.demonED = !isNaN(data.demonED!) ? data.demonED : 0;
    data.undeadED = !isNaN(data.undeadED!) ? data.undeadED : 0;
    data.otherED = !isNaN(data.otherED!) ? data.otherED : 0;
    data.deadlyStrike = !isNaN(data.deadlyStrike!) ? data.deadlyStrike : 0;
    console.log(data);

    addWeapon(data);
    closeButtonRef?.current?.click();
  };

  const ActionsBar = () => (
    <div
      className={"flex h-16 w-full items-center justify-evenly bg-[#222222]"}
    >
      <Close
        ref={closeButtonRef}
        className={"rounded-3xl bg-gray-900 px-4 py-2 text-white"}
      >
        Cancel
      </Close>
      <button className={"text-white"} type={"submit"}>
        Submit
      </button>
    </div>
  );

  const Form = () => (
    <form
      className={
        "flex w-full flex-grow-0 flex-col items-center justify-center gap-4 bg-[#323232] p-8"
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder={"Name"}
        className={"w-full p-1 text-sm"}
        type={"text"}
        {...register("name", { required: true })}
      />

      <label className={"flex h-12 w-full flex-col gap-1 text-xs text-white"}>
        Type
        <select
          className={"h-full p-1 text-sm"}
          {...register("type", { required: true })}
        >
          {Object.values(WeaponKind)
            .filter((it) => isNaN(Number(it)))
            .map((it) => (
              <option key={it} value={it}>
                {weaponKindToString(it)}
              </option>
            ))}
        </select>
      </label>

      <div className={"flex w-full items-center justify-evenly gap-2"}>
        <input
          placeholder={"Low"}
          className={"w-24 flex-1 p-1 text-sm"}
          type={"number"}
          {...register("low", { required: true })}
        />
        <span className={"text-white"}>to</span>
        <input
          placeholder={"High"}
          className={"w-24 flex-1 p-1 text-sm"}
          type={"number"}
          {...register("high", { required: true })}
        />
      </div>

      <input
        placeholder={"Undead %"}
        className={"w-full p-1 text-sm"}
        type={"number"}
        {...register("undeadED", {
          valueAsNumber: true,
        })}
      />
      <input
        placeholder={"Demon %"}
        className={"w-full p-1 text-sm"}
        type={"number"}
        {...register("demonED", {
          valueAsNumber: true,
        })}
      />
      <input
        placeholder={"Other %"}
        className={"w-full p-1 text-sm"}
        type={"number"}
        {...register("otherED", {
          valueAsNumber: true,
        })}
      />

      <input
        placeholder={"Deadly Strike %"}
        className={"w-full p-1 text-sm"}
        type={"number"}
        {...register("deadlyStrike", {
          valueAsNumber: true,
        })}
      />

      <ActionsBar />
    </form>
  );

  return (
    <DialogPortal>
      <Overlay className={"fixed inset-0 z-50 bg-gray-900 opacity-70"} />
      <Content
        className={
          "fixed inset-0 z-50 m-auto h-fit w-80 scale-150 border-4 border-[#929292] bg-white"
        }
      >
        <Form />
      </Content>
    </DialogPortal>
  );
}

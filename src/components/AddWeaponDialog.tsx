import { Close, Content, DialogPortal, Overlay } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { Weapon } from "../types/Weapon";
import { useGlobalState } from "../state/useGlobalState";
import { useRef } from "react";

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
        className={"w-full p-2 text-xl"}
        type={"text"}
        {...register("name", { required: true })}
      />

      <div className={"flex w-full items-center justify-evenly gap-2"}>
        <input
          placeholder={"Low"}
          className={"w-24 flex-1 p-2"}
          type={"number"}
          {...register("low", { required: true })}
        />
        <span>to</span>
        <input
          placeholder={"High"}
          className={"w-24 flex-1 p-2"}
          type={"number"}
          {...register("high", { required: true })}
        />
      </div>

      <input
        placeholder={"Undead %"}
        className={"w-full p-2"}
        type={"number"}
        {...register("undeadED")}
      />
      <input
        placeholder={"Demon %"}
        className={"w-full p-2"}
        type={"number"}
        {...register("demonED")}
      />
      <input
        placeholder={"Other %"}
        className={"w-full p-2"}
        type={"number"}
        {...register("otherED")}
      />

      <input
        placeholder={"Deadly Strike %"}
        className={"w-full p-2"}
        type={"number"}
        {...register("deadlyStrike")}
      />

      <ActionsBar />
    </form>
  );

  return (
    <DialogPortal>
      <Overlay className={"fixed inset-0 z-50 bg-gray-900 opacity-70"} />
      <Content
        className={
          "fixed inset-0 z-50 m-auto h-fit w-96 scale-150 border-4 border-[#929292] bg-white"
        }
      >
        <Form />
      </Content>
    </DialogPortal>
  );
}

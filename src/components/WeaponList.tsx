import WeaponItem from "./WeaponItem";
import {Trigger} from "@radix-ui/react-dialog";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";

export default function WeaponList() {
    const CompareButton = () => (
        <Trigger
            className={
                "absolute bottom-0 left-0 right-0 flex h-20 w-full items-center justify-center border-8 border-[#383838] bg-purple-400 bg-[#B4B4B4] text-2xl font-bold text-black"
            }
        >
            Add Weapon
        </Trigger>
    );

    return (
        <div className={"absolute left-0 top-0 bottom-0 z-10 w-96 bg-[#616161]"}>
            <div className={"_scroll-area absolute inset-0 overflow-y-auto p-8"}>
                <div className={"grid grid-cols-2 gap-4"}>
                    {FAKE_WEAPONS_TO_TEST.map((it, index) => (
                        <WeaponItem
                            key={index}
                            simplified={true}
                            name={it.name}
                            low={it.low}
                            high={it.high}
                            ds={it.ds}
                        />
                    ))}
                </div>
            </div>

            <CompareButton/>
        </div>
    );
}
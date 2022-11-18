import _ from "lodash";
import WeaponItem from "./WeaponItem";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";

export default function ComparisonList() {
    const CompareHeader = () => (
        <div
            className={
                "flex flex-row items-center justify-between border-y-4 border-[#4B4B4B] bg-[#2C2C2C] p-4"
            }
        >
            <button
                className={
                    "flex h-full items-center justify-center border-4 border-black bg-white bg-[#272020] py-2 px-16 text-xl text-xl font-bold text-white"
                }
            >
                Compare Weapons
            </button>
            <div className={"flex flex-row gap-4"}>
                {_.range(3).map(() => (
                    <div className={"h-10 w-28 bg-white"}/>
                ))}
            </div>
        </div>
    );

    return (
        <div
            className={
                "absolute top-0 bottom-0 right-0 left-96 overflow-y-auto bg-[#252525]"
            }
        >
            <CompareHeader/>

            <div className={"flex flex-col items-center gap-4 py-8 px-32"}>
                <h1 className={"mb-4 text-3xl font-bold text-white"}>Results</h1>
                {FAKE_WEAPONS_TO_TEST.map((it, index) => (
                    <WeaponItem
                        key={index}
                        simplified={false}
                        name={it.name}
                        low={it.low}
                        high={it.high}
                        ds={it.ds}
                        undeadED={it.undeadED}
                        demonED={it.demonED}
                    />
                ))}
            </div>
        </div>
    );
}
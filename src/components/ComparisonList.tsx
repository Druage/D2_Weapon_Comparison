import WeaponItem from "./WeaponItem";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";
import _ from "lodash";

export default function ComparisonList() {
    const CompareHeader = () => (
        <div
            className={
                "flex flex-row items-center justify-between border-y-4 border-[#4B4B4B] bg-[#2C2C2C] px-6 py-8"
            }
        >
            <button
                className={
                    "flex h-full items-center justify-center border-4 border-black bg-white bg-[#272020] py-2 px-16 text-xl text-xl font-bold text-white"
                }
                onClick={() => {
                    alert("NOT WORKING!");
                }}
            >
                Compare Weapons
            </button>

            <label className={"relative w-36"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Critical Chance %
        </span>
                <input className={"h-10 w-full bg-white"} type={"number"}/>
            </label>
        </div>
    );

    return (
        <div
            className={
                "absolute top-0 bottom-0 right-0 left-96 overflow-y-auto bg-[#252525]"
            }
        >
            <CompareHeader/>

            <div className={"flex flex-col items-center gap-4 py-8 px-10"}>
                <div className={"relative mb-4 w-full"}>
                    <h1 className={"text-3xl font-bold text-white flex-1 text-center"}>Results</h1>
                    <div
                        className={"absolute right-0 top-0 bottom-0 flex flex-row items-center gap-2"}
                    >
                        {_.range(3).map((it) => (
                            <div key={it} className={"h-8 w-16 bg-white"}/>
                        ))}
                    </div>
                </div>
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
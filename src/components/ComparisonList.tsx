import _ from "lodash";
import WeaponItem from "./WeaponItem";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";

export default function ComparisonList() {

    const CompareHeader = () => <div
        className={"flex flex-row justify-between items-center bg-[#2C2C2C] p-4 border-y-4 border-[#4B4B4B]"}>
        <button
            className={"h-full bg-white py-2 px-16 text-xl bg-[#272020] text-white font-bold text-xl border-4 border-black flex items-center justify-center"}>Compare
            Weapons
        </button>
        <div className={"flex flex-row gap-4"}>
            {_.range(3).map(it => <div className={"w-28 h-10 bg-white"}/>)}
        </div>

    </div>

    return <div className={"absolute top-0 bottom-0 right-0 left-80 bg-[#252525] overflow-y-scroll"}>

        <CompareHeader/>

        <div className={"flex flex-col items-center gap-4 py-8 px-32"}>

            <h1 className={"text-3xl font-bold text-white mb-4"}>Results</h1>
            {FAKE_WEAPONS_TO_TEST.map((it, index) => <WeaponItem key={index}
                                                                 simplified={false}
                                                                 name={it.name}
                                                                 low={it.low}
                                                                 high={it.high}
                                                                 ds={it.ds}
                                                                 undeadED={it.undeadED}
                                                                 demonED={it.demonED}/>)}
        </div>
    </div>
}
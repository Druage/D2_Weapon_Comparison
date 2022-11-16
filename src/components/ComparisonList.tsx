import _ from "lodash";
import WeaponItem from "./WeaponItem";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";

export default function ComparisonList() {

    return <div className={"absolute top-0 bottom-0 right-0 left-80 bg-yellow-500 p-8 overflow-scroll"}>
        <h1 className={"text-center mb-8 text-2xl"}>RESULTS</h1>

        <div className={"flex flex-col gap-4"}>
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
import _ from "lodash";
import Weapon from "./Weapon";

export default function ComparisonList() {


    return <div className={"absolute top-0 bottom-0 right-0 left-80 bg-yellow-500 p-8 overflow-scroll"}>
        <h1 className={"text-center mb-8 text-2xl"}>RESULTS</h1>

        <div className={"flex flex-col gap-4"}>
            {_.range(10).map((it: number) => <Weapon key={it.toString()} simplified={false} name={`WEAPON-${it}`}/>)}
        </div>
    </div>
}
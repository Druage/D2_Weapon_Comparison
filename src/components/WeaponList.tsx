import _ from "lodash"
import Weapon from "./Weapon";

export default function WeaponList() {

    const AddWeaponButton = () => <div
        className={"bg-gray-800 h-20 text-white flex justify-center items-center mb-8"}>ADD +</div>

    const CompareButton = () => <div
            className={"absolute bottom-0 left-0 right-0 bg-purple-400 h-20 flex justify-center items-center"}>COMPARE</div>

    return <div className={"absolute left-0 top-0 bottom-0 bg-red-500 w-80"}>

        <div className={"_scroll-area absolute overflow-scroll left-0 top-0 bottom-0 w-full p-4"}>
            <AddWeaponButton/>

            <div className={"flex flex-col gap-4"}>
                {_.range(10).map((it: number) => <Weapon key={it.toString()} simplified={true} name={`WEAPON-${it}`}/>)}
            </div>
        </div>


        <CompareButton/>

    </div>
}
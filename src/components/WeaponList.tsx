import WeaponItem from "./WeaponItem";
import {Trigger} from "@radix-ui/react-dialog";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";

export default function WeaponList() {

    const AddWeaponButton = () => <Trigger
        className={"bg-gray-800 h-20 text-white flex justify-center items-center mb-8 w-full"}>
        ADD +
    </Trigger>

    const CompareButton = () => <div
        className={"absolute bottom-0 left-0 right-0 bg-purple-400 h-20 flex justify-center items-center"}>COMPARE</div>

    return <div className={"absolute left-0 top-0 bottom-0 bg-red-500 w-80"}>

        <div className={"_scroll-area absolute overflow-scroll left-0 top-0 bottom-0 w-full p-4"}>
            <AddWeaponButton/>

            <div className={"flex flex-col gap-4"}>
                {FAKE_WEAPONS_TO_TEST.map((it, index) => <WeaponItem key={index}
                                                                     simplified={true}
                                                                     name={it.name}
                                                                     low={it.low}
                                                                     high={it.high}
                                                                     ds={it.ds}/>)}
            </div>
        </div>


        <CompareButton/>

    </div>
}
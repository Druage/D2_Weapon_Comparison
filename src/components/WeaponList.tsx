import WeaponItem from "./WeaponItem";
import {Trigger} from "@radix-ui/react-dialog";
import {FAKE_WEAPONS_TO_TEST} from "../data/data";

export default function WeaponList() {

    const CompareButton = () => <Trigger
        className={"absolute bottom-0 left-0 right-0 w-full bg-purple-400 h-20 flex justify-center items-center border-8 border-[#383838] bg-[#B4B4B4] text-black text-2xl font-bold"}>Add Weapon</Trigger>

    return <div className={"absolute left-0 top-0 bottom-0 bg-[#616161] w-96 z-10"}>

        <div className={"_scroll-area absolute overflow-y-auto inset-0 p-8"}>

            <div className={"grid grid-cols-2 gap-4"}>
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
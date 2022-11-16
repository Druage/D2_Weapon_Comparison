import {Weapon} from "../types/Weapon";

interface Props {
    simplified: boolean
}

export default function WeaponItem({simplified, name, low, high, ds, undeadED, demonED}: Props & Weapon) {

    const SimplifiedVersion = () => <div className={"bg-blue-800"}>
        <div>{name}</div>
        <span>DAMAGE: {low}</span>-<span>{high}</span>
    </div>;

    const ExpandedVersion = () => <div className={"bg-blue-800 h-44"}>
        <div>{name}</div>
        <span>DAMAGE: {low}</span>-<span>{high}</span>
        <div>DS: {ds}</div>
    </div>;

    return <>
        {simplified ?
            <SimplifiedVersion/> :
            <ExpandedVersion/>}
    </>
}
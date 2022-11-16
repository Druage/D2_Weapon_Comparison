interface Props {
    simplified: boolean;
    name: string;
}

export default function Weapon({simplified, name}: Props) {

    const SimplifiedVersion = () => <div className={"bg-blue-800 h-24"}>{name}</div>;
    const ExpandedVersion = () => <div className={"bg-blue-800 h-44"}>{name}</div>;

    return <>
        {simplified ?
            <SimplifiedVersion/> :
            <ExpandedVersion/>}
    </>
}
export default function Header() {
    return (
        <div
            className={"h-32 w-full bg-white text-lg font-bold bg-stone-800 text-white px-12"}>

            <div className={"flex items-start flex-col h-full justify-center "}>
                <h1 className={"text-3xl"}>Diablo II</h1>
                <span className={"opacity-60"}>Physical Damage Calculator</span>
            </div>

        </div>
    )
}
export default function Header() {
  return (
    <div
      className={
        "h-32 w-full bg-white bg-stone-800 px-12 text-lg font-bold text-white"
      }
    >
      <div className={"flex h-full flex-col items-start justify-center "}>
        <h1 className={"text-3xl"}>Diablo II</h1>
        <span className={"opacity-60"}>Physical Damage Calculator</span>
      </div>
    </div>
  );
}

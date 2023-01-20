export default function Header() {
  return (
    <div
      className={
        "flex h-32 w-full items-center justify-between bg-white bg-stone-900 px-12 text-lg font-bold text-white"
      }
    >
      <div className={"flex h-full flex-col items-start justify-center"}>
        <h1 className={"text-3xl"}>Diablo II</h1>
        <span className={"opacity-60"}>Physical Damage Calculator</span>
      </div>
    </div>
  );
}

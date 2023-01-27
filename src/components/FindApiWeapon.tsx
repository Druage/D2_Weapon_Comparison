export function FindApiWeapon() {
  return (
    <div className={"flex w-96 flex-col gap-4 bg-[#323232] p-8"}>
      <h1 className={"w-full text-center text-xl font-bold text-white"}>
        Search Item
      </h1>

      <select defaultValue={"normal"}>
        <option value={"normal"}>Normal</option>
        <option value={"set"}>Set</option>
        <option value={"unique"}>Unique</option>
      </select>

      <ul className={"flex-1 overflow-auto bg-black p-4 text-sm text-white"}>
        {/*{(data && !loading) &&*/}
        {/*  data.map((weapon: Weapon) => (*/}
        {/*    <li key={weapon.name}>*/}
        {/*      <span>{weapon.name}</span>*/}
        {/*      <br/>*/}
        {/*      <span>{weapon.mindam}</span>*/}
        {/*      <span>to</span>*/}
        {/*      <span>{weapon.maxdam}</span>*/}
        {/*    </li>*/}
        {/*  ))}*/}
      </ul>
    </div>
  );
}

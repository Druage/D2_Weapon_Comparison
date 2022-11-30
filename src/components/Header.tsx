import { PLAYABLE_CHARACTERS } from "../data/data";
import { useGlobalState } from "../state/useGlobalState";
import { Character } from "../types/Character";

export default function Header() {
  const setCharacter = useGlobalState((state) => state.setCharacter);
  const setCharacterStrength = useGlobalState(
    (state) => state.setCharacterStrength
  );
  const setCharacterDexterity = useGlobalState(
    (state) => state.setCharacterDexterity
  );

  const CharacterInfo = () => (
    <div className={"flex flex-1 items-center justify-end gap-6"}>
      <label className={"relative w-32"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Character
        </span>

        <select
          className={"h-10 w-full"}
          onChange={(event) => setCharacter(event.target.value as Character)}
        >
          {PLAYABLE_CHARACTERS.map((it) => (
            <option value={it} key={it}>
              {it}
            </option>
          ))}
        </select>
      </label>

      <label className={"relative w-20"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Strength
        </span>
        <input
          className={"h-10 w-full bg-white"}
          type={"number"}
          onChange={(event) =>
            setCharacterStrength(Number.parseInt(event.target.value))
          }
        />
      </label>

      <label className={"relative w-20"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Dexterity
        </span>
        <input
          className={"h-10 w-full bg-white"}
          type={"number"}
          onChange={(event) =>
            setCharacterDexterity(Number.parseInt(event.target.value))
          }
        />
      </label>

      <label className={"relative w-32"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Critical Hit %
        </span>
        <input className={"h-10 w-full bg-white"} type={"number"} />
      </label>

      <label className={"relative w-32"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Deadly Strike %
        </span>
        <input className={"h-10 w-full bg-white"} type={"number"} />
      </label>
    </div>
  );

  return (
    <div
      className={
        "flex h-32 w-full items-center justify-between bg-white bg-stone-800 px-12 text-lg font-bold text-white"
      }
    >
      <div className={"flex h-full flex-col items-start justify-center"}>
        <h1 className={"text-3xl"}>Diablo II</h1>
        <span className={"opacity-60"}>Physical Damage Calculator</span>
      </div>

      <CharacterInfo />
    </div>
  );
}

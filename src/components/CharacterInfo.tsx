import { Character } from "../types/Character";
import { PLAYABLE_CHARACTERS } from "../data/data";
import { useGlobalState } from "../state/useGlobalState";

export function CharacterInfo() {
  const [character, setCharacter] = useGlobalState((state) => [
    state.character,
    state.setCharacter,
  ]);
  const [characterStrength, setCharacterStrength] = useGlobalState((state) => [
    state.characterStrength,
    state.setCharacterStrength,
  ]);
  const setCharacterDexterity = useGlobalState(
    (state) => state.setCharacterDexterity
  );

  const setCriticalStrikeChance = useGlobalState(
    (state) => state.setCharacterCriticalStrikeChance
  );
  const setDeadlyStrikeChance = useGlobalState(
    (state) => state.setDeadlyStrikeChance
  );

  const setCharacterSkillWeaponDamagePercentage = useGlobalState(
    (state) => state.setCharacterSkillWeaponDamagePercentage
  );

  const setCharacterOtherEnhancedDamageSources = useGlobalState(
    (state) => state.setCharacterOtherEnhancedDamageSources
  );

  return (
    <div className={"flex flex-1 items-center justify-end gap-6"}>
      <label className={"relative w-32"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Character
        </span>

        <select
          className={"h-10 w-full"}
          onChange={(event) => setCharacter(event.target.value as Character)}
          defaultValue={character}
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
          maxLength={3}
          defaultValue={characterStrength}
          onChange={(event) => {
            setCharacterStrength(Number.parseInt(event.target.value));
          }}
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
          Critical Strike %
        </span>
        <input
          className={"h-10 w-full bg-white"}
          type={"number"}
          onChange={(event) =>
            setCriticalStrikeChance(Number.parseInt(event.target.value))
          }
        />
      </label>

      <label className={"relative w-32"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Deadly Strike %
        </span>
        <input
          className={"h-10 w-full bg-white"}
          type={"number"}
          onChange={(event) =>
            setDeadlyStrikeChance(Number.parseInt(event.target.value))
          }
        />
      </label>

      <label className={"relative w-32"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Skill Damage %
        </span>
        <input
          className={"h-10 w-full bg-white"}
          type={"number"}
          onChange={(event) =>
            setCharacterSkillWeaponDamagePercentage(
              Number.parseInt(event.target.value)
            )
          }
        />
      </label>

      <label className={"relative w-32"}>
        <span className={"absolute -top-6 text-sm font-bold text-white"}>
          Other ED %
        </span>
        <input
          className={"h-10 w-full bg-white"}
          type={"number"}
          onChange={(event) =>
            setCharacterOtherEnhancedDamageSources([
              Number.parseInt(event.target.value),
            ])
          }
        />
      </label>
    </div>
  );
}

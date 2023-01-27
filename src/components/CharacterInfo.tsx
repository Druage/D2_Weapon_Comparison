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
  const [characterDexterity, setCharacterDexterity] = useGlobalState(
    (state) => [state.characterDexterity, state.setCharacterDexterity]
  );

  const [characterCriticalStrikeChance, setCriticalStrikeChance] =
    useGlobalState((state) => [
      state.characterCriticalStrikeChance,
      state.setCharacterCriticalStrikeChance,
    ]);
  const [characterDeadlyStrikeChance, setDeadlyStrikeChance] = useGlobalState(
    (state) => [state.characterDeadlyStrikeChance, state.setDeadlyStrikeChance]
  );

  const [
    characterSkillWeaponDamagePercentage,
    setCharacterSkillWeaponDamagePercentage,
  ] = useGlobalState((state) => [
    state.characterSkillWeaponDamagePercentage,
    state.setCharacterSkillWeaponDamagePercentage,
  ]);

  const [
    characterOtherEnhancedDamageSources,
    setCharacterOtherEnhancedDamageSources,
  ] = useGlobalState((state) => [
    state.characterOtherEnhancedDamageSources,
    state.setCharacterOtherEnhancedDamageSources,
  ]);

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
          min={0}
          max={999}
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
          min={0}
          max={999}
          defaultValue={characterDexterity}
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
          min={0}
          max={999}
          defaultValue={characterCriticalStrikeChance}
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
          min={0}
          max={999}
          defaultValue={characterDeadlyStrikeChance}
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
          min={0}
          max={999}
          defaultValue={characterSkillWeaponDamagePercentage}
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
          min={0}
          max={999}
          defaultValue={characterOtherEnhancedDamageSources[0]}
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

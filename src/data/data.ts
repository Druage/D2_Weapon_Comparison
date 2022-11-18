import { Weapon } from "../types/Weapon";

export const FAKE_WEAPONS_TO_TEST: Weapon[] = [
  {
    name: "Nats Claw (Max Dmg + Skull)",
    low: 120,
    high: 249,
    ds: 0,
    undeadED: 200,
    demonED: 200,
  },
  {
    name: "Nats Claw (Max Dmg + Lo)",
    low: 120,
    high: 249,
    ds: 20,
    undeadED: 200,
    demonED: 200,
  },
  {
    name: "Nats Claw (Max Dmg + Ohm)",
    low: 140,
    high: 274.5,
    ds: 0,
    undeadED: 200,
    demonED: 200,
  },
  {
    name: "Nats Claw (Lo, Lo, Ohm)",
    low: 140,
    high: 178.5,
    ds: 40,
    undeadED: 200,
    demonED: 200,
  },
  {
    name: "Nats Claw (Lo, Ohm, Ohm)",
    low: 160,
    high: 204,
    ds: 20,
    undeadED: 200,
    demonED: 200,
  },

  { name: "Bartucs (Lo, Lo, Jah)", low: 97, high: 182, ds: 40 },
  { name: "Bartucs (Max Dmg + Jah)", low: 97, high: 278, ds: 0 },
  { name: "Bartucs (Lo, Ohm, Jah)", low: 109, high: 204, ds: 20 },
  { name: "Bartucs (Ohm, Ohm, Jah)", low: 121, high: 226, ds: 0 },
  { name: "Bartucs (Shael, Shael, Jah)", low: 97, high: 182, ds: 0 },

  { name: "Jade Talon (Shael, Shael, Jah)", low: 114, high: 152, ds: 0 },
  { name: "Jade Talon (Ohm, Lo, Jah)", low: 131.92, high: 174.6, ds: 20 },
  { name: "Jade Talon (Ohm, Ohm, Jah)", low: 148.92, high: 197.1, ds: 0 },
  { name: "Jade Talon (Lo, Lo, Jah)", low: 114, high: 152, ds: 40 },
  { name: "Jade Talon (Max Dmg + Jah, [Perfect])", low: 114, high: 248, ds: 0 },
  { name: "Jade Talon (Max Dmg + Jah, [Mine])", low: 104, high: 234.6, ds: 0 },

  { name: "Fury Claw", low: 120, high: 160, ds: 33 },
];
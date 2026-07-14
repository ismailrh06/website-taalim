// Point d'entrée du module tuteur : le reste de l'application demande « le »
// tuteur ici, sans connaître l'implémentation. Pour brancher un vrai LLM plus
// tard (Premium), il suffira de renvoyer une autre instance de SocraticTutor
// — l'interface et l'UI ne changent pas.

import type { SocraticTutor } from "./types";
import { ScriptedTutor } from "./scripted-tutor";

let instance: SocraticTutor | null = null;

export function getTutor(): SocraticTutor {
  if (!instance) {
    instance = new ScriptedTutor();
  }
  return instance;
}

export * from "./types";

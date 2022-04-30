import { Access } from "./Access";
import { School } from "./School";
import { Year } from "./Year";

const unit_types = ["school", "year", "classroom", "student"] as const;
export type UnitType = typeof unit_types[number];
export const isUnitType = (x: any): x is UnitType => unit_types.includes(x);

export type UnitDate = School | Year;

export interface Unit {
  /** C'est l'identifiant de l'object */
  id: string;

  /**
   * C'est l'identifiant de l'object parent, Pour les objets de type `School`
   * sa valeur peut être `null`.
   */
  parent?: string;

  /** Explication plus tard dans ce document */
  type: UnitType;

  /** C'est la valeur de l'objet */
  data: UnitDate;

  /**
   * C'est un tableau d'accès permettant au utilisateur d'effetuer
   * des taches précises.
   */
  access: Access[];

  created_at: Date;
  updated_at: Date;
}

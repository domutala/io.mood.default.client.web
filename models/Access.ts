/**
 * Pour accéder à une informations l'utilisateur a
 * besoin d'avoir une autorisation d'accès à cette donnée.
 * @author domutala
 */
export interface Access {
  id: string;

  /** C'est l'identifiant de l'objet user */
  user: string;

  object: {
    /** C'est l'identifiant de l'objet */ id: string;
    /** C'est le type objet: school, classroom, year, ... */ types: string;
  };

  /**
   * admin: donne tous les accès possible, suppression et
   *        ajout de nouvelle accès.
   *
   * write: permet une modification de l'objet.
   *
   * read: c'est un accès en lecture simple.
   */
  role: "admin" | "read" | "write";

  /** Si l'objet appartien à l'utilisateur */
  owner: boolean;

  created_at: Date;
  updated_at: Date;
}

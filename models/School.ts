export interface School {
  name: string;
  abbreviation?: string;
  logo?: string;
  slogan?: string;
  description?: string;
  created_date?: Date;

  // informations academiques
  ministere?: string;
  ia?: string;
  ief?: string;
  iden?: string;
  type?: string;
  language_main?: string;
  language_others?: string[];

  // contacts
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

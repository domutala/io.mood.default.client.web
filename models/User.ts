export interface User {
  id: string;
  name: { first: string; last?: string };
  avatar?: string;
  username?: string;
  phone?: string;
  email: string;
  access: { [key: string]: "read" | "write" | null };
  blocked?: boolean;

  data: {
    id: string;
    name: string;
    photo?: string;
    phone?: string;
    email: string;
    blocked?: boolean;
  };

  super?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserFormat {
  value: User;
  format: { [key: string]: any };
}

export interface UsersState {
  users: { [key: string]: UserFormat };
  ids: string[];
}

export interface Client {
  id: string;
  name: { first: string; last?: string };
  avatar?: string;
  phones: string[];
  email: string;
  address: string;
  category?: string;
  created_at?: Date;
  updated_at?: Date;
}

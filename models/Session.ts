import { Key } from "./Employee";
import { User } from "./User";

export interface ISession {
  uid?: string;
  user?: {
    value: User;
    format: { [key: string]: Key };
  };
  keys?: { public: string; private: string };
  server_keys?: { public: string };
}

export interface ISessionState {
  session: ISession;
}

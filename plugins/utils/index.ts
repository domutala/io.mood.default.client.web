import { Plugin } from "@nuxt/types";

import datetime from "./datetime";
import number_ from "./number";
import phone from "./phone";
import regex from "./regex";
import rsa from "./rsa";
import token from "./token";

declare module "@nuxt/types" {
  interface Context {
    $utils: {
      datetime: {
        formater: (date: string | Date, format?: string) => string;
      };

      number: {
        formater: (
          amount: number,
          unit?: string,
          unitPosition?: string
        ) => string;
      };

      phone: {
        isValid: (phoneNumebr: string) => boolean;
        countryCode: (phoneNumebr: string) => string | undefined;
        format: (phoneNumebr: string, international?: boolean) => string;
      };

      regex: {
        mail: (mail: string) => boolean;
        url: (url: string) => boolean;
        name: (name: string) => boolean;
        password: (password: string) => boolean;
      };

      rsa: {
        generate: () => { public: string; private: string };
        encrypt: ({
          key,
          data,
        }: {
          key: string;
          data: string | number[];
        }) => string | string[];
        decrypt: ({
          key,
          data,
        }: {
          key: string;
          data: string | string[];
        }) => string;
      };

      token: {
        generate: ({ length }?: { length: number }) => string;
      };
    };
  }
}

const myPlugin: Plugin = (context) => {
  context.$utils = {
    datetime,
    number: number_,
    phone,
    regex,
    rsa,
    token,
  };
};

export default myPlugin;

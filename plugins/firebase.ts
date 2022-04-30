import { Plugin } from "@nuxt/types";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

declare module "@nuxt/types" {
  interface Context {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      login: {
        google: (cb: (error: boolean, dynamic?: any) => void) => Promise<void>;
      };
    };
  }
}

const plugin: Plugin = (context) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBK2vGYULd7P9iKWnYhCaaVezZRe7wJVU8",
    authDomain: "schoolmanagar.firebaseapp.com",
    projectId: "schoolmanagar",
    storageBucket: "schoolmanagar.appspot.com",
    messagingSenderId: "749684470238",
    appId: "1:749684470238:web:c7c5dd590fc8d957b76d4f",
    measurementId: "G-59CFZEFZGT",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const with_google = async (cb: (error: boolean) => void) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(context.$firebase.auth, provider);

    if (!result) return cb(true);

    const firebase_id_token = await result.user.getIdToken();
    context.$server
      .request({
        method: "post",
        url: "/session/login/step_2",
        data: { firebase_id_token },
      })
      .then(() => {
        context.$server
          .request({ url: "/user/get_my" })
          .then(async (data: any) => {
            await context.store.dispatch("session/setUser", data);
            cb(false);
          })
          .catch(() => {
            cb(true);
          });
      })
      .catch(() => {
        cb(true);
      });
  };

  context.$firebase = { app, auth, login: { google: with_google } };
};

export default plugin;

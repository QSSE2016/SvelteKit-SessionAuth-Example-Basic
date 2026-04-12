import * as db from "$lib/server/database.js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

// This is the "load" function, which you guessed it. it's called when the page loads.
// Session Cookies (session IDs). Cookies are stored on the browser and they typically hold state cause HTTP
// is stateless.

// Server sessions are just when the server creates a unique token (id) and puts that in a cookie that it
// sets for that browser. It also creates a session object on the database and therefore the server can
// query the db for the corresponding session id. if they match (cookie vs db) then it's all good.
// Keep in mind, you don't always have to use cookies to have sessions, but this is a very common way.

// export function load({ cookies }) {
//   // .get() will return undefined if cookie doesn't exist or is expired.
//   let loginCookie: string | undefined = cookies.get("login-cookie");

//   if (!loginCookie) {
//     loginCookie = crypto.randomUUID();
//     cookies.set("login-cookie", loginCookie, { path: "/", maxAge: 60 });

//     // maxAge = 60, so it will expire in 60 seconds
//   }

//   return {
//     cookie: loginCookie,
//   };
// }

export const actions = {
  register: async ({ request }) => {
    redirect(303, "/register");
  },
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const sessionId = db.loginUser(email, password);

      cookies.set("session_cookie", sessionId, {
        path: "/",
        maxAge: db.SESSION_DURATION,
      });
    } catch (error: any) {
      return fail(422, {
        message: error.message,
      });
    }

    redirect(303, "/main");
  },
} satisfies Actions;

import type { Handle } from "@sveltejs/kit";
import * as db from "$lib/server/database.js";

// Called every time the SvelteKit server receives a request
export const handle: Handle = async ({ event, resolve }) => {
  const cookie = event.cookies.get("session_cookie");

  // Any route under "main" should be checked for session validity.
  if (event.url.pathname.includes("main")) {
    const user = db.getUserFromSession(cookie);
    if (user == null) {
      return new Response(null, {
        status: 303,
        headers: { location: "/" }, // redirect to root. no recursion cause it only triggers under specific routes
      });
    }

    event.locals.user = user;
  }

  // resolve(event) --> render page. This is what happens by default
  const response = await resolve(event);
  return response;
};

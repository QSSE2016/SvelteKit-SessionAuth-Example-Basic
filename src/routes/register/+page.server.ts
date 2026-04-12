import * as db from "$lib/server/database.js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // So typically you would want some type of check here to make sure that invalid inputs are not entered.

    try {
      db.createUser(name, email, password);
    } catch (error: any) {
      // idk if any proper type exists for this
      return fail(400, {
        message: error.message,
      });
    }

    // All went well, redirect back to the original page (typically you would go to /login but my login)
    // is on the root page cause im lazy
    redirect(303, "/");
  },
} satisfies Actions;

<script lang="ts">
  import { enhance } from "$app/forms";

  // interface CookieData {
  //   cookie: string | undefined;
  // }

  const { data, form }: { data: any; form: any } = $props();
</script>

<div class="wrapper">
  {#if form?.message}
    <p style="color: red;">{form?.message}</p>
  {/if}

  <form method="POST" action="?/login" use:enhance>
    <h1 style="text-align: center;">Log in Or Register</h1>

    <label for="email">Email</label>
    <input type="email" name="email" required />

    <label for="password">Password</label>
    <input type="password" name="password" required />

    <button type="submit"> Log In </button>
    <button formaction="?/register" class="register" formnovalidate>
      Register
    </button>
  </form>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .register {
    background-color: black;
    border: 1px solid white;
    color: white;
  }

  .register:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  form {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    border: 1px solid black;
    padding: 1em;
    border-radius: 0.25em;
  }

  button {
    border-radius: 0.25em;
    border: none;
    cursor: pointer;
    padding: 1em 0.5em;
  }

  button:hover {
    background-color: black;
    color: white;
  }
</style>

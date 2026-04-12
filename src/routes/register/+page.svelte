<script lang="ts">
  import { enhance } from "$app/forms";

  // This is how props work for all pages:
  // data: loadData
  // form: formData (populated only after a form submission so always check for undefined/null)
  const { data, form }: { data: any; form: any } = $props();
</script>

{#if form?.message}
  <p>{form?.message}</p>
{/if}

<div class="wrapper">
  <!-- enhance prevents page reloads and general default behaviour, among some other things-->
  <form method="POST" action="?/create" use:enhance>
    <h1 style="text-align: center;">Register</h1>
    <label for="name">Name</label>
    <input type="text" name="name" required />

    <label for="email">Email</label>
    <input type="email" name="email" required />

    <label for="password">Password</label>
    <input type="password" name="password" required />

    <button type="submit"> Create </button>
  </form>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100dvh;
    display: flex;
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

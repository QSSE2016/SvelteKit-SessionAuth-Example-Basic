<script lang="ts">
  const { data }: { data: any } = $props();
</script>

<div class="centered">
  <h1>MAIN</h1>
  {#if data.user}
    <p>USER NAME: {data.user.name}</p>
    <p>USER EMAIL: {data.user.email}</p>
  {/if}
</div>

<style>
  .centered {
    max-width: 20em;
    margin: 0 auto;
  }
</style>

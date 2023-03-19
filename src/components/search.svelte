<script lang="ts">
  export let searchTerm: string;
  export let placeholder: string = "Search...";
</script>

<input
  type="text"
  placeholder={placeholder}
  autocomplete="off"
  class="w-full rounded-md border border-neutral-800 bg-neutral-700/10 p-3 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700"
  bind:value={searchTerm}
  on:input
/>

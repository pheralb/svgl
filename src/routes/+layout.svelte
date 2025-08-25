<script lang="ts">
  // Styles:
  import "@/styles/globals.css";

  // Layout:
  import Header from "@/components/layout/header.svelte";

  // Providers:
  import { ModeWatcher } from "mode-watcher";
  import Sidebar from "@/components/layout/sidebar.svelte";

  let { children } = $props();
</script>

<ModeWatcher />
<Header />
<Sidebar>
  {@render children?.()}
</Sidebar>

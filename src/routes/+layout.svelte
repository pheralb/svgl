<script lang="ts">
  import type { LayoutProps } from "./$types";

  // Styles:
  import "@/styles/globals.css";

  // Layout:
  import Header from "@/components/layout/header.svelte";

  // Providers:
  import { ModeWatcher } from "mode-watcher";
  import Sidebar from "@/components/layout/sidebar.svelte";
  import Sonner from "@/components/ui/sonner/sonner.svelte";

  let { children }: LayoutProps = $props();
</script>

<ModeWatcher />
<Sonner />
<Header />
<Sidebar>
  {@render children?.()}
</Sidebar>

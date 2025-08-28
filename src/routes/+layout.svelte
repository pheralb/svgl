<script lang="ts">
  import type { LayoutProps } from "./$types";

  // Styles:
  import "@/styles/globals.css";

  // Layout:
  import Header from "@/components/layout/header.svelte";

  // Providers:
  import { ModeWatcher } from "mode-watcher";
  import Sidebar from "@/components/layout/sidebar.svelte";
  import ViewTransitions from "@/components/viewTransitions.svelte";

  // SSR Data:
  let { data, children }: LayoutProps = $props();
</script>

<ModeWatcher />
<ViewTransitions />
<Header githubStars={data?.stars} />
<Sidebar>
  {@render children?.()}
</Sidebar>

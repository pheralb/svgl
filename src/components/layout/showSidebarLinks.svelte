<script lang="ts">
  import { cn } from "@/utils/cn";
  import { globals } from "@/globals";

  import { page } from "$app/state";
  import favoritesStore from "@/stores/favorites.store";

  import { sidebarItemClasses } from "./sidebarItemClasses";
  import { sidebarBadgeClasses } from "./sidebarBadgeClasses";

  import Box from "@lucide/svelte/icons/box";
  import House from "@lucide/svelte/icons/house";
  import Heart from "@lucide/svelte/icons/heart";
  import Cloud from "@lucide/svelte/icons/cloud";
  import Submit from "@lucide/svelte/icons/send";
  import Github from "@/components/logos/github.svelte";
  import Shadcn from "@/components/logos/shadcn.svelte";

  let favorites = $derived($favoritesStore);
  let favoritesCount = $derived(favoritesStore.getCount(favorites));
</script>

<a
  href="/"
  data-sveltekit-preload-data
  class={cn(
    sidebarItemClasses.base,
    "justify-start space-x-3",
    page.url.pathname === "/" && sidebarItemClasses.active,
  )}
>
  <House size={16} />
  <p class="truncate">Home</p>
</a>
<a
  href="/favorites"
  data-sveltekit-preload-data
  class={cn(
    sidebarItemClasses.base,
    "justify-between",
    String(page.url.pathname) === "/favorites" && sidebarItemClasses.active,
  )}
>
  <div class="flex items-center space-x-3">
    <Heart size={16} />
    <p class="truncate">Favorites</p>
  </div>
  {#if favoritesCount > 0}
    <span
      class={cn(sidebarBadgeClasses, page.url.pathname && "border-transparent")}
    >
      {favoritesCount}
    </span>
  {/if}
</a>
<a
  href="/docs/api"
  data-sveltekit-preload-data
  class={cn(
    sidebarItemClasses.base,
    "justify-start space-x-3",
    String(page.url.pathname) === "/docs/api" && sidebarItemClasses.active,
  )}
>
  <Cloud size={16} />
  <p class="truncate">API</p>
</a>
<a
  href="/docs/shadcn-ui"
  data-sveltekit-preload-data
  class={cn(
    sidebarItemClasses.base,
    "justify-start space-x-3",
    String(page.url.pathname) === "/docs/shadcn-ui" &&
      sidebarItemClasses.active,
  )}
>
  <Shadcn size={14} />
  <p class="truncate">shadcn/ui</p>
</a>
<a
  href="/extensions"
  data-sveltekit-preload-data
  class={cn(
    sidebarItemClasses.base,
    "justify-start space-x-3",
    String(page.url.pathname) === "/extensions" && sidebarItemClasses.active,
  )}
>
  <Box size={16} />
  <p class="truncate">Extensions</p>
</a>
<a
  href={globals.submitUrl}
  target="_blank"
  class={cn(sidebarItemClasses.base, "flex justify-start space-x-3 md:hidden")}
>
  <Submit size={16} />
  <p class="truncate">Submit SVG</p>
</a>
<a
  href={globals.githubUrl}
  target="_blank"
  class={cn(sidebarItemClasses.base, "flex justify-start space-x-3 md:hidden")}
>
  <Github size={16} />
  <p class="truncate">GitHub Repository</p>
</a>

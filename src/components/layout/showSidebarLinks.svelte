<script lang="ts">
  import { cn } from "@/utils/cn";
  import { page } from "$app/state";

  import { sidebarLinks } from "./sidebarLinks";
  import { sidebarItemClasses } from "./sidebarItemClasses";
</script>

{#each sidebarLinks as sidebarLink}
  <a
    href={sidebarLink.href}
    data-sveltekit-preload-data
    class={cn(
      sidebarItemClasses.base,
      "justify-start space-x-3",
      page.url.pathname === sidebarLink.href && sidebarItemClasses.active,
    )}
  >
    <sidebarLink.icon size={16} />
    <p class="truncate">{sidebarLink.title}</p>
  </a>
{/each}

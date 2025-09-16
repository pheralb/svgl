<script lang="ts">
  import { cn } from "@/utils/cn";

  import { Separator } from "@/components/ui/separator";
  import ShowCategories from "@/components/layout/showCategories.svelte";
  import ShowSidebarLinks from "@/components/layout/showSidebarLinks.svelte";
</script>

<section>
  <aside
    class={cn(
      "md:fixed md:left-0 md:h-[calc(100vh-5rem)]",
      "overflow-x-hidden",
      "w-54 pr-2 pl-3",
      "hidden flex-col space-y-3 md:flex",
      "bg-neutral-100 dark:bg-neutral-950",
    )}
  >
    <nav class="flex flex-col space-y-0.5">
      <ShowSidebarLinks />
    </nav>
    <Separator orientation="horizontal" />
    <nav class="relative flex h-auto flex-col space-y-0.5 overflow-y-auto">
      <ShowCategories />
    </nav>
  </aside>
  <main class={cn("mb-4 px-4 md:mr-4 md:ml-56 md:px-0", "overflow-hidden")}>
    <slot />
  </main>
</section>

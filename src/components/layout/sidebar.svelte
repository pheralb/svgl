<script lang="ts">
  import { cn } from "@/utils/cn";

  import { Separator } from "@/components/ui/separator";
  import ShowCategories from "@/components/layout/showCategories.svelte";
  import ShowSidebarLinks from "@/components/layout/showSidebarLinks.svelte";
</script>

<section>
  <aside
    class={cn(
      "fixed left-0 h-[calc(100vh-5rem)]",
      "overflow-x-hidden",
      "w-54 pr-2 pl-3",
      "flex flex-col space-y-3",
      "bg-neutral-100 dark:bg-neutral-950",
    )}
  >
    <nav class="flex flex-col space-y-0.5">
      <ShowSidebarLinks />
    </nav>
    <Separator orientation="horizontal" />
    <nav class="flex flex-col space-y-0.5 overflow-y-auto">
      <ShowCategories />
    </nav>
  </aside>
  <main class={cn("mr-4 mb-4 ml-56", "overflow-hidden")}>
    <slot />
  </main>
</section>

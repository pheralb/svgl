<script lang="ts">
  import { cn } from "@/utils/cn";

  import { Separator } from "@/components/ui/separator";
  import ShowCategories from "@/components/layout/showCategories.svelte";
  import ShowSidebarLinks from "@/components/layout/showSidebarLinks.svelte";
  import ScrollArea from "@/components/ui/scroll-area/scroll-area.svelte";
  import ScrollAreaScrollbar from "@/components/ui/scroll-area/scroll-area-scrollbar.svelte";
</script>

<section>
  <aside
    class={cn(
      "md:fixed md:left-1 md:h-[calc(100vh-4.5rem)]",
      "overflow-x-hidden",
      "w-54",
      "hidden flex-col space-y-3 md:flex",
      "bg-neutral-100 dark:bg-neutral-950",
    )}
  >
    <nav class="flex flex-col space-y-0.5 px-2">
      <ShowSidebarLinks />
    </nav>
    <div class="px-2">
      <Separator orientation="horizontal" />
    </div>
    <nav class="relative flex h-auto flex-col space-y-0.5 overflow-hidden">
      <ScrollArea
        maskClassName="before:from-neutral-100 after:from-neutral-100 dark:before:from-neutral-950 dark:after:from-neutral-950"
        class="flex size-full flex-col gap-y-0.5 overflow-hidden px-2"
      >
        <ShowCategories />
        <ScrollAreaScrollbar orientation="vertical" />
      </ScrollArea>
    </nav>
  </aside>
  <main class={cn("px-2 md:mr-4 md:ml-56 md:px-0", "overflow-hidden")}>
    <slot />
  </main>
</section>

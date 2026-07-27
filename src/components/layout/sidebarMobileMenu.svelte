<script lang="ts">
  import { cn } from "@/utils/cn";

  import * as Sheet from "@/components/ui/sheet";
  import { buttonVariants } from "@/components/ui/button";
  import Separator from "@/components/ui/separator/separator.svelte";

  import MenuIcon from "@lucide/svelte/icons/menu";
  import Svgl from "@/components/logos/svgl.svelte";

  import ShowCategories from "@/components/layout/showCategories.svelte";
  import ShowSidebarLinks from "@/components/layout/showSidebarLinks.svelte";
  import ScrollArea from "@/components/ui/scroll-area/scroll-area.svelte";

  interface Props {
    className?: string;
  }

  let { className }: Props = $props();
</script>

<Sheet.Root>
  <Sheet.Trigger
    title="Open SVGL Menu"
    class={cn(buttonVariants({ variant: "ghost", size: "icon" }), className)}
  >
    <MenuIcon class="size-5" />
    <span class="sr-only">Open Menu</span>
  </Sheet.Trigger>
  <Sheet.Content class="gap-0.5" side="left">
    <Sheet.Header>
      <Sheet.Title class="flex items-center space-x-2">
        <Svgl size={28} />
        <h2 class="text-xl font-medium tracking-tight">svgl</h2>
      </Sheet.Title>
    </Sheet.Header>
    <ScrollArea
      class="flex size-full flex-col"
      viewportClassName="pb-3 px-3 space-y-0.5"
      maskClassName="before:from-white after:from-white dark:before:from-neutral-900 dark:after:from-neutral-900"
    >
      <ShowSidebarLinks />
      <Separator orientation="horizontal" class="my-3" />
      <ShowCategories />
    </ScrollArea>
  </Sheet.Content>
</Sheet.Root>

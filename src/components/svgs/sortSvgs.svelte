<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  import { cn } from "@/utils/cn";
  import { buttonVariants } from "@/components/ui/button";
  import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
  import ArrowDownUpIcon from "@lucide/svelte/icons/arrow-down-up";

  interface Props {
    className?: string;
    isSorted: boolean;
    onSortedChange: (isSorted: boolean) => void;
  }

  let { className, isSorted, onSortedChange }: Props = $props();
  let sorted = $state<boolean>(isSorted);

  const sort = () => {
    const newSorted = !sorted;
    sorted = newSorted;

    const params = new SvelteURLSearchParams(page.url.searchParams);
    if (newSorted) {
      params.set("sort", "alphabetical");
    } else {
      params.delete("sort");
    }

    goto(`?${params.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });

    onSortedChange(sorted);
  };
</script>

<button
  class={cn(buttonVariants({ variant: "ghost", class: "px-2.5" }), className)}
  onclick={() => sort()}
>
  {#if sorted}
    <ArrowDownUpIcon size={16} strokeWidth={2} />
  {:else}
    <ArrowUpDownIcon size={16} strokeWidth={2} />
  {/if}
  <span>{sorted ? "Sort by latest" : "Sort A-Z"}</span>
</button>

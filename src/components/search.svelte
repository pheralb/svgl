<script lang="ts">
  import { cn } from "@/utils/cn";
  import { onMount } from "svelte";

  import { addParams } from "@/utils/searchParams";
  import SearchIcon from "@lucide/svelte/icons/search";
  import CommandIcon from "@lucide/svelte/icons/command";

  interface Props {
    searchValue: string;
    onSearch: (value: string) => void;
    placeholder?: string;
    iconSize?: number;
    inputClass?: string;
  }

  let { searchValue, onSearch, placeholder, iconSize, inputClass }: Props =
    $props();
  let inputElement: HTMLInputElement;

  const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    onSearch(value);
    addParams({
      params: {
        search: value,
      },
    });
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      inputElement?.focus();
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div class="relative">
  <SearchIcon
    size={iconSize ? iconSize : 20}
    strokeWidth={2}
    class={cn(
      "pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 transition-colors",
      searchValue
        ? "text-black dark:text-white"
        : "text-neutral-400 dark:text-neutral-500",
    )}
  />
  <input
    bind:this={inputElement}
    type="search"
    autocomplete="off"
    placeholder={placeholder || "Search..."}
    oninput={onInput}
    name="search"
    value={searchValue}
    class={cn(
      "overflow-hidden shadow-sm",
      "w-full py-1.5 pr-3 pl-10",
      "text-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-400",
      "bg-white dark:bg-neutral-900",
      "rounded-md border border-neutral-200 dark:border-neutral-800",
      "focus:border-neutral-400 focus:outline-none dark:focus:border-neutral-600",
      inputClass,
    )}
  />
  {#if !searchValue}
    <div
      class="absolute top-1/2 right-2 flex -translate-y-1/2 items-center space-x-1.5 rounded-md p-1 text-sm text-neutral-400 transition-colors hover:text-neutral-600"
    >
      <CommandIcon size={16} strokeWidth={1.5} />
      <span class="select-none">K</span>
    </div>
  {/if}
</div>

<script lang="ts">
  import { cn } from "@/utils/cn";
  import Button from "@/components/ui/button/button.svelte";
  import CheckIcon from "@lucide/svelte/icons/check";
  import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";

  import { warningStore, acceptWarning } from "@/stores/warning.store";
</script>

{#if !$warningStore}
  <div
    class={cn(
      "flex w-full flex-col items-center justify-between space-y-2 px-3 py-4 text-sm md:flex-row md:space-y-0 md:space-x-2 md:py-2",
      "bg-white dark:bg-neutral-900",
      "border-b border-neutral-200 dark:border-neutral-800",
    )}
  >
    <div class="flex flex-col items-center gap-2 md:flex-row">
      <AlertTriangleIcon
        size={18}
        strokeWidth={2}
        class="flex-shrink-0 animate-pulse text-yellow-600 dark:text-yellow-500"
      />
      <p>
        Each SVG includes a link to its respective product. Permission must be
        obtained before using a logo. For removal requests,
        <a
          href="https://github.com/pheralb/svgl/issues/new"
          target="_blank"
          class="underline decoration-neutral-500 underline-offset-4"
        >
          please open an issue on GitHub
        </a>.
      </p>
    </div>
    <Button size="sm" onclick={acceptWarning}>
      <CheckIcon size={14} strokeWidth={2} />
      <span>Accept</span>
    </Button>
  </div>
{/if}

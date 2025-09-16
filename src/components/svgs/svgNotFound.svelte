<script lang="ts">
  import { globals } from "@/globals";

  import { buttonVariants } from "@/components/ui/button";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import BoxesIcon from "@/components/ui/moving-icons/boxes-icon.svelte";

  interface Props {
    svgTitle: string;
  }

  let { svgTitle }: Props = $props();
</script>

<div class="flex w-full flex-col items-center justify-center space-y-4">
  <BoxesIcon size={48} strokeWidth={1} />
  <p>"{svgTitle}" not found</p>
  <div class="flex items-center justify-center space-x-2">
    <a
      target="_blank"
      href={globals.requestSvgUrl}
      class={buttonVariants({ variant: "outline" })}
    >
      <span>Request SVG</span>
      <ArrowUpRight size={14} strokeWidth={1.5} />
    </a>
    <a
      target="_blank"
      href={globals.submitUrl}
      class={buttonVariants({ variant: "outline" })}
    >
      <span>Submit SVG</span>
      <ArrowUpRight size={14} strokeWidth={1.5} />
    </a>
  </div>
</div>

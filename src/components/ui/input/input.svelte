<script lang="ts">
  import type {
    HTMLInputAttributes,
    HTMLInputTypeAttribute,
  } from "svelte/elements";
  import type { WithElementRef } from "@/types/components";

  import { cn } from "@/utils/cn";
  import { inputStyles } from "./input.styles";

  type InputType = Exclude<HTMLInputTypeAttribute, "file">;

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, "type"> &
      (
        | { type: "file"; files?: FileList }
        | { type?: InputType; files?: undefined }
      )
  >;

  let {
    ref = $bindable(null),
    value = $bindable(),
    type,
    files = $bindable(),
    class: className,
    ...restProps
  }: Props = $props();
</script>

<input
  bind:this={ref}
  data-slot="input"
  class={cn(inputStyles, className)}
  {type}
  bind:value
  {...restProps}
/>

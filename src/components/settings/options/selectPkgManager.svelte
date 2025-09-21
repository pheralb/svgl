<script lang="ts">
  import type { Component } from "svelte";
  import * as Select from "@/components/ui/select";
  import { buttonVariants } from "@/components/ui/button";

  import { settingsStore, type PackageManager } from "@/stores/settings.store";

  import Npm from "@/components/logos/npm.svelte";
  import Pnpm from "@/components/logos/pnpm.svelte";
  import Yarn from "@/components/logos/yarn.svelte";
  import Bun from "@/components/logos/bun.svelte";

  let pkg = $derived($settingsStore.packageManager);

  const managers: Record<PackageManager, { label: string; Icon: Component }> = {
    npm: { label: "npm", Icon: Npm },
    pnpm: { label: "pnpm", Icon: Pnpm },
    yarn: { label: "yarn", Icon: Yarn },
    bun: { label: "bun", Icon: Bun },
  };
</script>

<Select.Root type="single" bind:value={pkg}>
  <Select.Trigger
    class={buttonVariants({ variant: "outline", class: "justify-between" })}
  >
    {#if managers[pkg]}
      {@const { Icon, label } = managers[pkg]}
      <div class="flex items-center space-x-2.5">
        <Icon size={16} />
        <span>{label}</span>
      </div>
    {/if}
  </Select.Trigger>
  <Select.Content sideOffset={1.5}>
    {#each Object.entries(managers) as [value, { Icon, label }] (value)}
      <Select.Item
        {value}
        onclick={() => settingsStore.setPackageManager(value as PackageManager)}
      >
        <Icon size={16} />
        <span>{label}</span>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>

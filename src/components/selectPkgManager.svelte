<script lang="ts">
  import * as Select from "@/components/ui/select";
  import { pkgManager, type PackageManager } from "@/stores/pkgManager.store";

  import Npm from "@/components/logos/npm.svelte";
  import Pnpm from "@/components/logos/pnpm.svelte";
  import Yarn from "@/components/logos/yarn.svelte";
  import Bun from "@/components/logos/bun.svelte";
  import { buttonVariants } from "./ui/button";

  let pkg = $derived($pkgManager);

  const managers = {
    npm: { label: "npm", Icon: Npm },
    pnpm: { label: "pnpm", Icon: Pnpm },
    yarn: { label: "yarn", Icon: Yarn },
    bun: { label: "bun", Icon: Bun },
  };
</script>

<Select.Root type="single" bind:value={pkg}>
  <Select.Trigger class={buttonVariants({ variant: "outline", size: "sm" })}>
    {#if managers[pkg]}
      {@const { Icon, label } = managers[pkg]}
      <Icon size={14} />
      <span>{label}</span>
    {/if}
  </Select.Trigger>
  <Select.Content sideOffset={1.5}>
    {#each Object.entries(managers) as [value, { Icon, label }] (value)}
      <Select.Item
        {value}
        onclick={() => pkgManager.set(value as PackageManager)}
      >
        <Icon size={16} />
        <span>{label}</span>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>

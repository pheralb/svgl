<script lang="ts">
  import { globals } from "@/globals";

  import { buttonVariants } from "@/components/ui/button";
  import CodeBlock from "@/components/codeBlock.svelte";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";

  import { settingsStore, type PackageManager } from "@/stores/settings.store";

  import V0 from "@/components/logos/v0.svelte";
  import Shadcn from "@/components/logos/shadcn.svelte";

  interface Props {
    svgTitle: string;
  }

  let { svgTitle }: Props = $props();

  const shadcnCommands: Record<PackageManager, string> = {
    npm: "npx shadcn@latest add",
    pnpm: "pnpm dlx shadcn@latest add",
    yarn: "yarn dlx shadcn@latest add",
    bun: "bunx shadcn@latest add",
  };

  let pkg = $derived($settingsStore.packageManager);
  let shadcnCommand = $derived(shadcnCommands[pkg]);
  const svgFormatTitle = svgTitle
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
</script>

<div class="flex w-full items-center space-x-2">
  <a
    target="_blank"
    href="/docs/shadcn-ui"
    class={buttonVariants({ variant: "outline", class: "w-full" })}
  >
    <span>Setup Registry</span>
    <ArrowUpRightIcon
      size={14}
      class="text-neutral-500 dark:text-neutral-400"
    />
  </a>
  <a
    target="_blank"
    href={`${globals.v0Url}${globals.registryUrl}${svgFormatTitle}.json`}
    class={buttonVariants({ variant: "outline", class: "w-full" })}
  >
    <span>Open with</span>
    <V0 size={20} />
    <ArrowUpRightIcon
      size={14}
      class="text-neutral-500 dark:text-neutral-400"
    />
  </a>
</div>
<CodeBlock code={`${shadcnCommand} @svgl/${svgFormatTitle}`} Icon={Shadcn} />

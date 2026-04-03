<script lang="ts">
  import { buttonVariants } from "@/components/ui/button";
  import CodeBlock from "@/components/codeBlock.svelte";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";

  import ExternalLink from "@/components/ui/links/external-link.svelte";
  import { settingsStore, type PackageManager } from "@/stores/settings.store";

  interface Props {
    svgTitle: string;
  }

  let { svgTitle }: Props = $props();

  const shadcnCommands: Record<PackageManager, string> = {
    npm: "npx shadcn@latest add",
    pnpm: "pnpm dlx shadcn@latest add",
    yarn: "yarn dlx shadcn@latest add",
    bun: "bunx shadcn@latest add",
    vlt: "vlx shadcn@latest add",
  };

  let pkg = $derived($settingsStore.packageManager);
  let shadcnCommand = $derived(shadcnCommands[pkg]);
  let svgFormatTitle = $derived(
    svgTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
  );
</script>

<div class="flex items-center justify-between">
  <p class="text-sm text-neutral-700 dark:text-neutral-300">
    shadcn/ui Command
  </p>
  <ExternalLink
    href="/docs/shadcn-ui"
    className={buttonVariants({
      variant: "outline",
      size: "sm",
      class: "w-auto",
    })}
  >
    <span>Setup Registry</span>
    <ArrowUpRightIcon
      size={14}
      class="text-neutral-500 dark:text-neutral-400"
    />
  </ExternalLink>
</div>
<CodeBlock code={`${shadcnCommand} @svgl/${svgFormatTitle}`} />

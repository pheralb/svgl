<script lang="ts">
  import { buttonVariants } from "@/components/ui/button";
  import CodeBlock from "@/components/codeBlock.svelte";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";

  import { settingsStore, type PackageManager } from "@/stores/settings.store";

  import Shadcn from "@/components/logos/shadcn.svelte";
  import OpenWithV0 from "@/components/svgs/openWithV0.svelte";
  import ExternalLink from "@/components/ui/links/external-link.svelte";

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
  let svgFormatTitle = $derived(
    svgTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
  );
</script>

<div class="flex w-full items-center space-x-2">
  <ExternalLink
    href="/docs/shadcn-ui"
    className={buttonVariants({ variant: "outline", class: "w-full" })}
  >
    <span>Setup Registry</span>
    <ArrowUpRightIcon
      size={14}
      class="text-neutral-500 dark:text-neutral-400"
    />
  </ExternalLink>
  <OpenWithV0 svgTitle={svgFormatTitle} />
</div>
<CodeBlock code={`${shadcnCommand} @svgl/${svgFormatTitle}`} Icon={Shadcn} />

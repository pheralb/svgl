<script lang="ts">
  import { buttonVariants } from "@/components/ui/button";
  import Shadcn from "@/components/logos/shadcn.svelte";
  import SelectPkgManager from "@/components/selectPkgManager.svelte";

  import { pkgManager, type PackageManager } from "@/stores/pkgManager.store";
  import CodeBlock from "@/components/codeBlock.svelte";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";

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

  let pkg = $derived($pkgManager);
  let shadcnCommand = $derived(shadcnCommands[pkg]);
  const svgFormatTitle = svgTitle
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
</script>

<div class="flex items-center justify-between space-x-2">
  <a
    href="/docs/shadcn-ui"
    target="_blank"
    class={buttonVariants({ variant: "outline", size: "sm" })}
  >
    <span>Setup Registry</span>
    <ArrowUpRightIcon
      size={14}
      class="text-neutral-500 dark:text-neutral-400"
    />
  </a>
  <SelectPkgManager />
</div>
<CodeBlock code={`${shadcnCommand} @svgl/${svgFormatTitle}`} Icon={Shadcn} />

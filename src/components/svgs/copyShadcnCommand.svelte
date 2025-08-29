<script lang="ts">
  import { clipboard } from "@/utils/clipboard";

  import CopyIcon from "@lucide/svelte/icons/copy";
  import { Button } from "@/components/ui/button";
  import SelectPkgManager from "@/components/selectPkgManager.svelte";
  import { pkgManager, type PackageManager } from "@/stores/pkgManager.store";
  import Shadcn from "../logos/shadcn.svelte";

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

  const handleCopy = () => {
    clipboard(`${shadcnCommand} @svgl/${svgFormatTitle}`);
  };
</script>

<div class="flex items-center justify-between space-x-2">
  <SelectPkgManager />
  <Button variant="outline" onclick={handleCopy} size="sm">
    <CopyIcon size={14} />
    <span>Copy</span>
  </Button>
</div>
<div
  class="flex items-center space-x-2 rounded-md border border-neutral-200 p-2.5 dark:border-neutral-800"
>
  <Shadcn size={14} />
  <code class="font-mono text-sm select-all">
    {shadcnCommand} @svgl/{svgFormatTitle}
  </code>
</div>

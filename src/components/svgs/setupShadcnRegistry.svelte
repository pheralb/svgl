<script lang="ts">
  import type { Snippet } from "svelte";
  import * as Dialog from "@/components/ui/dialog";
  import CodeBlock from "@/components/codeBlock.svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let registryCode = `
  "registries": {
    "@svgl": "https://svgl.app/r/{name}.json"
  }
`;
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {@render children?.()}
  </Dialog.Trigger>
  <Dialog.Content class="text-sm">
    <Dialog.Header>
      <Dialog.Title>Setup shadcn/ui registry</Dialog.Title>
      <Dialog.Description>
        Use the code below to configure the @svgl registry for your project.
      </Dialog.Description>
    </Dialog.Header>
    <p>
      1. Copy and paste the code into
      <span class="font-mono">components.json</span>:
    </p>
    <CodeBlock code={registryCode} />
    <p class="mt-2">2. Then use the following command to add SVGs:</p>
    <CodeBlock code={`npx shadcn@latest add @svgl/[svg-name]`} />
  </Dialog.Content>
</Dialog.Root>

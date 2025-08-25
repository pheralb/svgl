<script lang="ts">
  import { cn } from "@/utils/cn";
  import { globals } from "@/globals";
  import { mode } from "mode-watcher";
  import ModeToggle from "@/components/modeToggle.svelte";

  import Svgl from "@/components/logos/svgl.svelte";
  import Github from "@/components/logos/github.svelte";
  import Twitter from "@/components/logos/twitter.svelte";

  import Badge from "@/components/ui/badge/badge.svelte";
  import { buttonVariants } from "@/components/ui/button";
  import SendIcon from "@/components/ui/moving-icons/send-icon.svelte";

  const headerItemsClasses = cn(
    buttonVariants({ variant: "ghost" }),
    "hover:bg-neutral-200 dark:hover:bg-neutral-800",
  );
</script>

<header
  class="sticky top-0 w-full bg-neutral-100 px-4 py-4 dark:bg-neutral-950"
>
  <nav class="flex w-full items-center justify-between">
    <div class="flex items-center space-x-3">
      <a
        href="/"
        class="flex items-center space-x-2.5 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
      >
        <Svgl size={28} />
        <h2 class="font-onest text-xl font-medium tracking-tight">svgl</h2>
      </a>
      <Badge variant="outline">{globals.currentVersion}</Badge>
    </div>
    <div class="flex items-center">
      <div
        class="mr-4 flex items-center space-x-0.5 border-r border-neutral-300 pr-3 dark:border-neutral-800"
      >
        <a
          target="_blank"
          title="X/Twitter"
          href={globals.twitterUrl}
          class={cn(headerItemsClasses, "h-9 w-9")}
        >
          <Twitter size={18} />
        </a>
        <a
          target="_blank"
          title="GitHub Repository"
          href={globals.githubUrl}
          class={cn(headerItemsClasses, "h-9 w-9")}
        >
          <Github size={20} />
        </a>
        <ModeToggle className={cn(headerItemsClasses, "h-9 w-9")} />
      </div>
      <a
        target="_blank"
        href={globals.submitUrl}
        class={cn(
          buttonVariants({
            variant: mode.current === "dark" ? "default" : "radial",
          }),
        )}
      >
        <SendIcon size={14} />
        <span>Submit</span>
      </a>
    </div>
  </nav>
</header>

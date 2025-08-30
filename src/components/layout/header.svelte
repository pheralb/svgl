<script lang="ts">
  import { cn } from "@/utils/cn";
  import { globals } from "@/globals";
  import { mode } from "mode-watcher";
  import ModeToggle from "@/components/modeToggle.svelte";

  import Svgl from "@/components/logos/svgl.svelte";
  import Github from "@/components/logos/github.svelte";
  import Twitter from "@/components/logos/twitter.svelte";

  import { Separator } from "@/components/ui/separator";
  import { buttonVariants } from "@/components/ui/button";
  import SvglVersion from "@/components/svglVersion.svelte";
  import SendIcon from "@/components/ui/moving-icons/send-icon.svelte";

  interface HeaderProps {
    githubStars: number;
  }

  let { githubStars }: HeaderProps = $props();

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
      <SvglVersion />
    </div>
    <div class="flex h-8 items-center">
      <div class="flex items-center space-x-0.5">
        <a
          target="_blank"
          title="X/Twitter"
          href={globals.twitterUrl}
          class={cn(headerItemsClasses, "h-9 w-9")}
        >
          <Twitter size={18} />
        </a>
        <ModeToggle className={cn(headerItemsClasses, "h-9 w-9")} />
      </div>
      <Separator orientation="vertical" class="mx-2 h-8" />
      <a
        target="_blank"
        title="GitHub Repository"
        href={globals.githubUrl}
        class={cn(headerItemsClasses, "h-9 w-fit")}
      >
        <Github size={20} />
        <span class="text-neutral-600 dark:text-neutral-400">
          {githubStars >= 1000
            ? `${(githubStars / 1000).toFixed(1)}k`
            : githubStars.toLocaleString()}
        </span>
      </a>
      <Separator orientation="vertical" class="mr-3 ml-2" />
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

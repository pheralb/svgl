<script lang="ts">
  import { cn } from "@/utils/cn";
  import { globals } from "@/globals";
  import { mode } from "mode-watcher";

  import ModeToggle from "@/components/modeToggle.svelte";
  import GithubLink from "@/components/githubLink.svelte";
  import Twitter from "@/components/logos/twitter.svelte";
  import HomeLink from "@/components/layout/homeLink.svelte";
  import SettingsMenu from "@/components/settings/settingsMenu.svelte";
  import SidebarMobileMenu from "@/components/layout/sidebarMobileMenu.svelte";

  import { Separator } from "@/components/ui/separator";
  import { buttonVariants } from "@/components/ui/button";
  import SendIcon from "@/components/ui/moving-icons/send-icon.svelte";
  import ExternalLink from "@/components/ui/links/external-link.svelte";
</script>

<header
  class="sticky top-0 z-50 w-full bg-neutral-100 px-2 py-3 md:px-4 md:py-4 dark:bg-neutral-950"
>
  <nav class="flex w-full items-center justify-between">
    <div class="flex items-center space-x-2">
      <SidebarMobileMenu className="md:hidden" />
      <HomeLink />
    </div>
    <div class="flex h-5 items-center space-x-2.5">
      <div class="flex items-center space-x-1.5">
        <ExternalLink
          title="X/Twitter"
          href={globals.twitterUrl}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "hover:bg-neutral-200 dark:hover:bg-neutral-800",
          )}
        >
          <Twitter size={18} />
        </ExternalLink>
        <ModeToggle
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "hover:bg-neutral-200 dark:hover:bg-neutral-800",
          )}
        />
        <SettingsMenu />
      </div>
      <div class="hidden h-5 items-center space-x-2 md:flex">
        <Separator orientation="vertical" />
        <GithubLink />
        <Separator orientation="vertical" />
        <ExternalLink
          href={globals.submitUrl}
          className={cn(
            buttonVariants({
              variant: mode.current === "dark" ? "default" : "radial",
            }),
          )}
        >
          <SendIcon size={14} />
          <span>Submit</span>
        </ExternalLink>
      </div>
    </div>
  </nav>
</header>

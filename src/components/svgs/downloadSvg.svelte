<script lang="ts">
  import type { iSVG } from "@/types/svg";

  import { toast } from "svelte-sonner";
  import DownloadIcon from "@lucide/svelte/icons/download";

  // Utils:
  import { cn } from "@/utils/cn";
  import { downloadAllVariants, downloadSvg } from "@/utils/downloadSvg";

  // Components:
  import * as Dialog from "@/components/ui/dialog";
  import { Button, buttonVariants } from "@/components/ui/button";

  // Props:
  interface Props {
    svgInfo: iSVG;
    isDarkTheme: () => boolean;
  }
  let { svgInfo, isDarkTheme }: Props = $props();

  // Shared:
  let iconSize = 16;
  let iconStroke = 2;
  let cardDownloadStyles =
    "flex w-full h-full flex-col p-4 rounded-md shadow-sm dark:bg-neutral-800/20 bg-neutral-200/10 border border-neutral-200 dark:border-neutral-800 space-y-2";

  // Functions:
  const handleDownloadSvg = async (url?: string) => {
    const result = await downloadSvg({
      url: url!,
    });

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(" - ")
      : svgInfo.category;

    if (result) {
      toast.success(`Downloading...`, {
        description: `${svgInfo.title} - ${category}`,
      });
    } else {
      toast.error(`Error downloading SVG`, {
        description: `${svgInfo.title} - ${category}`,
      });
    }
  };

  const handleDownloadAllVariants = async ({
    lightRoute,
    darkRoute,
    isWordmark,
  }: {
    lightRoute: string;
    darkRoute: string;
    isWordmark?: boolean;
  }) => {
    const result = await downloadAllVariants({
      svgInfo,
      lightRoute,
      darkRoute,
      isWordmark,
    });

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(" - ")
      : svgInfo.category;

    if (result) {
      toast.success("Downloading light & dark variants...", {
        description: isWordmark
          ? `${svgInfo.title} - Wordmark - ${category}`
          : `${svgInfo.title} - ${category}`,
      });
    } else {
      toast.error(`Error downloading SVG`, {
        description: `${svgInfo.title} - ${category}`,
      });
    }
  };
</script>

{#if typeof svgInfo.route === "string" && svgInfo.wordmark === undefined}
  <Button
    title="Download Light & Dark variants"
    variant="ghost"
    size="icon"
    onclick={() => {
      if (typeof svgInfo.route === "string") {
        handleDownloadSvg(svgInfo.route);
        return;
      }
    }}
  >
    <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
  </Button>
{:else}
  <Dialog.Root>
    <Dialog.Trigger
      title="Download SVG"
      class={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
    >
      <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
    </Dialog.Trigger>
    <Dialog.Content class="max-w-[630px]">
      <Dialog.Header>
        <Dialog.Title>Download {svgInfo.title} SVG</Dialog.Title>
        <Dialog.Description>
          This logo has multiple options to download:
        </Dialog.Description>
      </Dialog.Header>
      <div
        class={cn(
          "flex h-full flex-col space-y-2 pt-4 pb-0.5",
          "md:flex-row md:items-center md:justify-center md:space-y-0 md:space-x-2",
        )}
      >
        {#if typeof svgInfo.route === "string"}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.route : svgInfo.route}
              alt={svgInfo.title}
              class="my-4 h-8"
            />
            <Button
              title="Download logo"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.route === "string") {
                  handleDownloadSvg(svgInfo.route);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Icon logo</p>
            </Button>
          </div>
        {:else}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.route.dark : svgInfo.route.light}
              alt={svgInfo.title}
              class="my-4 h-10"
            />
            <Button
              title="Logo with light & dark variants"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.route !== "string") {
                  handleDownloadAllVariants({
                    lightRoute: svgInfo.route.light,
                    darkRoute: svgInfo.route.dark,
                  });
                }
              }}
            >
              <DownloadIcon size={iconSize} />
              <p>Light & dark variants</p>
            </Button>

            <Button
              title="Download light variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.route !== "string") {
                  handleDownloadSvg(svgInfo.route.light);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Only light variant</p>
            </Button>

            <Button
              title="Download dark variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.route !== "string") {
                  handleDownloadSvg(svgInfo.route.dark);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Only dark variant</p>
            </Button>
          </div>
        {/if}

        {#if typeof svgInfo.wordmark === "string" && svgInfo.wordmark !== undefined}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.wordmark : svgInfo.wordmark}
              alt={svgInfo.title}
              class="my-4 h-8"
            />
            <Button
              title="Download Wordmark logo"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.wordmark === "string") {
                  handleDownloadSvg(svgInfo.wordmark);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Wordmark logo</p>
            </Button>
          </div>
        {/if}

        {#if typeof svgInfo.wordmark !== "string" && svgInfo.wordmark !== undefined}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme()
                ? svgInfo.wordmark.dark
                : svgInfo.wordmark.light}
              alt={svgInfo.title}
              class="my-4 h-10"
            />
            <Button
              title="Download Wordmark light variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.wordmark !== "string") {
                  handleDownloadAllVariants({
                    lightRoute: svgInfo.wordmark?.light || "",
                    darkRoute: svgInfo.wordmark?.dark || "",
                    isWordmark: true,
                  });
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Light & dark variants</p>
            </Button>

            <Button
              title="Download Wordmark light variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.wordmark !== "string") {
                  handleDownloadSvg(svgInfo.wordmark?.light);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Wordmark light variant</p>
            </Button>

            <Button
              title="Download Wordmark dark variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.wordmark !== "string") {
                  handleDownloadSvg(svgInfo.wordmark?.dark);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Wordmark dark variant</p>
            </Button>
          </div>
        {/if}
      </div>
      <Dialog.Footer
        class="mt-3 text-xs text-neutral-600 dark:text-neutral-400"
      >
        <p>
          Remember to request permission from the creators for the use of the
          SVG. Modification is not allowed.
        </p>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{/if}

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
    "flex w-full h-full flex-col p-4 rounded-md shadow-sm dark:bg-neutral-800/20 bg-neutral-200/10 border border-neutral-200 dark:border-neutral-800 space-y-1.5";
  let imgStyles = "my-7 h-10 select-none pointer-events-none";
  let badgeButtonStyles =
    "font-mono text-neutral-600 dark:text-neutral-400 text-xs";

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
    class="hover:bg-neutral-200"
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
      class={cn(
        buttonVariants({
          size: "icon",
          variant: "ghost",
          class: "hover:bg-neutral-200",
        }),
      )}
    >
      <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Download {svgInfo.title} SVGs</Dialog.Title>
        <Dialog.Description>
          This logo has multiple options to download:
        </Dialog.Description>
      </Dialog.Header>
      <div class={cn("flex flex-col gap-4 md:flex-row")}>
        {#if typeof svgInfo.route === "string"}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.route : svgInfo.route}
              alt={svgInfo.title}
              class={imgStyles}
            />
            <Button
              class="justify-between"
              title="Download logo"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.route === "string") {
                  handleDownloadSvg(svgInfo.route);
                  return;
                }
              }}
            >
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Icon logo</p>
              </div>
              <span class={badgeButtonStyles}>.svg</span>
            </Button>
          </div>
        {:else}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.route.dark : svgInfo.route.light}
              alt={svgInfo.title}
              class={imgStyles}
            />
            <Button
              class="justify-between"
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
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Light & dark variants</p>
              </div>
              <span class={badgeButtonStyles}>.zip</span>
            </Button>

            <Button
              class="justify-between"
              title="Download light variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.route !== "string") {
                  handleDownloadSvg(svgInfo.route.light);
                  return;
                }
              }}
            >
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Only light variant</p>
              </div>
              <span class={badgeButtonStyles}>.svg</span>
            </Button>

            <Button
              class="justify-between"
              title="Download dark variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.route !== "string") {
                  handleDownloadSvg(svgInfo.route.dark);
                  return;
                }
              }}
            >
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Only dark variant</p>
              </div>
              <span class={badgeButtonStyles}>.svg</span>
            </Button>
          </div>
        {/if}

        {#if typeof svgInfo.wordmark === "string" && svgInfo.wordmark !== undefined}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.wordmark : svgInfo.wordmark}
              alt={svgInfo.title}
              class={imgStyles}
            />
            <Button
              class="justify-between"
              title="Download Wordmark logo"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.wordmark === "string") {
                  handleDownloadSvg(svgInfo.wordmark);
                  return;
                }
              }}
            >
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Wordmark logo</p>
              </div>
              <span class={badgeButtonStyles}>.svg</span>
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
              class={imgStyles}
            />
            <Button
              class="justify-between"
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
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Light & dark variants</p>
              </div>
              <span class={badgeButtonStyles}>.zip</span>
            </Button>

            <Button
              class="justify-between"
              title="Download Wordmark light variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.wordmark !== "string") {
                  handleDownloadSvg(svgInfo.wordmark?.light);
                  return;
                }
              }}
            >
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Wordmark light variant</p>
              </div>
              <span class={badgeButtonStyles}>.svg</span>
            </Button>

            <Button
              class="justify-between"
              title="Download Wordmark dark variant"
              variant="outline"
              onclick={() => {
                if (typeof svgInfo.wordmark !== "string") {
                  handleDownloadSvg(svgInfo.wordmark?.dark);
                  return;
                }
              }}
            >
              <div class="flex items-center space-x-2">
                <DownloadIcon size={iconSize} />
                <p>Wordmark dark variant</p>
              </div>
              <span class={badgeButtonStyles}>.svg</span>
            </Button>
          </div>
        {/if}
      </div>
      <Dialog.Footer>
        <div
          class="mt-2 flex w-full items-center justify-center text-sm text-neutral-600 dark:text-neutral-400"
        >
          <p class="w-full text-center text-sm">
            Please ensure you have permission from the creators before using the
            SVG. Modifications are not permitted.
          </p>
        </div>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{/if}

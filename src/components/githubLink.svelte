<script lang="ts">
  import { onMount } from "svelte";

  import { cn } from "@/utils/cn";
  import { globals } from "@/globals";
  import { buttonVariants } from "@/components/ui/button";
  import Github from "@/components/logos/github.svelte";

  async function getGithubStarCount() {
    try {
      const res = await fetch(globals.apiGithub.url);
      const data = await res.json();
      return data.repo?.stars ?? globals.apiGithub.fallback;
    } catch (error) {
      console.error(error);
      return globals.apiGithub.fallback;
    }
  }

  let stars = $state(globals.apiGithub.fallback);

  onMount(async () => {
    stars = await getGithubStarCount();
  });
</script>

<a
  target="_blank"
  title="pheralb/svgl Repository"
  href={globals.githubUrl}
  class={cn(
    buttonVariants({ variant: "ghost" }),
    "w-fit hover:bg-neutral-200 dark:hover:bg-neutral-800",
  )}
>
  <Github size={20} />
  <span class="text-neutral-600 dark:text-neutral-400">
    {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
  </span>
</a>

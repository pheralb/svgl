<script lang="ts">
  import download from 'downloadjs';
  import toast from 'svelte-french-toast';

  // Get all svgs:
  import svgData from '../data/svgs.json';
  const allSvgs = JSON.parse(JSON.stringify(svgData));

  // Icons:
  import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
  import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
  import Copy from 'phosphor-svelte/lib/Copy';
  import type { iSVG } from '../types/svg';

  // Download SVG:
  const downloadSvg = (url?: string) => {
    download(url || '');
    toast('Downloading', {
      icon: '🎉',
      style: 'border-radius: 200px; background: #333; color: #fff;'
    });
  };

  // Get SVG content:
  const MIMETYPE = 'text/plain';
  const getSvgContent = async (url: string | undefined, isSupported: boolean) => {
    const response = await fetch(url || '');
    const content = await response.text();
    const blob = new Blob([content], { type: MIMETYPE });
    return isSupported ? blob : content;
  };

  // Copy SVG to clipboard:
  const copyToClipboard = async (url?: string) => {
    const data = {
      [MIMETYPE]: getSvgContent(url, true)
    };
    try {
      const clipboardItem = new ClipboardItem(data);
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      // This section works as a fallback on Firefox
      const content = (await getSvgContent(url, false)) as string;
      await navigator.clipboard.writeText(content);
    }
    toast('Copied to clipboard', {
      icon: '👏',
      style: 'border-radius: 200px; background: #333; color: #fff;'
    });
  };

  // Search:
  let search = '';
  let filteredSvgs: iSVG[] = [];

  if (search.length === 0) {
    filteredSvgs = allSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id - a.id;
    });
  }

  const searchSvgs = () => {
    return (filteredSvgs = allSvgs.filter((svg: iSVG) => {
      let svgTitle = svg.title.toLowerCase();
      return svgTitle.includes(search.toLowerCase());
    }));
  };
</script>

<div class="container mx-auto pt-4">
  <input
    type="text"
    bind:value={search}
    on:input={searchSvgs}
    placeholder="Search..."
    class="w-full rounded-md border border-neutral-800 bg-neutral-700/10 p-3 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700"
  />
  <div class="mt-4 grid grid-cols-6 gap-4">
    {#each filteredSvgs as svg}
      <div
        class="flex flex-col items-center justify-center rounded-md border border-neutral-800 bg-neutral-700/10 p-4"
      >
        <img src={svg.route} alt={svg.title} class="mb-4 mt-2 h-10" />
        <div class="mb-3 flex flex-col items-center justify-center">
          <p class="truncate text-[15px] font-medium">{svg.title}</p>
          <span class="text-sm lowercase text-neutral-500">{svg.category}</span>
        </div>
        <div class="flex items-center space-x-1">
          <button
            title="Copy to clipboard"
            on:click={() => {
              copyToClipboard(svg.route);
            }}
            class="flex items-center space-x-2 rounded-md p-2 transition-all duration-100 hover:bg-neutral-700/40"
          >
            <Copy size={17} />
          </button>
          <button
            title="Download"
            on:click={() => {
              downloadSvg(svg.route);
            }}
            class="flex items-center space-x-2 rounded-md p-2 transition-all duration-100 hover:bg-neutral-700/40"
          >
            <DownloadSimple size={17} />
          </button>
          <a
            href={svg.url}
            title="Website"
            target="_blank"
            class="flex items-center space-x-2 rounded-md p-2 transition-all duration-100 hover:bg-neutral-700/40"
          >
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>

<script lang="ts">
  let div: HTMLDivElement;
  let focused = false;
  let position = { x: 0, y: 0 };
  let opacity = 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!div || focused) return;

    const rect = div.getBoundingClientRect();

    position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleFocus = () => {
    focused = true;
    opacity = 1;
  };

  const handleBlur = () => {
    focused = false;
    opacity = 0;
  };

  const handleMouseEnter = () => {
    opacity = 1;
  };

  const handleMouseLeave = () => {
    opacity = 0;
  };
</script>

<div
  aria-hidden="true"
  bind:this={div}
  on:mousemove={handleMouseMove}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="relative flex items-center justify-center overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
>
  <div
    class="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
    style={`
			opacity: ${opacity};
			background: radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(97, 97, 97, 0.1), transparent 40%);
		`}
  />
  <slot />
</div>

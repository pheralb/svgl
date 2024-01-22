<script lang="ts">
  let domElement: HTMLElement;
  let focused = false;
  let position = { x: 0, y: 0 };
  let opacity = 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!domElement || focused) return;

    const rect = domElement.getBoundingClientRect();

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

<!--Se quito el aria-hidden="true" para que se pueda leer el contenido del card con el lector de pantalla  -->
<article
  bind:this={domElement}
  on:mousemove={handleMouseMove}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="relative flex items-center justify-center overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
>
  <div
    class="pointer-events-none absolute transform-gpu -inset-px opacity-0 transition duration-300"
    style={`
			opacity: ${opacity};
			background: radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(97, 97, 97, 0.1), transparent 40%);
		`}
  />
  <slot />
</article>

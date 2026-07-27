<script>
  /**
   * @typedef {Object} Props
   * @property {string} [color]
   * @property {number} [size]
   * @property {number} [strokeWidth]
   * @property {boolean} [isHovered]
   * @property {string} [class]
   */

  /** @type {Props} */
  let {
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    isHovered = false,
    class: className = "",
  } = $props();

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div
  class={className}
  aria-label="boxes"
  role="img"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style="overflow: visible"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z m4.03 3.58 -4.74 -2.85 m4.74 2.85 5-3 m-5 3v5.17"
      class="box-path"
      class:animate={isHovered}
      data-transform="translate(-1.5px, 1.5px)"
    />
    <path
      d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z m5 3-5-3 m5 3 4.74-2.85 M17 16.5v5.17"
      class="box-path"
      class:animate={isHovered}
      data-transform="translate(1.5px, 1.5px)"
    />
    <path
      d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z M12 8 7.26 5.15 m4.74 2.85 4.74-2.85 M12 13.5V8"
      class="box-path"
      class:animate={isHovered}
      data-transform="translate(0px, -1.5px)"
    />
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }
  .box-path {
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translate(0px, 0px);
  }

  .box-path.animate {
    transform: translate(var(--transform-x, 0px), var(--transform-y, 0px));
  }

  .box-path[data-transform="translate(-1.5px, 1.5px)"].animate {
    --transform-x: -1.5px;
    --transform-y: 1.5px;
  }

  .box-path[data-transform="translate(1.5px, 1.5px)"].animate {
    --transform-x: 1.5px;
    --transform-y: 1.5px;
  }

  .box-path[data-transform="translate(0px, -1.5px)"].animate {
    --transform-x: 0px;
    --transform-y: -1.5px;
  }
</style>

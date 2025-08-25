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
    setTimeout(() => {
      isHovered = false;
    }, 1200);
  }
</script>

<div
  class={className}
  aria-label="heart"
  role="img"
  onmouseenter={handleMouseEnter}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class="heart-icon"
    class:animate={isHovered}
  >
    <path
      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      class="heart-path"
    />
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }
  .heart-icon {
    overflow: visible;
  }

  .heart-path {
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  .heart-icon.animate .heart-path {
    animation: heartBeat 1.2s ease-in-out;
  }

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }
    16.67% {
      transform: scale(1.1);
    }
    33.33% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    66.67% {
      transform: scale(1);
    }
    83.33% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

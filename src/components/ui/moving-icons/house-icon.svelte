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
    }, 800);
  }
</script>

<div
  class={className}
  aria-label="house"
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
    class="house-icon"
    class:animate={isHovered}
  >
    <path
      d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    />
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" class="door" />
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }
  .house-icon {
    overflow: visible;
  }

  .door {
    stroke-dasharray: 22;
    stroke-dashoffset: 0;
    transition:
      stroke-dashoffset 0.3s ease,
      opacity 0.3s ease;
  }

  .house-icon.animate .door {
    animation: doorAnimation 0.6s ease-out forwards;
  }

  @keyframes doorAnimation {
    0% {
      stroke-dashoffset: 22;
      opacity: 0;
    }
    15% {
      stroke-dashoffset: 22;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
</style>

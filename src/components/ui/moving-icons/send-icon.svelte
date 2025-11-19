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
    if (isHovered) return;
    isHovered = true;

    setTimeout(() => {
      isHovered = false;
    }, 1200);
  }
</script>

<div
  class={className}
  aria-label="send"
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
    class="send-icon"
  >
    <g class:animate-group={isHovered}>
      <path
        d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
        class="path1"
      />
      <path d="m21.854 2.147-10.94 10.939" class="path2" />
    </g>
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }
  .send-icon {
    overflow: hidden;
  }

  .animate-group {
    transform-origin: center;
    animation: sendAnimation 1.2s ease-in-out;
  }

  @keyframes sendAnimation {
    0% {
      transform: scale(1) translateX(0) translateY(0);
    }
    25% {
      transform: scale(0.8) translateX(-10%) translateY(10%);
    }
    50% {
      transform: scale(1) translateX(100%) translateY(-100%);
    }
    50.1% {
      transform: scale(1) translateX(-125%) translateY(125%);
    }
    100% {
      transform: scale(1) translateX(0) translateY(0);
    }
  }
</style>

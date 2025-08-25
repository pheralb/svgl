<script lang="ts">
  import type { IconProps } from "@/types/icon";

  let props: IconProps = $props();
</script>

<svg
  width={props.size}
  height={props.size}
  name="SVGL Logo"
  viewBox="0 0 512 512"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class={props.className}
>
  <rect
    id="svgl__r4"
    width="512"
    height="512"
    x="0"
    y="0"
    rx="128"
    fill="#222"
    stroke="#FFFFFF"
    stroke-width="0"
    stroke-opacity="100%"
    paint-order="stroke"
  /><rect
    width="512"
    height="512"
    x="0"
    y="0"
    fill="url(#svgl__r6)"
    rx="128"
    style="mix-blend-mode: overlay;"
  /><clipPath id="svgl__clip"><use xlink:href="#svgl__r4" /></clipPath><defs
    ><linearGradient
      id="svgl__r5"
      gradientUnits="userSpaceOnUse"
      gradientTransform="rotate(135)"
      style="transform-origin: center center;"
      ><stop stop-color="#222" /><stop
        offset="1"
        stop-color="#222222"
      /></linearGradient
    ><radialGradient
      id="svgl__r6"
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(256) rotate(90) scale(512)"
      ><stop stop-color="white" /><stop
        offset="1"
        stop-color="white"
        stop-opacity="0"
      /></radialGradient
    ></defs
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    width="310"
    height="310"
    fill="#e8e8e8"
    viewBox="0 0 256 256"
    x="101"
    y="101"
    alignment-baseline="middle"
    style="color: rgb(255, 255, 255);"
    ><path
      d="M168,32H88A56.06,56.06,0,0,0,32,88v80a56.06,56.06,0,0,0,56,56h48a8.07,8.07,0,0,0,2.53-.41c26.23-8.75,76.31-58.83,85.06-85.06A8.07,8.07,0,0,0,224,136V88A56.06,56.06,0,0,0,168,32ZM48,168V88A40,40,0,0,1,88,48h80a40,40,0,0,1,40,40v40H184a56.06,56.06,0,0,0-56,56v24H88A40,40,0,0,1,48,168Zm96,35.14V184a40,40,0,0,1,40-40h19.14C191,163.5,163.5,191,144,203.14Z"
    /></svg
  >
</svg>

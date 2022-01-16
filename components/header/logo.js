import * as React from "react";

function Logo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      color="currentColor"
      {...props}
    >
      <path fill="none" d="M0 0H256V256H0z" />
      <path
        d="M37.9 207.9L91.7 59.8a8 8 0 0113.2-2.9l94.2 94.2a8 8 0 01-2.9 13.2L48.1 218.1a7.9 7.9 0 01-10.2-10.2zM168 72s0-24 24-24 24-24 24-24"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M102.4 198.4L57.6 153.6"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M144 16L144 40"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M216 112L232 128"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M216 80L240 72"
      />
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M76.8 100.8L155.2 179.2"
      />
    </svg>
  );
}

export default Logo;

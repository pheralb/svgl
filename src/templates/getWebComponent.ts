interface WebComponentParams {
  name: string;
  content: string;
}

export const getWebComponent = (params: WebComponentParams) => {
  return `
  class Icon${params.name} extends HTMLElement {  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
      this.shadowRoot.innerHTML = /* html */ \`
          <style>
            svg { 
              width: var(--size, 128px); 
              color: var(--color, currentColor);
            }
          </style>
          ${params.content}
      \`;
    }
  }
  customElements.define("icon-${params.name.toLowerCase()}", Icon${params.name});
    `;
};

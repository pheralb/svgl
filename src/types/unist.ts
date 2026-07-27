export interface UnistNode {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
}

export interface UnistTree {
  type: string;
  children: UnistNode[];
}

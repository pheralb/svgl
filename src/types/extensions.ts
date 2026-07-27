export interface Extension {
  id?: number;
  name: string;
  description: string;
  created_by: {
    name: string;
    socialUrl: string;
  };
  url: string;
  image: string;
}

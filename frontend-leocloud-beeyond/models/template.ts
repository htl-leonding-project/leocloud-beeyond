export interface Template {
  content: string;
  description: string;
  fields: WildcardField[];
  id: number;
  name: string;
  createIngress: boolean;
  img: string;
}

export interface WildcardField {
  description: string;
  id: number;
  label: string;
  wildcard: string;
  value: string;
  placeholder: string;
}

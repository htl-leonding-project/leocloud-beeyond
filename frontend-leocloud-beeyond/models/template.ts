export interface Template {
  content: string;
  description: string;
  fields: WildcardField[];
  id: number;
  name: string;
}

export interface WildcardField {
  description: string;
  id: number;
  label: string;
  wildcard: string;
  value: string;
}

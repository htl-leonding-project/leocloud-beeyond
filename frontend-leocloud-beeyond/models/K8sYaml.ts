export interface K8sYaml {
  metadata: {
    name: string;
  };
  spec: {
    ports: {
      port: number;
    }[];
  };
}

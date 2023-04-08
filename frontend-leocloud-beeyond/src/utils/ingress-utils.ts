import { K8sYaml } from "@models/K8sYaml";
import yaml from "js-yaml";

function generateIngressYaml(
  serviceName: string,
  port: number,
  user: string,
  name: string
): string {
  return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${name}-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: student.cloud.htl-leonding.ac.at
      http:
        paths:
          - path: /${user}/${name}(/|$)(.*)$
            pathType: Prefix
            backend:
              service:
                name: ${serviceName}
                port:
                  number: ${port}`;
}

export function getIngressForTemplate(
  templateContent: string,
  username: string
): string {
  const documents = yaml.loadAll(templateContent) as K8sYaml[];

  if (documents.length < 2) {
    throw new Error("Invalid YAML: expected at least 2 documents");
  }

  const name = documents[0].metadata.name;
  const serviceName = documents[1].metadata.name;
  const port = documents[1].spec.ports[0].port;

  return generateIngressYaml(serviceName, port, username, name);
}

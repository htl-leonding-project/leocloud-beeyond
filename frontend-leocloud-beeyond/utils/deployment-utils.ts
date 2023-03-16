import { Template } from "@models/template";
import { getIngressForTemplate } from "./ingress-utils";

const getTemplateContent = (template: Template) => {
  const regex = /%([\w-]+)%/g;
  let temp = template.content;
  template.fields.forEach((f) => {
    if (f.value) {
      const re = new RegExp("%" + f.wildcard + "%", "g");
      temp = temp.replace(re, f.value);
    }
  });
  return temp.replace(regex, "temp");
};

export const buildDeploymentContent = (
  selectedTemplates: Template[],
  username: string
): string => {
  let content = "";

  for (const template of selectedTemplates) {
    const templateYAML = getTemplateContent(template);
    content += templateYAML;

    if (template.createIngress) {
      content += `\n---\n${getIngressForTemplate(templateYAML, username)}`;
    }

    if (template !== selectedTemplates[selectedTemplates.length - 1]) {
      content += "\n---\n";
    }
  }

  return content;
};

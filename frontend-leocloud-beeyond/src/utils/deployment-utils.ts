import { Template } from "~/models/template";
import { getIngressForTemplate } from "~/utils/ingress-utils";

const getTemplateContent = (template: Template) => {
  let content = template.content;

  template.fields.forEach((f) => {
    if (f.value) {
      const re = new RegExp(`%${f.wildcard}%`, "g");
      content = content.replace(re, f.value);
    }
  });

  return content;
};


export const buildDeploymentContent = (selectedTemplates: Template[], username: string): string => {
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

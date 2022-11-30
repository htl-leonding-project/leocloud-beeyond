import { Template } from "../models/template";

export default function ListItem({
  template,
  selectedTemplate,
  setSelectedTemplate,
}: {
  template: Template;
  selectedTemplate: Template;
  setSelectedTemplate: any;
}) {
  return (
    <div
      className={`rounded-lg cursor-pointer hover:bg-secondary p-4 ${
        selectedTemplate?.id == template.id ? "bg-secondary" : ""
      }`}
      onClick={() => setSelectedTemplate(template)}
    >
      <div className={"font-medium"}>{template.name}</div>
    </div>
  );
}

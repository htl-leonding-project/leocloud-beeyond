import { Template } from "@models/template";
import useTemplateStore from "@stores/templateStore";

export default function ListItem({ template }: { template: Template }) {
  const [activeTemplate, setActiveTemplate] = useTemplateStore((state) => [
    state.activeTemplate,
    state.setActiveTemplate,
  ]);

  return (
    <div
      className={`cursor-pointer rounded-lg p-4 hover:bg-secondary ${
        activeTemplate?.id == template.id ? "bg-secondary" : ""
      }`}
      onClick={() => {
        setActiveTemplate(template);
      }}
    >
      <div className="select-none font-medium">{template.name}</div>
    </div>
  );
}

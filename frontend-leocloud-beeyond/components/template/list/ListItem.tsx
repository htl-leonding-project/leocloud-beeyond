import { Template } from "@models/template";
import useStateStore from "@stores/stateStore";

export default function ListItem({ template }: { template: Template }) {
  const selectedTemplate = useStateStore((state) => state.activeTemplate);
  const setSelectedTemplate = useStateStore((state) => state.setActiveTemplate);

  return (
    <div
      className={`rounded-lg cursor-pointer hover:bg-secondary p-4 ${
        selectedTemplate?.id == template.id ? "bg-secondary" : ""
      }`}
      onClick={() => {
        setSelectedTemplate(template);
      }}
    >
      <div className={"font-medium"}>{template.name}</div>
    </div>
  );
}

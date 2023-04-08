import { Template } from "@models/template";
import useTemplateStore from "@stores/templateStore";

export default function ListItem({ template }: { template: Template }) {
  const {activeTemplate, setActiveTemplate} = useTemplateStore();

  return (
    <div
      className={`flex cursor-pointer items-center rounded-lg p-4 hover:bg-secondary ${
        activeTemplate?.id === template.id ? "bg-secondary" : ""
      }`}
      onClick={() => {
        setActiveTemplate(template);
      }}
    >
      <img
        src={`data:image/svg+xml;base64,${Buffer.from(template.img).toString(
          "base64"
        )}`}
        alt={`${template.name}`}
        className="mr-4 h-8 w-8 select-none"
      />
      <div className="select-none font-medium">{template.name}</div>
    </div>
  );
}

import { Template } from "@models/template";
import { useEnvContext } from "@stores/envContext";
import useTemplateStore from "@stores/templateStore";

export default function ListItem({ template }: { template: Template }) {
  const { basePath } = useEnvContext();

  const [activeTemplate, setActiveTemplate] = useTemplateStore((state) => [
    state.activeTemplate,
    state.setActiveTemplate,
  ]);

  return (
    <div
      className={`flex cursor-pointer items-center rounded-lg p-4 hover:bg-secondary${
        activeTemplate?.id == template.id ? "bg-secondary" : ""
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

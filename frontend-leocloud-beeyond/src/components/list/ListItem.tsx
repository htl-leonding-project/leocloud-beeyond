import Image from "next/image";
import { Template } from "~/models/template";
import useTemplateStore from "~/stores/templateStore";

export default function ListItem({ template }: { template: Template }) {
  const { activeTemplate, setActiveTemplate } = useTemplateStore();

  return (
    <div
      className={`flex cursor-pointer items-center rounded-lg p-4 hover:bg-secondary/50 ${
        activeTemplate?.id === template.id ? "bg-secondary/50" : ""
      }`}
      onClick={() => {
        setActiveTemplate(template);
      }}
    >
      <Image
        src={`data:image/svg+xml;base64,${Buffer.from(template.img).toString("base64")}`}
        alt={`${template.name}`}
        className="mr-4 h-8 w-8 select-none"
        width={32}
        height={32}
      />
      <div className="select-none font-medium">{template.name}</div>
    </div>
  );
}

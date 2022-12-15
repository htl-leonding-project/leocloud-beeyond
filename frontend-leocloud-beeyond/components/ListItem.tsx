import { Template } from "../models/template";
import useStore from "../store/store";

export default function ListItem({ template }: { template: Template }) {
  // @ts-ignore
  const selectedTemplate = useStore((state) => state.selectedTemplate);
  // @ts-ignore
  const setSelectedTemplate = useStore((state) => state.setSelectedTemplate);

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

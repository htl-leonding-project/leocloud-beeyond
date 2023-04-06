import ListItem from "./ListItem";
import React from "react";
import { Template } from "@models/template";
import useTemplateStore from "@stores/templateStore";

const TemplateList = ({
  header,
  templates,
}: {
  header: "Available Templates" | "Selected Templates";
  templates: Template[];
}) => {
  const [activeTemplate, selectedTemplates] = useTemplateStore((state) => [
    state.activeTemplate,
    state.selectedTemplates,
  ]);

  return (
    <>
      <div
        className={`flex flex-col overflow-y-auto rounded-lg ${
          header === "Available Templates" ||
          !selectedTemplates.includes(activeTemplate!)
            ? "h-full"
            : "h-1/2"
        }`}
      >
        <div className="select-none p-2 text-2xl font-semibold">{header}</div>
        <div className="h-full overflow-y-auto rounded-lg border bg-white">
          {templates.map((template) => (
            <ListItem key={template.id} template={template} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplateList;

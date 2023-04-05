import ListItem from "./ListItem";
import React from "react";
import { Template } from "@models/template";
import useTemplateStore from "@stores/templateStore";

const TemplateList = ({
  header,
  templates,
}: {
  header: string;
  templates: Template[];
}) => {
  const [activateTemplate, selectedTemplates] = useTemplateStore((state) => [
    state.activeTemplate,
    state.selectedTemplates,
  ]);

  return (
    <>
      <div className="select-none p-2 text-2xl font-bold">{header}</div>
      <div
        className={
          activateTemplate === null ||
          selectedTemplates.length === 0 ||
          !selectedTemplates.includes(activateTemplate)
            ? "flex h-full flex-col overflow-y-auto rounded-lg bg-white shadow-md"
            : `flex ${
                header === "Available Templates" ? "h-full" : "h-1/2"
              } flex-col overflow-y-auto rounded-lg bg-white shadow-md`
        }
      >
        {templates.map((template) => (
          <ListItem key={template.id} template={template} />
        ))}
      </div>
    </>
  );
};

export default TemplateList;

import ListItem from "./list/ListItem";
import React from "react";
import { Template } from "@models/template";

const TemplateList = ({
  header,
  templates,
}: {
  header: string;
  templates: Template[];
}) => {
  return (
    <>
      <div className="select-none p-2 text-2xl font-bold">{header}</div>
      <div className="h-full rounded-lg bg-white shadow-md">
        {templates.map((template) => (
          <ListItem key={template.id} template={template} />
        ))}
      </div>
    </>
  );
};

export default TemplateList;

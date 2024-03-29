import ListItem from "~/components/list/ListItem";
import { Template } from "~/models/template";

const TemplateList = ({
  header,
  templates,
}: {
  header: "Available Templates" | "Selected Templates";
  templates: Template[];
}) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto rounded-l">
      <div className="select-none p-2 text-2xl font-semibold">{header}</div>
      <div className="h-full overflow-y-auto rounded-lg bg-base-100 border border-[hsl(var(--bc))]/20">
        {templates.map((template) => (
          <ListItem key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplateList;

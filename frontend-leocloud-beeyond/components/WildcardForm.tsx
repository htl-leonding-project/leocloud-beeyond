import { Template } from "../models/template";
import ListItem from "./ListItem";

function FormElement({ label }: { label: string }) {
  return (
    <div className="mb-2 mx-2">
      <label className="block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        type="text"
        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
    </div>
  );
}

export function WildCardForm({ selectedTemplates }: { selectedTemplates: Template[] }) {
  return (
    <div className={"h-full"}>
      <form className="mt-6">
        {selectedTemplates.map((template) => (
            <div>
              <h1 className={"block text-sm font-semibold text-gray-800 mx-2"}>{template.name}</h1>
              {template.fields.map((field) => (
                <FormElement label={field.label}></FormElement>
              ))}
            </div>
          )
        )}
      </form>
    </div>
  );
}
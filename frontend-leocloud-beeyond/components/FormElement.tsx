import { Template, WildcardField } from "../models/template";
import { useEffect, useState } from "react";
import useStateStore from "../store/stateStore";

export function FormElement({
  wildcard,
  selectedTemplate,
}: {
  wildcard: WildcardField;
  selectedTemplate: Template;
}) {
  const [value, setValue] = useState(wildcard.value);
  const setActiveTemplate = useStateStore((state) => state.setActiveTemplate);

  useEffect(() => {
    setValue(wildcard.value);
  }, [wildcard.value]);

  const showPlaceholder = wildcard.value === undefined;

  return (
    <div className="mb-2 mx-2">
      <label className="block text-sm font-semibold text-gray-800">
        {wildcard.label}
      </label>
      {/*use the value if exists else use a placeholder*/}
      <input
        type="text"
        value={showPlaceholder ? "" : value}
        placeholder={wildcard.placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          const field = selectedTemplate.fields.find(
            (w) => w.id === wildcard.id
          );
          field!.value = e.target.value;
          setActiveTemplate(selectedTemplate);
        }}
        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
    </div>
  );
}

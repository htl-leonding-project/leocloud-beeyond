import React, { useEffect, useState } from "react";
import { Template, WildcardField } from "@models/template";
import useStateStore from "@stores/stateStore";

export function FormElement({
  wildcard,
  selectedTemplate,
  showExample,
}: {
  wildcard: WildcardField;
  selectedTemplate: Template;
  showExample: boolean;
}) {
  const [value, setValue] = useState(wildcard.value);
  const setActiveTemplate = useStateStore((state) => state.setActiveTemplate);

  useEffect(() => {
    setValue(wildcard.value);
  }, [wildcard.value]);

  const showPlaceholder = wildcard.value === "";

  return (
    <div className="mb-2 mx-2">
      <div className={"flex justify-between"}>
        <label className="block text-sm font-semibold text-gray-800">
          {wildcard.label}
        </label>
        {showExample && (
          <label className="block text-sm text-gray-400">
            {`example: ${wildcard.placeholder}`}
          </label>
        )}
      </div>
      <input
        type="text"
        value={showPlaceholder ? "" : value}
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

import React, { useEffect, useState } from "react";
import { Template, WildcardField } from "@models/template";

import useTemplateStore from "@stores/templateStore";

export function FormElement({
  wildcard,
  selectedTemplate,
}: {
  wildcard: WildcardField;
  selectedTemplate: Template;
}) {
  const setActiveTemplate = useTemplateStore(
    (state) => state.setActiveTemplate
  );
  const [value, setValue] = useState(wildcard.value);
  const showPlaceholder = wildcard.value === "";

  // update input field value when `wildcard.value` prop changes
  useEffect(() => {
    setValue(wildcard.value);
  }, [wildcard.value]);

  return (
    <div className="mx-2 mb-2">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text pr-4 text-sm font-semibold text-gray-800">
            {wildcard.label}
          </span>
          <span className="label-text-alt select-text truncate text-sm text-gray-400">{`example: ${wildcard.placeholder}`}</span>
        </label>
        <input
          className="input-bordered input w-full rounded-md text-indigo-700 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
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
        />
      </div>
    </div>
  );
}

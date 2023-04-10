import React, { useEffect, useState } from "react";
import { Template, WildcardField } from "~/models/template";

import useTemplateStore from "~/stores/templateStore";

export default function FormElement({
  wildcard,
  activeTemplate,
}: {
  wildcard: WildcardField;
  activeTemplate: Template;
}) {
  const { setActiveTemplate } = useTemplateStore();
  const [value, setValue] = useState(wildcard.value);
  const showPlaceholder = wildcard.value === "";

  // update input field value when `wildcard.value` prop changes
  useEffect(() => {
    setValue(wildcard.value);
  }, [wildcard.value]);

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text pr-4 text-sm font-semibold">{wildcard.label}</span>
        <span className="label-text-alt select-text truncate text-sm text-opacity-50">{`example: ${wildcard.placeholder}`}</span>
      </label>
      <input
        className="input-bordered input w-full rounded-md text-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40"
        type="text"
        value={showPlaceholder ? "" : value}
        onChange={(e) => {
          setValue(e.target.value);

          const field = activeTemplate.fields.find((w) => w.id === wildcard.id);
          field!.value = e.target.value;

          setActiveTemplate(activeTemplate);
        }}
      />
    </div>
  );
}

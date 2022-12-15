import { Template, WildcardField } from "../models/template";
import useStateStore from "../store/stateStore";
import { useState } from "react";

function FormElement({
  wildcard,
  selectedTemplate,
}: {
  wildcard: WildcardField;
  selectedTemplate: Template;
}) {
  const [value, setValue] = useState(wildcard.value);
  const setActiveTemplate = useStateStore((state) => state.setActiveTemplate);

  return (
    <div className="mb-2 mx-2">
      <label className="block text-sm font-semibold text-gray-800">
        {wildcard.label}
      </label>
      <input
        type="text"
        value={value}
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

export function WildCardForm({}: {}) {
  const selectedTemplate = useStateStore((state) => state.activeTemplate);

  return (
    <div className={"h-full overflow-auto"}>
      <hr />
      <form className="mt-6">
        <div>
          {selectedTemplate?.fields.map(
            (field: WildcardField, index: number) => (
              <FormElement
                key={index}
                wildcard={field}
                selectedTemplate={selectedTemplate}
              ></FormElement>
            )
          )}
        </div>
      </form>
    </div>
  );
}

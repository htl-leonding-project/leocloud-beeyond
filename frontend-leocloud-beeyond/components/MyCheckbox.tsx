import React, { useEffect, useState } from "react";
import useStateStore from "@stores/stateStore";
import { Template } from "@models/template";

const MyCheckbox = ({
  createIngress,
  selectedTemplate,
}: {
  createIngress: boolean;
  selectedTemplate: Template;
}) => {
  const [value, setValue] = useState(createIngress);
  const setActiveTemplate = useStateStore((state) => state.setActiveTemplate);

  useEffect(() => {
    setValue(createIngress);
  }, [createIngress]);

  return (
    <>
      <label className="flex block text-sm font-semibold text-gray-800">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          checked={value}
          onChange={(e) => {
            setValue(e.target.checked);
            selectedTemplate.createIngress = e.target.checked;
            setActiveTemplate(selectedTemplate);
          }}
        />
        <span className="text-sm">Create ingress for Service</span>
      </label>
    </>
  );
};

export default MyCheckbox;

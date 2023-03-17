import React, { useEffect, useState } from "react";

import { FormElement } from "@components/template/form/FormElement";
import { WildcardField } from "@models/template";
import useStateStore from "@stores/stateStore";

export function WildCardForm({}: {}) {
  const selectedTemplate = useStateStore((state) => state.activeTemplate);
  const [createIngress, setCreateIngress] = useState(
    selectedTemplate!.createIngress
  );

  useEffect(() => {
    setCreateIngress(selectedTemplate!.createIngress);
  }, [selectedTemplate!.createIngress]);

  return (
    <>
      <div className={"mx-2 block text-lg font-semibold text-gray-800"}>
        Template Fields
      </div>
      <div className={"h-full overflow-auto"}>
        <form className="mt-2">
          {selectedTemplate?.fields.map(
            (field: WildcardField, index: number) => (
              <FormElement
                key={index}
                wildcard={field}
                selectedTemplate={selectedTemplate}
              ></FormElement>
            )
          )}

          <div className="mx-2 mb-2">
            <div className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-indigo-700 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40">
              <label className="flex text-sm font-semibold text-gray-800">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  checked={selectedTemplate!.createIngress}
                  onChange={() => {
                    setCreateIngress(!createIngress);
                    selectedTemplate!.createIngress =
                      !selectedTemplate!.createIngress;
                  }}
                />
                <span className="text-sm">Create ingress for Service</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

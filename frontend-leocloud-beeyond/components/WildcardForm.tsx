import { WildcardField } from "../models/template";
import useStateStore from "../store/stateStore";
import React from "react";
import { FormElement } from "./FormElement";

export function WildCardForm({}: {}) {
  const selectedTemplate = useStateStore((state) => state.activeTemplate);

  return (
    <>
      <div className={"block text-lg font-semibold text-gray-800 mx-2"}>
        Template Fields
      </div>
      <div className={"h-full overflow-auto"}>
        <form className="mt-2">
          <div>
            {selectedTemplate?.fields.map(
              (field: WildcardField, index: number) => (
                <FormElement
                  key={index}
                  wildcard={field}
                  selectedTemplate={selectedTemplate}
                  showExample={field.value === undefined}
                ></FormElement>
              )
            )}

            <div className="mb-2 mx-2">
              <div className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40">
                <label className="flex block text-sm font-semibold text-gray-800">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    onClick={() => {
                      selectedTemplate!.createIngress =
                        !selectedTemplate!.createIngress;
                    }}
                  />
                  <span className="text-sm">Create ingress for Service</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

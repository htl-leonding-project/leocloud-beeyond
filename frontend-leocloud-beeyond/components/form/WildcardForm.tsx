import { FormElement } from "@components/form/FormElement";
import { WildcardField } from "@models/template";
import useTemplateStore from "@stores/templateStore";

export function WildCardForm() {
  const [selectedTemplate, setActiveTemplate] = useTemplateStore((state) => [
    state.activeTemplate,
    state.setActiveTemplate,
  ]);

  return (
    <div className="flex h-full flex-col overflow-auto rounded-lg bg-white pt-1 shadow-md">
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
            <div className="mt-2 block w-full rounded-md border px-4 py-2">
              <label className="label justify-start">
                <input
                  className="checkbox-primary checkbox mr-2"
                  type="checkbox"
                  checked={selectedTemplate!.createIngress}
                  onChange={() => {
                    selectedTemplate!.createIngress =
                      !selectedTemplate!.createIngress;

                    setActiveTemplate(selectedTemplate);
                  }}
                />
                <span className="label-text select-none">
                  Create ingress for Service
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

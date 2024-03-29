import FormElement from "~/components/form/FormElement";
import { WildcardField } from "~/models/template";
import useTemplateStore from "~/stores/templateStore";

export default function WildCardForm() {
  const { activeTemplate, setActiveTemplate } = useTemplateStore();

  return (
    <div className="flex h-full w-full flex-col bg-base-100 border border-[hsl(var(--bc))]/20 rounded-lg">
      <div className={"block select-none px-4 pt-4 text-lg font-semibold"}>Template Fields</div>
      <form className="flex h-full flex-col overflow-y-auto p-4">
        {activeTemplate?.fields.map((field: WildcardField, index: number) => (
          <FormElement key={index} wildcard={field} activeTemplate={activeTemplate} />
        ))}

        <div className="mt-2 block w-full rounded-md border border-[hsl(var(--bc))]/20 px-4 py-2">
          <label className="label justify-start">
            <input
              className="checkbox-primary checkbox mr-2"
              type="checkbox"
              checked={!!(activeTemplate && activeTemplate.createIngress)}
              onChange={() => {
                activeTemplate!.createIngress = !activeTemplate!.createIngress;

                setActiveTemplate(activeTemplate);
              }}
            />
            <span className="label-text select-none">
              Create <strong>Ingress</strong> for <strong>Service</strong>
            </span>
          </label>
        </div>
      </form>
    </div>
  );
}

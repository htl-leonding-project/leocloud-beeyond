import { WildcardField } from "../models/template";
import useStateStore from "../store/stateStore";

function FormElement({ label }: { label: string }) {
  return (
    <div className="mb-2 mx-2">
      <label className="block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        type="text"
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
          {selectedTemplate?.fields.map((field: WildcardField) => (
            <FormElement key={field.label} label={field.label}></FormElement>
          ))}
        </div>
      </form>
    </div>
  );
}

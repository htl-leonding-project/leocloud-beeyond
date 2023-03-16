import React, { useState } from "react";

import ArrowButton from "@components/ArrowButton";
import ListItem from "@components/template/list/ListItem";
import { Template } from "@models/template";
import { WildCardForm } from "@components/template/form/WildcardForm";
import { buildDeploymentContent } from "@utils/deployment-utils";
import { downloadDeploymentFile } from "@utils/download-utils";
import useSWR from "swr";
import useStateStore from "@stores/stateStore";

const fetcher = async (url: string): Promise<Template[]> => {
  const res = await fetch(url);
  const data = await res.json();

  data.forEach((t: Template) => {
    t.createIngress = false;
    t.fields.forEach((f) => {
      if (f.value === undefined) {
        f.value = "";
      }
    });
  });

  return data;
};

const url = `${process.env.API_URL}/template`;

export default function Home() {
  const { data } = useSWR<Template[]>(url, fetcher);

  const [
    selectedTemplates,
    addSelectedTemplate,
    removeSelectedTemplate,
    activeTemplate,
    setActiveTemplate,
  ] = useStateStore((state) => [
    state.selectedTemplates,
    state.addSelectedTemplate,
    state.removeSelectedTemplate,
    state.activeTemplate,
    state.setActiveTemplate,
  ]);

  const [username, setUsername] = useState("");

  const downloadDeployment = () => {
    downloadDeploymentFile(buildDeploymentContent(selectedTemplates, username));
  };

  const selectTemplate = (direction: "left" | "right") => {
    if (!activeTemplate) return;

    if (direction === "right" && !selectedTemplates.includes(activeTemplate)) {
      addSelectedTemplate(activeTemplate);
    } else if (
      direction === "left" &&
      selectedTemplates.includes(activeTemplate)
    ) {
      removeSelectedTemplate(activeTemplate);
    }

    setActiveTemplate(null);
  };

  return (
    <div className={"flex h-full"}>
      <div className={"flex w-2/5 flex-col"}>
        <div className={"p-2 text-2xl font-bold"}>Available Templates</div>
        <div className={"h-full rounded-lg bg-white shadow-md"}>
          {data
            ?.filter((template) => !selectedTemplates.includes(template))
            .map((template) => (
              <ListItem key={template.id} template={template} />
            ))}
        </div>
      </div>
      <div className={"w-1/5 flex-col"}>
        <div className={"h-1/3"}></div>
        <div className={"flex h-1/3 flex-col items-center justify-center"}>
          <ArrowButton
            direction="right"
            onClick={() => selectTemplate("right")}
          />
          <ArrowButton
            direction="left"
            onClick={() => selectTemplate("left")}
          />
        </div>
        <div className="flex h-1/3 flex-col items-end justify-end space-y-4 pr-4 pl-4">
          <div className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text pr-4 text-sm font-semibold text-gray-800">
                  Username
                </span>
                <span className="label-text-alt truncate text-sm text-gray-400">{`example: m.remplbauer`}</span>
              </label>
              <input
                className="input-bordered input w-full rounded-md text-indigo-700 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn-primary btn w-full text-white"
            onClick={downloadDeployment}
          >
            DOWNLOAD
          </button>
        </div>
      </div>

      <div className={"flex w-2/5 flex-col"}>
        <div className={"p-2 text-2xl font-bold"}>Selected Templates</div>
        <div className="flex h-full flex-col overflow-auto rounded-lg bg-white shadow-md">
          <div className="h-full overflow-auto rounded-lg bg-white">
            {selectedTemplates.map((template: Template) => (
              <ListItem key={template.id} template={template} />
            ))}
          </div>
          {selectedTemplates.includes(activeTemplate!) && (
            <WildCardForm></WildCardForm>
          )}
        </div>
      </div>
    </div>
  );
}

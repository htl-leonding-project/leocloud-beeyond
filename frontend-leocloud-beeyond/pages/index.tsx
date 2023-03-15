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
  
  data.forEach((t:Template) => {
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

  const selectedTemplates = useStateStore((state) => state.selectedTemplates);
  const addSelectedTemplate = useStateStore(
    (state) => state.addSelectedTemplate
  );
  const removeSelectedTemplate = useStateStore(
    (state) => state.removeSelectedTemplate
  );

  const activeTemplate = useStateStore((state) => state.activeTemplate);
  const setActiveTemplate = useStateStore((state) => state.setActiveTemplate);

  const [username, setUsername] = useState("");

  const downloadDeployment = () => {
    downloadDeploymentFile(buildDeploymentContent(selectedTemplates, username));
  };

  const selectTemplate = (direction: string) => {
    if (!activeTemplate) return;

    if (direction == "right") {
      if (!selectedTemplates.includes(activeTemplate)) {
        addSelectedTemplate(activeTemplate);
      }
    } else {
      removeSelectedTemplate(activeTemplate);
    }

    setActiveTemplate(null);
  };

  return (
    <div className={"flex h-full"}>
      <div className={"flex flex-col w-2/5"}>
        <div className={"font-bold text-2xl p-2"}>Available Templates</div>
        <div className={"bg-white shadow-md rounded-lg h-full"}>
          {data
            ?.filter((template) => !selectedTemplates.includes(template))
            .map((template) => (
              <ListItem key={template.id} template={template} />
            ))}
        </div>
      </div>
      <div className={"w-1/5 flex-col"}>
        <div className={"h-1/3"}></div>
        <div className={"h-1/3 flex flex-col justify-center items-center"}>
          <ArrowButton
            direction="right"
            onClick={() => selectTemplate("right")}
          />
          <ArrowButton
            direction="left"
            onClick={() => selectTemplate("left")}
          />
        </div>
        <div className="h-1/3 flex flex-col justify-end items-end space-y-4 pr-4 pl-4">
          <div className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm font-semibold text-gray-800 pr-1">
                  Username
                </span>
                <span className="label-text-alt text-sm text-gray-400 truncate">{`example: m.remplbauer`}</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn btn-primary w-full text-white"
            onClick={downloadDeployment}
          >
            DOWNLOAD
          </button>
        </div>
      </div>

      <div className={"flex flex-col w-2/5"}>
        <div className={"font-bold text-2xl p-2"}>Selected Templates</div>
        <div className="h-full bg-white shadow-md rounded-lg overflow-auto flex flex-col">
          <div className="h-full bg-white rounded-lg overflow-auto">
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

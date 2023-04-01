import React, { useState } from "react";

import ArrowButton from "@components/ArrowButton";
import { ErrorAlert } from "@components/ErrorAlert";
import { Template } from "@models/template";
import TemplateList from "@components/TemplateList";
import { WildCardForm } from "@components/form/WildcardForm";
import { buildDeploymentContent } from "@utils/deployment-utils";
import { downloadDeploymentFile } from "@utils/download-utils";
import useSWR from "swr";
import useTemplateStore from "@stores/templateStore";

const fetcher = async (url: string): Promise<Template[]> => {
  const res = await fetch(url);
  const data: Template[] = await res.json();

  data.forEach((t) => {
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
    activeTemplate,
    selectedTemplates,
    addSelectedTemplate,
    removeSelectedTemplate,
    setActiveTemplate,
  ] = useTemplateStore((state) => [
    state.activeTemplate,
    state.selectedTemplates,
    state.addSelectedTemplate,
    state.removeSelectedTemplate,
    state.setActiveTemplate,
  ]);

  const [username, setUsername] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const downloadDeployment = () => {
    console.log("downloadDeployment");
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

  const areTemplatesValid = () => {
    for (const template of selectedTemplates) {
      for (const field of template.fields) {
        if (field.value === "") {
          setToastMessage(
            `Field "${field.label}" of Template "${template.name}" must have a value!`
          );
          return false;
        }
      }
    }

    return true;
  };

  return (
    <div className="flex h-full">
      <div className="flex w-2/5 flex-col">
        <TemplateList
          header="Available Templates"
          templates={
            data?.filter((template) => !selectedTemplates.includes(template)) ||
            []
          }
        />
      </div>

      <div className="w-1/5 flex-col">
        <div className="h-1/3"></div>
        <div className="flex h-1/3 flex-col items-center justify-center">
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
                <div className="label-text-alt select-text truncate text-sm text-gray-400">{`example: m.remplbauer`}</div>
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
            onClick={() => {
              if (username === "" || !areTemplatesValid()) {
                if (username === "")
                  setToastMessage(
                    "Provide a valid username to download the YAML!"
                  );
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
              } else {
                downloadDeployment();
              }
            }}
          >
            DOWNLOAD YAML
          </button>
          {showToast && <ErrorAlert message={toastMessage}></ErrorAlert>}
        </div>
      </div>

      <div className="flex w-2/5 flex-col">
        <TemplateList
          header="Selected Templates"
          templates={selectedTemplates}
        />
        {selectedTemplates.includes(activeTemplate!) && (
          <div className="mt-1 h-1/2">
            <WildCardForm />
          </div>
        )}
      </div>
    </div>
  );
}

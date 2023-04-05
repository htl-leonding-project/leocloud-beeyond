import React, { useState } from "react";

import Alert from "@components/Alert";
import ArrowButton from "@components/ArrowButton";
import { Template } from "@models/template";
import TemplateList from "@components/list/TemplateList";
import { WildCardForm } from "@components/form/WildcardForm";
import { buildDeploymentContent } from "@utils/deployment-utils";
import { downloadDeploymentFile } from "@utils/download-utils";
import { useEnvContext } from "@stores/envContext";
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

export default function Home() {
  const { apiUrl } = useEnvContext();
  const { data } = useSWR<Template[]>(`${apiUrl}/template`, fetcher);

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
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

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

  const areTemplatesValid = () => {
    for (const template of selectedTemplates) {
      for (const field of template.fields) {
        if (field.value === "") {
          return {
            type: "error",
            message: `Field "${field.label}" of Template "${template.name}" must have a value!`,
          };
        }
      }
    }

    return null;
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
              let toast = {
                type: "info",
                message: "Downloading YAML Kubernetes Manifest.",
              };

              switch (true) {
                case selectedTemplates.length === 0:
                  toast = {
                    type: "error",
                    message:
                      "Please select a valid template to download the YAML.",
                  };
                  break;
                case username === "":
                  toast = {
                    type: "error",
                    message:
                      "Please provide a valid username to download the YAML.",
                  };
                  break;
                default:
                  const result = areTemplatesValid();
                  if (result !== null) {
                    toast = result;
                  } else {
                    downloadDeployment();
                  }
              }

              setAlert(toast);
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2500);
            }}
          >
            DOWNLOAD YAML
          </button>
          {showAlert && (
            <Alert type={alert.type} message={alert.message}></Alert>
          )}
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

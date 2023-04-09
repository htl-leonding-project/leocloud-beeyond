import React, { useState } from "react";
import { useTimeoutFn } from "react-use";
import useSWR from "swr";
import ArrowButton from "~/components/ArrowButton";
import Alert from "~/components/alert/Alert";
import WildCardForm from "~/components/form/WildcardForm";
import TemplateList from "~/components/list/TemplateList";
import { Template } from "~/models/template";
import { useEnvContext } from "~/stores/envContext";
import useTemplateStore from "~/stores/templateStore";
import { buildDeploymentContent } from "~/utils/deployment-utils";
import { downloadDeploymentFile } from "~/utils/download-utils";

const fetcher = async (url: string): Promise<Template[]> => {
  const res = await fetch(url);
  const data: Template[] = await res.json();

  data.forEach((t) => {
    t.createIngress = false;
    t.fields.forEach((f) => {
      f.value ??= "";
    });
  });

  return data;
};

export default function Home() {
  const { apiUrl } = useEnvContext();
  const { data } = useSWR<Template[]>(`${apiUrl}/template`, fetcher);

  const {
    activeTemplate,
    selectedTemplates,
    addSelectedTemplate,
    removeSelectedTemplate,
    setActiveTemplate,
  } = useTemplateStore();

  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", show: false });

  const [, , resetAlertTimeout] = useTimeoutFn(() => {
    setAlert((prevState) => ({ ...prevState, show: false }));
  }, 2500);

  const downloadDeployment = () => {
    downloadDeploymentFile(buildDeploymentContent(selectedTemplates, username));
  };

  const selectTemplate = (direction: "left" | "right") => {
    if (!activeTemplate) return;

    if (direction === "right" && !selectedTemplates.includes(activeTemplate)) {
      addSelectedTemplate(activeTemplate);
    } else if (direction === "left" && selectedTemplates.includes(activeTemplate)) {
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
            show: true,
          };
        }
      }
    }

    return null;
  };

  const downloadYaml = () => {
    let toast = {
      type: "info",
      message: "Downloading YAML Kubernetes Manifest.",
      show: true,
    };

    switch (true) {
      case selectedTemplates.length === 0:
        toast = {
          type: "error",
          message: "Please select a valid template to download the YAML.",
          show: true,
        };
        break;
      case username === "":
        toast = {
          type: "error",
          message: "Please provide a valid username to download the YAML.",
          show: true,
        };
        break;
      default:
        const result = areTemplatesValid();
        if (result) {
          toast = result;
        } else {
          downloadDeployment();
        }
    }

    setAlert(toast);
    resetAlertTimeout();
  };

  return (
    <>
      <div className="flex w-2/5 flex-col">
        <TemplateList
          header="Available Templates"
          templates={data?.filter((template) => !selectedTemplates.includes(template)) ?? []}
        />
      </div>

      <div className="w-1/5 flex-col">
        <div className="h-1/3"></div>
        <div className="flex h-1/3 flex-col items-center justify-center">
          <ArrowButton direction="right" onClick={() => selectTemplate("right")} />
          <ArrowButton direction="left" onClick={() => selectTemplate("left")} />
        </div>
        <div className="flex h-1/3 flex-col items-end justify-end space-y-4 pr-4 pl-4">
          <div className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text pr-4 text-sm font-semibold">Username</span>
                <div className="label-text-alt select-text truncate text-sm text-opacity-50">{`example: m.remplbauer`}</div>
              </label>
              <input
                className="input-bordered input w-full rounded-md text-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-primary btn w-full" onClick={downloadYaml}>
            DOWNLOAD YAML
          </button>
          {alert.show && <Alert type={alert.type} message={alert.message}></Alert>}
        </div>
      </div>

      <div className="flex h-full w-2/5 flex-col space-y-2">
        <TemplateList header="Selected Templates" templates={selectedTemplates} />
        {selectedTemplates.includes(activeTemplate!) && (
          <div className="flex h-1/2 w-full overflow-y-auto rounded-lg">
            <WildCardForm />
          </div>
        )}
      </div>
    </>
  );
}

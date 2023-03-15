import ListItem from "@components/template/list/ListItem";
import Image from "next/image";
import useSWR from "swr";
import { Template } from "@models/template";
import { WildCardForm } from "@components/template/form/WildcardForm";
import useStateStore from "@stores/stateStore";
import React, { useState } from "react";
import { downloadDeploymentFile } from "@utils/download-utils";
import { buildDeploymentContent } from "@utils/deployment-utils";

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    let data: Template[] = await res.json();
    data.map((t) => {
      t.createIngress = false;
      t.fields.map((f) => {
        if (f.value === undefined) {
          f.value = "";
        }
      });
    });
    return data;
  });
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
          <div
            className={"cursor-pointer"}
            onClick={() => selectTemplate("left")}
          >
            <Image
              src={`${process.env.BASE_PATH}/assets/arrow-left.svg`}
              alt={"arrow-left"}
              width={48}
              height={48}
              priority={true}
            />
          </div>
          <div
            className={"cursor-pointer"}
            onClick={() => selectTemplate("right")}
          >
            <Image
              src={`${process.env.BASE_PATH}/assets/arrow-right.svg`}
              alt={"arrow-right"}
              width={48}
              height={48}
            />
          </div>
        </div>
        <div
          className={
            "h-1/3 flex flex-col justify-end items-end space-y-4 pr-4 pl-4"
          }
        >
          <div className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm font-semibold text-gray-800 pr-1">
                  Username
                </span>
                <span className="label-text-alt text-sm text-gray-400 truncate">{`example: m.remplbauer`}</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
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
        <div
          className={
            "h-full bg-white shadow-md rounded-lg overflow-auto flex flex-col"
          }
        >
          <div
            className={
              selectedTemplates.includes(activeTemplate!)
                ? "h-full bg-white rounded-lg overflow-auto"
                : "h-full bg-white rounded-lg overflow-auto shadow-md"
            }
          >
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

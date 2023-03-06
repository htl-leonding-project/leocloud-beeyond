import ListItem from "@components/template/list/ListItem";
import Image from "next/image";
import useSWR from "swr";
import { Template } from "@models/template";
import { WildCardForm } from "@components/template/form/WildcardForm";
import useStateStore from "@stores/stateStore";
import yaml from "js-yaml";
import { K8sYaml } from "@models/K8sYaml";
import React, { useState } from "react";

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
    downloadDeploymentFile(buildDeploymentContent());
  };

  const getTemplateContent = (template: Template) => {
    const regex = /%([\w-]+)%/g;
    let temp = template.content;
    template.fields.forEach((f) => {
      if (f.value) {
        const re = new RegExp("%" + f.wildcard + "%", "g");
        temp = temp.replace(re, f.value);
      }
    });
    return temp.replace(regex, "temp");
  };

  const downloadDeploymentFile = (content: string) => {
    let file = new Blob([content], { type: ".yaml" });
    let url = window.URL.createObjectURL(file);

    let a = document.createElement("a");
    a.setAttribute("style", "display: none");
    a.href = url;
    a.download = "deployment.yaml";

    document.body.appendChild(a);

    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  function generateIngressYaml(
    serviceName: string,
    port: number,
    user: string,
    name: string
  ): string {
    return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${name}-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: student.cloud.htl-leonding.ac.at
      http:
        paths:
          - path: /${user}/${name}(/|$)(.*)$
            pathType: Prefix
            backend:
              service:
                name: ${serviceName}
                port:
                  number: ${port}`;
  }

  function getIngressForTemplate(templateContent: string): string {
    const documents = yaml.loadAll(templateContent) as K8sYaml[];

    const name = documents[0].metadata.name;
    const serviceName = documents[1].metadata.name;
    const port = documents[1].spec.ports[0].port;

    return generateIngressYaml(serviceName, port, username, name);
  }

  const buildDeploymentContent = (): string => {
    let content = "";

    for (let i = 0; i < selectedTemplates.length; i++) {
      const templateContent = getTemplateContent(selectedTemplates[i]);
      content += templateContent;

      if (selectedTemplates[i].createIngress) {
        content += "\n---\n";
        content += getIngressForTemplate(templateContent);
      }

      if (i != selectedTemplates.length - 1) {
        content += "\n---\n";
      }
    }

    return content;
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
            <div className={"flex justify-between"}>
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <label className="block text-sm text-gray-400">
                {`example: m.remplbauer`}
              </label>
            </div>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <button
            className={
              "w-full font-medium text-white bg-primary rounded-lg shadow-md hover:bg-secondary hover:text-black p-4"
            }
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

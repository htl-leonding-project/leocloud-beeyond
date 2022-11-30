import ListItem from "../components/ListItem";
import Image from "next/image";
import useSWR from "swr";
import { Template } from "../models/template";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const url = `${process.env.API_URL}/template`;

export default function Home() {
  const { data } = useSWR<Template[]>(url, fetcher);

  const [selectedTemplates, setSelectedTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();

  const selectTemplate = (direction: string) => {
    if (!selectedTemplate) return;

    if (direction == "right") {
      if (!selectedTemplates.includes(selectedTemplate)) {
        selectedTemplates.push(selectedTemplate);
        setSelectedTemplates(selectedTemplates);
      }
    } else {
      setSelectedTemplates(
        selectedTemplates.filter(
          (template) => template.id != selectedTemplate.id
        )
      );
    }

    setSelectedTemplate(undefined);
  };

  return (
    <div className={"flex h-screen p-8"}>
      <div className={"w-2/5 bg-white shadow-md rounded-lg overflow-auto"}>
        {data
          ?.filter((template) => !selectedTemplates.includes(template))
          .map((template) => (
            <ListItem
              key={template.id}
              template={template}
              selectedTemplate={selectedTemplate!}
              setSelectedTemplate={setSelectedTemplate}
            />
          ))}
      </div>
      <div className={"w-1/5 flex-col h-full"}>
        <div className={"h-1/3"}></div>
        <div className={"h-1/3 flex flex-col justify-center items-center"}>
          <div
            className={"cursor-pointer"}
            onClick={() => selectTemplate("left")}
          >
            <Image
              src={"/assets/arrow-left.svg"}
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
              src={"/assets/arrow-right.svg"}
              alt={"arrow-right"}
              width={48}
              height={48}
            />
          </div>
        </div>
        <div className={"h-1/3 flex justify-center items-end"}>
          <button
            className={
              "font-medium text-white bg-primary rounded-lg shadow-md hover:bg-secondary hover:text-black p-4"
            }
          >
            DOWNLOAD
          </button>
        </div>
      </div>
      <div className={"w-2/5 bg-white shadow-md rounded-lg overflow-auto"}>
        {selectedTemplates.map((template) => (
          <ListItem
            key={template.id}
            template={template}
            selectedTemplate={selectedTemplate!}
            setSelectedTemplate={setSelectedTemplate}
          />
        ))}
      </div>
    </div>
  );
}

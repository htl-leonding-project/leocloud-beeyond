import ListItem from "../components/ListItem";
import Image from "next/image";
import useSWR from "swr";
import { Template } from "../models/template";
import { WildCardForm } from "../components/WildcardForm";
import useStateStore from "../store/stateStore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
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
    const content = temp.replace(regex, "temp");
    return content;
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

  const buildDeploymentContent = (): string => {
    let content = "";

    for (let i = 0; i < selectedTemplates.length; i++) {
      content += getTemplateContent(selectedTemplates[i]);

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

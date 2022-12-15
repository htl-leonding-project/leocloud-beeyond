import ListItem from "../components/ListItem";
import Image from "next/image";
import useSWR from "swr";
import { Template } from "../models/template";
import { WildCardForm } from "../components/WildcardForm";
import useStateStore from "../store/store";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const url = `${process.env.API_URL}/template`;

export default function Home() {
  const { data } = useSWR<Template[]>(url, fetcher);

  //const [selectedTemplates, setSelectedTemplates] = useState<Template[]>([]);
  //const [selectedTemplate, setSelectedTemplate] = useState<Template>();

  // @ts-ignore
  const selectedTemplates = useStateStore((state) => state.selectedTemplates);
  // @ts-ignore
  const addSelectedTemplate = useStateStore((state) => state.addSelectedTemplate);
  const removeSelectedTemplate = useStateStore(
    // @ts-ignore
    (state) => state.removeSelectedTemplate
  );

  // @ts-ignore
  const selectedTemplate = useStateStore((state) => state.activeTemplate);
  // @ts-ignore
  const setSelectedTemplate = useStateStore((state) => state.setActiveTemplate);

  const downloadDeployment = () => {
    downloadDeploymentFile(buildDeploymentContent());
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
      content += selectedTemplates[i].content;

      if (i != selectedTemplates.length - 1) {
        content += "\n---\n";
      }
    }

    return content;
  };

  const selectTemplate = (direction: string) => {
    if (!selectedTemplate) return;

    if (direction == "right") {
      if (!selectedTemplates.includes(selectedTemplate)) {
        //selectedTemplates.push(selectedTemplate);
        //setSelectedTemplates(selectedTemplates);
        addSelectedTemplate(selectedTemplate);
      }
    } else {
      //setSelectedTemplates(
      //selectedTemplates.filter(
      //  (template: Template) => template.id != selectedTemplate.id
      //);
      //);

      removeSelectedTemplate(selectedTemplate);
    }

    setSelectedTemplate(undefined);
  };

  return (
    <div className={"flex h-screen p-8"}>
      <div className={"w-2/5 bg-white shadow-md rounded-lg overflow-auto"}>
        {data
          ?.filter((template) => !selectedTemplates.includes(template))
          .map((template) => (
            <ListItem key={template.id} template={template} />
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
            onClick={downloadDeployment}
          >
            DOWNLOAD
          </button>
        </div>
      </div>

      <div
        className={
          "h-full w-2/5 bg-white shadow-md rounded-lg overflow-auto flex flex-col"
        }
      >
        <div
          className={
            selectedTemplates.includes(selectedTemplate!)
              ? "h-full bg-white rounded-lg overflow-auto"
              : "h-full bg-white rounded-lg overflow-auto shadow-md"
          }
        >
          {selectedTemplates.map((template: Template) => (
            <ListItem key={template.id} template={template} />
          ))}
        </div>
        {selectedTemplates.includes(selectedTemplate!) && (
          <WildCardForm></WildCardForm>
        )}
      </div>
    </div>
  );
}

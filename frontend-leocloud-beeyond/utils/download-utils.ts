export const downloadDeploymentFile = (
  content: string,
  link?: HTMLAnchorElement
) => {
  const url = URL.createObjectURL(new Blob([content], { type: "text/yaml" }));

  if (!link) {
    link = document.createElement("a");
    link.style.display = "none";
    link.download = "deployment.yaml";
    document.body.appendChild(link);
  }

  link.href = url;
  link.click();

  URL.revokeObjectURL(url);
  link.remove();
};

import Image from "next/image";
import { useEnvContext } from "~/stores/envContext";

export default function Navbar() {
  const { basePath } = useEnvContext();
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  return (
    <div className="navbar h-12 rounded-lg bg-secondary px-4">
      <Image
        src={`${basePath}/assets/bee-purple.svg`}
        className="mr-3 h-10 select-none"
        alt="Beeyond Logo"
        width={48}
        height={48}
      />
      <span className="select-none text-2xl font-semibold text-base-100">Beeyond</span>
      <select className="select ml-auto" data-choose-theme>
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
}

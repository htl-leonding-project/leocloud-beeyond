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
        className="mr-3 h-10 select-none w-10"
        alt="Beeyond Logo"
        width={48}
        height={48}
      />
      <span className="select-none text-2xl font-semibold text-base-100">Beeyond</span>
      <div className="dropdown dropdown-end ml-auto">
        <div tabIndex={0}>{<ThemeCard theme="Theme" />}</div>
        <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
          <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
            {themes.map((theme) => (
              <ThemeButton key={theme} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeButton({ theme }: { theme: string }) {
  return (
    <button
      data-set-theme={theme}
      className="outline-base-content overflow-hidden rounded-lg text-left"
    >
      <ThemeCard theme={theme} />
    </button>
  );
}

function ThemeCard({ theme }: { theme: string }) {
  return (
    <div
      data-theme={theme}
      className="bg-base-100 text-base-content w-full cursor-pointer font-sans rounded-lg"
    >
      <div className="grid grid-cols-5 grid-rows-3">
        <div className="col-span-5 row-span-3 row-start-1 flex gap-2 py-3 px-4 items-center">
          <div className="flex-grow text-sm font-bold">{theme}</div>
          <div className="flex flex-shrink-0 flex-wrap gap-1 h-full">
            <div className="bg-primary w-2 rounded"></div>
            <div className="bg-secondary w-2 rounded"></div>
            <div className="bg-accent w-2 rounded"></div>
            <div className="bg-neutral w-2 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

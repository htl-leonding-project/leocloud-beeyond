import { useEnvContext } from "~/stores/envContext";

export function Navbar() {
  const { basePath } = useEnvContext();

  return (
    <div className="navbar h-12 rounded-lg bg-secondary px-4">
      <img
        src={`${basePath}/assets/bee-purple.svg`}
        className="mr-3 h-6 select-none sm:h-9"
        alt="Beeyond Logo"
      />
      <span className="select-none text-2xl font-semibold text-white">
        Beeyond
      </span>
    </div>
  );
}

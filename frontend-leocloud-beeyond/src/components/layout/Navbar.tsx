import Image from "next/image";
import { useEnvContext } from "~/stores/envContext";

export function Navbar() {
  const { basePath } = useEnvContext();

  return (
    <div className="navbar h-12 rounded-lg bg-secondary px-4">
      <Image
        src={`${basePath}/assets/bee-purple.svg`}
        className="mr-3 h-10 select-none"
        alt="Beeyond Logo"
        width={48}
        height={48}
      />
      <span className="select-none text-2xl font-semibold text-white">Beeyond</span>
    </div>
  );
}

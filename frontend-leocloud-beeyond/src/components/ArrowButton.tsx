import Image from "next/image";
import React from "react";
import { useEnvContext } from "~/stores/envContext";

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => {
  const { basePath } = useEnvContext();
  const imagePath = `${basePath}/assets/arrow-${direction}.svg`;

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Image
        className="select-none"
        src={imagePath}
        alt={`arrow-${direction}`}
        width={48}
        height={48}
        priority={true}
      />
    </div>
  );
};

export default ArrowButton;

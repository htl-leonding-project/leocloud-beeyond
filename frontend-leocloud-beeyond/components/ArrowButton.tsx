import React from "react";
import Image from "next/image";

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => {
  const imagePath = `${process.env.BASE_PATH}/assets/arrow-${direction}.svg`;

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Image
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

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const ServiceItemCard = ({
  link,
  title,
  icon,
  order,
  description,
}: {
  link?: string;
  title: string;
  icon?: string | null;
  order?: string | number;
  description?: string;
}) => {
  const fallbackIconSrc =
    "https://img.freepik.com/free-psd/x-symbol-isolated_23-2150500369.jpg";
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const imageSrc = icon ?? fallbackIconSrc;

  // Using whileInView on the motion element to trigger animation when the
  // card is fully visible (amount: 1). This avoids refs and useEffect.

  const content = (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <Image
          src={imageSrc}
          unoptimized
          alt={title}
          width={40}
          height={40}
          priority
          onError={(event) => {
            const target = event.currentTarget as HTMLImageElement;
            if (target.src !== fallbackIconSrc) {
              target.src =
                "https://img.freepik.com/free-psd/x-symbol-isolated_23-2150500369.jpg";
            }
          }}
        />
        <h4 className="text-[18px] md:text-[20px] xl:text-[24px]">{title}</h4>
      </div>
      <div>
        <h3 className="text-[#666A73] font-medium capitalize tracking-[-0.64px] group-hover:text-primaryBlue transition-colors duration-300 ease-in-out">
          {order}
        </h3>
      </div>
    </div>
  );

  // If link provided, render clickable card; otherwise static card without hover styling.
  // Render motion child so parent container can staggerChildren
  const cardInner = (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 1, once: true }}
      className="group bg-white border border-primaryBorder rounded-[10px] p-6 hover:border-primaryBlue hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      {content}
      {description && (
        <p className="mt-4 ms-16 text-sm text-gray-600">{description}</p>
      )}
    </motion.div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {cardInner}
      </Link>
    );
  }

  return <div className="cursor-default">{cardInner}</div>;
};

export default ServiceItemCard;

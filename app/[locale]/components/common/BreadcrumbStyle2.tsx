"use client";
import Image from "next/image";
import Container from "./Container";
import { motion, Variants } from "framer-motion";

type PageHeaderProps = {
  title: string;
  para: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const innerVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

const BreadcrumbStyle2 = ({ title, para }: PageHeaderProps) => {
  return (
    <motion.div
      className="h-[300px] md:h-[400px] 2xl:h-[450px] relative bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${"/assets/breadcrumb/BG.png"})` }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <Container className="h-[300px] md:h-[400px] 2xl:h-[450px] flex flex-col justify-center items-center">
        <motion.h2
          className="mt-[50px] text-center z-10"
          variants={innerVariants}
          custom={0}
        >
          {title}
        </motion.h2>

        <motion.div
          className="mt-3 max-w-[500px] z-10"
          variants={innerVariants}
          custom={1}
        >
          {para && <p className="text-center">{para}</p>}
        </motion.div>

        <motion.div
          className="absolute left-[13%] md:block hidden"
          variants={innerVariants}
          custom={2}
        >
          <Image
            className="object-contain w-full h-auto"
            src={"/assets/breadcrumb/shape02.png"}
            alt="shape"
            width={600}
            height={600}
          />
        </motion.div>

        <motion.div
          className="absolute right-[18%] bottom-20 w-[180px] h-[180px] md:block hidden"
          variants={innerVariants}
          custom={3}
        >
          <Image
            className="object-contain w-full h-auto"
            src={"/assets/breadcrumb/star.png"}
            alt="star"
            width={120}
            height={120}
          />
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default BreadcrumbStyle2;

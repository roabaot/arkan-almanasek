"use client";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

type PageHeaderProps = {
  title: string;
  breadcrumb?: { name: string; href?: string }[];
};

const Breadcrumb = ({ title, breadcrumb }: PageHeaderProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  return (
    <motion.div
      className="bg-[#F2F4F8]/50 h-[300px] md:h-[400px] 2xl:h-[450px] relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="h-[300px] md:h-[400px] 2xl:h-[450px] flex flex-col justify-center items-start">
        <motion.h2
          className="mt-[50px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        <div className="mt-3 md:flex gap-2 hidden">
          {breadcrumb?.map((item, index) => (
            <span
              key={index}
              className="flex items-center hover:text-secondaryColor md:text-[24px] text-[20px] text-primary capitalize duration-300 ease-in-out"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primaryBlue transition-colors duration-300 ease-in-out"
                >
                  {item?.name}
                </Link>
              ) : (
                <span>{item?.name}</span>
              )}
              {index < breadcrumb.length - 1 && (
                <span>
                  {" "}
                  {isRtl ? (
                    <IoIosArrowBack className="text-md mr-2 text-secondaryColor" />
                  ) : (
                    <IoIosArrowForward className="text-md ml-2 text-secondaryColor" />
                  )}
                </span>
              )}
            </span>
          ))}
        </div>
      </Container>

      <div className="md:w-[373px] md:h-[373px] w-[300px] h-[300px] rounded-full bg-primaryBlue opacity-40 blur-[150px] absolute ltr:md:right-[10%] ltr:right-[5%] rtl:md:left-[10%] rtl:left-[5%] top-1/2 -translate-y-1/2 animate-pulse"></div>

      <div className="absolute right-0 left-0 bottom-0 -z-10">
        <Image
          className="object-contain w-full ltr:-scale-x-100 pointer-events-none select-none"
          src={"/assets/breadcrumb/rect-light.svg"}
          width={600}
          height={300}
          priority
          draggable={false}
          alt="mark"
        />
      </div>
    </motion.div>
  );
};

export default Breadcrumb;

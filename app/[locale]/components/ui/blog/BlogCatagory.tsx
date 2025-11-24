import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { blogClassT } from "./BlogPageClient";

type BlogCatagoryPropsT = {
  isSingleBlog?: boolean;
  categories?: blogClassT[];
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
};

const BlogCatagory = ({
  isSingleBlog = false,
  categories,
  activeCategory,
  setActiveCategory,
}: BlogCatagoryPropsT) => {
  const t = useTranslations("blogs");
  const locale = useLocale();
  const router = useRouter();

  const handleCategory = (category: string) => {
    const isRemoving = category === activeCategory;
    const nextCategory = isRemoving ? "" : category;
    setActiveCategory?.(nextCategory);

    const basePath = `/${locale}/blog`;
    if (isSingleBlog) {
      const targetUrl = nextCategory
        ? `${basePath}?category=${nextCategory}`
        : basePath;
      router.push(targetUrl);
    } else {
      router.push(basePath);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
        <h4>{t("categories")}</h4>
        <div className="flex flex-col gap-5 mt-6">
          {categories?.map((item, index) => (
            <button
              key={index}
              className={`group bg-[#F2F4F8] rounded-[30px] px-6 py-3 flex justify-between items-center hover:bg-primaryBlue/85 active:bg-primaryBlue duration-300 ease-in-out ${
                activeCategory === item.name_i18n ? "bg-primaryBlue" : ""
              }`}
              onClick={() => handleCategory(item.name_i18n)}
            >
              <p
                className={`group-hover:text-white duration-300 ease-in-out ${
                  activeCategory === item.name_i18n ? "text-white" : ""
                }`}
              >
                {item.name_i18n}
              </p>
              <p
                className={`group-hover:text-white duration-300 ease-in-out ${
                  activeCategory === item.name_i18n ? "text-white" : ""
                }`}
              >
                {index > 9 ? index + 1 : `0${index + 1}`}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCatagory;

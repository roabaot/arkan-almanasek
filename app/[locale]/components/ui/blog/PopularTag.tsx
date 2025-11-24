import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { blogClassT } from "./BlogPageClient";

type tagPropsT = {
  isSingleBlog?: boolean;
  tags?: blogClassT[];
  activeTag?: string;
  setActiveTag?: (tag: string) => void;
};

const PopularTag = ({
  isSingleBlog,
  tags,
  activeTag,
  setActiveTag,
}: tagPropsT) => {
  const t = useTranslations("blogs");
  const locale = useLocale();
  const router = useRouter();
  const handleTag = (tag: string) => {
    const isRemoving = tag === activeTag;
    const nextTag = isRemoving ? "" : tag;
    setActiveTag?.(nextTag);

    const basePath = `/${locale}/blog`;
    if (isSingleBlog) {
      const targetUrl = nextTag
        ? `${basePath}?tag=${encodeURIComponent(nextTag)}`
        : basePath;
      router.push(targetUrl);
    } else {
      router.push(basePath);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
        <h4>{t("tags")}</h4>
        <div className="flex flex-wrap gap-6 mt-6">
          {tags?.map((tag, index) => (
            <button
              key={index}
              className={`group bg-[#F2F4F8] rounded-[30px] px-3 py-1 hover:bg-primaryBlue/85 active:bg-primaryBlue duration-300 ease-in-out ${
                activeTag === tag.name_i18n ? "bg-primaryBlue text-white" : ""
              }`}
              onClick={() => handleTag(tag.name_i18n)}
            >
              <p
                className={`group-hover:text-white ${
                  activeTag === tag.name_i18n ? "text-white" : ""
                }`}
              >
                {tag.name_i18n}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTag;

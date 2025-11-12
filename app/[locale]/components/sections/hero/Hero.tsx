import { getLocale, getTranslations } from "next-intl/server";
import HeroClient from "./HeroClient";

const Hero = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  // pass plain strings to the client component to avoid server/client boundary issues
  return (
    <HeroClient
      title={t("hero.title")}
      description={t("hero.description")}
      locale={locale}
    />
  );
};

export default Hero;

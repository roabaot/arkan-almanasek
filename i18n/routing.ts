import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ar", "en", "id", "tr", "si", "ms"],

  // Used when no locale matches
  defaultLocale: "ar",
});

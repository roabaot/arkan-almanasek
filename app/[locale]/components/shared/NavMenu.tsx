import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

// ---- Types -----------------------------------------------------------------
// Sub menu leaf link
interface SubMenuLink {
  href: string;
  label: string;
}

// A link that has a submenu (no direct href at this level)
interface LinkWithSubmenu {
  label: string;
  submenu: SubMenuLink[];
  href?: never; // prevent using href together with submenu (clarity)
}

// A simple link with no submenu
interface SimpleLink {
  href: string;
  label: string;
  submenu?: undefined; // ensure discrimination
}

type LinkItem = SimpleLink | LinkWithSubmenu;

// Top level either a direct nav item or one containing a list of links
interface TopLevelDirect {
  title: string;
  href: string;
  links?: undefined;
}

interface TopLevelWithGroup {
  title: string;
  links: LinkItem[];
  href?: undefined;
}

type MenuItem = TopLevelDirect | TopLevelWithGroup;

// We'll derive titles from translation keys to keep menu fully localized.
// Keys correspond to entries under `common` namespace in locale JSON files.
type CommonMenuKey = "home" | "about" | "blog" | "contact" | "services";
const menuConfig: Array<
  Omit<TopLevelDirect, "title"> & { key: CommonMenuKey }
> = [
  { key: "home", href: "/" },
  { key: "about", href: "/about-v2" },
  { key: "services", href: "/category" },
  { key: "blog", href: "/blog" },
  // { key: "contact", href: "/contact" },
];
const NavMenu = () => {
  const [hoveredSubmenu, setHoveredSubmenu] = useState<number | null>(null);
  const t = useTranslations("common");

  // Build menu items with translated titles (memoization unnecessary here given small array)
  const menuItems: MenuItem[] = menuConfig.map((item) => ({
    title: t(item.key),
    href: item.href,
  }));

  return (
    <nav>
      <ul className="flex items-center gap-[30px]">
        {menuItems.map((item, i) => (
          <li
            key={i}
            className="relative group py-[30px] cursor-pointer nav-menu"
          >
            {item.href ? (
              <Link href={item.href} className="flex items-center gap-1">
                {item.title}
              </Link>
            ) : (
              <>
                <a className="flex items-center gap-1">
                  {item.title}
                  <IoIosArrowDown className="text-[16px] group-hover:-rotate-180 duration-300 ease-in-out" />
                </a>

                <ul className="absolute left-0 transform top-[140px] opacity-0 invisible transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:top-[75px] bg-white text-secondaryColor pb-5 shadow-lg rounded-md z-30 min-w-[220px]">
                  {item?.links?.map((link, j) => (
                    <li
                      key={j}
                      className={`relative group`}
                      onMouseEnter={() =>
                        "submenu" in link && setHoveredSubmenu(j)
                      }
                      onMouseLeave={() =>
                        "submenu" in link && setHoveredSubmenu(null)
                      }
                    >
                      {"submenu" in link ? (
                        <>
                          <span className="nav-sub-menu peer flex items-center gap-1 justify-between cursor-pointer">
                            {link.label}
                            <IoIosArrowForward className="text-[16px] peer-hover:-rotate-180 duration-100 ease-in-out w-10" />
                          </span>
                          <ul
                            className={`absolute right-[250px] w-full bg-white pb-5 shadow-lg rounded-md transition-all duration-300 ease-in-out transform min-w-[220px] ${
                              hoveredSubmenu === j
                                ? "opacity-100 translate-y-0 top-0"
                                : "opacity-0 -translate-y-2 top-10 pointer-events-none"
                            }`}
                          >
                            {(link.submenu ?? []).map((sub, k) => (
                              <li key={k}>
                                <Link href={sub.href} className="nav-sub-menu">
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        // Narrowed to SimpleLink
                        <Link href={link.href} className="nav-sub-menu">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;

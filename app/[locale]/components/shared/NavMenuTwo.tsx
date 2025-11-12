
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const menuItems = [
  {
    title: "Home",
    links: [
      { href: "/", label: "Home One" },
      { href: "/home-two", label: "Home Two" },
      { href: "/home-three", label: "Home Three" },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        label: "About",
        submenu: [
          { href: "/about", label: "About v1" },
          { href: "/about-v2", label: "About v2" },
        ],
      },
     
      {
        label: "Project",
        submenu: [
          { href: "/project", label: "Project" },
          { href: "/project/leading-the-way-in-innovation", label: "Project Details" },
        ],
      },
      { href: "/terms-condition", label: "Trems & Condition" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/contact", label: "Contact Us" },
      { href: "*", label: "404" },
    ],
  },

  {
    title: "Services",
    links: [
      { href: "/service", label: "Services" },
      { href: "/service/tech-pro-services", label: "Services Details" },
    ],
  },
 
  {
    title: "Blog",
    links: [
      { href: "/blog", label: "Blog classic" },
      { href: "/blog/your-tomorrow-enhanced-today", label: "Blog Details" },
    ],
  },

  {
    title: "Contact Us",
    href: "/contact",
  },
];

const NavMenuTwo = () => {
  const [hoveredSubmenu, setHoveredSubmenu] = useState<number | null>(null);

  return (
    <nav>
      <ul className="flex items-center gap-[30px]" role="menubar">
        {menuItems.map((item, i) => (
          <li
            key={`${item.title}-${i}`}
            className="relative group py-[26px] cursor-pointer nav-menu-two"
            role="none"
          >
            {item.href ? (
              <Link href={item.href} className="flex items-center gap-1" role="menuitem">
                {item.title}
              </Link>
            ) : (
              <>
                <span
                  className="flex items-center gap-1 cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={false}
                  role="menuitem"
                >
                  {item.title}
                  <IoIosArrowDown className="text-[16px] group-hover:-rotate-180 duration-300 ease-in-out" />
                </span>

                <ul
                  className="absolute left-0 transform top-[140px] opacity-0 invisible transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:top-[75px] bg-white text-secondaryColor pb-5 shadow-lg rounded-md z-30 min-w-[220px]"
                  role="menu"
                >
                  {item?.links?.map((link, j) => (
                    <li
                      key={`${link.label}-${j}`}
                      className="relative group"
                      onMouseEnter={() => link.submenu && setHoveredSubmenu(j)}
                      onMouseLeave={() => link.submenu && setHoveredSubmenu(null)}
                      role="none"
                    >
                      {link.submenu ? (
                        <>
                          <span
                            className="nav-sub-menu peer flex items-center gap-1 justify-between cursor-pointer"
                            role="menuitem"
                            aria-haspopup="true"
                            aria-expanded={hoveredSubmenu === j}
                          >
                            {link.label}
                            <IoIosArrowForward className="text-[16px] peer-hover:-rotate-180 duration-100 ease-in-out w-10" />
                          </span>
                          <ul
                            className={`absolute right-[250px] w-full bg-white pb-5 shadow-lg rounded-md transition-all duration-300 ease-in-out transform min-w-[220px] ${
                              hoveredSubmenu === j
                                ? "opacity-100 translate-y-0 top-0"
                                : "opacity-0 -translate-y-2 top-10 pointer-events-none"
                            }`}
                            role="menu"
                          >
                            {link.submenu.map((sub, k) => (
                              <li key={`${sub.label}-${k}`} role="none">
                                <Link href={sub.href} className="nav-sub-menu" role="menuitem">
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Link href={link.href} className="nav-sub-menu" role="menuitem">
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

export default NavMenuTwo;

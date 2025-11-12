// Type definitions for mobile navigation menu items.
// A menu item can either be a direct link (with an href) or
// a grouped item containing an array of sub-links.
export type MenuLink = { href: string; label: string };
export type MenuItem =
  | { key: string; href: string }
  | { key: string; links: MenuLink[] };

// Static menu configuration. Currently all are direct links.
// If you need a grouped item later, push: { key: 'services', links: [ { href: '/service/a', label: 'Service A' } ] }
export const menuItems: MenuItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about-v2" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

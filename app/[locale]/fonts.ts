// Build-safe font placeholders
// NOTE: We avoid using `next/font/google` here because it triggers network
// requests at build time (fonts.gstatic.com). In environments without
// outbound network access this causes `getaddrinfo ENOTFOUND` errors.
//
// We export simple objects with a `variable` property matching the CSS
// variables declared in `globals.css`. If you want to use `next/font/google`
// again, replace these exports with the originals.

export const inter = {
  variable: "--font-secondary",
};

export const spaceGrotesk = {
  variable: "--font-primary",
};

export const amiri = {
  variable: "--font-amiri",
};

export const poppins = {
  variable: "--font-poppins",
};

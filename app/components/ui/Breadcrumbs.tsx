import Link from "next/link";
import * as React from "react";
import type { UrlObject } from "url";

export type BreadcrumbHref = string | UrlObject;

export type BreadcrumbItem = {
  label: React.ReactNode;
  href?: BreadcrumbHref;
  current?: boolean;
  className?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  linkClassName?: string;
  currentClassName?: string;
  separatorClassName?: string;
  separatorIconName?: string;
  ariaLabel?: string;
};

function isItemCurrent(
  items: BreadcrumbItem[],
  item: BreadcrumbItem,
  index: number,
) {
  if (typeof item.current === "boolean") return item.current;
  return index === items.length - 1;
}

export function Breadcrumbs({
  items,
  className,
  linkClassName,
  currentClassName,
  separatorClassName,
  separatorIconName = "chevron_right",
  ariaLabel = "Breadcrumb",
}: BreadcrumbsProps) {
  const baseNavClass = "flex items-center text-sm text-text-sub";
  const baseLinkClass = "hover:text-primary transition-colors";
  const baseCurrentClass = "text-primary font-medium";
  const baseSeparatorClass =
    "material-symbols-outlined self-center !text-sm mx-2 rtl:rotate-180";

  return (
    <nav
      aria-label={ariaLabel}
      className={[baseNavClass, className].filter(Boolean).join(" ")}
    >
      {items.map((item, index) => {
        const current = isItemCurrent(items, item, index);
        const hasLink = Boolean(item.href) && !current;

        return (
          <React.Fragment key={index}>
            {hasLink ? (
              <Link
                href={item.href as BreadcrumbHref}
                className={[baseLinkClass, linkClassName, item.className]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={current ? "page" : undefined}
                className={[
                  current ? baseCurrentClass : undefined,
                  current ? currentClassName : undefined,
                  !current ? item.className : undefined,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.label}
              </span>
            )}

            {index < items.length - 1 ? (
              <span
                aria-hidden="true"
                className={[baseSeparatorClass, separatorClassName]
                  .filter(Boolean)
                  .join(" ")}
              >
                {separatorIconName}
              </span>
            ) : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;

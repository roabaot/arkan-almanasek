type CurrencyCode = string;

const FORCED_SYMBOL_BY_CURRENCY: Record<string, string> = {
  SAR: "﷼",
};

function createCurrencyFormatter(
  locale: string,
  currency: CurrencyCode,
  currencyDisplay: Intl.NumberFormatOptions["currencyDisplay"],
  maximumFractionDigits: number,
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay,
    maximumFractionDigits,
  });
}

export function formatCurrency(
  value: number,
  locale: string,
  currency: CurrencyCode = "SAR",
  maximumFractionDigits = 2,
) {
  const forcedSymbol = FORCED_SYMBOL_BY_CURRENCY[currency];

  if (forcedSymbol) {
    try {
      const parts = createCurrencyFormatter(
        locale,
        currency,
        "narrowSymbol",
        maximumFractionDigits,
      ).formatToParts(value);

      return parts
        .map((p) => (p.type === "currency" ? forcedSymbol : p.value))
        .join("");
    } catch {
      try {
        const numberOnly = new Intl.NumberFormat(locale, {
          maximumFractionDigits,
        }).format(value);
        return `${numberOnly} ${forcedSymbol}`;
      } catch {
        return `${value} ${forcedSymbol}`;
      }
    }
  }

  // Prefer a symbol-like display when the runtime supports it.
  // Fallbacks ensure we always return something sensible.
  try {
    return createCurrencyFormatter(
      locale,
      currency,
      "narrowSymbol",
      maximumFractionDigits,
    ).format(value);
  } catch {
    try {
      return createCurrencyFormatter(
        locale,
        currency,
        "symbol",
        maximumFractionDigits,
      ).format(value);
    } catch {
      return createCurrencyFormatter(
        locale,
        currency,
        "code",
        maximumFractionDigits,
      ).format(value);
    }
  }
}

export function getCurrencySymbol(
  locale: string,
  currency: CurrencyCode = "SAR",
) {
  const forcedSymbol = FORCED_SYMBOL_BY_CURRENCY[currency];
  if (forcedSymbol) return forcedSymbol;

  try {
    const parts = createCurrencyFormatter(locale, currency, "narrowSymbol", 0)
      .formatToParts(0)
      .filter(Boolean);

    const currencyPart = parts.find((p) => p.type === "currency")?.value;
    return currencyPart || currency;
  } catch {
    return currency;
  }
}

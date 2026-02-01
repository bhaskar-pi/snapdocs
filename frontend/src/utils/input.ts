export function formatEnumLabel(key: string) {
  return key
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function mapEnumToOptions(enumObj: Record<string, string>) {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: formatEnumLabel(key),
    value,
  }));
}

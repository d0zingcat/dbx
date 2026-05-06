export type GridCellValue = string | number | boolean | null | Record<string, unknown> | unknown[];

export function formatGridCellDisplay(value: GridCellValue, nullText = "NULL"): string {
  if (value === null) return nullText;
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "object") return stringifyJsonCell(value);
  return String(value);
}

export function stringifyJsonCell(value: object): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function formatGridCellJsonPreview(value: GridCellValue): string {
  if (value && typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return "";
    }
  }

  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return "";

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return "";
  }
}

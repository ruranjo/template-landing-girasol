export async function getSheetData(sheetUrl: string) {
  const url = `${sheetUrl}&cache_bust=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error(`Error al obtener la hoja: ${res.status} ${res.statusText}`);

  const text = await res.text();

  const rows = text
    .trim()
    .split("\n")
    .map(line => line.split("\t").map(cell => cell.trim().replace(/\r/g, ""))); // 👈 limpia saltos de línea y espacios

  const headers = rows.shift()?.map(h => h.trim().replace(/\r/g, "")) ?? [];
  return rows.map(row =>
    Object.fromEntries(row.map((cell, i) => [headers[i], cell]))
  );
}

export const SHEET_MAIN_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vTl9frA7rBruwk69u5ub9Ywbv4Ucqk7pN9LuYdK0qCmVg4aCyn5fqLkA8Jd8J7fgS2aMB2FNqbh41l1/pub?output=tsv&gid=0"
export const SHEET_TESTIMONIALS_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vTl9frA7rBruwk69u5ub9Ywbv4Ucqk7pN9LuYdK0qCmVg4aCyn5fqLkA8Jd8J7fgS2aMB2FNqbh41l1/pub?output=tsv&gid=1355462707"



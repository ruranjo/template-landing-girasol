import type { APIRoute } from "astro";
import { getSheetData } from "../../lib/getSheetData";

export const GET: APIRoute = async () => {
  try {
    const data = await getSheetData(import.meta.env.SHEET_TABLE_URL);
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
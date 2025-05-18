import { getCategories } from "@/app/actions/web/categoriesActions";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const categories = await getCategories();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch categories${error}` }),
      {
        status: 500,
      }
    );
  }
}

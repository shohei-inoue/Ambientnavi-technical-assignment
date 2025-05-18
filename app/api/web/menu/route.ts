import { NextRequest } from "next/server";
import { getMenuByCategoryId } from "@/app/actions/web/menuActions";

export async function GET(req: NextRequest) {
  const categoryIdParam = req.nextUrl.searchParams.get("categoryId");
  const categoryId = categoryIdParam ? parseInt(categoryIdParam) : null;

  try {
    const menu = await getMenuByCategoryId(categoryId);
    return new Response(JSON.stringify(menu), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch menus${error}` }),
      {
        status: 500,
      }
    );
  }
}

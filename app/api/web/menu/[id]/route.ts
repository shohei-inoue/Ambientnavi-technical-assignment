import { NextRequest } from "next/server";
import { getMenuDetail } from "@/app/actions/web/menuActions";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return new Response(JSON.stringify({ error: "Invalid menu ID" }), {
      status: 400,
    });
  }

  try {
    const menu = await getMenuDetail(parsedId);
    if (!menu) {
      return new Response(JSON.stringify({ error: "Menu not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(menu), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch menu detail: ${error}` }),
      { status: 500 }
    );
  }
}

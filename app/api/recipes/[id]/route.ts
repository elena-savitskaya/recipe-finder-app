import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Recipe ID is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error from Spoonacular API:", errorData);
      return NextResponse.json(
        {
          error: "Failed to fetch data from Spoonacular API",
          details: errorData,
        },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Unknown error occurred", details: error },
      { status: 500 }
    );
  }
}

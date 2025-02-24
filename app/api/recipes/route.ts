import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const cuisine = searchParams.get("cuisine") || "";
  const maxReadyTime = searchParams.get("maxReadyTime") || "";

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxReadyTime}&apiKey=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    const data = await res.json();
    return NextResponse.json(data.results || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

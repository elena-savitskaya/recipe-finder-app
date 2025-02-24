"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use this hook

type Recipe = {
  id: number;
  title: string;
  image: string;
};

const fetchRecipes = async (
  query: string,
  cuisine: string,
  maxReadyTime: string
) => {
  const res = await fetch(
    `/api/recipes?query=${encodeURIComponent(query)}&cuisine=${encodeURIComponent(cuisine)}&maxReadyTime=${encodeURIComponent(maxReadyTime)}`
  );
  if (!res.ok) throw new Error("Error fetching recipes");
  const data = await res.json();
  return data;
};

const RecipesPage = () => {
  const searchParams = useSearchParams(); // Access search params using this hook
  const query = searchParams?.get("query") || "";
  const cuisine = searchParams?.get("cuisine") || "";
  const maxReadyTime = searchParams?.get("maxReadyTime") || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes(query, cuisine, maxReadyTime);
        setRecipes(data);
      } catch (err) {
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [query, cuisine, maxReadyTime]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-3xl w-full p-6">
        <h1 className="text-2xl font-semibold text-black mb-6">Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: Recipe) => (
            <div
              key={recipe.id}
              className="border rounded-lg shadow-md p-4 cursor-pointer"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="font-semibold text-lg">{recipe.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;

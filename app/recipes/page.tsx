"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@/components/loader";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams?.get("query") || "";
  const cuisine = searchParams?.get("cuisine") || "";
  const maxReadyTime = searchParams?.get("maxReadyTime") || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes(query, cuisine, maxReadyTime);
        setRecipes(data);
      } catch (err) {
        setError("Failed to fetch recipes");
      } finally {
      }
    };

    getRecipes();
  }, [query, cuisine, maxReadyTime]);

  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen flex justify-center bg-white">
      <div className="max-w-3xl w-full p-6">
        <h1 className="text-2xl font-semibold text-black mb-6">Recipes</h1>
        <Suspense fallback={<Loader />}>
          {recipes.length === 0 ? (
            <div className="text-center text-black">
              No recipes found for your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe: Recipe) => (
                <div
                  key={recipe.id}
                  className="border rounded-lg shadow-md p-4 cursor-pointer"
                  onClick={() => {
                    router.push(`/recipes/${recipe.id}`);
                  }}
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
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default RecipesPage;

"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { Loader } from "@/components/loader";

type Ingredient = {
  name: string;
  amount: string;
  image: string;
  unit: string;
  original: string;
};

type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  extendedIngredients: Ingredient[];
  instructions: string;
  servings: number;
  readyInMinutes: number;
  cuisines: string[];
  diets: string[];
  dishTypes: string[];
  sourceUrl: string;
  sourceName: string;
};

const fetchRecipeDetails = async (id: number) => {
  const res = await fetch(`/api/recipes/${id}`);
  if (!res.ok) throw new Error("Error fetching recipe details");
  const data = await res.json();
  return data;
};

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getRecipeDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await fetchRecipeDetails(Number(id));
        setRecipe(data);
      } catch (err) {
        setError("Failed to fetch recipe details");
      }
    };

    getRecipeDetails();
  }, [id]);

  if (error) return <div>{error}</div>;

  if (!recipe) return <div>Recipe not found.</div>;

  const ingredients = Array.isArray(recipe.extendedIngredients)
    ? recipe.extendedIngredients
    : [];

  const instructions = recipe.instructions
    ? recipe.instructions
        .replace(/<\/?ol>/g, "")
        .split("<li>")
        .map(
          (step, index) =>
            step && (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: step.replace("</li>", "") }}
              />
            )
        )
    : [];

  return (
    <Suspense fallback={<Loader />}>
      <div className="max-w-4xl w-full p-6 mx-auto bg-white shadow-lg rounded-lg flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center">{recipe.title}</h1>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg mb-4 md:mb-0"
          />
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-lg text-gray-600">
              <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
            </p>
            <p className="text-lg text-gray-600">
              <strong>Servings:</strong> {recipe.servings}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Cuisines:</strong> {recipe.cuisines.join(", ")}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Diets:</strong> {recipe.diets.join(", ")}
            </p>
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Recipe Source: {recipe.sourceName}
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Ingredients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <div className="text-lg font-semibold text-gray-800">
                    {ingredient.original}
                  </div>
                  <p className="text-sm text-gray-500">
                    {ingredient.amount} {ingredient.unit}
                  </p>
                </div>
              ))
            ) : (
              <div>No ingredients found</div>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Instructions</h3>
          <ol className="list-decimal pl-6 text-lg text-gray-700 flex flex-col items-start">
            {instructions.length > 0 ? (
              instructions
            ) : (
              <li>No instructions available.</li>
            )}
          </ol>
        </div>
      </div>
    </Suspense>
  );
};

export default RecipeDetailsPage;

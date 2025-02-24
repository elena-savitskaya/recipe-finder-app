"use client";

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
    `/api/recipes?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxReadyTime}`
  );
  if (!res.ok) throw new Error("Error fetching recipes");
  const data = await res.json();
  return data;
};

export const RecipesPage = async ({
  searchParams,
}: {
  searchParams: { query: string; cuisine: string; maxReadyTime: string };
}) => {
  const { query, cuisine, maxReadyTime } = await searchParams;
  const recipes = await fetchRecipes(query, cuisine, maxReadyTime);

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

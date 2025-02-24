interface Ingredient {
  name: string;
}

type RecipeDetailsProps = {
  title: string;
  ingredients: Ingredient[];
  instructions: string;
};

export const RecipeDetails = ({
  title,
  ingredients,
  instructions,
}: RecipeDetailsProps) => {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-3xl w-full p-6">
        <h1 className="text-2xl font-semibold text-black mb-4">{title}</h1>
        <h2 className="font-semibold text-lg mb-2">Ingredients</h2>
        <ul className="list-disc pl-6">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-black">
              {ingredient.name}
            </li>
          ))}
        </ul>
        <h2 className="font-semibold text-lg mt-6 mb-2">Instructions</h2>
        <p className="text-black">{instructions}</p>
      </div>
    </div>
  );
};

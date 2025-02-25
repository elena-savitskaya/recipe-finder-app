import { RecipeForm } from "./components/recipeForm";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="text-center p-10 rounded-lg shadow-2xl max-w-lg w-full bg-white border-green-300  border-2 border-solid flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-black">
            Welcome to the Recipe Search
          </h1>
          <p className="text-xl text-black">
            Find delicious recipes based on your preferences.
          </p>
        </div>
        <RecipeForm />
      </div>
    </div>
  );
}

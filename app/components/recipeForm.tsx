"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export const RecipeForm = () => {
  const [query, setQuery] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("Italian");
  const [prepTime, setPrepTime] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (query) queryParams.append("query", query);
    if (cuisine) queryParams.append("cuisine", cuisine);
    if (prepTime) queryParams.append("maxReadyTime", prepTime);

    const url = `/recipes?${queryParams.toString()}`;
    router.push(url);
    router.refresh();
  };

  const isFormValid = query || cuisine || prepTime;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a recipe (e.g., pasta)"
        className="px-4 py-2 w-64 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="px-4 py-2 w-64 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="African">African</option>
        <option value="Asian">Asian</option>
        <option value="American">American</option>
        <option value="British">British</option>
        <option value="Cajun">Cajun</option>
        <option value="Caribbean">Caribbean</option>
        <option value="Chinese">Chinese</option>
        <option value="Eastern European">Eastern European</option>
        <option value="European">European</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Greek">Greek</option>
        <option value="Indian">Indian</option>
        <option value="Irish">Irish</option>
        <option value="Italian">Italian</option>
        <option value="Japanese">Japanese</option>
        <option value="Jewish">Jewish</option>
        <option value="Korean">Korean</option>
        <option value="Latin American">Latin American</option>
        <option value="Mediterranean">Mediterranean</option>
        <option value="Mexican">Mexican</option>
        <option value="Middle Eastern">Middle Eastern</option>
        <option value="Nordic">Nordic</option>
        <option value="Southern">Southern</option>
        <option value="Spanish">Spanish</option>
        <option value="Thai">Thai</option>
        <option value="Vietnamese">Vietnamese</option>
      </select>
      <input
        type="number"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="Max Preparation Time (in minutes)"
        className="px-4 py-2 w-64 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        disabled={!isFormValid}
        className={`px-6 py-2 w-64 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
          isFormValid
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </form>
  );
};

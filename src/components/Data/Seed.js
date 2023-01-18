import { Data } from "./Recipes";

export async function SeedRecipes() {
  await fetch("https://restapi.fr/api/recette", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(Data),
  });
}

import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

export class RecipesService {
  private recipes: Recipe[] = [];

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    let recipe = new Recipe(title, description, difficulty, ingredients);
    this.recipes.push(recipe);
    console.log(this.recipes);
  }


  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe (index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}

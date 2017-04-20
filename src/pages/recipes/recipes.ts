import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RecipeModel } from "../../models/recipe.model";
import { RecipesService } from "../../services/recipes.service";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {
  recipes: RecipeModel[];

  constructor(private navCtrl: NavController,
              private recipesService: RecipesService) {
  }

  onNewRecipe() {
    this.navCtrl.push('EditRecipe', {mode: 'Nova'});
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onLoadRecipe(recipe: RecipeModel, index: number) {
    this.navCtrl.push('Recipe', {recipe: recipe, index: index});
  }

}
